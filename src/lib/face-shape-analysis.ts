"use client";

export type FaceShapeId =
    | "oval"
    | "round"
    | "square"
    | "heart"
    | "oblong"
    | "diamond"
    | "pear";

export type FaceStyleProfile = "balanced" | "asian-soft" | "western-structured";

export interface FacePoint {
    x: number;
    y: number;
}

export interface FaceShapeMetrics {
    faceLengthToWidth: number;
    foreheadToJaw: number;
    cheekboneToJaw: number;
    chinToJaw: number;
    jawAngle: number;
    symmetry: number;
    upperThird: number;
    middleThird: number;
    lowerThird: number;
}

export interface FaceShapeAnalysisResult {
    faceShape: FaceShapeId;
    secondaryShape: FaceShapeId;
    confidence: number;
    profile: FaceStyleProfile;
    measuredAt: string;
    metrics: FaceShapeMetrics;
    scores: Record<FaceShapeId, number>;
    imageDataUrl: string;
    overlay: {
        contour: FacePoint[];
        faceHeight: [FacePoint, FacePoint];
        foreheadWidth: [FacePoint, FacePoint];
        cheekboneWidth: [FacePoint, FacePoint];
        jawWidth: [FacePoint, FacePoint];
        chinWidth: [FacePoint, FacePoint];
        browLine: FacePoint;
        noseBase: FacePoint;
        centerLine?: [FacePoint, FacePoint];
        upperThirdGuide?: [FacePoint, FacePoint] | null;
        middleThirdGuide?: [FacePoint, FacePoint] | null;
        leftEyebrow?: FacePoint[];
        rightEyebrow?: FacePoint[];
        leftEye?: FacePoint[];
        rightEye?: FacePoint[];
        noseBridge?: FacePoint[];
        noseBaseGuide?: FacePoint[];
        mouthOuter?: FacePoint[];
    };
}

type NormalizedLandmark = {
    x: number;
    y: number;
    z?: number;
};

type DetectionCanvasOptions = {
    backgroundColor?: string;
    paddingRatio?: number;
    targetLongestEdge?: number;
};

type DetectionCanvas = {
    canvas: HTMLCanvasElement;
    offsetX: number;
    offsetY: number;
    drawWidth: number;
    drawHeight: number;
};

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

type FaceLandmarkerType = faceLandmarksDetection.FaceLandmarksDetector;

type FaceVerticalBounds = {
    top: FacePoint;
    bottom: FacePoint;
    topShift: number;
    bottomShift: number;
};

const TOP_CONTOUR_SMOOTH_RADIUS = 0.14;
const BOTTOM_CONTOUR_SMOOTH_RADIUS = 0.12;

const FACE_OVAL_INDICES = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
    400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
    54, 103, 67, 109,
];

const LANDMARKS = {
    top: 10,
    chin: 152,
    browCenter: 168,
    noseBase: 2,
    leftForehead: 103,
    rightForehead: 332,
    leftCheek: 234,
    rightCheek: 454,
    leftJaw: 58,
    rightJaw: 288,
    leftChin: 136,
    rightChin: 365,
} as const;

const LEFT_EYEBROW_INDICES = [70, 63, 105, 66, 107];
const RIGHT_EYEBROW_INDICES = [336, 296, 334, 293, 300];
const LEFT_EYE_INDICES = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246];
const RIGHT_EYE_INDICES = [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466];
const NOSE_BRIDGE_INDICES = [168, 6, 197, 195, 5, 4];
const NOSE_BASE_INDICES = [129, 98, 97, 2, 326, 327, 358];
const OUTER_LIP_INDICES = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 409, 270, 269, 267, 0, 37, 39, 40, 185];

let landmarkerPromise: Promise<FaceLandmarkerType> | null = null;
let tfReadyPromise: Promise<void> | null = null;

