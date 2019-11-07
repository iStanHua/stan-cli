// lib/tesseract.js

'use strict'

const Tesseract = require('tesseract.js')

const utils = require('./utils')

module.exports = function () {
  const cwd = process.cwd()
  console.log('tesseract...')

  utils.readFile(cwd, async (file, extname) => {
    if (!extname) return
    extname = extname.toLowerCase()

    if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
      Tesseract.recognize(file)
        .progress(function (p) { console.log('progress', p) })
        .then(function (result) { console.log('result', result) })
    }
  })

  console.log('Tesseract completed.')
}
