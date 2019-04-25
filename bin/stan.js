#!/usr/bin/env node

const program = require('commander')

const pkg = require('../package.json')

const beautifyLib = require('../lib/beautify')
const uglifyLib = require('../lib/uglify')
const imageminLib = require('../lib/imagemin')
const sassLib = require('../lib/sass')
const potraceLib = require('../lib/potrace')
const tesseractLib = require('../lib/tesseract')
const updateVersionLib = require('../lib/updateVersion')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('-b, --beautify <dir>', 'Beautifier for javascript')
  .option('-u, --uglify <dir>', 'A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+')
  .option('-i, --imagemin <dir> [type]', 'Minify images seamlessly')
  .option('-s, --sass <dir> [outExt]', 'Compile Sass to CSS')
  .option('-p, --potrace <dir>', 'PNG, JPEG or BMP images to SVG')
  .option('-t, --tesseract', 'Tesseract Open Source OCR Engine')
  .option('-v, --updateVersion', 'Update dependent package version')
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
if (program.tesseract) {
  tesseractLib(process.argv)
}
if (program.updateVersion) {
  updateVersionLib(process.argv)
}