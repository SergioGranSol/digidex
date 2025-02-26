const fs = require('fs');
const PNG = require('pngjs').PNG;
const Jimp = require('jimp');

const fileName = [
  "bakemon_spiral_1009r.png",
  "bakemon_spiral_2009b.png",
  "bakemon_spiral_3009n.png",
  "bakemon_spiral_4009y.png",
  "bakemon_spiral_5009g.png",
  "cherrymon_spiral_1032r.png",
  "cherrymon_spiral_2032b.png",
  "cherrymon_spiral_3032n.png",
  "cherrymon_spiral_4032y.png",
  "cherrymon_spiral_5032g.png",
  "clockmon_spiral_1015r.png",
  "clockmon_spiral_2015b.png",
  "clockmon_spiral_3015n.png",
  "clockmon_spiral_4015y.png",
  "clockmon_spiral_5015g.png",
  "demidevimon_spiral_1021r.png",
  "demidevimon_spiral_2021b.png",
  "demidevimon_spiral_3021n.png",
  "demidevimon_spiral_4021y.png",
  "demidevimon_spiral_5021g.png",
  "frigimon_spiral_1013r.png",
  "frigimon_spiral_2013b.png",
  "frigimon_spiral_3013n.png",
  "frigimon_spiral_4013y.png",
  "frigimon_spiral_5013g.png",
  "gaomon_spiral_1025r.png",
  "gaomon_spiral_2025b.png",
  "gaomon_spiral_3025n.png",
  "gaomon_spiral_4025y.png",
  "gaomon_spiral_5025g.png",
  "gotsumon_spiral_1005r.png",
  "gotsumon_spiral_2005b.png",
  "gotsumon_spiral_3005n.png",
  "gotsumon_spiral_4005y.png",
  "gotsumon_spiral_5005g.png",
  "guardromon_spiral_1012r.png",
  "guardromon_spiral_2012b.png",
  "guardromon_spiral_3012n.png",
  "guardromon_spiral_4012y.png",
  "guardromon_spiral_5012g.png",
  "infermon_spiral_1033r.png",
  "infermon_spiral_2033b.png",
  "infermon_spiral_3033n.png",
  "infermon_spiral_4033y.png",
  "infermon_spiral_5033g.png",
  "keramon_spiral_1004r.png",
  "keramon_spiral_2004b.png",
  "keramon_spiral_3004n.png",
  "keramon_spiral_4004y.png",
  "keramon_spiral_5004g.png",
  "kuwagamon_spiral_1014r.png",
  "kuwagamon_spiral_2014b.png",
  "kuwagamon_spiral_3014n.png",
  "kuwagamon_spiral_4014y.png",
  "kuwagamon_spiral_5014g.png",
  "lilamon_spiral_1030r.png",
  "lilamon_spiral_2030b.png",
  "lilamon_spiral_3030n.png",
  "lilamon_spiral_4030y.png",
  "lilamon_spiral_5030g.png",
  "numemon_spiral_1006r.png",
  "numemon_spiral_2006b.png",
  "numemon_spiral_3006n.png",
  "numemon_spiral_4006y.png",
  "numemon_spiral_5006g.png",
  "peckmon_spiral_1018r.png",
  "peckmon_spiral_2018b.png",
  "peckmon_spiral_3018n.png",
  "peckmon_spiral_4018y.png",
  "peckmon_spiral_5018g.png",
  "piximon_spiral_1026r.png",
  "piximon_spiral_2026b.png",
  "piximon_spiral_3026n.png",
  "piximon_spiral_4026y.png",
  "piximon_spiral_5026g.png",
  "seadramon_spiral_1007r.png",
  "seadramon_spiral_2007b.png",
  "seadramon_spiral_3007n.png",
  "seadramon_spiral_4007y.png",
  "seadramon_spiral_5007g.png",
  "shogungekomon_spiral_1028r.png",
  "shogungekomon_spiral_2028b.png",
  "shogungekomon_spiral_3028n.png",
  "shogungekomon_spiral_4028y.png",
  "shogungekomon_spiral_5028g.png",
  "skullgreymon_spiral_1020r.png",
  "skullgreymon_spiral_2020b.png",
  "skullgreymon_spiral_3020n.png",
  "skullgreymon_spiral_4020y.png",
  "skullgreymon_spiral_5020g.png",
  "skullmeramon_spiral_1024r.png",
  "skullmeramon_spiral_2024b.png",
  "skullmeramon_spiral_3024n.png",
  "skullmeramon_spiral_4024y.png",
  "skullmeramon_spiral_5024g.png",
  "skullsatamon_spiral_1027r.png",
  "skullsatamon_spiral_2027b.png",
  "skullsatamon_spiral_3027n.png",
  "skullsatamon_spiral_4027y.png",
  "skullsatamon_spiral_5027g.png",
  "solarmon_spiral_1003r.png",
  "solarmon_spiral_2003b.png",
  "solarmon_spiral_3003n.png",
  "solarmon_spiral_4003y.png",
  "solarmon_spiral_5003g.png",
  "starmon_spiral_1023r.png",
  "starmon_spiral_2023b.png",
  "starmon_spiral_3023n.png",
  "starmon_spiral_4023y.png",
  "starmon_spiral_5023g.png",
  "sukamon_spiral_1016r.png",
  "sukamon_spiral_2016b.png",
  "sukamon_spiral_3016n.png",
  "sukamon_spiral_4016y.png",
  "sukamon_spiral_5016g.png",
  "sunflowmon_spiral_1019r.png",
  "sunflowmon_spiral_2019b.png",
  "sunflowmon_spiral_3019n.png",
  "sunflowmon_spiral_4019y.png",
  "sunflowmon_spiral_5019g.png",
  "tankmon_spiral_1022r.png",
  "tankmon_spiral_2022b.png",
  "tankmon_spiral_3022n.png",
  "tankmon_spiral_4022y.png",
  "tankmon_spiral_5022g.png",
  "titamon_spiral_1036r.png",
  "titamon_spiral_2036b.png",
  "titamon_spiral_3036n.png",
  "titamon_spiral_4036y.png",
  "titamon_spiral_5036g.png",
  "tsumemon_spiral_1002r.png",
  "tsumemon_spiral_2002b.png",
  "tsumemon_spiral_3002n.png",
  "tsumemon_spiral_4002y.png",
  "tsumemon_spiral_5002g.png",
  "tsunomon_spiral_1001r.png",
  "tsunomon_spiral_2001b.png",
  "tsunomon_spiral_3001n.png",
  "tsunomon_spiral_4001y.png",
  "tsunomon_spiral_5001g.png",
  "tyrannomon_spiral_1010r.png",
  "tyrannomon_spiral_2010b.png",
  "tyrannomon_spiral_3010n.png",
  "tyrannomon_spiral_4010y.png",
  "tyrannomon_spiral_5010g.png",
  "vegiemon_spiral_1017r.png",
  "vegiemon_spiral_2017b.png",
  "vegiemon_spiral_3017n.png",
  "vegiemon_spiral_4017y.png",
  "vegiemon_spiral_5017g.png",
  "whamon_ultimate_spiral_1031r.png",
  "whamon_ultimate_spiral_2031b.png",
  "whamon_ultimate_spiral_3031n.png",
  "whamon_ultimate_spiral_4031y.png",
  "whamon_ultimate_spiral_5031g.png",
  "wizardmon_spiral_1011r.png",
  "wizardmon_spiral_2011b.png",
  "wizardmon_spiral_3011n.png",
  "wizardmon_spiral_4011y.png",
  "wizardmon_spiral_5011g.png",
  "woodmon_spiral_1008r.png",
  "woodmon_spiral_2008b.png",
  "woodmon_spiral_3008n.png",
  "woodmon_spiral_4008y.png",
  "woodmon_spiral_5008g.png"
];

