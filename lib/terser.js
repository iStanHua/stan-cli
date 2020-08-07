// lib/terser.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const terser = require('terser')
const rimraf = require('rimraf')

const utils = require('./utils')
const cwd = process.cwd()

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3] || 'build'

  rimraf.sync(fileDir)

  const spinner = ora()
  spinner.start()
  spinner.text = 'terser... \n'

  utils.readFile(cwd, (file, extname) => {
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.js') {
      let code = fs.readFileSync(file, 'utf8')
      if (utils.createDir(path.dirname(fileName))) {
        let result = terser.minify(code, { mangle: { toplevel: true } })
        if (result.error) {
          spinner.fail(result.error)
          return
        }
        fs.writeFileSync(fileName, result.code)
        result = null
      }
      code = null
    }
    else if (extname === '.json') {
      let code = fs.readFileSync(file, 'utf8')

      if (utils.createDir(path.dirname(fileName))) {
        code = JSON.stringify(JSON.parse(code))
        fs.writeFileSync(fileName, code)
      }
      code = null
    }
    spinner.text = `${fileName} created \n`
  })

  spinner.succeed('Terser completed')

  spinner.stop()
}
