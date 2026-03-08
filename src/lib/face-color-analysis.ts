/**
 * AI-powered Personal Color Analysis using TFJS Face Landmarks
 *
 * Flow:
 * 1. Detect 478 face landmarks via TensorFlow.js FaceLandmarksDetection (WebGL)
 * 2. Sample skin color from forehead, cheeks, chin
 * 3. Sample hair color from above forehead
 * 4. Compute undertone, brightness, contrast, clarity
 * 5. Score each of 4 seasons → return best match with detail
 */
// Provide TFJS core and WebGL backend globally
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

import type { SeasonId, SubSeasonId } from "./color-data";

// =============================================
// Types
// =============================================
export interface AnalysisResult {
    season: SubSeasonId;
    baseSeason: SeasonId;
    confidence: number; // 0-100
    skinTone: { r: number; g: number; b: number };
    undertone: "warm" | "cool" | "neutral";
    brightness: "light" | "medium" | "deep";
    clarity: "clear" | "muted";
    scores: Record<SeasonId, number>;
}

// =============================================
// TFJS FaceLandmarker — lazy singleton
// =============================================
type FaceLandmarkerType = any; // Using any to avoid complex type imports here

let landmarkerPromise: Promise<FaceLandmarkerType> | null = null;

async function getFaceLandmarker(): Promise<FaceLandmarkerType> {
    if (landmarkerPromise) return landmarkerPromise;

    landmarkerPromise = (async () => {
        try {
            // Dynamically import the models to avoid breaking Next.js SSR
            const faceLandmarksDetection = await import("@tensorflow-models/face-landmarks-detection");

            const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
            const detectorConfig = {
                runtime: "tfjs", // Forces TFJS WebGL instead of WASM
                refineLandmarks: false,
                maxFaces: 1,
            };

            // @ts-ignore
            const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
            return detector;
        } catch (err) {
            console.error("Failed to initialize TFJS FaceLandmarker:", err);
            landmarkerPromise = null; // Reset to allow retry
            throw err;
        }
    })();

    return landmarkerPromise;
}

// =============================================
// Face landmark indices for skin regions
// =============================================
// MediaPipe FaceMesh 478 landmark layout:

// Face oval (silhouette) indices for auto-cropping
const FACEMESH_FACE_OVAL = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
    400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
    54, 103, 67, 109
];

// Forehead
const FOREHEAD_INDICES = [10, 67, 69, 104, 108, 109, 151, 299, 297, 332, 334, 338];
// Left cheek
const LEFT_CHEEK_INDICES = [50, 101, 116, 117, 118, 119, 123, 187, 196, 205, 206, 207];
// Right cheek
const RIGHT_CHEEK_INDICES = [280, 330, 345, 346, 347, 348, 352, 411, 420, 425, 426, 427];
// Chin
const CHIN_INDICES = [152, 175, 199, 200, 208, 428];
// Nose bridge (for additional skin sampling)
const NOSE_INDICES = [6, 197, 195, 5, 4];

// Hair region: above top of forehead
const HAIR_SAMPLE_INDICES = [10, 151, 9]; // We sample ABOVE these points

// =============================================
// Color Space Helpers
// =============================================
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
}

// Approximate sRGB → Lab conversion for perceptual analysis
function rgbToLab(r: number, g: number, b: number): { L: number; a: number; b: number } {
    // sRGB → linear
    let rl = r / 255, gl = g / 255, bl = b / 255;
    rl = rl > 0.04045 ? Math.pow((rl + 0.055) / 1.055, 2.4) : rl / 12.92;
    gl = gl > 0.04045 ? Math.pow((gl + 0.055) / 1.055, 2.4) : gl / 12.92;
    bl = bl > 0.04045 ? Math.pow((bl + 0.055) / 1.055, 2.4) : bl / 12.92;

    // linear RGB → XYZ (D65)
    let x = rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375;
    let y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750;
    let z = rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041;

    // XYZ → Lab
    x /= 0.95047; y /= 1.00000; z /= 1.08883;
    const f = (t: number) => t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116;
    const fx = f(x), fy = f(y), fz = f(z);

    return {
        L: 116 * fy - 16,
        a: 500 * (fx - fy),
        b: 200 * (fy - fz),
    };
}

