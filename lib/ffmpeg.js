// lib/ffmpeg.js

'use strict'

const ffmpeg = require('fluent-ffmpeg')

const utils = require('./utils')

module.exports = function (args) {
  const cwd = process.cwd()

  // 输入格式
  let inExt = args[3] || 'avi'
  // 输出格式
  let outExt = args[4] || 'mp4'

  console.log('ffmpeg...')

  utils.readFile(cwd, (file, extname) => {
    if (!extname) return
    if (extname.toLowerCase() === `·${inExt}`) {
      let fileName = file.replace(`.${inExt}`, `_f_.${outExt}`)

      ffmpeg(file)
        .on('start', (res) => {
          console.log(`Spawned Ffmpeg with command: ${res}`)
        })
        .on('progress', (progress) => {
          console.log(`Progressing: ${progress.percent}% done`)
        })
        .on('end', () => {
          console.log('Ffmpeg completed.')
        })
        .on('error', function (err) {
          console.error(err)
        })
        .save(fileName)
    }
  })

}
