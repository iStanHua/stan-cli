// lib/tesseract.js

'use strict'

const fs = require('fs')
const path = require('path')
const ora = require('ora')

const Tesseract = require('tesseract.js')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {

  const spinner = ora()
  spinner.start()
  spinner.text = 'processing...\n'

  utils.readFile(cwd, async (file, extname) => {
    if (extname === '.jpg' || extname === '.png') {
      Tesseract.recognize(file)
      .progress(function  (p) { console.log('progress', p)    })
      .then(function (result) { console.log('result', result) })
    }
  })

  spinner.succeed('process completed')

  spinner.stop()
}
