const { assets } = require("./assets");
const { compreses, imgup } = require("./mate");

const args = process.argv.splice(2);
let argsObj = {
  imgmin: compreses,
  imgup: imgup
}
if (args.length == 1) {
  argsObj.imgmin = 'imgmin' == args[0];
  argsObj.imgup = 'imgup' == args[0];
} else if (args.length == 2) {
  argsObj.imgmin = 'imgmin' == args[0];
  argsObj.imgup = 'imgup' == args[1];
}

const assetsCompress = function() { assets(argsObj)}
module.exports = assetsCompress