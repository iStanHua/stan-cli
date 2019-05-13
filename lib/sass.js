// lib/sass.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const sass = require('node-sass')
const rimraf = require('rimraf')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3]
  // 输出格式
  let outExt = args[4] || 'css'

  rimraf.sync(fileDir)

  const spinner = ora()
  spinner.start()
  spinner.text = 'sass... \n'

  utils.readFile(cwd, (file, extname) => {
    if (extname === '.scss') {
      let fileName = file.replace(cwd, cwd + `/${fileDir}`)
      outExt = outExt.indexOf('.') > -1 ? outExt : `.${outExt}`
      fileName = fileName.replace(extname, outExt)

      let result = sass.renderSync({
        file: file,
        data: null,
        outputStyle: 'compressed',
        outFile: null,
        sourceMap: false,
      })
      if (result.css) {
        if (utils.createDir(path.dirname(fileName))) {
          fs.writeFileSync(fileName, result.css)
        }
      }
      else {
        spinner.fail(result)
      }

      spinner.text = `${fileName} created \n`
      result = null
    }
  })

  spinner.succeed('Sass completed')

  spinner.stop()
}
