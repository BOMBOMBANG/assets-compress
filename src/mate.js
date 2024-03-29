const path = require('path')
const OUTPUT_DIR = path.resolve(__dirname, '../test_out');
const SOURCE_DIR = path.resolve(__dirname, '../test_source');
// console.log(OUTPUT_DIR, SOURCE_DIR)

exports.OUTPUT_DIR = OUTPUT_DIR
exports.SOURCE_DIR = SOURCE_DIR
module.exports = {
  source_Dir: SOURCE_DIR, // 源文件地址
  outputDir: OUTPUT_DIR, // 输出文件路径
  compreses: true, // 是否开启压缩功能
  imgup: false // 是否开启上传功能
}