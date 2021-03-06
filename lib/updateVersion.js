// lib/updateVersion.js

'use strict'

const fs = require('fs')
const path = require('path')
const packageJson = require('package-json')


module.exports = async function () {
  const cwd = process.cwd()

  console.log('Update Version..')

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
          count++
          console.info(`update ${key} version`)
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
          count++
          console.info(`update ${key} version`)
        }
      }
      code.devDependencies = Object.assign({}, devDependencies)
      devDependencies = null
    }

    fs.writeFileSync(path.join(cwd, 'package-back.json'), JSON.stringify(code))

    code = null

    console.log(`Updates ${count} packages.`)
  } catch (err) {
    console.error('package.json not exist.', err)
  }
}
