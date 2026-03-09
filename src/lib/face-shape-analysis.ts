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

type MediaPipeVisionModule = typeof import("@mediapipe/tasks-vision");
type FaceLandmarkerInstance = Awaited<ReturnType<typeof createFaceLandmarker>>;

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

let visionPromise: Promise<MediaPipeVisionModule> | null = null;
let landmarkerPromise: Promise<FaceLandmarkerInstance> | null = null;

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

async function getVisionModule() {
    if (!visionPromise) {
        visionPromise = import("@mediapipe/tasks-vision");
    }
    return visionPromise;
}

async function createFaceLandmarker() {
    const vision = await getVisionModule();
    const resolver = await vision.FilesetResolver.forVisionTasks("/wasm");

    try {
        return await vision.FaceLandmarker.createFromOptions(resolver, {
            baseOptions: {
                modelAssetPath: "/models/face_landmarker.task",
                delegate: "GPU",
            },
            runningMode: "IMAGE",
            numFaces: 1,
            outputFaceBlendshapes: false,
            outputFacialTransformationMatrixes: false,
        });
    } catch {
        return await vision.FaceLandmarker.createFromOptions(resolver, {
            baseOptions: {
                modelAssetPath: "/models/face_landmarker.task",
                delegate: "CPU",
            },
            runningMode: "IMAGE",
            numFaces: 1,
            outputFaceBlendshapes: false,
            outputFacialTransformationMatrixes: false,
        });
    }
}

async function getFaceLandmarker() {
    if (!landmarkerPromise) {
        landmarkerPromise = createFaceLandmarker().catch((error) => {
            landmarkerPromise = null;
            throw error;
        });
    }
    return landmarkerPromise;
}

