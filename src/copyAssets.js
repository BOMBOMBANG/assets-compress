"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const path = require('path')
const chalk = require("chalk");
const fs = require('fs-extra');
const { source_Dir, outputDir } = require('./mate');
exports.copyAssets = copyAssets;
function copyAssets() {
  // const appPath = process.cwd();
  const assetsPathFrom = path.resolve(__dirname, source_Dir);
  const assetsPathTo = path.resolve(__dirname, outputDir);
  console.log(assetsPathFrom)
  if (fs.existsSync(assetsPathFrom)) {
    if (!fs.existsSync(assetsPathTo)) {
      fs.mkdirsSync(assetsPathTo);
    }
    fs.copySync(assetsPathFrom, assetsPathTo, {
      overwrite: true
    });
    console.log(`${chalk.yellow(`资源拷贝成功,等待压缩`)}\n`);
  } else {
    console.log(`${chalk.red(`警告：${assetsPathFrom}目录不存在！`)}\n`);
  }
  return assetsPathTo;
}