let colorsList = [];
const colorsInTxtFile = fs.readFileSync('coloresNuevos.txt', 'utf-8');
colorsInTxtFile.split(/\r?\n/).forEach(line => {
  if (line.startsWith("rgb")) {
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
  }
});

const changeColor = (r, g, b, a) => {
  for (let i = 0; i < colorsList.length; i++) {
    if (r == colorsList[i].oldColor.r && g == colorsList[i].oldColor.g && b == colorsList[i].oldColor.b) {
      return {
        r: colorsList[i].newColor.r,
        g: colorsList[i].newColor.g,
        b: colorsList[i].newColor.b,
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
  for (let file = 0; file < fileName.length; file++) {
    fs.createReadStream(`resources/${fileName[file]}`)
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
        let image = new Jimp(imageData[0].length, imageData.length, function (err, image) {
          if (err) throw err;
          imageData.forEach((row, y) => {
            row.forEach((color, x) => {
              pixelColor = changeColor(color.r, color.g, color.b, color.a);
              image.setPixelColor(Jimp.rgbaToInt(pixelColor.r, pixelColor.g, pixelColor.b, pixelColor.a), x, y);
            });
          });
          image.write(`resources/recolors/${fileName[file]}`, (err) => {
            if (err) throw err;
          });
        });

      });
  }
}

main();
