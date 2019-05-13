// lib/ffmpeg.js

'use strict'

const ora = require('ora')
const ffmpeg = require('fluent-ffmpeg')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  // 输入格式
  let inExt = args[3] || 'avi'
  // 输出格式
  let outExt = args[4] || 'mp4'

  const spinner = ora()
  spinner.start()
  spinner.text = 'ffmpeg... \n'

  utils.readFile(cwd, (file, extname) => {
    if (extname === `·${inExt}`) {
      let fileName = file.replace(`.${inExt}`, `_f_.${outExt}`)

      ffmpeg(file)
        .on('start', (res) => {
          console.log(`Spawned Ffmpeg with command: ${res}`)
          spinner.start()
        })
        .on('progress', (progress) => {
          console.log(`Progressing: ${progress.percent}% done`)
        })
        .on('end', () => {
          spinner.succeed('Ffmpeg completed')
          spinner.stop()
        })
        .on('error', function (err) {
          console.log(err)
        })
        .save(fileName)
    }
  })

}