// =============================================
// Pixel Sampling
// =============================================
function samplePixelsAtLandmarks(
    imageData: ImageData,
    width: number,
    height: number,
    landmarks: Array<{ x: number; y: number; z: number }>,
    indices: number[],
    yOffset = 0
): { r: number; g: number; b: number }[] {
    const pixels: { r: number; g: number; b: number }[] = [];
    const radius = Math.max(2, Math.round(Math.min(width, height) * 0.008));

    for (const idx of indices) {
        if (idx >= landmarks.length) continue;
        const lm = landmarks[idx];

        // TFJS returns absolute pixel coordinates for MediaPipeFaceMesh, unlike tasks-vision which returned 0..1 normalized.
        // We gracefully support both just in case.
        const isNormalized = lm.x <= 1 && lm.y <= 1 && width > 1;
        const cx = Math.round(isNormalized ? lm.x * width : lm.x);
        const cy = Math.round(isNormalized ? lm.y * height : lm.y) + yOffset;

        // Sample a small region around each point
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const px = cx + dx;
                const py = cy + dy;
                if (px < 0 || px >= width || py < 0 || py >= height) continue;
                const i = (py * width + px) * 4;
                if (imageData.data[i + 3] < 128) continue; // skip transparent
                pixels.push({
                    r: imageData.data[i],
                    g: imageData.data[i + 1],
                    b: imageData.data[i + 2],
                });
            }
        }
    }
    return pixels;
}

function averageColor(pixels: { r: number; g: number; b: number }[]): { r: number; g: number; b: number } {
    if (pixels.length === 0) return { r: 180, g: 150, b: 130 }; // fallback
    let rSum = 0, gSum = 0, bSum = 0;
    for (const p of pixels) { rSum += p.r; gSum += p.g; bSum += p.b; }
    return {
        r: Math.round(rSum / pixels.length),
        g: Math.round(gSum / pixels.length),
        b: Math.round(bSum / pixels.length),
    };
}

// Remove outliers (pixels too far from median) for more accurate skin color
function filterOutliers(pixels: { r: number; g: number; b: number }[]): { r: number; g: number; b: number }[] {
    if (pixels.length < 10) return pixels;

    const avg = averageColor(pixels);
    const distances = pixels.map(p => {
        const dr = p.r - avg.r, dg = p.g - avg.g, db = p.b - avg.b;
        return { p, dist: Math.sqrt(dr * dr + dg * dg + db * db) };
    });
    distances.sort((a, b) => a.dist - b.dist);

    // Keep the closest 70%
    const keep = Math.round(distances.length * 0.7);
    return distances.slice(0, keep).map(d => d.p);
}

