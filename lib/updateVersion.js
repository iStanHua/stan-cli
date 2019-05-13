// lib/updateVersion.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const packageJson = require('package-json')

const cwd = process.cwd()

module.exports = async function (args) {


  const spinner = ora({
    text: 'Update Version...'
  })
  spinner.start()

  try {
    let code = fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')
    code = JSON.parse(code)
    let count = 0
    if (code.dependencies) {
      let dependencies = {}
      for (const key in code.dependencies) {
        let data = await packageJson(key)
        if (data) {
          dependencies[key] = `^${data.version}`
          data = null
          spinner.info(`update ${key} version`)
          count++
        }
      }
      code.dependencies = Object.assign({}, dependencies)
      dependencies = null
    }

    if (code.devDependencies) {
      let devDependencies = {}
      for (const key in code.devDependencies) {
        let data = await packageJson(key)
        if (data) {
          devDependencies[key] = `^${data.version}`
          data = null
          spinner.info(`update ${key} version`)
          count++
        }
      }
      code.devDependencies = Object.assign({}, devDependencies)
      devDependencies = null
    }

    fs.writeFileSync(path.join(cwd, 'package-back.json'), JSON.stringify(code))

    code = null

    spinner.succeed(`Updates ${count} packages`)
  } catch (err) {
    spinner.fail('package.json not exist')
  }


  spinner.stop()
}
