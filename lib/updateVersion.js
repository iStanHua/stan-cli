// lib/updateVersion.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const shell = require('shelljs')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {

  const spinner = ora()
  spinner.start()
  spinner.text = 'processing...\n'

  try {
    let code = fs.readFileSync(path.join(cwd, 'package.json'))
    code = JSON.parse(code)

    if (code.dependencies) {
      let dependencies = {}
      for (const key in code.dependencies) {
        console.log(key + ':')
        let o = shell.exec(`npm view ${key} version`)
        if (o.code == 0) {
          dependencies[key] = `^${o.stdout.replace('\n', '')}`
        }
        o = null
      }
      code.dependencies = Object.assign({}, dependencies)
      dependencies = null
    }

    if (code.devDependencies) {
      let devDependencies = {}
      for (const key in code.devDependencies) {
        console.log(key + ':')
        let o = shell.exec(`npm view ${key} version`)
        if (o.code == 0) {
          devDependencies[key] = `^${o.stdout.replace('\n', '')}`
        }
        o = null
      }
      code.devDependencies = Object.assign({}, devDependencies)
      devDependencies = null
    }

    fs.writeFileSync(path.join(cwd, 'package-back.json'), JSON.stringify(code))

    code = null

    spinner.succeed('process completed')
  } catch (err) {

    spinner.succeed('package.json not exist')
  }


  spinner.stop()
}
