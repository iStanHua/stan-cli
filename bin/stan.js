#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const pkg = require('../package.json')

const beautifyLib = require('../lib/beautify')
const uglifyLib = require('../lib/uglify')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('-b, --beautify [options]', 'Beautify js|css|html file')
  .option('-u, --uglify [options]', 'Uglify js file')
  .parse(process.argv)


if (program.beautify) {
  beautifyLib(process.argv)
}

if (program.uglify) {
  uglifyLib(process.argv)
}