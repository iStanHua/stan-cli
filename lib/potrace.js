// lib/potrace.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const potrace = require('potrace')

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
    if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.bmp') {
      fileName = fileName.replace(extname, '.svg')
      potrace.trace(file, {
        threshold: 128
      }, (err, svg) => {
        if (err) spinner.fail(err)
        fs.writeFileSync(fileName, svg)
      })
    }
    spinner.text = `${fileName} created \n`
  })

  spinner.succeed('process completed')

  spinner.stop()
}
