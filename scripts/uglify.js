const fs = require('fs');
const UglifyJS = require('uglify-js');

const inputPath = 'bin/pixi-sound.js';
const outputPath = 'bin/pixi-sound.min.js';

const inputContent = fs.readFileSync(inputPath, 'utf8');

const result = UglifyJS.minify(inputContent, {});

fs.writeFileSync(outputPath, result.code, 'utf8');
