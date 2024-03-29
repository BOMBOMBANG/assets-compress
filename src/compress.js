
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const { buffer: imagemin } = require("./imagemin");
const imageminJpegtran = require("./imagemin-jpegtran-cn");
const imageminPngquant = require("./imagemin-pngquant-cn");
const pako = require('pako');
const protobuf = require("protobufjs");
const svgaDescriptor = require('./svgaDescriptor');
const COMPRESS_TYPE = {
  builtin: 'builtin',
  tinypng: 'tinypng',
};
function compressImage(buffer, type = "builtin") {
  try {
      if (!COMPRESS_TYPE[type]) {
          type = COMPRESS_TYPE.builtin;
      }
      switch (type) {
          case COMPRESS_TYPE.builtin:
              return imagemin(buffer, {
                  plugins: [
                      imageminJpegtran(),
                      imageminPngquant({
                          quality: [0.0, 0.99]
                      }),
                  ]
              });
      }
  }
  catch (e) {
      return buffer;
  }
}
exports.compressImage = compressImage;
const ProtoMovieEntity = protobuf.Root
  .fromJSON(svgaDescriptor)
  .lookupType('com.opensource.svga.MovieEntity');
/**
* 压缩Svga
* @author haiyoucuv
* @param {ArrayBuffer}buffer
* @param type
* @return {Promise<boolean|ArrayBuffer>}
*/
function compressSvga(buffer, type = "builtin") {
  return __awaiter(this, void 0, void 0, function* () {
      try {
          // 解析svga
          const data = ProtoMovieEntity.decode(pako.inflate(buffer));
          const { images } = data;
          const ps = Object.keys(images).map((name) => {
              return compressImage(Buffer.from(images[name]), type)
                  .then((opBuffer) => {
                  if (opBuffer) {
                      // const ratio = opBuffer.byteLength / images[name].byteLength;
                      // console.log(`%c恭喜你，${name} 压缩成功，压缩率：${((1 - ratio) * 100).toFixed(2)}%`, 'color:green');
                      data.images[name] = opBuffer;
                  }
                  else {
                      // console.log(`%c很遗憾，${name} 不是png，用 PhotoShop 压缩吧`, 'color:red');
                  }
              });
          });
          // 对svga图片进行压缩
          yield Promise.all(ps);
          // 压缩buffer
          return pako.deflate(ProtoMovieEntity.encode(data).finish());
      }
      catch (e) {
          console.log(e);
          return false;
      }
  });
}
exports.compressSvga = compressSvga;