// =============================================
// Season Scoring
// =============================================
function calculateSeasonScores(
    skinLab: { L: number; a: number; b: number },
    skinHsl: { h: number; s: number; l: number },
    hairBrightness: number,
    contrast: number
): Record<SeasonId, number> {
    // Undertone warmth: positive b* = warm (yellow), negative b* = cool (blue)
    // Also a* > 0 = reddish, a* < 0 = greenish
    const warmth = skinLab.b * 0.6 + skinLab.a * 0.4; // combined warmth score

    // Brightness from Lab L* (0-100)
    const brightness = skinLab.L;

    // Clarity/Chroma — higher saturation = clearer
    const chroma = Math.sqrt(skinLab.a * skinLab.a + skinLab.b * skinLab.b);

    // Season scoring
    const scores: Record<SeasonId, number> = {
        spring: 0,
        summer: 0,
        autumn: 0,
        winter: 0,
    };

    // === WARMTH AXIS ===
    // Warm seasons: spring, autumn
    // Cool seasons: summer, winter
    if (warmth > 5) {
        // Warm
        scores.spring += 25 + Math.min(warmth * 0.8, 20);
        scores.autumn += 25 + Math.min(warmth * 0.8, 20);
        scores.summer += Math.max(0, 10 - warmth * 0.5);
        scores.winter += Math.max(0, 10 - warmth * 0.5);
    } else if (warmth < -5) {
        // Cool
        scores.summer += 25 + Math.min(Math.abs(warmth) * 0.8, 20);
        scores.winter += 25 + Math.min(Math.abs(warmth) * 0.8, 20);
        scores.spring += Math.max(0, 10 - Math.abs(warmth) * 0.5);
        scores.autumn += Math.max(0, 10 - Math.abs(warmth) * 0.5);
    } else {
        // Neutral — slight advantage to all
        scores.spring += 15;
        scores.summer += 15;
        scores.autumn += 15;
        scores.winter += 15;
    }

    // === BRIGHTNESS AXIS ===
    // Light seasons: spring, summer
    // Deep seasons: autumn, winter
    if (brightness > 65) {
        scores.spring += 20 + (brightness - 65) * 0.5;
        scores.summer += 20 + (brightness - 65) * 0.5;
        scores.autumn += Math.max(0, 10 - (brightness - 65) * 0.3);
        scores.winter += Math.max(0, 10 - (brightness - 65) * 0.3);
    } else if (brightness < 50) {
        scores.autumn += 20 + (50 - brightness) * 0.5;
        scores.winter += 20 + (50 - brightness) * 0.5;
        scores.spring += Math.max(0, 10 - (50 - brightness) * 0.3);
        scores.summer += Math.max(0, 10 - (50 - brightness) * 0.3);
    } else {
        scores.spring += 12;
        scores.summer += 12;
        scores.autumn += 12;
        scores.winter += 12;
    }

    // === CLARITY AXIS ===
    // Clear: spring, winter
    // Muted: summer, autumn
    if (chroma > 20) {
        scores.spring += 15 + Math.min((chroma - 20) * 0.5, 10);
        scores.winter += 15 + Math.min((chroma - 20) * 0.5, 10);
        scores.summer += Math.max(0, 8 - (chroma - 20) * 0.3);
        scores.autumn += Math.max(0, 8 - (chroma - 20) * 0.3);
    } else {
        scores.summer += 15 + Math.min((20 - chroma) * 0.5, 10);
        scores.autumn += 15 + Math.min((20 - chroma) * 0.5, 10);
        scores.spring += Math.max(0, 8 - (20 - chroma) * 0.3);
        scores.winter += Math.max(0, 8 - (20 - chroma) * 0.3);
    }

    // === CONTRAST BONUS ===
    // High contrast → winter, Low contrast → summer/spring
    if (contrast > 50) {
        scores.winter += 10;
        scores.autumn += 3;
    } else if (contrast < 25) {
        scores.summer += 8;
        scores.spring += 8;
    }

    // === HAIR BRIGHTNESS ===
    // Very dark hair → winter/autumn, Light hair → spring/summer
    if (hairBrightness < 60) {
        scores.winter += 5;
        scores.autumn += 5;
    } else if (hairBrightness > 140) {
        scores.spring += 5;
        scores.summer += 5;
    }

    return scores;
}

// Helper to determine the precise 12-season sub-tone based on features
function determineSubSeason(baseSeason: SeasonId, brightness: 'light' | 'medium' | 'deep', clarity: 'clear' | 'muted', skinLab: { L: number; a: number; b: number }): SubSeasonId {
    if (baseSeason === 'spring') {
        if (brightness === 'light') return 'spring-light';
        if (clarity === 'clear' && skinLab.L < 68) return 'spring-bright'; // more saturated/contrasting skin tone
        return 'spring-true';
    }
    if (baseSeason === 'summer') {
        if (brightness === 'light') return 'summer-light';
        if (clarity === 'muted') return 'summer-soft';
        return 'summer-true';
    }
    if (baseSeason === 'autumn') {
        if (brightness === 'deep') return 'autumn-deep';
        if (clarity === 'muted' && skinLab.L >= 55) return 'autumn-soft';
        return 'autumn-true';
    }
    if (baseSeason === 'winter') {
        if (brightness === 'deep') return 'winter-deep';
        if (clarity === 'clear' && skinLab.L >= 60) return 'winter-bright';
        return 'winter-true';
    }
    return 'spring-true'; // Fallback
}

