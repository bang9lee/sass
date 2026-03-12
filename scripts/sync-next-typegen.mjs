import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function ensureDirFor(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function copyOrWrite(sourceRelative, targetRelative, fallback = "export {};\n") {
    const sourcePath = path.join(root, sourceRelative);
    const targetPath = path.join(root, targetRelative);
    ensureDirFor(targetPath);

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        return;
    }

    if (!fs.existsSync(targetPath)) {
        fs.writeFileSync(targetPath, fallback, "utf8");
    }
}

copyOrWrite(".next/dev/types/cache-life.d.ts", ".next/types/cache-life.d.ts");
copyOrWrite(".next/types/routes.d.ts", ".next/types/routes.js.d.ts");
copyOrWrite(".next/dev/types/routes.d.ts", ".next/dev/types/routes.js.d.ts");
