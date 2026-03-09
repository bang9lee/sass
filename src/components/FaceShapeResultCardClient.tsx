"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Home, RotateCcw, Share2, Check, Sparkles } from "lucide-react";
import { getFaceShapeCopy, getMetricSummary } from "@/lib/face-shape-content";
import type {
    FacePoint,
    FaceShapeAnalysisResult,
    FaceShapeId,
    FaceShapeQuality,
    FaceShapeQualityFlag,
} from "@/lib/face-shape-analysis-official";

interface FaceShapeResultCardProps {
    result: FaceShapeAnalysisResult;
    lang: string;
    isKo: boolean;
}

function formatPercent(value: number) {
    return `${Math.round(value)}%`;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function deriveLegacyQuality(result: FaceShapeAnalysisResult): FaceShapeQuality {
    const confidence = result.confidence ?? 76;
    const symmetry = result.metrics?.symmetry ?? 88;
    const hairline = typeof result.overlay?.hairlineReliability === "number" ? result.overlay.hairlineReliability : 64;
    const classification = clamp(Math.round(confidence + 6), 58, 99);
    const image = clamp(Math.round(confidence * 0.9), 52, 92);
    const frame = clamp(Math.round(hairline * 0.72 + symmetry * 0.18), 48, 95);
    const measurement = clamp(Math.round(frame * 0.58 + image * 0.42), 50, 96);
    const margin = clamp(Math.round(confidence + 12), 55, 99);
    const pose = clamp(Math.round(symmetry * 0.96), 60, 99);
    const sharpness = clamp(image - 8, 45, 90);
    const lighting = clamp(image + 4, 50, 95);
    const coverage = clamp(image - 6, 48, 90);
    const flags: FaceShapeQualityFlag[] = [];

    if (classification < 68 || margin < 65) flags.push("ambiguous_shape");
    if (frame < 62) flags.push("low_frame_alignment");
    if (hairline < 60) flags.push("low_hairline");
    if (image < 62) flags.push("low_lighting");

    return {
        classification,
        measurement,
        image,
        frame,
        margin,
        pose,
        sharpness,
        lighting,
        coverage,
        flags,
    };
}

function toPercent(point: FacePoint) {
    return { x: point.x * 100, y: point.y * 100 };
}

function linePath(points: FacePoint[], close = false) {
    if (points.length === 0) {
        return "";
    }

    return points
        .map((point, index) => {
            const { x, y } = toPercent(point);
            return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ")
        .concat(close ? " Z" : "");
}

function getTopShapeMix(result: FaceShapeAnalysisResult) {
    const entries = Object.entries(result.scores).sort((left, right) => right[1] - left[1]);
    const primaryScore = entries[0]?.[1] ?? 0;
    const secondaryScore = entries[1]?.[1] ?? 0;
    const total = Math.max(primaryScore + secondaryScore, 0.0001);

    return {
        primaryShare: Math.round((primaryScore / total) * 100),
        secondaryShare: Math.round((secondaryScore / total) * 100),
    };
}

function getRankedShapes(result: FaceShapeAnalysisResult) {
    const entries = (Object.entries(result.scores) as Array<[FaceShapeId, number]>).sort((left, right) => right[1] - left[1]);
    const topScore = Math.max(entries[0]?.[1] ?? 0, 0.0001);

    return entries.slice(0, 3).map(([shape, score], index) => ({
        rank: index + 1,
        shape,
        strength: Math.round((score / topScore) * 100),
    }));
}

function getShapeTheme(shape: FaceShapeId) {
    const themes: Record<
        FaceShapeId,
        {
            accent: string;
            accentSoft: string;
            accentDeep: string;
            heroGradient: string;
            shellGradient: string;
            glow: string;
        }
    > = {
        oval: {
            accent: "#b86b42",
            accentSoft: "#f4dfd0",
            accentDeep: "#2f1d15",
            heroGradient: "linear-gradient(135deg, #fff5ed 0%, #f3dfd0 52%, #eadfd8 100%)",
            shellGradient: "linear-gradient(145deg, rgba(184,107,66,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(184,107,66,0.1) 100%)",
            glow: "rgba(184,107,66,0.22)",
        },
        round: {
            accent: "#bc6f5f",
            accentSoft: "#f5ddd7",
            accentDeep: "#311d1a",
            heroGradient: "linear-gradient(135deg, #fff1ee 0%, #f1ddd6 50%, #e7ddd8 100%)",
            shellGradient: "linear-gradient(145deg, rgba(188,111,95,0.2) 0%, rgba(255,255,255,0.06) 45%, rgba(188,111,95,0.1) 100%)",
            glow: "rgba(188,111,95,0.22)",
        },
        square: {
            accent: "#4c6f68",
            accentSoft: "#d9ebe6",
            accentDeep: "#182420",
            heroGradient: "linear-gradient(135deg, #eef7f4 0%, #d7e8e3 50%, #dde4e2 100%)",
            shellGradient: "linear-gradient(145deg, rgba(76,111,104,0.2) 0%, rgba(255,255,255,0.06) 45%, rgba(76,111,104,0.1) 100%)",
            glow: "rgba(76,111,104,0.22)",
        },
        heart: {
            accent: "#ad5d68",
            accentSoft: "#f3d9df",
            accentDeep: "#2c171b",
            heroGradient: "linear-gradient(135deg, #fff0f3 0%, #f2d9de 54%, #eadfdf 100%)",
            shellGradient: "linear-gradient(145deg, rgba(173,93,104,0.2) 0%, rgba(255,255,255,0.06) 45%, rgba(173,93,104,0.1) 100%)",
            glow: "rgba(173,93,104,0.22)",
        },
        oblong: {
            accent: "#5d6e88",
            accentSoft: "#dde4f0",
            accentDeep: "#1b2230",
            heroGradient: "linear-gradient(135deg, #f1f5fb 0%, #dde4f0 52%, #e4e2e8 100%)",
            shellGradient: "linear-gradient(145deg, rgba(93,110,136,0.2) 0%, rgba(255,255,255,0.06) 45%, rgba(93,110,136,0.1) 100%)",
            glow: "rgba(93,110,136,0.22)",
        },
        diamond: {
            accent: "#8a634d",
            accentSoft: "#efdfd3",
            accentDeep: "#2b201a",
            heroGradient: "linear-gradient(135deg, #fdf5ef 0%, #efdfd3 55%, #e7dfda 100%)",
            shellGradient: "linear-gradient(145deg, rgba(138,99,77,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(138,99,77,0.1) 100%)",
            glow: "rgba(138,99,77,0.22)",
        },
        pear: {
            accent: "#8a7035",
            accentSoft: "#efe4c7",
            accentDeep: "#292114",
            heroGradient: "linear-gradient(135deg, #fcf6e7 0%, #efe4c7 55%, #e8e2d7 100%)",
            shellGradient: "linear-gradient(145deg, rgba(138,112,53,0.22) 0%, rgba(255,255,255,0.06) 45%, rgba(138,112,53,0.1) 100%)",
            glow: "rgba(138,112,53,0.22)",
        },
    };

    return themes[shape];
}

export function FaceShapeResultCardClient({ result, lang, isKo }: FaceShapeResultCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [imageAspectRatio, setImageAspectRatio] = useState(1);

    const shapeCopy = getFaceShapeCopy(result.faceShape, lang);
    const secondaryCopy = getFaceShapeCopy(result.secondaryShape, lang);
    const summaries = getMetricSummary(result, lang);
    const quality = result.quality ?? deriveLegacyQuality(result);
    const mix = getTopShapeMix(result);
    const rankedShapes = getRankedShapes(result);
    const theme = getShapeTheme(result.faceShape);
    const isPortraitImage = imageAspectRatio < 0.92;

    useEffect(() => {
        const image = new window.Image();
        image.onload = () => {
            if (image.naturalWidth > 0 && image.naturalHeight > 0) {
                setImageAspectRatio(image.naturalWidth / image.naturalHeight);
            }
        };
        image.src = result.imageDataUrl;
    }, [result.imageDataUrl]);

    const labels = useMemo(
        () => ({
            title: isKo ? "AI 얼굴형 분석" : "AI Face Analysis",
            subtitle: isKo ? "FACIAL ARCHITECTURE REPORT" : "FACIAL ARCHITECTURE REPORT",
            confidence: isKo ? "신뢰도" : "Confidence",
            readScore: isKo ? "해석 점수" : "Read Score",
            primaryShape: isKo ? "주요 얼굴형" : "Face Shape",
            coreMetrics: isKo ? "핵심 지표" : "Key Metrics",
            structureRead: isKo ? "골든 비율 분석" : "Golden Ratio Analysis",
            hairstyle: isKo ? "추천 헤어스타일" : "Hair Direction",
            eyewear: isKo ? "안경 프레임" : "Eyewear",
            contour: isKo ? "메이크업 팁" : "Makeup Tips",
            share: isKo ? "공유" : "Share",
            save: isKo ? "이미지 저장" : "Save",
            widthRatio: isKo ? "가로 폭 비율" : "Width Ratios",
            verticalRatio: isKo ? "상중하 비율" : "Vertical Ratios",
            manualFrame: isKo ? "수동 보정 프레임 적용" : "Manual Frame Applied",
            confidenceRead: isKo ? "결과 해석" : "Result Read",
            classificationConfidence: isKo ? "결과 일관성" : "Result Consistency",
            measurementQuality: isKo ? "측정 안정성" : "Measurement Stability",
            imageQuality: isKo ? "사진 상태" : "Photo Quality",
            frameQuality: isKo ? "프레임 상태" : "Frame Quality",
            improve: isKo ? "정확도 개선 포인트" : "Accuracy Improvements",
            primaryMix: isKo ? "주 형태" : "Primary Blend",
            secondaryMix: isKo ? "보조 형태" : "Secondary Blend",
            confidenceMeaningTitle: isKo ? "신뢰도는 정답 확률이 아닙니다." : "Confidence is not a correctness probability.",
            shapeRanking: isKo ? "가깝게 읽힌 순서" : "Closest Reads",
            whyThisResult: isKo ? "왜 이렇게 읽혔는지" : "Why This Result",
            mixedRead: isKo ? "혼합형 판독" : "Mixed Read",
            dominantRead: isKo ? "단일형에 가까움" : "Closer to a Single Type",
        }),
        [isKo]
    );

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const overlayContour = linePath(result.overlay.contour, true);
    const overlayStroke = result.overlay.frameSource === "manual" ? "#dc2626" : "black";

    const facialFeaturePaths = [
        { points: result.overlay.leftEyebrow ?? [], color: "rgba(0, 0, 0, 0.3)", width: 0.3, close: false },
        { points: result.overlay.rightEyebrow ?? [], color: "rgba(0, 0, 0, 0.3)", width: 0.3, close: false },
        { points: result.overlay.leftEye ?? [], color: "rgba(0, 0, 0, 0.4)", width: 0.25, close: true },
        { points: result.overlay.rightEye ?? [], color: "rgba(0, 0, 0, 0.4)", width: 0.25, close: true },
        { points: result.overlay.mouthOuter ?? [], color: "rgba(0, 0, 0, 0.4)", width: 0.25, close: true },
    ].filter((item) => item.points.length > 1);

    const precisionGuides = [
        { points: result.overlay.foreheadWidth, label: isKo ? "이마" : "Forehead" },
        { points: result.overlay.cheekboneWidth, label: isKo ? "광대" : "Cheek" },
        { points: result.overlay.jawWidth, label: isKo ? "턱폭" : "Jaw" }
    ];

    const professionalMetrics = [
        { label: isKo ? "세로 : 가로 비율" : "Length : Width", value: `1 : ${result.metrics.faceLengthToWidth.toFixed(2)}`, bar: Math.min(result.metrics.faceLengthToWidth / 1.8, 1) * 100 },
        { label: isKo ? "이마 : 하관 비율" : "Forehead : Jaw", value: result.metrics.foreheadToJaw.toFixed(2), bar: Math.min(result.metrics.foreheadToJaw / 1.3, 1) * 100 },
        { label: isKo ? "안면 대칭점" : "Facial Symmetry", value: `${result.metrics.symmetry}%`, bar: result.metrics.symmetry }
    ];

    const confidenceMetrics = [
        {
            label: labels.classificationConfidence,
            value: formatPercent(quality.classification),
            bar: quality.classification,
            description: isKo
                ? "1순위 얼굴형의 점수와 2순위와의 간격이 얼마나 안정적인지입니다."
                : "How stable the top face-shape read is against the runner-up.",
        },
        {
            label: labels.measurementQuality,
            value: formatPercent(quality.measurement),
            bar: quality.measurement,
            description: isKo
                ? "같은 프레임으로 다시 재도 비율값이 크게 흔들리지 않을 가능성입니다."
                : "How likely the measured ratios remain stable when the same frame is re-read.",
        },
        {
            label: labels.imageQuality,
            value: formatPercent(quality.image),
            bar: quality.image,
            description: isKo
                ? "정면성, 선명도, 조명, 얼굴 점유율을 합친 사진 상태입니다."
                : "Combined photo state from pose, sharpness, lighting, and face coverage.",
        },
        {
            label: labels.frameQuality,
            value: formatPercent(quality.frame),
            bar: quality.frame,
            description: isKo
                ? "이마, 옆선, 턱 프레임이 실제 바깥 외곽을 얼마나 잘 감싸는지입니다."
                : "How well the forehead, side, and chin frame wraps the real outer contour.",
        },
    ];

    const mixSummary = isKo
        ? `${shapeCopy.name} 베이스에 ${secondaryCopy.name} 요소가 같이 읽힌 결과입니다.`
        : `This reads as a ${shapeCopy.name} base with ${secondaryCopy.name} traits layered in.`;

    const confidenceMeaning = isKo
        ? `현재 ${result.confidence}%는 "${shapeCopy.name}가 맞을 확률"이 아니라, 사진 상태·프레임 상태·결과 일관성을 합친 종합 해석 점수입니다.`
        : `The current ${result.confidence}% is not the probability that "${shapeCopy.name}" is correct. It combines photo quality, frame quality, and result consistency.`;

    const readModeLabel = mix.secondaryShare >= 35 || quality.margin < 72 ? labels.mixedRead : labels.dominantRead;
    const readModeText = isKo
        ? mix.secondaryShare >= 35 || quality.margin < 72
            ? `주 형태 ${shapeCopy.name}에 ${secondaryCopy.name} 특징이 꽤 함께 남아 있습니다.`
            : `${shapeCopy.name} 쪽으로 비교적 또렷하게 기운 결과입니다.`
        : mix.secondaryShare >= 35 || quality.margin < 72
          ? `${secondaryCopy.name} traits still remain noticeably inside the ${shapeCopy.name} read.`
          : `This leans relatively cleanly toward ${shapeCopy.name}.`;

    const interpretationReasons = [
        isKo
            ? result.metrics.faceLengthToWidth > 1.48
                ? `세로 : 가로 비율이 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}라 길이감이 분명해서 긴형 계열 점수가 같이 올라갑니다.`
                : result.metrics.faceLengthToWidth < 1.2
                  ? `세로 : 가로 비율이 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}라 길이가 짧게 읽혀 둥근형·각진형 쪽으로 무게가 실립니다.`
                  : `세로 : 가로 비율이 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}라 길이감이 중간대여서 극단적인 긴형·둥근형보다는 중간형 판독에 가깝습니다.`
            : result.metrics.faceLengthToWidth > 1.48
              ? `The length-to-width ratio is 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}, so longer-face reads remain active.`
              : result.metrics.faceLengthToWidth < 1.2
                ? `The length-to-width ratio is 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}, so shorter rounder reads stay in play.`
                : `The length-to-width ratio is 1 : ${result.metrics.faceLengthToWidth.toFixed(2)}, which keeps the read in the middle range instead of an extreme long or short type.`,
        isKo
            ? result.metrics.foreheadToJaw > 1.08
                ? `이마 : 턱 비율이 ${result.metrics.foreheadToJaw.toFixed(2)}라 상부 폭이 조금 더 강해서 하트형 성분이 일부 섞입니다.`
                : result.metrics.foreheadToJaw < 0.95
                  ? `이마 : 턱 비율이 ${result.metrics.foreheadToJaw.toFixed(2)}라 하관 폭이 더 강하게 읽혀 배형·각진형 쪽 점수를 밀어 올립니다.`
                  : `이마 : 턱 비율이 ${result.metrics.foreheadToJaw.toFixed(2)}라 상하 폭 밸런스가 비슷해서 타원형·각진형 판독에 유리합니다.`
            : result.metrics.foreheadToJaw > 1.08
              ? `The forehead-to-jaw ratio is ${result.metrics.foreheadToJaw.toFixed(2)}, so upper-face width still adds some heart-type influence.`
              : result.metrics.foreheadToJaw < 0.95
                ? `The forehead-to-jaw ratio is ${result.metrics.foreheadToJaw.toFixed(2)}, so the lower face reads stronger and supports pear or square traits.`
                : `The forehead-to-jaw ratio is ${result.metrics.foreheadToJaw.toFixed(2)}, which keeps forehead and jaw width relatively balanced.`,
        isKo
            ? result.metrics.jawAngle < 120
                ? `턱 각도가 ${Math.round(result.metrics.jawAngle)}°라 하악각 존재감이 있어 각진형 요소가 붙습니다.`
                : result.metrics.jawAngle > 132
                  ? `턱 각도가 ${Math.round(result.metrics.jawAngle)}°라 턱선이 부드럽게 읽혀 둥근형·타원형 쪽 점수가 올라갑니다.`
                  : `턱 각도가 ${Math.round(result.metrics.jawAngle)}°라 각짐과 부드러움이 중간이라 보조 형태가 같이 남습니다.`
            : result.metrics.jawAngle < 120
              ? `The jaw angle is ${Math.round(result.metrics.jawAngle)}°, so the mandibular presence keeps square traits active.`
              : result.metrics.jawAngle > 132
                ? `The jaw angle is ${Math.round(result.metrics.jawAngle)}°, which reads softer and helps rounder or oval traits.`
                : `The jaw angle is ${Math.round(result.metrics.jawAngle)}°, so it sits between angular and soft and leaves room for a secondary read.`,
    ];

    const qualityFlagCopy: Record<FaceShapeQualityFlag, string> = {
        ambiguous_shape: isKo ? "1순위와 2순위 얼굴형 점수 차가 아직 작습니다." : "The top two face-shape candidates are still close.",
        low_pose: isKo ? "정면 각도와 좌우 수평을 더 맞추면 판별력이 올라갑니다." : "A straighter, more level front-facing photo will improve classification.",
        low_sharpness: isKo ? "사진 선명도가 낮아 턱선과 헤어라인 경계가 약합니다." : "The photo is too soft, which weakens jawline and hairline boundaries.",
        low_lighting: isKo ? "조명을 더 고르게 맞추면 이마와 턱 경계 판독이 좋아집니다." : "More even lighting will improve forehead and jaw boundary reading.",
        low_coverage: isKo ? "얼굴이 화면에서 조금 더 크게 차지하면 측정 안정성이 올라갑니다." : "A tighter face crop will improve measurement stability.",
        low_frame_alignment: isKo ? "이마·옆선·턱 프레임을 한 번 더 맞추면 측정 품질이 올라갑니다." : "Refining the forehead, side frame, and chin will improve measurement quality.",
        low_hairline: isKo ? "헤어라인 경계가 불안정합니다. 머리를 넘기거나 빛을 균일하게 해보세요." : "The hairline boundary is unstable. Push hair back or use more even light.",
    };

    const qualityInsights = quality.flags.slice(0, 4).map((flag) => qualityFlagCopy[flag]);

    if (typeof result.overlay.hairlineReliability === "number") {
        professionalMetrics.push({
            label: isKo ? "헤어라인 신뢰도" : "Hairline Confidence",
            value: `${result.overlay.hairlineReliability}%`,
            bar: result.overlay.hairlineReliability,
        });
    }

    const verticalThirds = [
        { label: isKo ? "상안부" : "Upper", value: `${Math.round(result.metrics.upperThird)}%` },
        { label: isKo ? "중안부" : "Middle", value: `${Math.round(result.metrics.middleThird)}%` },
        { label: isKo ? "하안부" : "Lower", value: `${Math.round(result.metrics.lowerThird)}%` }
    ];

    const traitPills = [
        result.metrics.faceLengthToWidth >= 1.34
            ? isKo ? "세로 인상 우세" : "Length-led"
            : result.metrics.faceLengthToWidth <= 1.2
              ? isKo ? "가로 인상 우세" : "Width-led"
              : isKo ? "길이-폭 균형" : "Balanced span",
        result.metrics.foreheadToJaw > 1.08
            ? isKo ? "상부 폭 강조" : "Upper width"
            : result.metrics.foreheadToJaw < 0.95
              ? isKo ? "하부 폭 강조" : "Lower width"
              : isKo ? "상하 폭 균형" : "Width balance",
        result.metrics.jawAngle < 120
            ? isKo ? "선명한 하악각" : "Angular jaw"
            : result.metrics.jawAngle > 132
              ? isKo ? "부드러운 턱선" : "Soft jaw"
              : isKo ? "중간 각도 턱선" : "Moderate jaw",
    ];

    const heroMetrics = [
        {
            label: isKo ? "메인 판독" : "Primary Read",
            value: shapeCopy.name,
            note: `${mix.primaryShare}%`,
        },
        {
            label: isKo ? "보조 성향" : "Secondary Trait",
            value: secondaryCopy.name,
            note: `${mix.secondaryShare}%`,
        },
        {
            label: isKo ? "해석 점수" : "Read Score",
            value: formatPercent(result.confidence),
            note: isKo ? "정답 확률 아님" : "Not probability",
        },
        {
            label: isKo ? "프레임 소스" : "Frame Source",
            value: result.overlay.frameSource === "manual" ? (isKo ? "수동 보정" : "Manual") : (isKo ? "자동 추정" : "Auto"),
            note: typeof result.overlay.hairlineReliability === "number" ? `${isKo ? "헤어라인" : "Hairline"} ${result.overlay.hairlineReliability}%` : "Mesh",
        },
    ];

    const precisionTiles = [
        {
            label: isKo ? "세로 : 가로" : "Length : Width",
            value: `1 : ${result.metrics.faceLengthToWidth.toFixed(2)}`,
            note:
                result.metrics.faceLengthToWidth >= 1.48
                    ? isKo ? "긴형 쪽으로 기웁니다." : "Leans long."
                    : result.metrics.faceLengthToWidth <= 1.2
                      ? isKo ? "짧은형 쪽으로 기웁니다." : "Leans short."
                      : isKo ? "중간 길이대입니다." : "Sits in the middle range.",
        },
        {
            label: isKo ? "이마 : 턱" : "Forehead : Jaw",
            value: result.metrics.foreheadToJaw.toFixed(2),
            note:
                result.metrics.foreheadToJaw > 1.08
                    ? isKo ? "상부 폭이 더 강합니다." : "Upper width leads."
                    : result.metrics.foreheadToJaw < 0.95
                      ? isKo ? "하부 폭이 더 강합니다." : "Lower width leads."
                      : isKo ? "폭 균형이 가깝습니다." : "Widths stay balanced.",
        },
        {
            label: isKo ? "턱 각도" : "Jaw Angle",
            value: `${Math.round(result.metrics.jawAngle)}°`,
            note:
                result.metrics.jawAngle < 120
                    ? isKo ? "각진 감이 있습니다." : "More angular."
                    : result.metrics.jawAngle > 132
                      ? isKo ? "곡선감이 강합니다." : "More curved."
                      : isKo ? "중간 강도입니다." : "Moderate definition.",
        },
        {
            label: isKo ? "대칭성" : "Symmetry",
            value: `${result.metrics.symmetry}%`,
            note: isKo ? "정면성 포함" : "Front alignment included",
        },
    ];

    const qualityHeadline =
        quality.classification >= 80 && quality.frame >= 72
            ? isKo
                ? "결과를 읽는 구조는 꽤 안정적입니다."
                : "The read itself is structurally stable."
            : quality.margin < 65 || mix.secondaryShare >= 35
              ? isKo
                  ? "단일형보다 혼합형으로 읽는 편이 더 정확합니다."
                  : "This is better read as a mixed type than a single hard label."
              : isKo
                ? "결과는 유효하지만 사진과 프레임 품질 영향을 받고 있습니다."
                : "The result is valid, but still sensitive to photo and frame quality.";

    const styleSections = [
        {
            title: labels.hairstyle,
            number: "01",
            items: shapeCopy.hairstyle,
            tint: "rgba(255,255,255,0.06)",
        },
        {
            title: labels.eyewear,
            number: "02",
            items: shapeCopy.eyewear,
            tint: "rgba(255,255,255,0.04)",
        },
        {
            title: labels.contour,
            number: "03",
            items: shapeCopy.contour,
            tint: "rgba(255,255,255,0.03)",
        },
    ];

    const handleShare = async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: `${labels.title} - ${shapeCopy.name}`,
                    text: shapeCopy.summary,
                    url: shareUrl,
                });
                return;
            } catch (error) {
                if ((error as Error).name === "AbortError") return;
            }
        }
        try {
            await navigator.clipboard.writeText(shareUrl);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
        } catch { }
    };

    const handleDownloadImage = async () => {
        if (!cardRef.current) return;
        setDownloading(true);
        try {
            const mod = await import("html-to-image");
            const dataUrl = await mod.toPng(cardRef.current, {
                backgroundColor: "#17120f",
                pixelRatio: 2,
                cacheBust: true,
            });
            const link = document.createElement("a");
            link.download = `findcore-face-${result.faceShape}.png`;
            link.href = dataUrl;
            link.click();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2200);
        } finally {
            setDownloading(false);
        }
    };

    const reportId = `FC-FACE-${result.faceShape.toUpperCase()}-${Math.floor(Date.now() / 100000).toString().slice(-4)}`;
    const timestamp = new Date().toLocaleString(lang === 'ko' ? 'ko-KR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="w-full max-w-[1380px] mx-auto flex flex-col gap-6 pb-24">
            {showToast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="rounded-full border border-white/20 bg-black/80 px-6 py-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                                style={{ backgroundColor: theme.accent }}
                            >
                                <Check className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-white">
                                {isKo ? "작업이 완료되었습니다." : "Action completed."}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-black/8 bg-white/72 px-4 py-3 shadow-[0_20px_50px_rgba(33,24,14,0.08)] backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                    <Link
                        href={`/face-shape?lang=${lang}`}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/8 bg-white text-zinc-700 transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </Link>
                    <Link
                        href={`/?lang=${lang}`}
                        className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/8 bg-white text-zinc-700 transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                    </Link>
                    <div className="hidden sm:block">
                        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-400">Face Architecture</p>
                        <p className={`mt-1 text-sm text-zinc-700 ${isKo ? "font-korean break-keep" : "font-serif"}`}>
                            {isKo ? "단일 정답이 아니라 구조 읽기 중심으로 결과를 정리했습니다." : "Rebuilt around structural reading instead of a fake single-label report."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm font-semibold text-zinc-700 transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                    >
                        <Share2 className="w-4 h-4" />
                        <span>{labels.share}</span>
                    </button>
                    <button
                        onClick={handleDownloadImage}
                        disabled={downloading}
                        className="flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50"
                        style={{ backgroundColor: theme.accent }}
                    >
                        {downloading ? (
                            <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Download className="w-4 h-4" />
                        )}
                        <span>{labels.save}</span>
                    </button>
                </div>
            </div>

            <div
                ref={cardRef}
                className="relative w-full overflow-hidden rounded-[40px] border border-black/10 bg-[#17120f] text-[#faf6ef] shadow-[0_40px_120px_rgba(41,28,17,0.28)]"
            >
                <div className="absolute inset-0 opacity-90" style={{ backgroundImage: theme.shellGradient }} />
                <div className="absolute -left-20 top-10 h-72 w-72 rounded-full blur-3xl" style={{ backgroundColor: theme.glow }} />
                <div className="absolute right-[-80px] top-1/3 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_35%)]" />

                <div className="relative flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 md:px-8 md:py-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">Findcore Face Read</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                            <h2 className="font-cinzel text-2xl font-black tracking-[0.26em] text-white">FINDCORE</h2>
                            <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
                                {reportId}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-right">
                        <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                                {isKo ? "판독 모드" : "Read Mode"}
                            </p>
                            <p className={`mt-1 text-sm font-semibold text-white ${isKo ? "font-korean" : ""}`}>{readModeLabel}</p>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/6 px-4 py-2">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                                {isKo ? "생성 시각" : "Generated"}
                            </p>
                            <p className="mt-1 text-sm text-white/80">{timestamp}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 px-5 py-5 md:px-8 md:py-8 xl:grid-cols-[0.96fr_1.04fr]">
                    <div className="space-y-5">
                        <div className="rounded-[32px] border border-white/10 bg-[#f6efe6] p-3 text-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
                            <div
                                className={`relative overflow-hidden rounded-[24px] bg-zinc-100 shadow-inner ${
                                    isPortraitImage ? "mx-auto w-full max-w-[360px] md:max-w-[390px]" : "w-full"
                                }`}
                                style={{ aspectRatio: imageAspectRatio }}
                            >
                                <Image
                                    src={result.imageDataUrl}
                                    alt={labels.title}
                                    fill
                                    priority
                                    unoptimized
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/35" />
                                <svg className="absolute inset-0 h-full w-full opacity-85" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d={overlayContour} fill="rgba(255,255,255,0.04)" stroke={overlayStroke} strokeWidth="0.42" strokeDasharray="1.4 1.6" />
                                    {facialFeaturePaths.map((feature, idx) => (
                                        <path key={idx} d={linePath(feature.points, feature.close)} fill="none" stroke="rgba(17,18,19,0.55)" strokeWidth={feature.width} strokeLinecap="round" />
                                    ))}
                                    {precisionGuides.map((guide, idx) => {
                                        const start = toPercent(guide.points[0]);
                                        const end = toPercent(guide.points[1]);
                                        return (
                                            <g key={idx}>
                                                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.42)" strokeWidth="0.22" strokeDasharray="0.8 0.7" />
                                                <circle cx={start.x} cy={start.y} r="0.45" fill={theme.accent} />
                                                <circle cx={end.x} cy={end.y} r="0.45" fill={theme.accent} />
                                            </g>
                                        );
                                    })}
                                </svg>

                                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                    {traitPills.map((pill) => (
                                        <span
                                            key={pill}
                                            className={`rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md ${isKo ? "font-korean" : ""}`}
                                        >
                                            {pill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white px-4 py-3 shadow-sm">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">{labels.primaryShape}</p>
                                    <p className={`mt-1 text-lg font-semibold text-zinc-900 ${isKo ? "font-korean" : "font-cinzel tracking-wide"}`}>
                                        {shapeCopy.name}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400">{labels.confidenceRead}</p>
                                    <p className={`mt-1 text-sm text-zinc-600 ${isKo ? "font-korean break-keep" : ""}`}>{readModeText}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {precisionTiles.map((tile) => (
                                <div
                                    key={tile.label}
                                    className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-md"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{tile.label}</p>
                                    <p className="mt-3 text-2xl font-semibold text-white">{tile.value}</p>
                                    <p className={`mt-2 text-sm leading-relaxed text-white/60 ${isKo ? "font-korean break-keep" : ""}`}>{tile.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div
                            className="rounded-[32px] p-6 text-zinc-950 shadow-[0_26px_70px_rgba(0,0,0,0.24)] md:p-8"
                            style={{ backgroundImage: theme.heroGradient }}
                        >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-700">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        {labels.subtitle}
                                    </div>
                                    <h1 className={`mt-5 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl ${isKo ? "font-korean" : "font-cinzel"}`}>
                                        {shapeCopy.name}
                                    </h1>
                                    <p className={`mt-3 max-w-2xl text-base leading-relaxed text-zinc-700 ${isKo ? "font-korean break-keep" : "font-serif"}`}>
                                        {shapeCopy.summary}
                                    </p>
                                </div>

                                <div className="rounded-[28px] border border-black/8 bg-black/85 px-6 py-5 text-white shadow-2xl">
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">{labels.readScore}</p>
                                    <p className="mt-2 text-5xl font-black leading-none">{result.confidence}</p>
                                    <p className="mt-2 text-sm text-white/65">{isKo ? "정답 확률 아님" : "not probability"}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {result.overlay.frameSource === "manual" && (
                                    <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700">
                                        {labels.manualFrame}
                                    </span>
                                )}
                                <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700">
                                    {mix.primaryShare}% {labels.primaryMix}
                                </span>
                                <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700">
                                    {mix.secondaryShare}% {labels.secondaryMix}
                                </span>
                            </div>

                            <div className="mt-6 rounded-[26px] border border-black/8 bg-white/72 p-5">
                                <p className={`text-sm leading-relaxed text-zinc-700 ${isKo ? "font-korean break-keep" : ""}`}>{mixSummary}</p>
                                <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10">
                                    <div className="flex h-full">
                                        <div style={{ width: `${mix.primaryShare}%`, backgroundColor: theme.accent }} />
                                        <div className="h-full bg-zinc-900/28" style={{ width: `${mix.secondaryShare}%` }} />
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                                    <span>{shapeCopy.name}</span>
                                    <span>{secondaryCopy.name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {heroMetrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-md"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">{metric.label}</p>
                                    <p className={`mt-3 text-2xl font-semibold text-white ${isKo ? "font-korean" : ""}`}>{metric.value}</p>
                                    <p className="mt-2 text-sm text-white/60">{metric.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 border-t border-white/10 px-5 py-5 md:px-8 md:py-8 xl:grid-cols-[1.05fr_0.95fr]">
                    <div className="space-y-6">
                        <div className="rounded-[30px] border border-white/10 bg-[#f8f3eb] p-6 text-zinc-950 shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">{labels.confidenceRead}</p>
                            <h3 className={`mt-4 text-2xl font-semibold text-zinc-950 ${isKo ? "font-korean" : "font-cinzel"}`}>{qualityHeadline}</h3>
                            <p className={`mt-3 text-sm leading-relaxed text-zinc-600 ${isKo ? "font-korean break-keep" : ""}`}>{confidenceMeaning}</p>

                            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                <div className="rounded-[24px] border border-black/6 bg-white p-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">{labels.shapeRanking}</p>
                                    <div className="mt-4 space-y-4">
                                        {rankedShapes.map((entry) => (
                                            <div key={entry.shape}>
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                                            style={{ backgroundColor: entry.rank === 1 ? theme.accent : "#15110f" }}
                                                        >
                                                            {entry.rank}
                                                        </span>
                                                        <span className={`text-sm font-semibold text-zinc-900 ${isKo ? "font-korean" : ""}`}>
                                                            {getFaceShapeCopy(entry.shape, lang).name}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] font-mono text-zinc-400">{entry.strength}</span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                                                    <div
                                                        className="h-full rounded-full"
                                                        style={{ width: `${entry.strength}%`, backgroundColor: entry.rank === 1 ? theme.accent : "#1c1613" }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[24px] border border-black/6 bg-white p-5">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">{labels.whyThisResult}</p>
                                    <div className="mt-4 space-y-3">
                                        {interpretationReasons.map((text, index) => (
                                            <div key={`${text}-${index}`} className="rounded-2xl bg-zinc-50 px-4 py-3">
                                                <p className={`text-[13px] leading-relaxed text-zinc-600 ${isKo ? "font-korean break-keep" : ""}`}>{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{labels.structureRead}</p>
                            <div className="mt-5 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                                <div className="rounded-[24px] bg-black/18 p-4">
                                    <div className="flex h-4 overflow-hidden rounded-full bg-white/10">
                                        {verticalThirds.map((third, idx) => (
                                            <div
                                                key={third.label}
                                                className="flex items-center justify-center text-[9px] font-semibold uppercase tracking-[0.15em] text-white"
                                                style={{
                                                    width: idx === 0
                                                        ? `${result.metrics.upperThird}%`
                                                        : idx === 1
                                                          ? `${result.metrics.middleThird}%`
                                                          : `${result.metrics.lowerThird}%`,
                                                    backgroundColor: idx === 0 ? theme.accent : idx === 1 ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-3">
                                        {verticalThirds.map((third) => (
                                            <div key={third.label} className="rounded-2xl border border-white/10 bg-white/6 px-3 py-4 text-center">
                                                <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">{third.label}</p>
                                                <p className="mt-2 text-lg font-semibold text-white">{third.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {professionalMetrics.map((metric) => (
                                        <div key={metric.label}>
                                            <div className="mb-2 flex items-end justify-between">
                                                <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{metric.label}</span>
                                                <span className="text-sm font-mono font-semibold text-white">{metric.value}</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${metric.bar}%`, backgroundColor: theme.accent }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 backdrop-blur-md">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{labels.confidence}</p>
                            <h3 className={`mt-4 text-2xl font-semibold text-white ${isKo ? "font-korean" : "font-cinzel"}`}>{labels.confidenceMeaningTitle}</h3>
                            <p className={`mt-3 text-sm leading-relaxed text-white/65 ${isKo ? "font-korean break-keep" : ""}`}>{qualityHeadline}</p>

                            <div className="mt-6 space-y-5">
                                {confidenceMetrics.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="mb-2 flex items-end justify-between gap-4">
                                            <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{metric.label}</span>
                                            <span className="text-sm font-mono font-semibold text-white">{metric.value}</span>
                                        </div>
                                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${metric.bar}%`, backgroundColor: theme.accent }} />
                                        </div>
                                        <p className={`mt-2 text-[13px] leading-relaxed text-white/60 ${isKo ? "font-korean break-keep" : ""}`}>{metric.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {qualityInsights.length > 0 && (
                            <div className="rounded-[30px] border border-white/10 bg-black/18 p-6">
                                <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">{labels.improve}</p>
                                <div className="mt-5 space-y-3">
                                    {qualityInsights.map((text, index) => (
                                        <div key={`${text}-${index}`} className="rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
                                            <p className={`text-[13px] leading-relaxed text-white/68 ${isKo ? "font-korean break-keep" : ""}`}>{text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="rounded-[30px] border border-white/10 bg-[#f8f3eb] p-6 text-zinc-950 shadow-[0_24px_50px_rgba(0,0,0,0.16)]">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">Analysis Summary</p>
                            <p className={`mt-4 text-base leading-relaxed text-zinc-700 ${isKo ? "font-korean break-keep" : "font-serif"}`}>
                                {shapeCopy.summary}
                            </p>
                            <div className="mt-5 space-y-3 border-t border-black/6 pt-5">
                                {summaries.map((text, idx) => (
                                    <div key={idx} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                                        <p className={`text-[13px] leading-relaxed text-zinc-600 ${isKo ? "font-korean break-keep" : ""}`}>{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 px-5 py-5 md:px-8 md:py-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] uppercase tracking-[0.34em] text-white/45">Style Directives</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {styleSections.map((section) => (
                            <div
                                key={section.title}
                                className="rounded-[28px] border border-white/10 p-6 backdrop-blur-md"
                                style={{ backgroundColor: section.tint }}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{section.number}</p>
                                        <h4 className={`mt-2 text-xl font-semibold text-white ${isKo ? "font-korean" : "font-cinzel tracking-wide"}`}>
                                            {section.title}
                                        </h4>
                                    </div>
                                    <div
                                        className="h-12 w-12 rounded-2xl border border-white/10"
                                        style={{ backgroundColor: theme.accent }}
                                    />
                                </div>

                                <ul className="mt-5 space-y-3">
                                    {section.items.map((item) => (
                                        <li key={item} className="rounded-2xl bg-black/14 px-4 py-3 text-sm leading-relaxed text-white/78">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-5 py-5 text-sm text-white/52 md:px-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                            MediaPipe Face Landmarker
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
                            {result.overlay.frameSource === "manual"
                                ? (isKo ? "수동 프레임 보정" : "Manual Frame Corrected")
                                : (isKo ? "자동 프레임" : "Auto Frame")}
                        </span>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">findcore.me</p>
                </div>
            </div>
        </div>
    );
}
