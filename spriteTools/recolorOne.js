const fs = require('fs');
const PNG = require('pngjs').PNG;
const Jimp = require('jimp');

const fileName = [
  { name: "saberleomon", code: "39" },
  { name: "breakdramon", code: "42" },
  { name: "diaboromon", code: "49" },
  { name: "plesiomon", code: "55" },
  { name: "megadramon", code: "56" },
  { name: "boltmon", code: "57" },
];
const nameLetter = ["r","b","n","y","g"];

let colorsList = [];
let colorsSet = new Array(4);
const colorsInTxtFile = fs.readFileSync('colors.txt', 'utf-8');
let counter = 0;
colorsInTxtFile.split(/\r?\n/).forEach(line => {
  if (line.startsWith("rgb")) {
    counter++;
    let colorsTmp = line.replace(/ /g, '').replace(/rgb\(/g, '').replace(/\)/g, '').split(",");
    colorsList.push({
      oldColor: {
        r: Number.parseInt(colorsTmp[0]),
        g: Number.parseInt(colorsTmp[1]),
        b: Number.parseInt(colorsTmp[2])
      },
      newColor: {
        r: Number.parseInt(colorsTmp[3]),
        g: Number.parseInt(colorsTmp[4]),
        b: Number.parseInt(colorsTmp[5])
      }
    });
    if (counter % 10 == 0) {
      colorsSet[counter/10 - 1] = colorsList;
      colorsList = [];
    }
  }
});

const changeColor = (r, g, b, a, set) => {
  for (let i = 0; i < colorsSet[set].length; i++) {
    if (r == colorsSet[set][i].oldColor.r && g == colorsSet[set][i].oldColor.g && b == colorsSet[set][i].oldColor.b) {
      return {
        r: colorsSet[set][i].newColor.r,
        g: colorsSet[set][i].newColor.g,
        b: colorsSet[set][i].newColor.b,
        a: a
      }
    }
  }
  return {
    r: r,
    g: g,
    b: b,
    a: a
  };
}

const main = () => {
  let code = 0;
  for (let l = 0; l < fileName.length; l++){
    fs.createReadStream(`resources/${fileName[l].name}_spiral.png`)
    .pipe(new PNG())
    .on('parsed', function () {
      // Read image pixel by pixel and fill array
      let imageData = [];
      let aux = 0;
      for (let y = 0; y < this.height; y++) {
        imageData.push([]);
        for (let x = 0; x < this.width; x++) {
          let idx = (this.width * y + x) << 2;
          imageData[aux].push({
            r: this.data[idx],
            g: this.data[idx + 1],
            b: this.data[idx + 2],
            a: this.data[idx + 3]
          });
        }
        aux++;
      }

      // New image
      let pixelColor = null;
      let image = null;
      for (let i = 0; i < 5; i++){
        image = new Jimp(imageData[0].length, imageData.length, function (err, image) {
          if (err) throw err;
          imageData.forEach((row, y) => {
            row.forEach((color, x) => {
              pixelColor = changeColor(color.r, color.g, color.b, color.a, i);
              image.setPixelColor(Jimp.rgbaToInt(pixelColor.r, pixelColor.g, pixelColor.b, pixelColor.a), x, y);
            });
          });
          image.write(`resources/result/${fileName[l].name}_spiral_${i+1}0${fileName[l].code}${nameLetter[i]}.png`, (err) => {
            if (err) throw err;
          });
        });
      }
    });
  }
}

main();
