const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "src/images/origin";
const outputDir = "src/images/webp";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(
    outputDir,
    path.parse(file).name + ".webp"
  );

  sharp(inputPath)
    .resize(1920) // 최대 1920px
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => console.log(`${file} 변환 완료`))
    .catch(err => console.error(err));
});
