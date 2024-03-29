**因为不可抗力imagemin老是拉不下来，直接保存一个版本出来自己用吧**<br/>
imagemin npm：https://www.npmjs.com/package/imagemin<br/>
git：https://github.com/imagemin/imagemin<br/>
<hr/>
**配置项:**
<pre>
  source_Dir: SOURCE_DIR, // 源文件地址

  outputDir: OUTPUT_DIR, // 输出文件路径
  
  compreses: true, // 是否开启压缩功能
  
  imgup: false, // 是否开启上传功能
</pre>

**使用方法：**
<ol>
<li>pnpm i</li>
<li>根据需要配置好输入输出；或者把需要压缩的文件放到test_source</li>
<li>npm run start</li>
<li>压缩完可以直接在输出文件夹内查看文件（默认在test_out）</li>
</ol>
