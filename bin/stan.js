#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')

const beautifyLib = require('../lib/beautify')
const uglifyLib = require('../lib/uglify')
const imageminLib = require('../lib/imagemin')
const sassLib = require('../lib/sass')
const potraceLib = require('../lib/potrace')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('-b, --beautify <dir>', 'Beautifier for javascript')
  .option('-u, --uglify <dir>', 'A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+')
  .option('-i, --imagemin <dir> [type]', 'Minify images seamlessly')
  .option('-s, --sass <dir> [outExt]', 'Minify images seamlessly')
  .option('-p, --potrace <dir>', ' PNG, JPEG or BMP images to SVG')
  .parse(process.argv)

if (program.beautify) {
  beautifyLib(process.argv)
}
if (program.uglify) {
  uglifyLib(process.argv)
}
if (program.imagemin) {
  imageminLib(process.argv)
}
if (program.sass) {
  sassLib(process.argv)
}
if (program.potrace) {
  potraceLib(process.argv)
}