async function ensureTfReady() {
    if (tfReadyPromise) return tfReadyPromise;
    tfReadyPromise = (async () => {
        await tf.ready();
        if (tf.getBackend() !== "webgl") {
            try {
                await tf.setBackend("webgl");
            } catch (e) {
                console.warn("WebGL backend failed, falling back to default:", e);
            }
        }
    })();
    return tfReadyPromise;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function getPoint(landmarks: NormalizedLandmark[], index: number): FacePoint {
    const point = landmarks[index];
    return { x: point.x, y: point.y };
}

function getPoints(landmarks: NormalizedLandmark[], indices: number[]) {
    return indices.map((index) => getPoint(landmarks, index));
}

function distance(a: FacePoint, b: FacePoint) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function angle(a: FacePoint, b: FacePoint, c: FacePoint) {
    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const mag = Math.hypot(ab.x, ab.y) * Math.hypot(cb.x, cb.y);
    if (!mag) return 130;
    const value = clamp(dot / mag, -1, 1);
    return (Math.acos(value) * 180) / Math.PI;
}

function closeness(value: number, target: number, tolerance: number) {
    return clamp(1 - Math.abs(value - target) / tolerance, 0, 1);
}

function normalizedScore(value: number, start: number, end: number) {
    if (end === start) return 0;
    return clamp((value - start) / (end - start), 0, 1);
}

function resolveFaceVerticalBounds(landmarks: NormalizedLandmark[]): FaceVerticalBounds {
    const meshTop = getPoint(landmarks, 10);
    const meshBottom = getPoint(landmarks, 152);
    const faceHeight = distance(meshTop, meshBottom);

    // index 10 is the top edge of the 478 mesh (forehead center-ish)
    // Professional heuristic: Hairline is typically ~13.5% of face height above the mesh top
    const shiftFactor = 0.135;
    const topY = clamp(meshTop.y - faceHeight * shiftFactor, 0, meshTop.y);
    const bottomY = meshBottom.y;

    return {
        top: { x: meshTop.x, y: topY },
        bottom: { x: meshBottom.x, y: bottomY },
        topShift: meshTop.y - topY,
        bottomShift: 0,
    };
}

function buildAdjustedContour(landmarks: NormalizedLandmark[], bounds: FaceVerticalBounds) {
    const rawTop = getPoint(landmarks, LANDMARKS.top);
    const rawBottom = getPoint(landmarks, LANDMARKS.chin);

    return FACE_OVAL_INDICES.map((index) => {
        const point = getPoint(landmarks, index);
        let dy = 0;

        const distFromTop = distance(point, rawTop);
        if (point.y < (rawTop.y + 0.05) && distFromTop < TOP_CONTOUR_SMOOTH_RADIUS) {
            const weight = Math.pow(clamp(1 - distFromTop / TOP_CONTOUR_SMOOTH_RADIUS, 0, 1), 1.5);
            dy -= bounds.topShift * weight;
        }

        const distFromBottom = distance(point, rawBottom);
        if (point.y > (rawBottom.y - 0.05) && distFromBottom < BOTTOM_CONTOUR_SMOOTH_RADIUS) {
            const weight = Math.pow(clamp(1 - distFromBottom / BOTTOM_CONTOUR_SMOOTH_RADIUS, 0, 1), 1.5);
            dy += bounds.bottomShift * weight;
        }

        return { x: point.x, y: clamp(point.y + dy, 0, 1) };
    });
}

async function getFaceLandmarker(): Promise<FaceLandmarkerType> {
    if (landmarkerPromise) return landmarkerPromise;

    landmarkerPromise = (async () => {
        try {
            await ensureTfReady();
            const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
            const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig = {
                runtime: "tfjs",
                refineLandmarks: true,
                maxFaces: 1,
            };
            return await faceLandmarksDetection.createDetector(model, detectorConfig);
        } catch (err) {
            console.error("Failed to initialize TF.js FaceLandmarker:", err);
            landmarkerPromise = null;
            throw err;
        }
    })();

    return landmarkerPromise;
}

export async function preloadFaceShapeModel() {
    await getFaceLandmarker();
}

async function ensureImageReady(imageElement: HTMLImageElement) {
    if (imageElement.complete && imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0) {
        if (typeof imageElement.decode === "function") {
            try {
                await imageElement.decode();
            } catch {
                // Ignore decode errors
            }
        }
        return;
    }

    await new Promise<void>((resolve, reject) => {
        const handleLoad = async () => {
            imageElement.removeEventListener("load", handleLoad);
            imageElement.removeEventListener("error", handleError);
            if (typeof imageElement.decode === "function") {
                try {
                    await imageElement.decode();
                } catch {
                    // Ignore decode race
                }
            }
            resolve();
        };

        const handleError = () => {
            imageElement.removeEventListener("load", handleLoad);
            imageElement.removeEventListener("error", handleError);
            reject(new Error("Image failed to load."));
        };

        imageElement.addEventListener("load", handleLoad, { once: true });
        imageElement.addEventListener("error", handleError, { once: true });
    });
}

function createInputCanvas(imageElement: HTMLImageElement, options: DetectionCanvasOptions = {}): DetectionCanvas {
    const { backgroundColor, paddingRatio = 0, targetLongestEdge = 960 } = options;
    const sourceWidth = imageElement.naturalWidth;
    const sourceHeight = imageElement.naturalHeight;
    const longestEdge = Math.max(sourceWidth, sourceHeight);
    const scale = longestEdge > 0 ? targetLongestEdge / longestEdge : 1;
    const clampedScale = clamp(scale, 0.75, 1.8);
    const drawWidth = Math.max(1, Math.round(sourceWidth * clampedScale));
    const drawHeight = Math.max(1, Math.round(sourceHeight * clampedScale));
    const offsetX = Math.round(drawWidth * paddingRatio);
    const offsetY = Math.round(drawHeight * paddingRatio);
    const canvas = document.createElement("canvas");
    canvas.width = drawWidth + offsetX * 2;
    canvas.height = drawHeight + offsetY * 2;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas context unavailable.");

    if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.drawImage(imageElement, offsetX, offsetY, drawWidth, drawHeight);
    return { canvas, offsetX, offsetY, drawWidth, drawHeight };
}

function remapLandmarksToImageSpace(landmarks: NormalizedLandmark[], detectionCanvas: DetectionCanvas) {
    const { canvas, offsetX, offsetY, drawWidth, drawHeight } = detectionCanvas;
    return landmarks.map((landmark) => {
        const canvasX = landmark.x * canvas.width;
        const canvasY = landmark.y * canvas.height;
        return {
            x: clamp((canvasX - offsetX) / drawWidth, 0, 1),
            y: clamp((canvasY - offsetY) / drawHeight, 0, 1),
            z: landmark.z,
        };
    });
}

export async function detectLandmarks(imageElement: HTMLImageElement): Promise<NormalizedLandmark[]> {
    await ensureImageReady(imageElement);
    const detector = await getFaceLandmarker();

    // Pass 1: Coarse
    const coarseInputs: DetectionCanvas[] = [
        createInputCanvas(imageElement, { targetLongestEdge: 800 }),
        createInputCanvas(imageElement, { backgroundColor: "#000000" }),
    ];

    let landmarks: NormalizedLandmark[] | null = null;
    for (const input of coarseInputs) {
        try {
            const faces = await detector.estimateFaces(input.canvas, { staticImageMode: true });
            if (faces && faces.length > 0) {
                const rawPoints = faces[0].keypoints.map(kp => ({
                    x: kp.x / input.canvas.width,
                    y: kp.y / input.canvas.height,
                    z: kp.z
                }));
                if (rawPoints.length >= 400) {
                    landmarks = remapLandmarksToImageSpace(rawPoints as NormalizedLandmark[], input);
                    break;
                }
            }
        } catch (e) {
            console.error("Coarse detection failed:", e);
        }
    }

    if (!landmarks) throw new Error("No face detected");

    // Pass 2: Fine
    try {
        let minX = 1, maxX = 0, minY = 1, maxY = 0;
        landmarks.forEach(p => {
            minX = Math.min(minX, Math.max(0, p.x));
            maxX = Math.max(maxX, Math.min(1, p.x));
            minY = Math.min(minY, Math.max(0, p.y));
            maxY = Math.max(maxY, Math.min(1, p.y));
        });

        const w = maxX - minX;
        const h = maxY - minY;
        const cx = minX + w / 2;
        const cy = minY + h / 2;
        const side = Math.max(w, h) * 1.45;

        const cropX = clamp(cx - side / 2, 0, 1);
        const cropY = clamp(cy - side / 2, 0, 1);
        const cropW = clamp(cx + side / 2, 0, 1) - cropX;
        const cropH = clamp(cy + side / 2, 0, 1) - cropY;

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = 640;
        cropCanvas.height = 640;
        const ctx = cropCanvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(
                imageElement,
                cropX * imageElement.naturalWidth,
                cropY * imageElement.naturalHeight,
                cropW * imageElement.naturalWidth,
                cropH * imageElement.naturalHeight,
                0, 0, 640, 640
            );

            const fineFaces = await detector.estimateFaces(cropCanvas, { staticImageMode: true });
            if (fineFaces && fineFaces.length > 0) {
                const finePoints = fineFaces[0].keypoints;
                if (finePoints && finePoints.length >= 400) {
                    return finePoints.map(p => ({
                        x: (p.x / 640) * cropW + cropX,
                        y: (p.y / 640) * cropH + cropY,
                        z: p.z
                    }));
                }
            }
        }
    } catch (e) {
        console.warn("Fine pass failed:", e);
    }

    return landmarks;
}

