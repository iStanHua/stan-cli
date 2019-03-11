'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')
const execa = require('execa')

const pngquant = require('pngquant-bin')
const cwebp = require('cwebp-bin')
const gif2webp = require('gif2webp-bin')
const gifsicle = require('gifsicle')
const jpegRecompress = require('jpeg-recompress-bin')
const svgo = require('svgo')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  let fileDir = args[3]
  let type = args[4] || ''

  utils.deleteFile(fileDir)

  let count = 1
  const spinner = ora()
  spinner.start()
  spinner.text = 'imagemin...\n'

  utils.readFile(cwd, async (file, extname) => {
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.svg') return

    if (type === 'webp') {
      fileName = fileName.replace(extname, '.webp')
      if (utils.createDir(path.dirname(fileName))) {
        fs.writeFileSync(fileName, '')
      }
      if (extname === '.gif') {
        await execa(gif2webp, [file, '-o', fileName])
      }
      else {
        await execa(cwebp, [file, '-o', fileName])
      }
    }
    else {
      if (utils.createDir(path.dirname(fileName))) {
        fs.writeFileSync(fileName, '')
      }
      if (extname === '.png') {
        await execa(pngquant, ['-o', fileName, file])
      }
      else if (extname === '.jpg') {
        await execa(jpegRecompress, ['--quality high', '--min 60', file, fileName])
      }
      else if (extname === '.gif') {
        await execa(gifsicle, ['-o', fileName, file])
      }
    }
    count++
  })

  spinner.stop()

  console.log(chalk.green(`imagemin ${count} files`))
}
