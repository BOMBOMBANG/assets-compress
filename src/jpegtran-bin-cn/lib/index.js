const BinWrapper = require('bin-wrapper');
const path = require("path");

const site = process.env.JPEGTRAN_BINARY_SITE ||
	process.env.npm_config_jpegtran_binary_site ||
	'https://npm.taobao.org/mirrors';

const url = `${site}/jpegtran-bin/v6.0.0/vendor/`;

console.log(url)

module.exports = new BinWrapper()
	.src(`${url}macos/jpegtran`, 'darwin')
	.src(`${url}linux/x86/jpegtran`, 'linux', 'x86')
	.src(`${url}linux/x64/jpegtran`, 'linux', 'x64')
	.src(`${url}freebsd/x86/jpegtran`, 'freebsd', 'x86')
	.src(`${url}freebsd/x64/jpegtran`, 'freebsd', 'x64')
	.src(`${url}sunos/x86/jpegtran`, 'sunos', 'x86')
	.src(`${url}sunos/x64/jpegtran`, 'sunos', 'x64')
	.src(`${url}win/x86/jpegtran.exe`, 'win32', 'x86')
	.src(`${url}win/x64/jpegtran.exe`, 'win32', 'x64')
	.src(`${url}win/x86/libjpeg-62.dll`, 'win32', 'x86')
	.src(`${url}win/x64/libjpeg-62.dll`, 'win32', 'x64')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpegtran.exe' : 'jpegtran');
