const fs = require('fs');
const Jimp = require('jimp');

const main = () => {
  fs.readdir('resources/x1', (err, files) => {
    files.forEach(file => {
      Jimp.read(`resources/x1/${file}`).then(image => {
        image.scale(2, Jimp.RESIZE_NEAREST_NEIGHBOR).write(`resources/x2/${file}`);
      });
      Jimp.read(`resources/x1/${file}`).then(image => {
        image.scale(5, Jimp.RESIZE_NEAREST_NEIGHBOR).write(`resources/x5/${file}`);
      });
    });
  });
}

main();