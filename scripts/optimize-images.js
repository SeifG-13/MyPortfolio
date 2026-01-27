import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '../src/assets/images');

console.log('🖼️  Optimizing images...\n');

const files = fs.readdirSync(imageDir)
  .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

if (files.length === 0) {
  console.log('No PNG/JPG images found in', imageDir);
  process.exit(0);
}

let processed = 0;

for (const file of files) {
  const input = path.join(imageDir, file);
  const outputWebp = input.replace(/\.(png|jpe?g)$/i, '.webp');
  
  try {
    const originalSize = fs.statSync(input).size;
    
    await sharp(input)
      .webp({ quality: 80 })
      .toFile(outputWebp);
    
    const newSize = fs.statSync(outputWebp).size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`✓ ${file} → ${path.basename(outputWebp)}`);
    console.log(`  ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);
    
    processed++;
  } catch (err) {
    console.error(`✗ Error processing ${file}:`, err.message);
  }
}

console.log(`\n✅ Done! Processed ${processed}/${files.length} images.`);
console.log('\n📝 Next steps:');
console.log('1. Update your imports to use .webp files');
console.log('2. Or add fallback with <picture> element for older browsers');