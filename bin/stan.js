#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const pkg = require('../package.json')

const beautifyLib = require('../lib/beautify')

program
  .version(pkg.version)
  .usage('[command] [options]')
  .option('init', '`stan init` is deprecated, please use `stan f`')
  .option('f', 'js css html format')
  .option('c', 'create a project')
  .option('format', 'js css html format')
  .option('create', 'create a project')
  .parse(process.argv)


if (program.init) {
  console.log(chalk.red('`stan init` is deprecated, please use `stan f`'))
}

if (program.format || program.f) {
  beautifyLib(process.argv)
}

// if (program.create || program.c) {
//   createLib(process.argv)
// }