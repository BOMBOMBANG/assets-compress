var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const path = require('path');
const fs = require('fs-extra');
const chalk = require("chalk");
const { startCompress } = require('./imagecompress');
const { outputDir } = require('./mate');
const { copyAssets } = require('./copyAssets');
const assets = function (args) {
  return __awaiter(this, void 0, void 0, function* () {
      const { imgmin, imgup } = args;
      const appPath = process.cwd();
      const assetsPathTo = path.resolve(__dirname, outputDir);
      if (fs.existsSync(assetsPathTo)) {
          fs.removeSync(assetsPathTo);
      }
      console.log(`${chalk.yellow(`开始拷贝资源`)}\n`);
      copyAssets();
      if (imgmin) {
          console.log(`${chalk.yellow(`资源开始压缩`)}\n`);
          try {
              console.log('assetsPathTo', assetsPathTo)
              const result = yield startCompress(assetsPathTo);
              if (result) {
                  console.log(`${chalk.yellow(`资源压缩完成`)}\n`);
              }
          }
          catch (e) {
              console.log(`${chalk.red(`资源压缩失败`, e)}\n`);
          }
      }
  });
};
exports.assets = assets;
