// lib/uglify.js

'use strict'

const fs = require('fs')
const path = require('path')
const terser = require('terser')
const rimraf = require('rimraf')

const utils = require('./utils')

module.exports = function (args) {
  const cwd = process.cwd()

  // 保存文件名
  let fileDir = args[3] || 'build'

  rimraf.sync(fileDir)

  console.log('terser...')

  utils.readFile(cwd, (file, extname) => {
    if (!extname) return
    extname = extname.toLowerCase()

    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.js') {
      let code = fs.readFileSync(file, 'utf8')
      if (utils.createDir(path.dirname(fileName))) {
        let result = terser.minify(code, { mangle: { toplevel: true } })
        if (result.error) {
          console.error(result.error)
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
    console.log(`${fileName} created.`)
  })

  console.log('Terser completed.')
}
