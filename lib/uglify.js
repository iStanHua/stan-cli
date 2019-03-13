// lib/uglify.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const UglifyJS = require('uglify-es')

const utils = require('./utils')
const cwd = process.cwd()

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3]

  utils.deleteFile(fileDir)

  const spinner = ora()
  spinner.start()
  spinner.text = 'processing... \n'

  utils.readFile(cwd, (file, extname) => {
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.js') {
      let code = fs.readFileSync(file, 'utf8')
      if (utils.createDir(path.dirname(fileName))) {
        let result = UglifyJS.minify(code)
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

  spinner.succeed('process completed')

  spinner.stop()
}