function buildMetrics(landmarks: NormalizedLandmark[]): FaceShapeMetrics {
    const bounds = resolveFaceVerticalBounds(landmarks);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);
    const chin = getPoint(landmarks, LANDMARKS.chin);

    const faceLength = distance(bounds.top, bounds.bottom);
    const cheekboneWidth = distance(getPoint(landmarks, LANDMARKS.leftCheek), getPoint(landmarks, LANDMARKS.rightCheek));
    // Forehead recovery: +5% to account for hair covering temples
    const foreheadWidth = distance(getPoint(landmarks, LANDMARKS.leftForehead), getPoint(landmarks, LANDMARKS.rightForehead)) * 1.05;
    const jawWidth = distance(getPoint(landmarks, LANDMARKS.leftJaw), getPoint(landmarks, LANDMARKS.rightJaw));
    const chinWidth = distance(getPoint(landmarks, LANDMARKS.leftChin), getPoint(landmarks, LANDMARKS.rightChin));

    const leftJawAngle = angle(getPoint(landmarks, LANDMARKS.leftCheek), getPoint(landmarks, LANDMARKS.leftJaw), chin);
    const rightJawAngle = angle(getPoint(landmarks, LANDMARKS.rightCheek), getPoint(landmarks, LANDMARKS.rightJaw), chin);

    const cheekSymmetry = Math.abs(distance(getPoint(landmarks, LANDMARKS.leftCheek), noseBase) - distance(getPoint(landmarks, LANDMARKS.rightCheek), noseBase));
    const symmetry = clamp(Math.round(100 - (cheekSymmetry * 180)), 72, 99);

    const totalVertical = Math.max(bounds.bottom.y - bounds.top.y, 0.0001);
    const upperThird = ((browCenter.y - bounds.top.y) / totalVertical) * 100;
    const middleThird = ((noseBase.y - browCenter.y) / totalVertical) * 100;
    const lowerThird = ((bounds.bottom.y - noseBase.y) / totalVertical) * 100;

    return {
        faceLengthToWidth: faceLength / cheekboneWidth,
        foreheadToJaw: foreheadWidth / jawWidth,
        cheekboneToJaw: cheekboneWidth / jawWidth,
        chinToJaw: chinWidth / jawWidth,
        jawAngle: (leftJawAngle + rightJawAngle) / 2,
        symmetry,
        upperThird: clamp(upperThird, 28, 42),
        middleThird: clamp(middleThird, 28, 42),
        lowerThird: clamp(lowerThird, 30, 45),
    };
}

