#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

const dtsFile = path.resolve(`bin/pixi-sound.d.ts`);
let dtsContent = fs.readFileSync(dtsFile, 'utf8');
dtsContent = dtsContent.replace(/namespace pixisound/g, 'module PIXI.sound');
fs.writeFileSync(dtsFile, dtsContent, 'utf8');
