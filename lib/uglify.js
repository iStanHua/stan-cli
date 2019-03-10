'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const UglifyJS = require('uglify-es')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  let fileDir = args[3] || 'dist'

  utils.deleteFile(fileDir)

  let count = 1
  const spinner = ora('uglifying js file').start()

  utils.readFile(cwd, (file, extname) => {
    if (extname === '.js') {
      fs.readFile(file, 'utf8', (err, code) => {
        if (err) console.log(err)
        let fileName = file.replace(cwd, cwd + `/${fileDir}`)
        if (utils.createDir(path.dirname(fileName))) {
          let result = UglifyJS.minify(code)
          if (result.error) {
            console.log(chalk.red(result.error))
            return
          }
          fs.writeFileSync(fileName, result.code)
          count++
        }
      })
    }
  })
  chalk.green(`uglify ${count} js files`)
  spinner.stop()
}