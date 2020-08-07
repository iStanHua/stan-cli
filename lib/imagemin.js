// lib/imagemin.js

'use strict'

const fs = require('fs')
const path = require('path')
const execa = require('execa')
const rimraf = require('rimraf')

const mozjpeg = require('mozjpeg')
const pngquant = require('pngquant-bin')
const cwebp = require('cwebp-bin')
const svgo = require('svgo')

const utils = require('./utils')


module.exports = function (args) {

  const cwd = process.cwd()

  // 保存文件名
  let fileDir = args[3] || 'build'
  // 输出格式
  let type = args[4] || ''

  rimraf.sync(fileDir)

  console.log('imagemin...')

  utils.readFile(cwd, async (file, extname) => {
    if (!extname) return
    extname = extname.toLowerCase()
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.svg') {
      await execa(svgo, [file, '-o', fileName])
    }
    else {
      if (type === 'webp') {
        fileName = fileName.replace(extname, '.webp')

        if (utils.createDir(path.dirname(fileName))) {
          fs.writeFileSync(fileName, '')
        }
        await execa(cwebp, [file, '-o', fileName])
      }
      else {
        if (extname === '.png') {
          await execa(pngquant, ['-o', fileName, file])
        }
        else if (extname === '.jpg' || extname === '.jpeg') {
          if (utils.createDir(path.dirname(fileName))) {
            fs.writeFileSync(fileName, '')
          }
          await execa(mozjpeg, ['-outfile', fileName, file])
        }
      }
    }

    console.log(`${fileName} created.`)
  })

  console.log('Imagemin completed.')
}