// =============================================
// Main Analysis Function
// =============================================
export async function analyzePersonalColorAI(
    imageElement: HTMLImageElement
): Promise<AnalysisResult> {
    // Draw image to canvas for pixel access
    const canvas = document.createElement("canvas");
    const w = imageElement.naturalWidth;
    const h = imageElement.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imageElement, 0, 0);
    const imageData = ctx.getImageData(0, 0, w, h);

    let landmarker;
    // 1. Get face landmarks
    try {
        landmarker = await getFaceLandmarker();
    } catch (e) {
        console.warn("[TFJS] Initialization failed, using fallback:", e);
        return fallbackAnalysis(imageData, w, h);
    }

    let result;
    try {
        // TFJS natively supports HTMLImageElement with pure WebGL (highly stable on mobile)
        result = await landmarker.estimateFaces(imageElement, { flipHorizontal: false });
    } catch (e) {
        console.error("TFJS FaceLandmarker.estimateFaces crashed:", e);
        return fallbackAnalysis(imageData, w, h);
    }

    if (!result || result.length === 0) {
        console.warn("[TFJS] No faces detected in the image, using fallback.");
        return fallbackAnalysis(imageData, w, h);
    }

    // TFJS results contain a 'keypoints' array for each detected face
    const landmarks = result[0].keypoints;

    // 2. Sample skin colors from multiple face regions
    const foreheadPixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, FOREHEAD_INDICES);
    const leftCheekPixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, LEFT_CHEEK_INDICES);
    const rightCheekPixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, RIGHT_CHEEK_INDICES);
    const chinPixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, CHIN_INDICES);
    const nosePixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, NOSE_INDICES);

    // Combine all skin pixels and filter outliers
    const allSkinPixels = [
        ...foreheadPixels,
        ...leftCheekPixels,
        ...rightCheekPixels,
        ...chinPixels,
        ...nosePixels,
    ];
    const filteredSkin = filterOutliers(allSkinPixels);
    const skinColor = averageColor(filteredSkin);

    // 3. Sample hair color (above the forehead landmarks)
    const hairYOffset = -Math.round(h * 0.08); // sample above
    const hairPixels = samplePixelsAtLandmarks(imageData, w, h, landmarks, HAIR_SAMPLE_INDICES, hairYOffset);
    const hairColor = averageColor(hairPixels.length > 0 ? hairPixels : [{ r: 50, g: 40, b: 35 }]);

    // 4. Color analysis
    const skinLab = rgbToLab(skinColor.r, skinColor.g, skinColor.b);
    const skinHsl = rgbToHsl(skinColor.r, skinColor.g, skinColor.b);
    const hairLab = rgbToLab(hairColor.r, hairColor.g, hairColor.b);

    // Contrast: difference in L* between skin and hair
    const contrast = Math.abs(skinLab.L - hairLab.L);
    const hairBrightness = (hairColor.r + hairColor.g + hairColor.b) / 3;

    // 5. Score seasons
    const scores = calculateSeasonScores(skinLab, skinHsl, hairBrightness, contrast);

    // 6. Find winner
    const entries = Object.entries(scores) as [SeasonId, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const winnerBase = entries[0][0];
    const totalScore = entries.reduce((sum, e) => sum + e[1], 0);
    const confidence = Math.round((entries[0][1] / totalScore) * 100);

    // 7. Determine descriptors
    const warmth = skinLab.b * 0.6 + skinLab.a * 0.4;
    const undertone: AnalysisResult["undertone"] =
        warmth > 5 ? "warm" : warmth < -5 ? "cool" : "neutral";

    const brightness: AnalysisResult["brightness"] =
        skinLab.L > 65 ? "light" : skinLab.L < 50 ? "deep" : "medium";

    const chroma = Math.sqrt(skinLab.a * skinLab.a + skinLab.b * skinLab.b);
    const clarity: AnalysisResult["clarity"] = chroma > 20 ? "clear" : "muted";

    const subSeason = determineSubSeason(winnerBase, brightness, clarity, skinLab);

    return {
        season: subSeason,
        baseSeason: winnerBase,
        confidence,
        skinTone: skinColor,
        undertone,
        brightness,
        clarity,
        scores: Object.fromEntries(entries) as Record<SeasonId, number>,
    };
}