function scoreFaceShape(metrics: FaceShapeMetrics): Record<FaceShapeId, number> {
    const length = metrics.faceLengthToWidth;
    const foreheadJaw = metrics.foreheadToJaw;
    const cheekJaw = metrics.cheekboneToJaw;
    const chinJaw = metrics.chinToJaw;
    const angularity = normalizedScore(128 - metrics.jawAngle, 0, 24);
    const softness = 1 - angularity;

    return {
        oval: closeness(length, 1.42, 0.22) * 3.4 + closeness(foreheadJaw, 1.02, 0.18) * 2.1 + softness * 1.5,
        round: closeness(length, 1.16, 0.16) * 3.2 + closeness(cheekJaw, 1.02, 0.12) * 1.5 + softness * 2.4,
        square: closeness(length, 1.22, 0.18) * 2.8 + closeness(foreheadJaw, 1, 0.12) * 2.4 + angularity * 2.7,
        heart: normalizedScore(foreheadJaw, 1.1, 1.24) * 2.8 + normalizedScore(0.78 - chinJaw, 0, 0.18) * 2.4 + softness * 0.9,
        oblong: normalizedScore(length, 1.52, 1.72) * 3.5 + closeness(foreheadJaw, 1, 0.16) * 1.7,
        diamond: normalizedScore(cheekJaw, 1.1, 1.24) * 2.6 + normalizedScore(1.08 - foreheadJaw, 0, 0.18) * 1.8 + normalizedScore(0.76 - chinJaw, 0, 0.18) * 2.2,
        pear: normalizedScore(1.05 - foreheadJaw, 0, 0.2) * 2.8 + closeness(cheekJaw, 0.98, 0.16) * 1.5 + angularity * 0.8,
    };
}

