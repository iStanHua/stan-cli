// lib/sass.js

'use strict'

const fs = require('fs')
const path = require('path')
const sass = require('node-sass')
const rimraf = require('rimraf')

const utils = require('./utils')

module.exports = function (args) {
  const cwd = process.cwd()

  // 保存文件名
  let fileDir = args[3] || 'build'
  // 输出格式
  let outExt = args[4] || 'css'

  rimraf.sync(fileDir)

  console.log('sass...')

  utils.readFile(cwd, (file, extname) => {
    if (!extname) return
    extname = extname.toLowerCase()

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
        console.error(result)
      }

      console.log(`${fileName} created.`)
      result = null
    }
  })

  console.log('Sass completed.')
}
