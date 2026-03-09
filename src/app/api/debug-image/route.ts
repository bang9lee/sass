import { readFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_TYPES: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") ?? "4.jpg";

    if (!/^[A-Za-z0-9._-]+$/.test(name)) {
        return new Response("Invalid file name.", { status: 400 });
    }

    const filePath = path.join(process.cwd(), name);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = CONTENT_TYPES[ext];

    if (!contentType) {
        return new Response("Unsupported file type.", { status: 400 });
    }

    try {
        const file = await readFile(filePath);
        return new Response(file, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "no-store",
            },
        });
    } catch {
        return new Response("File not found.", { status: 404 });
    }
}
