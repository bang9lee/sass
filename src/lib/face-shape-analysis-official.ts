"use client";

import {
    FaceLandmarker,
    FilesetResolver,
    ImageSegmenter,
    type ImageSegmenterResult,
    type NormalizedLandmark as MPNormalizedLandmark,
} from "@mediapipe/tasks-vision";

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

export interface FaceShapeEditorDraft {
    handles: FacePoint[];
    contour: FacePoint[];
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

export type FaceShapeQualityFlag =
    | "ambiguous_shape"
    | "low_pose"
    | "low_sharpness"
    | "low_lighting"
    | "low_coverage"
    | "low_frame_alignment"
    | "low_hairline";

export interface FaceShapeQuality {
    classification: number;
    measurement: number;
    image: number;
    frame: number;
    margin: number;
    pose: number;
    sharpness: number;
    lighting: number;
    coverage: number;
    flags: FaceShapeQualityFlag[];
}

export interface FaceShapePreviewGate {
    canAnalyze: boolean;
    severity: "ok" | "warn" | "block";
    reasons: FaceShapeQualityFlag[];
}

export interface FaceShapePreviewResult {
    faceShape: FaceShapeId;
    secondaryShape: FaceShapeId;
    confidence: number;
    quality: FaceShapeQuality;
    gate: FaceShapePreviewGate;
}

export interface FaceShapeAnalysisResult {
    faceShape: FaceShapeId;
    secondaryShape: FaceShapeId;
    confidence: number;
    profile: FaceStyleProfile;
    measuredAt: string;
    metrics: FaceShapeMetrics;
    quality: FaceShapeQuality;
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
        hairlineContour?: FacePoint[];
        hairlineReliability?: number;
        hairlineMethod?: string;
        frameSource?: "auto" | "manual";
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

type DetectableSource = HTMLImageElement | HTMLCanvasElement;

type FaceVerticalBounds = {
    top: FacePoint;
    bottom: FacePoint;
};

type HairlineRefinement = {
    points: FacePoint[];
    top: FacePoint;
    reliability?: number;
    method: "segmenter" | "hybrid" | "fallback" | "manual";
    foregroundGuide: [FacePoint, FacePoint] | null;
};

type ManualFrameOverride = {
    handles: FacePoint[];
    contour: FacePoint[];
};

type FaceGeometry = {
    bounds: FaceVerticalBounds;
    contour: FacePoint[];
    topContour: FacePoint[];
    foreheadGuide: [FacePoint, FacePoint];
    cheekGuide: [FacePoint, FacePoint];
    jawGuide: [FacePoint, FacePoint];
    chinGuide: [FacePoint, FacePoint];
    hairline: HairlineRefinement;
    frameSource: "auto" | "manual";
    editorHandles?: FacePoint[];
};

type FaceImageQualitySignals = {
    pose: number;
    sharpness: number;
    lighting: number;
    coverage: number;
    overall: number;
};

type FaceFrameQualitySignals = {
    frame: number;
    hairline: number;
};

type PreparedFaceShapeContext = {
    landmarks: NormalizedLandmark[];
    hairline: HairlineRefinement;
    qualityImageData: ImageData;
};

type HairMaskData = {
    width: number;
    height: number;
    data: Float32Array;
    labels: string[];
};

const FACE_OVAL_INDICES = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
    400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
    54, 103, 67, 109,
];

const RIGHT_FACE_SIDE_INDICES = [284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152];
const LEFT_FACE_SIDE_INDICES = [148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54];

const LANDMARKS = {
    top: 10,
    chin: 152,
    browCenter: 168,
    noseBase: 2,
    leftForehead: 103,
    rightForehead: 332,
    leftForeheadWide: 67,
    rightForeheadWide: 297,
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

const DEFAULT_HAIRLINE_SHIFT = 0.11;
const HAIR_SCAN_SAMPLES = 19;
const HAIR_THRESHOLD = 0.34;
const EDGE_THRESHOLD = 16;
const EDITOR_CURVE_SAMPLES = 10;
const QUALITY_IMAGE_LONGEST_EDGE = 320;

const SHAPE_SCORE_MAX: Record<FaceShapeId, number> = {
    oval: 7,
    round: 7.1,
    square: 7.9,
    heart: 6.1,
    oblong: 8.2,
    diamond: 6.6,
    pear: 5.1,
};

let filesetPromise: Promise<Awaited<ReturnType<typeof FilesetResolver.forVisionTasks>>> | null = null;
let faceLandmarkerPromise: Promise<FaceLandmarker> | null = null;
let hairSegmenterPromise: Promise<ImageSegmenter | null> | null = null;
const preparedContextCache = new WeakMap<HTMLImageElement, Promise<PreparedFaceShapeContext>>();
let mediaPipeConsolePatchDepth = 0;
let originalConsoleError: typeof console.error | null = null;
let originalConsoleWarn: typeof console.warn | null = null;

const SUPPRESSED_MEDIAPIPE_PATTERNS = [
    /Created TensorFlow Lite XNNPACK delegate for CPU/i,
    /inference_feedback_manager\.cc:121/i,
    /OpenGL error checking is disabled/i,
    /FaceBlendshapesGraph acceleration to xnnpack/i,
] as const;

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function average(values: number[]) {
    return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function standardDeviation(values: number[]) {
    if (!values.length) return 0;
    const mean = average(values);
    return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
}

function getPoint(landmarks: NormalizedLandmark[], index: number): FacePoint {
    const point = landmarks[index];
    return { x: point.x, y: point.y };
}

function getPoints(landmarks: NormalizedLandmark[], indices: number[]) {
    return indices.map((index) => getPoint(landmarks, index));
}

function getCenter(points: FacePoint[]) {
    return {
        x: average(points.map((point) => point.x)),
        y: average(points.map((point) => point.y)),
    };
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

function lineAngleDegrees(a: FacePoint, b: FacePoint) {
    return Math.abs((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
}

function closeness(value: number, target: number, tolerance: number) {
    return clamp(1 - Math.abs(value - target) / tolerance, 0, 1);
}

function normalizedScore(value: number, start: number, end: number) {
    if (end === start) return 0;
    return clamp((value - start) / (end - start), 0, 1);
}

function getLuma(r: number, g: number, b: number) {
    return r * 0.299 + g * 0.587 + b * 0.114;
}

function pointInPolygon(point: FacePoint, polygon: FacePoint[]) {
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
        const current = polygon[index];
        const last = polygon[previous];
        const intersects =
            current.y > point.y !== last.y > point.y &&
            point.x < ((last.x - current.x) * (point.y - current.y)) / (last.y - current.y + Number.EPSILON) + current.x;
        if (intersects) inside = !inside;
    }
    return inside;
}

function clampPoint(point: FacePoint): FacePoint {
    return {
        x: clamp(point.x, 0, 1),
        y: clamp(point.y, 0, 1),
    };
}

function getPointAtProgress(points: FacePoint[], progress: number): FacePoint {
    if (!points.length) {
        return { x: 0.5, y: 0.5 };
    }

    const index = Math.round(clamp(progress, 0, 1) * (points.length - 1));
    return points[index];
}

function getContourExtents(points: FacePoint[]) {
    return points.reduce(
        (extents, point) => ({
            minX: Math.min(extents.minX, point.x),
            maxX: Math.max(extents.maxX, point.x),
            minY: Math.min(extents.minY, point.y),
            maxY: Math.max(extents.maxY, point.y),
        }),
        { minX: 1, maxX: 0, minY: 1, maxY: 0 }
    );
}

function catmullRomPoint(p0: FacePoint, p1: FacePoint, p2: FacePoint, p3: FacePoint, t: number) {
    const t2 = t * t;
    const t3 = t2 * t;
    return clampPoint({
        x:
            0.5 *
            ((2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
            0.5 *
            ((2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
    });
}

function buildOpenCurveFromPoints(points: FacePoint[], samplesPerSegment = EDITOR_CURVE_SAMPLES) {
    if (points.length <= 2) return points.map((point) => clampPoint(point));

    const curve: FacePoint[] = [];
    for (let index = 0; index < points.length - 1; index += 1) {
        const p0 = points[Math.max(0, index - 1)];
        const p1 = points[index];
        const p2 = points[index + 1];
        const p3 = points[Math.min(points.length - 1, index + 2)];
        for (let step = 0; step < samplesPerSegment; step += 1) {
            curve.push(catmullRomPoint(p0, p1, p2, p3, step / samplesPerSegment));
        }
    }
    curve.push(clampPoint(points[points.length - 1]));
    return curve;
}

export function buildFaceShapeEditorContour(handles: FacePoint[], samplesPerSegment = EDITOR_CURVE_SAMPLES) {
    if (handles.length < 3) return handles.map((point) => clampPoint(point));

    const contour: FacePoint[] = [];
    for (let index = 0; index < handles.length; index += 1) {
        const p0 = handles[(index - 1 + handles.length) % handles.length];
        const p1 = handles[index];
        const p2 = handles[(index + 1) % handles.length];
        const p3 = handles[(index + 2) % handles.length];
        for (let step = 0; step < samplesPerSegment; step += 1) {
            contour.push(catmullRomPoint(p0, p1, p2, p3, step / samplesPerSegment));
        }
    }
    return contour;
}

function buildManualHairlineFromHandles(handles: FacePoint[]): HairlineRefinement {
    const topHandles = handles.slice(0, 5).map((point) => clampPoint(point));
    const centerHandle = topHandles[Math.floor(topHandles.length / 2)] ?? topHandles[0] ?? { x: 0.5, y: 0.2 };
    return {
        points: buildOpenCurveFromPoints(topHandles, 12),
        top: centerHandle,
        reliability: undefined,
        method: "manual",
        foregroundGuide: topHandles.length >= 2 ? [topHandles[0], topHandles[topHandles.length - 1]] : null,
    };
}

function buildFaceShapeEditorHandles(geometry: FaceGeometry) {
    const topLeft = getPointAtProgress(geometry.topContour, 0);
    const topUpperLeft = getPointAtProgress(geometry.topContour, 0.25);
    const topCenter = geometry.bounds.top;
    const topUpperRight = getPointAtProgress(geometry.topContour, 0.75);
    const topRight = getPointAtProgress(geometry.topContour, 1);
    const cheekY = average([geometry.cheekGuide[0].y, geometry.cheekGuide[1].y]);
    const templeGuide = getHorizontalGuide(
        geometry.contour,
        clamp(average([topUpperRight.y, cheekY]), geometry.bounds.top.y + 0.02, cheekY - 0.01)
    );
    const extents = getContourExtents(geometry.contour);
    const width = extents.maxX - extents.minX;
    const height = geometry.bounds.bottom.y - geometry.bounds.top.y;

    return [
        { x: topLeft.x - width * 0.03, y: topLeft.y - height * 0.025 },
        { x: topUpperLeft.x - width * 0.02, y: topUpperLeft.y - height * 0.05 },
        { x: topCenter.x, y: topCenter.y - height * 0.07 },
        { x: topUpperRight.x + width * 0.02, y: topUpperRight.y - height * 0.05 },
        { x: topRight.x + width * 0.03, y: topRight.y - height * 0.025 },
        {
            x: (templeGuide?.[1].x ?? geometry.cheekGuide[1].x) + width * 0.035,
            y: templeGuide?.[1].y ?? cheekY - height * 0.08,
        },
        { x: geometry.cheekGuide[1].x + width * 0.03, y: geometry.cheekGuide[1].y },
        { x: geometry.jawGuide[1].x + width * 0.025, y: geometry.jawGuide[1].y + height * 0.02 },
        { x: geometry.bounds.bottom.x, y: geometry.bounds.bottom.y + height * 0.045 },
        { x: geometry.jawGuide[0].x - width * 0.025, y: geometry.jawGuide[0].y + height * 0.02 },
        { x: geometry.cheekGuide[0].x - width * 0.03, y: geometry.cheekGuide[0].y },
        {
            x: (templeGuide?.[0].x ?? geometry.cheekGuide[0].x) - width * 0.035,
            y: templeGuide?.[0].y ?? cheekY - height * 0.08,
        },
    ].map((point) => clampPoint(point));
}

function shouldSuppressMediaPipeLog(args: unknown[]) {
    return args.some((arg) =>
        typeof arg === "string" && SUPPRESSED_MEDIAPIPE_PATTERNS.some((pattern) => pattern.test(arg))
    );
}

function patchMediaPipeConsole() {
    if (mediaPipeConsolePatchDepth === 0) {
        originalConsoleError = console.error.bind(console);
        originalConsoleWarn = console.warn.bind(console);

        console.error = (...args: unknown[]) => {
            if (shouldSuppressMediaPipeLog(args)) return;
            originalConsoleError?.(...args);
        };

        console.warn = (...args: unknown[]) => {
            if (shouldSuppressMediaPipeLog(args)) return;
            originalConsoleWarn?.(...args);
        };
    }

    mediaPipeConsolePatchDepth += 1;
}

function restoreMediaPipeConsole() {
    mediaPipeConsolePatchDepth = Math.max(0, mediaPipeConsolePatchDepth - 1);
    if (mediaPipeConsolePatchDepth > 0) return;

    if (originalConsoleError) {
        console.error = originalConsoleError;
        originalConsoleError = null;
    }

    if (originalConsoleWarn) {
        console.warn = originalConsoleWarn;
        originalConsoleWarn = null;
    }
}

async function withSuppressedMediaPipeLogsAsync<T>(run: () => Promise<T>) {
    patchMediaPipeConsole();
    try {
        return await run();
    } finally {
        restoreMediaPipeConsole();
    }
}

function withSuppressedMediaPipeLogs<T>(run: () => T) {
    patchMediaPipeConsole();
    try {
        return run();
    } finally {
        restoreMediaPipeConsole();
    }
}

async function ensureImageReady(imageElement: HTMLImageElement) {
    if (imageElement.complete && imageElement.naturalWidth > 0 && imageElement.naturalHeight > 0) {
        if (typeof imageElement.decode === "function") {
            try {
                await imageElement.decode();
            } catch {
                // Ignore decode race.
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
                    // Ignore decode race.
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

async function getVisionFileset() {
    if (!filesetPromise) {
        filesetPromise = withSuppressedMediaPipeLogsAsync(() => FilesetResolver.forVisionTasks("/wasm"));
    }
    return filesetPromise;
}

async function getFaceLandmarker() {
    if (faceLandmarkerPromise) return faceLandmarkerPromise;

    faceLandmarkerPromise = (async () => {
        const fileset = await getVisionFileset();
        return withSuppressedMediaPipeLogsAsync(() =>
            FaceLandmarker.createFromOptions(fileset, {
                baseOptions: {
                    modelAssetPath: "/models/face_landmarker.task",
                    delegate: "CPU",
                },
                runningMode: "IMAGE",
                numFaces: 1,
                minFaceDetectionConfidence: 0.35,
                minFacePresenceConfidence: 0.35,
                minTrackingConfidence: 0.35,
                outputFaceBlendshapes: false,
                outputFacialTransformationMatrixes: false,
            })
        );
    })().catch((error) => {
        faceLandmarkerPromise = null;
        throw error;
    });

    return faceLandmarkerPromise;
}

async function getHairSegmenter() {
    if (hairSegmenterPromise) return hairSegmenterPromise;

    hairSegmenterPromise = (async () => {
        try {
            const fileset = await getVisionFileset();
            return await withSuppressedMediaPipeLogsAsync(() =>
                ImageSegmenter.createFromOptions(fileset, {
                    baseOptions: {
                        modelAssetPath: "/models/hair_segmenter.tflite",
                        delegate: "CPU",
                    },
                    runningMode: "IMAGE",
                    outputConfidenceMasks: true,
                    outputCategoryMask: false,
                })
            );
        } catch (error) {
            console.warn("Hair segmenter unavailable, falling back to landmark-only hairline.", error);
            return null;
        }
    })();

    return hairSegmenterPromise;
}

export async function preloadFaceShapeModel() {
    await Promise.all([getFaceLandmarker(), getHairSegmenter()]);
}

function normalizeLandmarks(landmarks: MPNormalizedLandmark[]) {
    return landmarks.map((point) => ({
        x: point.x,
        y: point.y,
        z: point.z,
    }));
}

function detectFaceOnSource(
    landmarker: FaceLandmarker,
    source: DetectableSource,
    label: string
) {
    try {
        return withSuppressedMediaPipeLogs(() => landmarker.detect(source).faceLandmarks[0] ?? null);
    } catch (error) {
        console.warn(`FaceLandmarker detect failed on ${label}.`, error);
        return null;
    }
}

export async function detectLandmarks(imageElement: HTMLImageElement): Promise<NormalizedLandmark[]> {
    await ensureImageReady(imageElement);
    const landmarker = await getFaceLandmarker();

    const coarseInputs: DetectionCanvas[] = [
        createInputCanvas(imageElement, { targetLongestEdge: 960 }),
        createInputCanvas(imageElement, { backgroundColor: "#000000" }),
    ];

    let landmarks: NormalizedLandmark[] | null = null;
    const directFace = detectFaceOnSource(landmarker, imageElement, "image");
    if (directFace && directFace.length >= 400) {
        landmarks = normalizeLandmarks(directFace);
    }

    for (const [index, input] of coarseInputs.entries()) {
        if (landmarks) break;
        const face = detectFaceOnSource(landmarker, input.canvas, `canvas-${index + 1}`);
        if (face && face.length >= 400) {
            landmarks = remapLandmarksToImageSpace(normalizeLandmarks(face), input);
            break;
        }
    }

    if (!landmarks) throw new Error("No face detected.");

    let minX = 1;
    let maxX = 0;
    let minY = 1;
    let maxY = 0;
    for (const point of landmarks) {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    }

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = minX + width / 2;
    const centerY = minY + height / 2;
    const side = Math.max(width, height) * 1.45;
    const cropX = clamp(centerX - side / 2, 0, 1);
    const cropY = clamp(centerY - side / 2, 0, 1);
    const cropW = clamp(centerX + side / 2, 0, 1) - cropX;
    const cropH = clamp(centerY + side / 2, 0, 1) - cropY;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = 640;
    cropCanvas.height = 640;
    const context = cropCanvas.getContext("2d");
    if (!context) return landmarks;

    context.drawImage(
        imageElement,
        cropX * imageElement.naturalWidth,
        cropY * imageElement.naturalHeight,
        cropW * imageElement.naturalWidth,
        cropH * imageElement.naturalHeight,
        0,
        0,
        640,
        640
    );

    const fineFace = detectFaceOnSource(landmarker, cropCanvas, "fine-crop");
    if (!fineFace || fineFace.length < 400) return landmarks;

    return normalizeLandmarks(fineFace).map((point) => ({
        x: point.x * cropW + cropX,
        y: point.y * cropH + cropY,
        z: point.z,
    }));
}

function createImageDataCanvas(imageElement: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = imageElement.naturalWidth;
    canvas.height = imageElement.naturalHeight;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas context unavailable.");
    context.drawImage(imageElement, 0, 0);
    return { canvas, context, imageData: context.getImageData(0, 0, canvas.width, canvas.height) };
}

function detectHairIndex(labels: string[], maskCount: number) {
    const labelIndex = labels.findIndex((label) => /hair/i.test(label));
    if (labelIndex >= 0 && labelIndex < maskCount) return labelIndex;
    if (maskCount === 1) return 0;
    return Math.max(0, maskCount - 1);
}

function extractHairMask(result: ImageSegmenterResult, labels: string[]): HairMaskData | null {
    if (result.confidenceMasks && result.confidenceMasks.length > 0) {
        const index = detectHairIndex(labels, result.confidenceMasks.length);
        const mask = result.confidenceMasks[index];
        return {
            width: mask.width,
            height: mask.height,
            data: Float32Array.from(mask.getAsFloat32Array()),
            labels,
        };
    }

    if (result.categoryMask) {
        const mask = result.categoryMask;
        const categoryMask = mask.getAsUint8Array();
        const hairIndex = detectHairIndex(labels, Math.max(labels.length, 2));
        const data = new Float32Array(categoryMask.length);
        for (let index = 0; index < categoryMask.length; index += 1) {
            data[index] = categoryMask[index] === hairIndex ? 1 : 0;
        }
        return {
            width: mask.width,
            height: mask.height,
            data,
            labels,
        };
    }

    return null;
}

async function getHairMask(imageElement: HTMLImageElement) {
    const segmenter = await getHairSegmenter();
    if (!segmenter) return null;

    const result = withSuppressedMediaPipeLogs(() => segmenter.segment(imageElement));
    try {
        return extractHairMask(result, segmenter.getLabels());
    } finally {
        result.close();
    }
}

function sampleMaskNeighborhood(mask: HairMaskData, x: number, y: number, radiusX = 1, radiusY = 1) {
    const centerX = clamp(Math.round(x * (mask.width - 1)), 0, mask.width - 1);
    const centerY = clamp(Math.round(y * (mask.height - 1)), 0, mask.height - 1);
    const values: number[] = [];

    for (let dy = -radiusY; dy <= radiusY; dy += 1) {
        for (let dx = -radiusX; dx <= radiusX; dx += 1) {
            const px = clamp(centerX + dx, 0, mask.width - 1);
            const py = clamp(centerY + dy, 0, mask.height - 1);
            values.push(mask.data[py * mask.width + px]);
        }
    }

    return average(values);
}

function detectHairlineByEdge(
    imageData: ImageData,
    x: number,
    searchTop: number,
    foreheadStart: number
) {
    const width = imageData.width;
    const height = imageData.height;
    const px = clamp(Math.round(x * (width - 1)), 2, width - 3);
    const startY = clamp(Math.round(foreheadStart * (height - 1)), 6, height - 1);
    const topY = clamp(Math.round(searchTop * (height - 1)), 0, startY - 1);

    const readLuma = (py: number) => {
        const values: number[] = [];
        for (let dx = -1; dx <= 1; dx += 1) {
            const offset = (py * width + (px + dx)) * 4;
            values.push(getLuma(
                imageData.data[offset],
                imageData.data[offset + 1],
                imageData.data[offset + 2]
            ));
        }
        return average(values);
    };

    for (let py = startY; py >= topY + 6; py -= 1) {
        const hairAbove = average([readLuma(py - 6), readLuma(py - 4), readLuma(py - 2)]);
        const skinBelow = average([readLuma(py + 1), readLuma(py + 3), readLuma(py + 5)]);
        if (skinBelow - hairAbove >= EDGE_THRESHOLD) {
            return py / (height - 1);
        }
    }

    return null;
}

function fallbackHairline(meshTop: FacePoint, chin: FacePoint) {
    const faceHeight = distance(meshTop, chin);
    return {
        x: meshTop.x,
        y: clamp(meshTop.y - faceHeight * DEFAULT_HAIRLINE_SHIFT, 0, meshTop.y),
    };
}

function smoothHairlinePoints(points: FacePoint[]) {
    return points.map((point, index) => {
        const previous = points[Math.max(0, index - 1)];
        const next = points[Math.min(points.length - 1, index + 1)];
        return {
            x: point.x,
            y: average([previous.y, point.y, next.y]),
        };
    });
}

async function resolveHairline(imageElement: HTMLImageElement, landmarks: NormalizedLandmark[]): Promise<HairlineRefinement> {
    const meshTop = getPoint(landmarks, LANDMARKS.top);
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const faceHeight = distance(meshTop, chin);

    const xMin = clamp(Math.min(
        getPoint(landmarks, LANDMARKS.leftForehead).x,
        getPoint(landmarks, LANDMARKS.leftForeheadWide).x
    ), 0, 1);
    const xMax = clamp(Math.max(
        getPoint(landmarks, LANDMARKS.rightForehead).x,
        getPoint(landmarks, LANDMARKS.rightForeheadWide).x
    ), 0, 1);

    const searchTop = clamp(meshTop.y - faceHeight * 0.24, 0, meshTop.y);
    const foreheadStart = clamp(
        Math.min(browCenter.y - faceHeight * 0.08, meshTop.y + faceHeight * 0.05),
        searchTop + 0.02,
        browCenter.y - 0.01
    );

    const hairMask = await getHairMask(imageElement);
    const { imageData } = createImageDataCanvas(imageElement);

    const hits: Array<FacePoint & { confidence: number; source: "segmenter" | "edge" }> = [];
    const xValues = Array.from({ length: HAIR_SCAN_SAMPLES }, (_, index) => {
        const progress = index / (HAIR_SCAN_SAMPLES - 1);
        return xMin + (xMax - xMin) * progress;
    });

    for (const x of xValues) {
        let point: FacePoint | null = null;
        let confidence = 0;
        let source: "segmenter" | "edge" = "edge";

        if (hairMask) {
            const steps = Math.max(20, Math.round((foreheadStart - searchTop) * hairMask.height));
            for (let step = 0; step <= steps; step += 1) {
                const progress = step / steps;
                const y = foreheadStart - (foreheadStart - searchTop) * progress;
                const current = sampleMaskNeighborhood(hairMask, x, y, 1, 1);
                const above = sampleMaskNeighborhood(hairMask, x, clamp(y - 0.01, 0, 1), 1, 1);
                const below = sampleMaskNeighborhood(hairMask, x, clamp(y + 0.01, 0, 1), 1, 1);
                if (current >= HAIR_THRESHOLD && above >= HAIR_THRESHOLD && below <= HAIR_THRESHOLD * 0.85) {
                    point = { x, y };
                    confidence = current;
                    source = "segmenter";
                    break;
                }
            }
        }

        if (!point) {
            const edgeY = detectHairlineByEdge(imageData, x, searchTop, foreheadStart);
            if (edgeY !== null) {
                point = { x, y: edgeY };
                confidence = 0.22;
                source = "edge";
            }
        }

        if (point) {
            hits.push({ ...point, confidence, source });
        }
    }

    if (hits.length < Math.ceil(HAIR_SCAN_SAMPLES * 0.45)) {
        const top = fallbackHairline(meshTop, chin);
        const span = xMax - xMin;
        const points = Array.from({ length: HAIR_SCAN_SAMPLES }, (_, index) => ({
            x: xMin + (span * index) / (HAIR_SCAN_SAMPLES - 1),
            y: clamp(top.y + Math.abs(index - (HAIR_SCAN_SAMPLES - 1) / 2) * 0.0015, 0, 1),
        }));
        return {
            points,
            top,
            reliability: 28,
            method: "fallback",
            foregroundGuide: null,
        };
    }

    const hitMap = new Map(hits.map((hit) => [Number(hit.x.toFixed(6)), hit]));
    const interpolated = xValues.map((x, index) => {
        const key = Number(x.toFixed(6));
        const directHit = hitMap.get(key);
        if (directHit) return { x, y: directHit.y };

        const previous = [...hits].reverse().find((hit) => hit.x < x);
        const next = hits.find((hit) => hit.x > x);
        if (previous && next) {
            const progress = (x - previous.x) / (next.x - previous.x);
            return {
                x,
                y: previous.y + (next.y - previous.y) * progress,
            };
        }

        const fallback = previous ?? next ?? hits[index];
        return { x, y: fallback.y };
    });

    const smoothed = smoothHairlinePoints(interpolated);
    const centerIndex = Math.floor(smoothed.length / 2);
    const centralBand = smoothed.slice(Math.max(0, centerIndex - 1), Math.min(smoothed.length, centerIndex + 2));
    const top = {
        x: average(centralBand.map((point) => point.x)),
        y: average(centralBand.map((point) => point.y)),
    };

    const segmenterHits = hits.filter((hit) => hit.source === "segmenter").length;
    const reliability = clamp(
        Math.round(
            (hits.length / HAIR_SCAN_SAMPLES) * 55 +
            average(hits.map((hit) => hit.confidence)) * 30 +
            (segmenterHits / Math.max(hits.length, 1)) * 15
        ),
        35,
        97
    );

    return {
        points: smoothed,
        top,
        reliability,
        method: segmenterHits === hits.length ? "segmenter" : "hybrid",
        foregroundGuide: [smoothed[0], smoothed[smoothed.length - 1]],
    };
}

function getHorizontalGuide(contour: FacePoint[], y: number): [FacePoint, FacePoint] | null {
    const intersections: number[] = [];
    for (let index = 0; index < contour.length; index += 1) {
        const start = contour[index];
        const end = contour[(index + 1) % contour.length];
        if (y >= Math.min(start.y, end.y) && y <= Math.max(start.y, end.y) && start.y !== end.y) {
            intersections.push(start.x + ((end.x - start.x) * (y - start.y)) / (end.y - start.y));
        }
    }
    if (intersections.length < 2) return null;
    intersections.sort((left, right) => left - right);
    return [{ x: intersections[0], y }, { x: intersections[intersections.length - 1], y }];
}

function getGuideAtY(contour: FacePoint[], y: number, fallback: [FacePoint, FacePoint]) {
    return getHorizontalGuide(contour, y) ?? fallback;
}

function buildFallbackContour(landmarks: NormalizedLandmark[], hairline: HairlineRefinement) {
    const meshTop = getPoint(landmarks, LANDMARKS.top);
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const faceHeight = distance(meshTop, chin);
    const topShift = meshTop.y - hairline.top.y;

    return FACE_OVAL_INDICES.map((index) => {
        const point = getPoint(landmarks, index);
        if (point.y <= meshTop.y + faceHeight * 0.08) {
            const weight = clamp(1 - Math.abs(point.x - meshTop.x) / 0.2, 0, 1);
            return { x: point.x, y: clamp(point.y - topShift * weight, 0, 1) };
        }
        return point;
    });
}

function buildFaceGeometry(
    landmarks: NormalizedLandmark[],
    hairline: HairlineRefinement,
    manualFrame?: ManualFrameOverride
): FaceGeometry {
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const leftForehead = getPoint(landmarks, LANDMARKS.leftForehead);
    const rightForehead = getPoint(landmarks, LANDMARKS.rightForehead);
    const leftCheek = getPoint(landmarks, LANDMARKS.leftCheek);
    const rightCheek = getPoint(landmarks, LANDMARKS.rightCheek);
    const leftJaw = getPoint(landmarks, LANDMARKS.leftJaw);
    const rightJaw = getPoint(landmarks, LANDMARKS.rightJaw);
    const leftChin = getPoint(landmarks, LANDMARKS.leftChin);
    const rightChin = getPoint(landmarks, LANDMARKS.rightChin);

    const contour = manualFrame
        ? manualFrame.contour.map((point) => clampPoint(point))
        : hairline.method === "fallback"
          ? buildFallbackContour(landmarks, hairline)
          : [
              ...hairline.points,
              ...RIGHT_FACE_SIDE_INDICES.map((index) => getPoint(landmarks, index)),
              ...LEFT_FACE_SIDE_INDICES.map((index) => getPoint(landmarks, index)),
          ];

    const manualHairline = manualFrame ? buildManualHairlineFromHandles(manualFrame.handles) : null;
    const topContour = manualHairline?.points ?? hairline.points;
    const boundsTop = manualHairline?.top ?? hairline.top;
    const boundsBottom = manualFrame?.handles[8] ?? chin;
    const foreheadMeasureY = clamp(
        boundsTop.y + (browCenter.y - boundsTop.y) * 0.55,
        boundsTop.y + 0.01,
        browCenter.y - 0.01
    );
    const cheekGuide = getGuideAtY(contour, average([leftCheek.y, rightCheek.y]), [leftCheek, rightCheek]);
    const jawGuide = getGuideAtY(contour, average([leftJaw.y, rightJaw.y]), [leftJaw, rightJaw]);
    const chinGuide = getGuideAtY(
        contour,
        clamp(average([leftChin.y, rightChin.y]), boundsTop.y + 0.02, boundsBottom.y - 0.01),
        [leftChin, rightChin]
    );

    return {
        bounds: {
            top: boundsTop,
            bottom: boundsBottom,
        },
        contour,
        topContour,
        foreheadGuide: getGuideAtY(contour, foreheadMeasureY, [leftForehead, rightForehead]),
        cheekGuide,
        jawGuide,
        chinGuide,
        hairline: manualHairline ?? hairline,
        frameSource: manualFrame ? "manual" : "auto",
        editorHandles: manualFrame?.handles,
    };
}

function buildMetrics(landmarks: NormalizedLandmark[], geometry: FaceGeometry): FaceShapeMetrics {
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);

    const faceLength = distance(geometry.bounds.top, geometry.bounds.bottom);
    const cheekboneWidth = distance(geometry.cheekGuide[0], geometry.cheekGuide[1]);
    const foreheadWidth = distance(geometry.foreheadGuide[0], geometry.foreheadGuide[1]);
    const jawWidth = distance(geometry.jawGuide[0], geometry.jawGuide[1]);
    const chinWidth = distance(geometry.chinGuide[0], geometry.chinGuide[1]);
    const effectiveFaceWidth = average([foreheadWidth, cheekboneWidth, jawWidth]);

    const leftJawAngle = angle(geometry.cheekGuide[0], geometry.jawGuide[0], geometry.bounds.bottom);
    const rightJawAngle = angle(geometry.cheekGuide[1], geometry.jawGuide[1], geometry.bounds.bottom);

    const cheekSymmetry = Math.abs(
        distance(geometry.cheekGuide[0], noseBase) -
        distance(geometry.cheekGuide[1], noseBase)
    );
    const symmetry = clamp(Math.round(100 - cheekSymmetry * 180), 72, 99);

    const totalVertical = Math.max(geometry.bounds.bottom.y - geometry.bounds.top.y, 0.0001);
    const upperThird = ((browCenter.y - geometry.bounds.top.y) / totalVertical) * 100;
    const middleThird = ((noseBase.y - browCenter.y) / totalVertical) * 100;
    const lowerThird = ((geometry.bounds.bottom.y - noseBase.y) / totalVertical) * 100;

    return {
        faceLengthToWidth: faceLength / Math.max(effectiveFaceWidth, 0.0001),
        foreheadToJaw: foreheadWidth / jawWidth,
        cheekboneToJaw: cheekboneWidth / jawWidth,
        chinToJaw: chinWidth / jawWidth,
        jawAngle: (leftJawAngle + rightJawAngle) / 2,
        symmetry,
        upperThird: clamp(upperThird, 26, 44),
        middleThird: clamp(middleThird, 26, 44),
        lowerThird: clamp(lowerThird, 28, 46),
    };
}

function scoreFaceShape(metrics: FaceShapeMetrics): Record<FaceShapeId, number> {
    const length = metrics.faceLengthToWidth;
    const foreheadJaw = metrics.foreheadToJaw;
    const cheekJaw = metrics.cheekboneToJaw;
    const chinJaw = metrics.chinToJaw;
    const angularity = normalizedScore(128 - metrics.jawAngle, 0, 24);
    const softness = 1 - angularity;
    const balancedThirds =
        1 -
        normalizedScore(
            Math.max(
                Math.abs(metrics.upperThird - 33.3),
                Math.abs(metrics.middleThird - 33.3),
                Math.abs(metrics.lowerThird - 33.3)
            ),
            4,
            12
        );
    const chinFullness = closeness(chinJaw, 0.88, 0.14);
    const chinNarrowness = normalizedScore(0.85 - chinJaw, 0, 0.16);
    const upperDominance = normalizedScore(metrics.upperThird - metrics.middleThird, 2, 10);
    const lowerDominance = normalizedScore(metrics.lowerThird - metrics.middleThird, 1, 8);
    const longFaceSignal = average([
        normalizedScore(length, 1.24, 1.46),
        upperDominance,
        lowerDominance,
        chinNarrowness,
    ]);

    const scores: Record<FaceShapeId, number> = {
        oval: closeness(length, 1.42, 0.22) * 3.4 + closeness(foreheadJaw, 1.02, 0.18) * 2.1 + softness * 1.5,
        round: closeness(length, 1.16, 0.16) * 3.2 + closeness(cheekJaw, 1.02, 0.12) * 1.5 + softness * 2.4,
        square: closeness(length, 1.22, 0.18) * 2.8 + closeness(foreheadJaw, 1, 0.12) * 2.4 + angularity * 2.7,
        heart: normalizedScore(foreheadJaw, 1.1, 1.24) * 2.8 + normalizedScore(0.78 - chinJaw, 0, 0.18) * 2.4 + softness * 0.9,
        oblong: normalizedScore(length, 1.52, 1.72) * 3.5 + closeness(foreheadJaw, 1, 0.16) * 1.7,
        diamond: normalizedScore(cheekJaw, 1.1, 1.24) * 2.6 + normalizedScore(1.08 - foreheadJaw, 0, 0.18) * 1.8 + normalizedScore(0.76 - chinJaw, 0, 0.18) * 2.2,
        pear: normalizedScore(1.05 - foreheadJaw, 0, 0.2) * 2.8 + closeness(cheekJaw, 0.98, 0.16) * 1.5 + angularity * 0.8,
    };

    // Prevent vertically stretched, narrow-chin faces from collapsing into the round bucket.
    scores.round = Math.max(0, scores.round + balancedThirds * 0.55 + chinFullness * 0.45 - longFaceSignal * 1.85 - chinNarrowness * 0.55);
    scores.oval += balancedThirds * 0.35 + longFaceSignal * 0.45;
    scores.oblong += normalizedScore(length, 1.24, 1.42) * 2.4 + longFaceSignal * 1.65;

    if (length >= 1.26 && upperDominance >= 0.75 && chinNarrowness >= 0.45) {
        scores.oblong += 2.4;
        scores.oval = Math.max(0, scores.oval - 0.45);
        scores.round = Math.max(0, scores.round - 0.9);
    }

    return scores;
}

function buildOverlay(landmarks: NormalizedLandmark[], geometry: FaceGeometry) {
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);
    const browCenter = getPoint(landmarks, LANDMARKS.browCenter);

    return {
        contour: geometry.contour,
        faceHeight: [geometry.bounds.top, geometry.bounds.bottom] as [FacePoint, FacePoint],
        foreheadWidth: geometry.foreheadGuide,
        cheekboneWidth: geometry.cheekGuide,
        jawWidth: geometry.jawGuide,
        chinWidth: geometry.chinGuide,
        browLine: browCenter,
        noseBase,
        centerLine: [geometry.bounds.top, geometry.bounds.bottom] as [FacePoint, FacePoint],
        upperThirdGuide: getHorizontalGuide(geometry.contour, browCenter.y),
        middleThirdGuide: getHorizontalGuide(geometry.contour, noseBase.y),
        leftEyebrow: getPoints(landmarks, LEFT_EYEBROW_INDICES),
        rightEyebrow: getPoints(landmarks, RIGHT_EYEBROW_INDICES),
        leftEye: getPoints(landmarks, LEFT_EYE_INDICES),
        rightEye: getPoints(landmarks, RIGHT_EYE_INDICES),
        noseBridge: getPoints(landmarks, NOSE_BRIDGE_INDICES),
        noseBaseGuide: getPoints(landmarks, NOSE_BASE_INDICES),
        mouthOuter: getPoints(landmarks, OUTER_LIP_INDICES),
        hairlineContour: geometry.topContour,
        hairlineReliability: geometry.hairline.reliability,
        hairlineMethod: geometry.hairline.method,
        frameSource: geometry.frameSource,
    };
}

function getLumaAt(imageData: ImageData, x: number, y: number) {
    const px = clamp(Math.round(x), 0, imageData.width - 1);
    const py = clamp(Math.round(y), 0, imageData.height - 1);
    const offset = (py * imageData.width + px) * 4;
    return getLuma(
        imageData.data[offset],
        imageData.data[offset + 1],
        imageData.data[offset + 2]
    );
}

function sampleFaceRegion(imageData: ImageData, contour: FacePoint[]) {
    const extents = getContourExtents(contour);
    const minX = clamp(Math.floor(extents.minX * (imageData.width - 1)), 0, imageData.width - 1);
    const maxX = clamp(Math.ceil(extents.maxX * (imageData.width - 1)), 0, imageData.width - 1);
    const minY = clamp(Math.floor(extents.minY * (imageData.height - 1)), 0, imageData.height - 1);
    const maxY = clamp(Math.ceil(extents.maxY * (imageData.height - 1)), 0, imageData.height - 1);
    const step = Math.max(1, Math.round(Math.max(maxX - minX, maxY - minY) / 120));

    const collect = (usePolygon: boolean) => {
        const lumas: number[] = [];
        const gradients: number[] = [];
        let dark = 0;
        let bright = 0;

        for (let py = minY; py <= maxY; py += step) {
            for (let px = minX; px <= maxX; px += step) {
                const normalizedPoint = {
                    x: px / Math.max(imageData.width - 1, 1),
                    y: py / Math.max(imageData.height - 1, 1),
                };
                if (usePolygon && !pointInPolygon(normalizedPoint, contour)) continue;

                const luma = getLumaAt(imageData, px, py);
                const right = getLumaAt(imageData, Math.min(px + step, maxX), py);
                const down = getLumaAt(imageData, px, Math.min(py + step, maxY));
                lumas.push(luma);
                gradients.push((Math.abs(luma - right) + Math.abs(luma - down)) / 2);
                if (luma < 42) dark += 1;
                if (luma > 218) bright += 1;
            }
        }

        return {
            lumas,
            gradients,
            darkRatio: dark / Math.max(lumas.length, 1),
            brightRatio: bright / Math.max(lumas.length, 1),
        };
    };

    const polygonSamples = collect(true);
    if (polygonSamples.lumas.length >= 120) {
        return polygonSamples;
    }
    return collect(false);
}

function estimateCoverageQuality(geometry: FaceGeometry) {
    const extents = getContourExtents(geometry.contour);
    const width = extents.maxX - extents.minX;
    const height = extents.maxY - extents.minY;
    const centerX = average([extents.minX, extents.maxX]);
    const centerY = average([extents.minY, extents.maxY]);

    const sizeQuality = average([
        closeness(width, 0.38, 0.18),
        closeness(height, 0.58, 0.24),
    ]);
    const centerQuality = average([
        closeness(centerX, 0.5, 0.24),
        closeness(centerY, 0.48, 0.24),
    ]);
    const marginQuality = average([
        closeness(extents.minY, 0.12, 0.16),
        closeness(1 - extents.maxY, 0.12, 0.18),
    ]);

    return Math.round(clamp((sizeQuality * 0.5 + centerQuality * 0.3 + marginQuality * 0.2) * 100, 0, 100));
}

function estimatePoseQuality(landmarks: NormalizedLandmark[], geometry: FaceGeometry) {
    const leftEye = getCenter(getPoints(landmarks, LEFT_EYE_INDICES));
    const rightEye = getCenter(getPoints(landmarks, RIGHT_EYE_INDICES));
    const noseBase = getPoint(landmarks, LANDMARKS.noseBase);
    const cheekWidth = Math.max(distance(geometry.cheekGuide[0], geometry.cheekGuide[1]), 0.0001);

    const rollDegrees = lineAngleDegrees(leftEye, rightEye);
    const yawDifference =
        Math.abs(distance(noseBase, geometry.cheekGuide[0]) - distance(noseBase, geometry.cheekGuide[1])) / cheekWidth;
    const leftEyeWidth = distance(getPoint(landmarks, 33), getPoint(landmarks, 133));
    const rightEyeWidth = distance(getPoint(landmarks, 263), getPoint(landmarks, 362));
    const eyeScaleDifference =
        Math.abs(leftEyeWidth - rightEyeWidth) / Math.max(average([leftEyeWidth, rightEyeWidth]), 0.0001);

    const rollQuality = 1 - normalizedScore(rollDegrees, 2, 10);
    const yawQuality = 1 - normalizedScore(yawDifference, 0.03, 0.18);
    const eyeScaleQuality = 1 - normalizedScore(eyeScaleDifference, 0.03, 0.2);

    return Math.round(clamp((rollQuality * 0.42 + yawQuality * 0.38 + eyeScaleQuality * 0.2) * 100, 0, 100));
}

function createQualityImageData(imageElement: HTMLImageElement) {
    const sample = createInputCanvas(imageElement, { targetLongestEdge: QUALITY_IMAGE_LONGEST_EDGE });
    const context = sample.canvas.getContext("2d", { willReadFrequently: true });
    return context?.getImageData(0, 0, sample.canvas.width, sample.canvas.height) ?? null;
}

function estimateImageQualityFromSample(
    imageData: ImageData | null,
    landmarks: NormalizedLandmark[],
    geometry: FaceGeometry
): FaceImageQualitySignals {
    if (!imageData) {
        return {
            pose: estimatePoseQuality(landmarks, geometry),
            sharpness: 65,
            lighting: 65,
            coverage: estimateCoverageQuality(geometry),
            overall: 65,
        };
    }

    const faceRegion = sampleFaceRegion(imageData, geometry.contour);
    const meanLuma = average(faceRegion.lumas);
    const contrast = standardDeviation(faceRegion.lumas);
    const gradient = average(faceRegion.gradients);

    const pose = estimatePoseQuality(landmarks, geometry);
    const sharpness = Math.round(clamp(normalizedScore(gradient, 7, 24) * 100, 0, 100));
    const lighting = Math.round(
        clamp(
            (
                closeness(meanLuma, 136, 72) * 0.45 +
                normalizedScore(contrast, 18, 54) * 0.35 +
                (1 - clamp((faceRegion.darkRatio + faceRegion.brightRatio) * 1.8, 0, 1)) * 0.2
            ) * 100,
            0,
            100
        )
    );
    const coverage = estimateCoverageQuality(geometry);

    return {
        pose,
        sharpness,
        lighting,
        coverage,
        overall: Math.round(clamp(pose * 0.34 + sharpness * 0.24 + lighting * 0.24 + coverage * 0.18, 0, 100)),
    };
}

function scoreFramePadding(value: number, target: number, tolerance: number) {
    if (value < -0.006) return 0;
    return closeness(value, target, tolerance);
}

function estimateFrameQuality(landmarks: NormalizedLandmark[], geometry: FaceGeometry): FaceFrameQualitySignals {
    const meshTop = getPoint(landmarks, LANDMARKS.top);
    const chin = getPoint(landmarks, LANDMARKS.chin);
    const leftForehead = getPoint(landmarks, LANDMARKS.leftForehead);
    const rightForehead = getPoint(landmarks, LANDMARKS.rightForehead);
    const leftCheek = getPoint(landmarks, LANDMARKS.leftCheek);
    const rightCheek = getPoint(landmarks, LANDMARKS.rightCheek);
    const leftJaw = getPoint(landmarks, LANDMARKS.leftJaw);
    const rightJaw = getPoint(landmarks, LANDMARKS.rightJaw);
    const rawFaceHeight = Math.max(distance(meshTop, chin), 0.0001);
    const rawFaceWidth = Math.max(distance(leftCheek, rightCheek), 0.0001);

    const foreheadPads = [
        (leftForehead.x - geometry.foreheadGuide[0].x) / rawFaceWidth,
        (geometry.foreheadGuide[1].x - rightForehead.x) / rawFaceWidth,
    ];
    const cheekPads = [
        (leftCheek.x - geometry.cheekGuide[0].x) / rawFaceWidth,
        (geometry.cheekGuide[1].x - rightCheek.x) / rawFaceWidth,
    ];
    const jawPads = [
        (leftJaw.x - geometry.jawGuide[0].x) / rawFaceWidth,
        (geometry.jawGuide[1].x - rightJaw.x) / rawFaceWidth,
    ];
    const topPad = (meshTop.y - geometry.bounds.top.y) / rawFaceHeight;
    const chinPad = (geometry.bounds.bottom.y - chin.y) / rawFaceHeight;

    const alignment = average([
        ...foreheadPads.map((value) => scoreFramePadding(value, 0.03, 0.09)),
        ...cheekPads.map((value) => scoreFramePadding(value, 0.02, 0.08)),
        ...jawPads.map((value) => scoreFramePadding(value, 0.025, 0.09)),
        scoreFramePadding(topPad, 0.09, 0.15),
        scoreFramePadding(chinPad, 0.045, 0.1),
    ]);

    const centerX = average([geometry.bounds.top.x, geometry.bounds.bottom.x]);
    const guides = [geometry.foreheadGuide, geometry.cheekGuide, geometry.jawGuide, geometry.chinGuide];
    const symmetry = average(
        guides.map(([left, right]) => {
            const leftDistance = Math.max(centerX - left.x, 0);
            const rightDistance = Math.max(right.x - centerX, 0);
            const difference =
                Math.abs(leftDistance - rightDistance) / Math.max(average([leftDistance, rightDistance]), 0.0001);
            return 1 - normalizedScore(difference, 0.04, 0.24);
        })
    );

    const segmentLengths = geometry.contour.map((point, index) => distance(point, geometry.contour[(index + 1) % geometry.contour.length]));
    const smoothness =
        1 - normalizedScore(standardDeviation(segmentLengths) / Math.max(average(segmentLengths), 0.0001), 0.25, 0.85);
    const hairline =
        geometry.frameSource === "manual"
            ? Math.round(clamp((scoreFramePadding(topPad, 0.09, 0.15) * 0.65 + symmetry * 0.35) * 100, 0, 100))
            : Math.round(clamp(geometry.hairline.reliability ?? 52, 0, 100));

    return {
        hairline,
        frame: Math.round(
            clamp((alignment * 0.55 + symmetry * 0.2 + smoothness * 0.1 + (hairline / 100) * 0.15) * 100, 0, 100)
        ),
    };
}

function buildQualityFlags(
    classification: number,
    margin: number,
    imageQuality: FaceImageQualitySignals,
    frameQuality: FaceFrameQualitySignals
): FaceShapeQualityFlag[] {
    const flags: FaceShapeQualityFlag[] = [];

    if (margin < 58 || classification < 64) flags.push("ambiguous_shape");
    if (imageQuality.pose < 72) flags.push("low_pose");
    if (imageQuality.sharpness < 68) flags.push("low_sharpness");
    if (imageQuality.lighting < 70) flags.push("low_lighting");
    if (imageQuality.coverage < 68) flags.push("low_coverage");
    if (frameQuality.frame < 72) flags.push("low_frame_alignment");
    if (frameQuality.hairline < 65) flags.push("low_hairline");

    return flags;
}

function buildConfidenceQuality(
    primary: FaceShapeId,
    secondary: FaceShapeId,
    scores: Record<FaceShapeId, number>,
    imageQuality: FaceImageQualitySignals,
    frameQuality: FaceFrameQualitySignals,
    frameSource: "auto" | "manual"
) {
    const primaryNormalized = clamp(scores[primary] / SHAPE_SCORE_MAX[primary], 0, 1);
    const secondaryNormalized = clamp(scores[secondary] / SHAPE_SCORE_MAX[secondary], 0, 1);
    const margin = Math.round(
        clamp(
            (
                (1 - normalizedScore(secondaryNormalized / Math.max(primaryNormalized, 0.0001), 0.72, 0.96)) * 0.6 +
                clamp((primaryNormalized - secondaryNormalized) / 0.3, 0, 1) * 0.4
            ) * 100,
            0,
            100
        )
    );
    const classification = Math.round(clamp((primaryNormalized * 0.6 + (margin / 100) * 0.4) * 100, 0, 100));
    const measurement = Math.round(
        clamp(
            frameSource === "manual"
                ? frameQuality.frame * 0.62 + imageQuality.overall * 0.38
                : frameQuality.frame * 0.48 + imageQuality.overall * 0.52,
            0,
            100
        )
    );
    const confidence = Math.round(clamp(classification * 0.58 + measurement * 0.42, 0, 98));

    return {
        confidence,
        quality: {
            classification,
            measurement,
            image: imageQuality.overall,
            frame: frameQuality.frame,
            margin,
            pose: imageQuality.pose,
            sharpness: imageQuality.sharpness,
            lighting: imageQuality.lighting,
            coverage: imageQuality.coverage,
            flags: buildQualityFlags(classification, margin, imageQuality, frameQuality),
        } satisfies FaceShapeQuality,
    };
}

function buildPreviewGate(quality: FaceShapeQuality): FaceShapePreviewGate {
    const blockReasons = quality.flags.filter((flag) => {
        if (flag === "low_pose") return quality.pose < 68;
        if (flag === "low_coverage") return quality.coverage < 54;
        if (flag === "low_frame_alignment") return quality.frame < 58;
        if (flag === "low_lighting") return quality.image < 50;
        return false;
    });

    const canAnalyze =
        quality.image >= 52 &&
        quality.pose >= 68 &&
        quality.coverage >= 54 &&
        quality.frame >= 58;

    return {
        canAnalyze,
        severity: !canAnalyze ? "block" : quality.flags.length ? "warn" : "ok",
        reasons: !canAnalyze ? blockReasons : quality.flags,
    };
}

async function getPreparedFaceShapeContext(imageElement: HTMLImageElement): Promise<PreparedFaceShapeContext> {
    const existing = preparedContextCache.get(imageElement);
    if (existing) {
        return existing;
    }

    const next = (async () => {
        const landmarks = await detectLandmarks(imageElement);
        const hairline = await resolveHairline(imageElement, landmarks);
        return {
            landmarks,
            hairline,
            qualityImageData: createQualityImageData(imageElement) ?? createImageDataCanvas(imageElement).imageData,
        };
    })().catch((error) => {
        preparedContextCache.delete(imageElement);
        throw error;
    });

    preparedContextCache.set(imageElement, next);
    return next;
}

function buildEditorDraftFromPreparedContext(context: PreparedFaceShapeContext): FaceShapeEditorDraft {
    const geometry = buildFaceGeometry(context.landmarks, context.hairline);
    const handles = buildFaceShapeEditorHandles(geometry);
    return {
        handles,
        contour: buildFaceShapeEditorContour(handles),
    };
}

function buildPreviewResultFromPreparedContext(
    context: PreparedFaceShapeContext,
    handles?: FacePoint[]
): FaceShapePreviewResult {
    const manualFrame = handles?.length
        ? {
              handles: handles.map((point) => clampPoint(point)),
              contour: buildFaceShapeEditorContour(handles.map((point) => clampPoint(point))),
          }
        : undefined;
    const geometry = buildFaceGeometry(context.landmarks, context.hairline, manualFrame);
    const metrics = buildMetrics(context.landmarks, geometry);
    const scores = scoreFaceShape(metrics);
    const ranked = pickTopShapes(scores);
    const [primary] = ranked[0];
    const secondary = ranked[1][0];
    const imageQuality = estimateImageQualityFromSample(context.qualityImageData, context.landmarks, geometry);
    const frameQuality = estimateFrameQuality(context.landmarks, geometry);
    const { confidence, quality } = buildConfidenceQuality(
        primary,
        secondary,
        scores,
        imageQuality,
        frameQuality,
        geometry.frameSource
    );

    return {
        faceShape: primary,
        secondaryShape: secondary,
        confidence,
        quality,
        gate: buildPreviewGate(quality),
    };
}

async function imageElementToDataUrl(img: HTMLImageElement): Promise<string> {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) return "";
    context.drawImage(img, 0, 0);
    return canvas.toDataURL("image/jpeg", 0.9);
}

function pickTopShapes(scores: Record<FaceShapeId, number>) {
    return (Object.entries(scores) as Array<[FaceShapeId, number]>).sort((left, right) => right[1] - left[1]);
}

export async function getFaceShapeContour(imageElement: HTMLImageElement) {
    const landmarks = await detectLandmarks(imageElement);
    const hairline = await resolveHairline(imageElement, landmarks);
    const geometry = buildFaceGeometry(landmarks, hairline);
    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;

    return geometry.contour.map((point) => ({
        x: point.x * width,
        y: point.y * height,
    }));
}

export function getFallbackFaceShapeEditorDraft(): FaceShapeEditorDraft {
    const handles: FacePoint[] = [
        { x: 0.25, y: 0.24 },
        { x: 0.37, y: 0.14 },
        { x: 0.5, y: 0.1 },
        { x: 0.63, y: 0.14 },
        { x: 0.75, y: 0.24 },
        { x: 0.82, y: 0.39 },
        { x: 0.78, y: 0.52 },
        { x: 0.73, y: 0.69 },
        { x: 0.5, y: 0.87 },
        { x: 0.27, y: 0.69 },
        { x: 0.22, y: 0.52 },
        { x: 0.18, y: 0.39 },
    ];

    return {
        handles,
        contour: buildFaceShapeEditorContour(handles),
    };
}

export async function getFaceShapeEditorDraft(imageElement: HTMLImageElement): Promise<FaceShapeEditorDraft> {
    const context = await getPreparedFaceShapeContext(imageElement);
    return buildEditorDraftFromPreparedContext(context);
}

export async function getFaceShapeEditorPreview(
    imageElement: HTMLImageElement,
    handles?: FacePoint[]
): Promise<FaceShapePreviewResult> {
    const context = await getPreparedFaceShapeContext(imageElement);
    return buildPreviewResultFromPreparedContext(context, handles);
}

export async function analyzeFaceShapeFromEditor(
    imageElement: HTMLImageElement,
    handles: FacePoint[],
    profile: FaceStyleProfile = "balanced",
    imageDataUrl?: string
): Promise<FaceShapeAnalysisResult> {
    const context = await getPreparedFaceShapeContext(imageElement);
    const manualFrame: ManualFrameOverride = {
        handles: handles.map((point) => clampPoint(point)),
        contour: buildFaceShapeEditorContour(handles.map((point) => clampPoint(point))),
    };
    const geometry = buildFaceGeometry(context.landmarks, context.hairline, manualFrame);
    const metrics = buildMetrics(context.landmarks, geometry);
    const scores = scoreFaceShape(metrics);
    const ranked = pickTopShapes(scores);
    const [primary] = ranked[0];
    const secondary = ranked[1][0];
    const imageQuality = estimateImageQualityFromSample(context.qualityImageData, context.landmarks, geometry);
    const frameQuality = estimateFrameQuality(context.landmarks, geometry);
    const { confidence, quality } = buildConfidenceQuality(
        primary,
        secondary,
        scores,
        imageQuality,
        frameQuality,
        geometry.frameSource
    );

    return {
        faceShape: primary,
        secondaryShape: secondary,
        confidence,
        profile,
        measuredAt: new Date().toISOString(),
        metrics,
        quality,
        scores,
        imageDataUrl: imageDataUrl ?? (await imageElementToDataUrl(imageElement)),
        overlay: buildOverlay(context.landmarks, geometry),
    };
}

export async function analyzeFaceShapeAI(
    imageElement: HTMLImageElement,
    profile: FaceStyleProfile = "balanced",
    imageDataUrl?: string
): Promise<FaceShapeAnalysisResult> {
    const context = await getPreparedFaceShapeContext(imageElement);
    const geometry = buildFaceGeometry(context.landmarks, context.hairline);
    const metrics = buildMetrics(context.landmarks, geometry);
    const scores = scoreFaceShape(metrics);
    const ranked = pickTopShapes(scores);
    const [primary] = ranked[0];
    const secondary = ranked[1][0];
    const imageQuality = estimateImageQualityFromSample(context.qualityImageData, context.landmarks, geometry);
    const frameQuality = estimateFrameQuality(context.landmarks, geometry);
    const { confidence, quality } = buildConfidenceQuality(
        primary,
        secondary,
        scores,
        imageQuality,
        frameQuality,
        geometry.frameSource
    );

    return {
        faceShape: primary,
        secondaryShape: secondary,
        confidence,
        profile,
        measuredAt: new Date().toISOString(),
        metrics,
        quality,
        scores,
        imageDataUrl: imageDataUrl ?? (await imageElementToDataUrl(imageElement)),
        overlay: buildOverlay(context.landmarks, geometry),
    };
}
