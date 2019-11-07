// lib/potrace.js

'use strict'

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const Posterizer = require('potrace/lib/Posterizer')

const utils = require('./utils')

module.exports = function (args) {
  const cwd = process.cwd()

  // 保存文件名
  let fileDir = args[3] || 'build'

  rimraf.sync(fileDir)

  console.log('potrace...')

  utils.readFile(cwd, (file, extname) => {
    if (!extname) return
    extname = extname.toLowerCase()
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.png' || extname === '.jpg' || extname === '.jpeg' || extname === '.bmp') {
      fileName = fileName.replace(extname, '.svg')
      let posterizer = new Posterizer()
      posterizer.loadImage(file, (err) => {
        if (err) console.error(err)

        posterizer.setParameters({
          threshold: 200,
          steps: 5,
          blackOnWhite: true,
          rangeDistribution: Posterizer.RANGES_AUTO
        })

        if (utils.createDir(path.dirname(fileName))) {
          fs.writeFileSync(fileName, posterizer.getSVG())
          console.log(`${fileName} created.`)
        }
      })
    }
  })

  console.log('Potrace completed.')
}
