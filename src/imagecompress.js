var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  const fs = require("fs-extra");
  const { compressImage, compressSvga } = require('./compress');
  const chalk = require("chalk");
  exports.startCompress = function (altasPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const images = getImgFiles(altasPath);
        const svgas = getSvgaFiles(altasPath);
        const imagePArr = images.map((img) => {
            return (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const buffer = yield fs.readFile(img);
                    const result = yield compressImage(buffer, 'builtin');
                    const radio = ((1 - result.byteLength / buffer.byteLength) * 100).toFixed(2);
                    if (result) {
                        fs.writeFileSync(img, result);
                        console.log(chalk.green("压缩图片成功:" + img, `，压缩率：${radio}`));
                    }
                }
                catch (e) {
                    console.log(chalk.red("压缩图片失败:" + img));
                }
            }))();
        });
        const svgaPArr = svgas.map((svga) => {
            return (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const buffer = yield fs.readFile(svga);
                    const result = yield compressSvga(buffer, 'builtin');
                    const radio = ((1 - result.byteLength / buffer.byteLength) * 100).toFixed(2);
                    if (result) {
                        fs.writeFileSync(svga, result);
                        console.log(chalk.green("压缩Svga成功:" + svga, `，压缩率：${radio}`));
                    }
                }
                catch (e) {
                    console.log(chalk.red("压缩Svga失败:" + svga));
                }
            }))();
        });
        yield Promise.all([
            ...imagePArr,
            ...svgaPArr,
        ]);
    });
  };
  function getImgFiles(dir) {
    let fileArr = [];
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const fpath = dir + '/' + file;
            const stat = fs.lstatSync(fpath);
            if (stat.isFile() && /\.jpg|\.png|\.jpeg$/.test(file)) {
                fileArr.push(fpath);
            }
            else if (stat.isDirectory()) {
                fileArr.push(...getImgFiles(fpath));
            }
        });
    }
    return fileArr;
  }
  function getSvgaFiles(dir) {
    let fileArr = [];
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const fpath = dir + '/' + file;
            const stat = fs.lstatSync(fpath);
            if (stat.isFile() && /\.svga$/.test(file)) {
                fileArr.push(fpath);
            }
            else if (stat.isDirectory()) {
                fileArr.push(...getSvgaFiles(fpath));
            }
        });
    }
    return fileArr;
  }
  