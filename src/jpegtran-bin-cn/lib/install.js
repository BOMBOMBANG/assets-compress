const path = require('path');
const binBuild = require('bin-build');
const bin = require('./index.js');

const args = [
	'-copy',
	'none',
	'-optimize',
	'-outfile',
	path.resolve(__dirname, '../test/fixtures/test-optimized.jpg'),
	path.resolve(__dirname, '../test/fixtures/test.jpg'),
];

bin.run(args).then(() => {
	console.log('jpegtran pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('jpegtran pre-build test failed');
	console.info('compiling from source');

	const cfg = [
		'./configure --disable-shared',
		`--prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
	].join(' ');

	try {
		const source = path.resolve(__dirname, '../vendor/source/libjpeg-turbo-1.5.1.tar.gz');
		await binBuild.file(source, [
			'touch configure.ac aclocal.m4 configure Makefile.am Makefile.in',
			cfg,
			'make install',
		]);

		console.log('jpegtran built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
