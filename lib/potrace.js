// lib/potrace.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')
const Posterizer = require('potrace/lib/Posterizer')

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
      let posterizer = new Posterizer()
      posterizer.loadImage(file, (err) => {
        if (err) spinner.fail(err)

        posterizer.setParameters({
          threshold: 200,
          steps: 5,
          blackOnWhite: true,
          rangeDistribution: Posterizer.RANGES_AUTO
        })

        if (utils.createDir(path.dirname(fileName))) {
          fs.writeFileSync(fileName, posterizer.getSVG())
          spinner.text = `${fileName} created \n`
        }
      })
    }
  })

  spinner.succeed('process completed')

  spinner.stop()
}
