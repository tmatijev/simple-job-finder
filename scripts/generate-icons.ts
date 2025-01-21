const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 48, 128];

async function generateIcons() {
  const svgBuffer = fs.readFileSync('./public/icon.svg');
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`./public/icon${size}.png`);
  }
}

generateIcons().catch(console.error);

// Make this file a module
export {}; 