// =============================================
// Fallback when face detection fails
// =============================================
function fallbackAnalysis(imageData: ImageData, w: number, h: number): AnalysisResult {
    // Sample center 30% of image
    const cx = Math.round(w * 0.35);
    const cy = Math.round(h * 0.35);
    const cw = Math.round(w * 0.3);
    const ch = Math.round(h * 0.3);

    const pixels: { r: number; g: number; b: number }[] = [];
    for (let y = cy; y < cy + ch; y++) {
        for (let x = cx; x < cx + cw; x++) {
            const i = (y * w + x) * 4;
            if (imageData.data[i + 3] < 128) continue;
            pixels.push({
                r: imageData.data[i],
                g: imageData.data[i + 1],
                b: imageData.data[i + 2],
            });
        }
    }

    const filtered = filterOutliers(pixels);
    const skinColor = averageColor(filtered);
    const skinLab = rgbToLab(skinColor.r, skinColor.g, skinColor.b);
    const skinHsl = rgbToHsl(skinColor.r, skinColor.g, skinColor.b);

    const scores = calculateSeasonScores(skinLab, skinHsl, 80, 30);

    const entries = Object.entries(scores) as [SeasonId, number][];
    entries.sort((a, b) => b[1] - a[1]);
    const winnerBase = entries[0][0];
    const totalScore = entries.reduce((sum, e) => sum + e[1], 0);

    const warmth = skinLab.b * 0.6 + skinLab.a * 0.4;
    const undertone: AnalysisResult["undertone"] = warmth > 5 ? "warm" : warmth < -5 ? "cool" : "neutral";
    const brightness: AnalysisResult["brightness"] = skinLab.L > 65 ? "light" : skinLab.L < 50 ? "deep" : "medium";
    const clarity: AnalysisResult["clarity"] = Math.sqrt(skinLab.a ** 2 + skinLab.b ** 2) > 20 ? "clear" : "muted";

    const subSeason = determineSubSeason(winnerBase, brightness, clarity, skinLab);

    return {
        season: subSeason,
        baseSeason: winnerBase,
        confidence: Math.round((entries[0][1] / totalScore) * 100),
        skinTone: skinColor,
        undertone,
        brightness,
        clarity,
        scores: Object.fromEntries(entries) as Record<SeasonId, number>,
    };
}

/**
 * Detects the face contour (oval) to allow for automatic cropping.
 */
export async function getFaceContour(
    imageElement: HTMLImageElement
): Promise<{ x: number; y: number }[] | null> {
    try {
        const landmarker = await getFaceLandmarker();
        const result = await landmarker.estimateFaces(imageElement, { flipHorizontal: false });

        if (!result || result.length === 0) return null;

        const landmarks = result[0].keypoints;
        const width = imageElement.naturalWidth;
        const height = imageElement.naturalHeight;

        // Calculate face dimensions to estimate crown height
        const top = landmarks[10];
        const bottom = landmarks[152];
        const faceHeight = Math.abs(top.y - bottom.y);
        const crownHeight = faceHeight * 0.35; // Estimate hair/head top

        // Main face oval points
        const facePoints = FACEMESH_FACE_OVAL.map(idx => {
            const lm = landmarks[idx];
            return { x: lm.x, y: lm.y };
        });

        // 103 (Left Forehead), 332 (Right Forehead)
        const leftAnchorIdx = FACEMESH_FACE_OVAL.indexOf(103);
        const rightAnchorIdx = FACEMESH_FACE_OVAL.indexOf(332);

        // Jawline: from Right Forehead (332) around the chin to Left Forehead (103)
        const jawlinePoints = facePoints.slice(rightAnchorIdx, leftAnchorIdx + 1);

        // Revert to clean face oval for 100% stability and premium look
        const resultPoints = FACEMESH_FACE_OVAL.map(idx => {
            const lm = landmarks[idx];
            return { x: lm.x, y: lm.y };
        });

        return resultPoints.map(p => {
            const isNormalized = p.x <= 1 && p.y <= 1 && width > 1;
            return {
                x: isNormalized ? p.x * width : p.x,
                y: isNormalized ? p.y * height : p.y
            };
        });
    } catch (e) {
        console.error("Failed to get face contour:", e);
        return null;
    }
}

/**
 * Pre-load the model so it's ready when the user submits.
 */
export async function preloadModel(): Promise<void> {
    await getFaceLandmarker();
}