function getHorizontalGuide(contour: FacePoint[], y: number): [FacePoint, FacePoint] | null {
    const intersections: number[] = [];
    for (let i = 0; i < contour.length; i++) {
        const s = contour[i];
        const e = contour[(i + 1) % contour.length];
        if (y >= Math.min(s.y, e.y) && y <= Math.max(s.y, e.y) && s.y !== e.y) {
            intersections.push(s.x + (e.x - s.x) * (y - s.y) / (e.y - s.y));
        }
    }
    if (intersections.length < 2) return null;
    intersections.sort((a, b) => a - b);
    return [{ x: intersections[0], y }, { x: intersections[intersections.length - 1], y }];
}

function buildOverlay(landmarks: NormalizedLandmark[]) {
    const bounds = resolveFaceVerticalBounds(landmarks);
    const contour = buildAdjustedContour(landmarks, bounds);
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);

    return {
        contour,
        faceHeight: [bounds.top, bounds.bottom] as [FacePoint, FacePoint],
        foreheadWidth: [getPoint(landmarks, LANDMARKS.leftForehead), getPoint(landmarks, LANDMARKS.rightForehead)] as [FacePoint, FacePoint],
        cheekboneWidth: [getPoint(landmarks, LANDMARKS.leftCheek), getPoint(landmarks, LANDMARKS.rightCheek)] as [FacePoint, FacePoint],
        jawWidth: [getPoint(landmarks, LANDMARKS.leftJaw), getPoint(landmarks, LANDMARKS.rightJaw)] as [FacePoint, FacePoint],
        chinWidth: [getPoint(landmarks, LANDMARKS.leftChin), getPoint(landmarks, LANDMARKS.rightChin)] as [FacePoint, FacePoint],
        browLine: browCenter,
        noseBase,
        centerLine: [bounds.top, bounds.bottom] as [FacePoint, FacePoint],
        upperThirdGuide: getHorizontalGuide(contour, browCenter.y),
        middleThirdGuide: getHorizontalGuide(contour, noseBase.y),
        leftEyebrow: getPoints(landmarks, LEFT_EYEBROW_INDICES),
        rightEyebrow: getPoints(landmarks, RIGHT_EYEBROW_INDICES),
        leftEye: getPoints(landmarks, LEFT_EYE_INDICES),
        rightEye: getPoints(landmarks, RIGHT_EYE_INDICES),
        noseBridge: getPoints(landmarks, NOSE_BRIDGE_INDICES),
        noseBaseGuide: getPoints(landmarks, NOSE_BASE_INDICES),
        mouthOuter: getPoints(landmarks, OUTER_LIP_INDICES),
    };
}

async function imageElementToDataUrl(img: HTMLImageElement): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.85);
}

function pickTopShapes(scores: Record<FaceShapeId, number>) {
    return (Object.entries(scores) as Array<[FaceShapeId, number]>).sort((a, b) => b[1] - a[1]);
}

export async function getFaceShapeContour(imageElement: HTMLImageElement) {
    const landmarks = await detectLandmarks(imageElement);
    const bounds = resolveFaceVerticalBounds(landmarks);
    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;

    return buildAdjustedContour(landmarks, bounds).map((p) => ({
        x: p.x * width,
        y: p.y * height,
    }));
}

export async function analyzeFaceShapeAI(
    imageElement: HTMLImageElement,
    profile: FaceStyleProfile = "balanced",
    imageDataUrl?: string
): Promise<FaceShapeAnalysisResult> {
    const landmarks = await detectLandmarks(imageElement);
    const metrics = buildMetrics(landmarks);
    const scores = scoreFaceShape(metrics);
    const ranked = pickTopShapes(scores);
    const [primary] = ranked[0];

    return {
        faceShape: primary,
        secondaryShape: ranked[1][0],
        confidence: Math.round(clamp(ranked[0][1] / 6 * 100, 75, 98)),
        profile,
        measuredAt: new Date().toISOString(),
        metrics,
        scores,
        imageDataUrl: imageDataUrl ?? (await imageElementToDataUrl(imageElement)),
        overlay: buildOverlay(landmarks),
    };
}
