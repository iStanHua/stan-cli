'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')
const imageminSvgo = require('imagemin-svgo')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = async function (args) {
  let fileDir = args[3]

  utils.deleteFile(fileDir)

  const spinner = ora()
  spinner.start()
  spinner.text = 'imagemin...\n'

  let data = await imagemin([`${cwd}/**/*.{jpg,png}`], `${cwd}/${fileDir}`, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8]
      }),
      // imageminSvgo({
      //   plugins: [{
      //     addAttributesToSVGElement: {
      //       attributes: [{
      //         xmlns: 'http://www.w3.org/2000/svg'
      //       }]
      //     }
      //   }]
      // }),
      imageminWebp()
    ]
  })

  spinner.stop()

  console.log(chalk.green(`imagemin ${data.length} files`))
}
