import type { FacePoint } from "@/lib/face-shape-analysis-official";

function toPercent(point: FacePoint) {
    return { x: point.x * 100, y: point.y * 100 };
}

export function normalizedLinePath(points: FacePoint[], close = false) {
    if (!points.length) {
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

export function normalizedPairPath(points?: [FacePoint, FacePoint] | null) {
    if (!points) {
        return "";
    }

    const start = toPercent(points[0]);
    const end = toPercent(points[1]);
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
}

export function buildNormalizedFifthGuideXs(guide?: [FacePoint, FacePoint] | null) {
    if (!guide) {
        return [];
    }

    const [left, right] = guide[0].x <= guide[1].x ? guide : [guide[1], guide[0]];
    const width = right.x - left.x;
    if (width <= 0.02) {
        return [];
    }

    return [1, 2, 3, 4].map((step) => left.x + (width * step) / 5);
}
