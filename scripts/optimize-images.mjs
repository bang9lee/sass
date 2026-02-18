
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const performOptimization = async () => {
    const directories = ['public/images', 'public/images/aesthetics'];

    for (const dir of directories) {
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const inputPath = path.join(dir, file);
                const outputPath = path.join(dir, path.basename(file, ext) + '.webp');

                console.log(`Optimizing: ${file} -> ${path.basename(outputPath)}`);

                try {
                    await sharp(inputPath)
                        .webp({ quality: 80 }) // Good balance of quality and size
                        .resize(dir.includes('aesthetics') ? 600 : 800, null, { // Max width 800 for general, 600 for aesthetics
                            withoutEnlargement: true,
                            fit: 'inside'
                        })
                        .toFile(outputPath);

                    console.log(`✓ Created: ${outputPath}`);

                    // Optional: Remove original if we are sure (ignoring for safety now, user can delete manually or we can do it after confirmation)
                    // fs.unlinkSync(inputPath); 
                } catch (error) {
                    console.error(`✗ Failed to optimize ${file}:`, error);
                }
            }
        }
    }
};

performOptimization();
