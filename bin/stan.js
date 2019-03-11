#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const pkg = require('../package.json')

const beautifyLib = require('../lib/beautify')
const uglifyLib = require('../lib/uglify')
const imageminLib = require('../lib/imagemin')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('-b, --beautify <path>', 'Beautifier for javascript')
  .option('-u, --uglify <path>', 'A JavaScript parser, mangler/compressor and beautifier toolkit for ES6+')
  .option('-i, --imagemin <path> [options]', 'Minify images seamlessly')
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