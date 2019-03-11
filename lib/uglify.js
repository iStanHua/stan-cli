'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const UglifyJS = require('uglify-es')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  let fileDir = args[3]

  utils.deleteFile(fileDir)

  let count = 1
  const spinner = ora()
  spinner.start()
  spinner.text = 'uglify... \n'

  utils.readFile(cwd, (file, extname) => {
    if (extname === '.js') {
      let code = fs.readFileSync(file, 'utf8')
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
    }
  })

  spinner.stop()

  console.log(chalk.green(`uglify ${count} js files`))
}