async function ensureImageReady(imageElement: HTMLImageElement) {
    if (imageElement.complete && imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0) {
        if (typeof imageElement.decode === "function") {
            try {
                await imageElement.decode();
            } catch {
                // Some browsers throw on already-decoded blob/data images.
            }
        }
        return;
    }

    await new Promise<void>((resolve, reject) => {
        const cleanup = () => {
            imageElement.removeEventListener("load", handleLoad);
            imageElement.removeEventListener("error", handleError);
        };

        const handleLoad = async () => {
            cleanup();
            if (typeof imageElement.decode === "function") {
                try {
                    await imageElement.decode();
                } catch {
                    // Ignore decode race on already-ready images.
                }
            }
            resolve();
        };

        const handleError = () => {
            cleanup();
            reject(new Error("Image failed to load for face analysis."));
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
    if (!context) {
        throw new Error("Canvas context unavailable for face analysis.");
    }

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

function buildMetrics(landmarks: NormalizedLandmark[]): FaceShapeMetrics {
    const top = getPoint(landmarks, LANDMARKS.top);
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);
    const leftForehead = getPoint(landmarks, LANDMARKS.leftForehead);
    const rightForehead = getPoint(landmarks, LANDMARKS.rightForehead);
    const leftCheek = getPoint(landmarks, LANDMARKS.leftCheek);
    const rightCheek = getPoint(landmarks, LANDMARKS.rightCheek);
    const leftJaw = getPoint(landmarks, LANDMARKS.leftJaw);
    const rightJaw = getPoint(landmarks, LANDMARKS.rightJaw);
    const leftChin = getPoint(landmarks, LANDMARKS.leftChin);
    const rightChin = getPoint(landmarks, LANDMARKS.rightChin);

    const faceLength = distance(top, chin);
    const foreheadWidth = distance(leftForehead, rightForehead);
    const cheekboneWidth = distance(leftCheek, rightCheek);
    const jawWidth = distance(leftJaw, rightJaw);
    const chinWidth = distance(leftChin, rightChin);

    const leftJawAngle = angle(leftCheek, leftJaw, chin);
    const rightJawAngle = angle(rightCheek, rightJaw, chin);
    const jawAngle = (leftJawAngle + rightJawAngle) / 2;

    const cheekSymmetry = Math.abs(distance(leftCheek, noseBase) - distance(rightCheek, noseBase));
    const jawSymmetry = Math.abs(distance(leftJaw, noseBase) - distance(rightJaw, noseBase));
    const symmetryPenalty = ((cheekSymmetry + jawSymmetry) / 2) * 180;
    const symmetry = clamp(Math.round(100 - symmetryPenalty), 72, 99);

    const totalVertical = Math.max(chin.y - top.y, 0.0001);
    const upperThird = ((browCenter.y - top.y) / totalVertical) * 100;
    const middleThird = ((noseBase.y - browCenter.y) / totalVertical) * 100;
    const lowerThird = ((chin.y - noseBase.y) / totalVertical) * 100;

    return {
        faceLengthToWidth: faceLength / cheekboneWidth,
        foreheadToJaw: foreheadWidth / jawWidth,
        cheekboneToJaw: cheekboneWidth / jawWidth,
        chinToJaw: chinWidth / jawWidth,
        jawAngle,
        symmetry,
        upperThird: clamp(upperThird, 20, 45),
        middleThird: clamp(middleThird, 20, 45),
        lowerThird: clamp(lowerThird, 20, 50),
    };
}

function scoreFaceShape(metrics: FaceShapeMetrics): Record<FaceShapeId, number> {
    const length = metrics.faceLengthToWidth;
    const foreheadJaw = metrics.foreheadToJaw;
    const cheekJaw = metrics.cheekboneToJaw;
    const chinJaw = metrics.chinToJaw;
    const angularity = normalizedScore(128 - metrics.jawAngle, 0, 24);
    const softness = 1 - angularity;
    const longLowerThird = normalizedScore(metrics.lowerThird, 34, 43);
    const balancedThirds =
        1 -
        clamp(
            (Math.abs(metrics.upperThird - 33.3) +
                Math.abs(metrics.middleThird - 33.3) +
                Math.abs(metrics.lowerThird - 33.3)) /
                28,
            0,
            1
        );

    return {
        oval:
            closeness(length, 1.42, 0.22) * 3.2 +
            closeness(foreheadJaw, 1.02, 0.18) * 2.1 +
            closeness(cheekJaw, 1.08, 0.18) * 1.6 +
            softness * 1.5 +
            balancedThirds * 1.4,
        round:
            closeness(length, 1.16, 0.16) * 3.2 +
            closeness(foreheadJaw, 1, 0.14) * 1.8 +
            closeness(cheekJaw, 1.02, 0.12) * 1.5 +
            softness * 2.4 +
            closeness(chinJaw, 0.82, 0.16) * 1.1,
        square:
            closeness(length, 1.22, 0.18) * 2.8 +
            closeness(foreheadJaw, 1, 0.12) * 2.4 +
            closeness(cheekJaw, 1.03, 0.12) * 1.3 +
            angularity * 2.7 +
            closeness(chinJaw, 0.84, 0.16) * 0.8,
        heart:
            closeness(length, 1.33, 0.22) * 1.5 +
            normalizedScore(foreheadJaw, 1.08, 1.24) * 2.8 +
            normalizedScore(0.78 - chinJaw, 0, 0.18) * 2.4 +
            closeness(cheekJaw, 1.06, 0.16) * 1.1 +
            softness * 0.9,
        oblong:
            normalizedScore(length, 1.48, 1.72) * 3.5 +
            closeness(foreheadJaw, 1, 0.16) * 1.7 +
            closeness(cheekJaw, 1, 0.16) * 1.4 +
            longLowerThird * 1.3 +
            balancedThirds * 0.8,
        diamond:
            closeness(length, 1.42, 0.24) * 1.5 +
            normalizedScore(cheekJaw, 1.1, 1.24) * 2.6 +
            normalizedScore(1.08 - foreheadJaw, 0, 0.18) * 1.8 +
            normalizedScore(0.76 - chinJaw, 0, 0.18) * 2.2 +
            softness * 0.8,
        pear:
            closeness(length, 1.24, 0.2) * 1.3 +
            normalizedScore(1.02 - foreheadJaw, 0, 0.18) * 3.2 +
            closeness(cheekJaw, 0.98, 0.16) * 1.5 +
            angularity * 0.8 +
            closeness(chinJaw, 0.9, 0.2) * 0.8,
    };
}

function pickTopShapes(scores: Record<FaceShapeId, number>) {
    const sorted = (Object.entries(scores) as Array<[FaceShapeId, number]>).sort((a, b) => b[1] - a[1]);
    return sorted;
}

function getHorizontalGuide(contour: FacePoint[], y: number): [FacePoint, FacePoint] | null {
    const intersections: number[] = [];

    for (let index = 0; index < contour.length; index += 1) {
        const start = contour[index];
        const end = contour[(index + 1) % contour.length];
        const minY = Math.min(start.y, end.y);
        const maxY = Math.max(start.y, end.y);

        if (y < minY || y > maxY) {
            continue;
        }

        if (start.y === end.y) {
            intersections.push(start.x, end.x);
            continue;
        }

        const progress = (y - start.y) / (end.y - start.y);
        if (progress < 0 || progress > 1) {
            continue;
        }

        intersections.push(start.x + (end.x - start.x) * progress);
    }

    if (intersections.length < 2) {
        return null;
    }

    intersections.sort((a, b) => a - b);
    return [
        { x: intersections[0], y },
        { x: intersections[intersections.length - 1], y },
    ];
}

function buildOverlay(landmarks: NormalizedLandmark[]) {
    const contour = FACE_OVAL_INDICES.map((index) => getPoint(landmarks, index));
    const top = getPoint(landmarks, LANDMARKS.top);
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);

    return {
        contour,
        faceHeight: [top, chin] as [FacePoint, FacePoint],
        foreheadWidth: [
            getPoint(landmarks, LANDMARKS.leftForehead),
            getPoint(landmarks, LANDMARKS.rightForehead),
        ] as [FacePoint, FacePoint],
        cheekboneWidth: [
            getPoint(landmarks, LANDMARKS.leftCheek),
            getPoint(landmarks, LANDMARKS.rightCheek),
        ] as [FacePoint, FacePoint],
        jawWidth: [getPoint(landmarks, LANDMARKS.leftJaw), getPoint(landmarks, LANDMARKS.rightJaw)] as [FacePoint, FacePoint],
        chinWidth: [
            getPoint(landmarks, LANDMARKS.leftChin),
            getPoint(landmarks, LANDMARKS.rightChin),
        ] as [FacePoint, FacePoint],
        browLine: browCenter,
        noseBase,
        centerLine: [top, chin] as [FacePoint, FacePoint],
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

async function detectLandmarks(imageElement: HTMLImageElement) {
    await ensureImageReady(imageElement);
    const landmarker = await getFaceLandmarker();
    const detectionInputs: DetectionCanvas[] = [
        createInputCanvas(imageElement),
        createInputCanvas(imageElement, { backgroundColor: "#000000" }),
        createInputCanvas(imageElement, { backgroundColor: "#111111", paddingRatio: 0.12 }),
        createInputCanvas(imageElement, { backgroundColor: "#ffffff", paddingRatio: 0.18 }),
    ];

    for (const detectionInput of detectionInputs) {
        try {
            const result = landmarker.detect(detectionInput.canvas);
            const landmarks = result.faceLandmarks?.[0];
            if (landmarks && landmarks.length >= 400) {
                return remapLandmarksToImageSpace(landmarks as NormalizedLandmark[], detectionInput);
            }
        } catch {
            // Try the next canvas variant.
        }
    }

    throw new Error("No face detected");
}

export async function preloadFaceShapeModel() {
    await getFaceLandmarker();
}

export async function getFaceShapeContour(imageElement: HTMLImageElement) {
    const landmarks = await detectLandmarks(imageElement);
    return FACE_OVAL_INDICES.map((index) => getPoint(landmarks, index));
}

export async function imageElementToDataUrl(imageElement: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    const maxWidth = 1400;
    const ratio = imageElement.naturalWidth > maxWidth ? maxWidth / imageElement.naturalWidth : 1;
    canvas.width = Math.round(imageElement.naturalWidth * ratio);
    canvas.height = Math.round(imageElement.naturalHeight * ratio);

    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error("Canvas not supported");
    }

    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.92);
}

export async function analyzeFaceShapeAI(
    imageElement: HTMLImageElement,
    profile: FaceStyleProfile = "balanced",
    imageDataUrl?: string
): Promise<FaceShapeAnalysisResult> {
    const landmarks = await detectLandmarks(imageElement);
    const metrics = buildMetrics(landmarks);
    const scores = scoreFaceShape(metrics);
    const rankedShapes = pickTopShapes(scores);
    const [primaryShape, topScore] = rankedShapes[0];
    const [secondaryShape, secondaryScore] = rankedShapes[1];
    const margin = topScore - secondaryScore;
    const confidence = clamp(
        Math.round(64 + normalizedScore(margin, 0.05, 1.2) * 20 + normalizedScore(topScore, 2.2, 7.8) * 10),
        62,
        96
    );

    return {
        faceShape: primaryShape,
        secondaryShape,
        confidence,
        profile,
        measuredAt: new Date().toISOString(),
        metrics,
        scores,
        imageDataUrl: imageDataUrl ?? (await imageElementToDataUrl(imageElement)),
        overlay: buildOverlay(landmarks),
    };
}
