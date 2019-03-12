'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const UglifyJS = require('uglify-es')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3]

  utils.deleteFile(fileDir)

  let count = 1
  const spinner = ora()
  spinner.start()
  spinner.text = 'uglify... \n'

  utils.readFile(cwd, (file, extname) => {
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    if (extname === '.js') {
      let code = fs.readFileSync(file, 'utf8')
      if (utils.createDir(path.dirname(fileName))) {
        let result = UglifyJS.minify(code)
        if (result.error) {
          console.log(chalk.red(result.error))
          return
        }
        fs.writeFileSync(fileName, result.code)
        result = null
        count++
      }
      code = null
    }
    else if (extname === '.json') {
      let code = fs.readFileSync(file, 'utf8')

      if (utils.createDir(path.dirname(fileName))) {
        code = JSON.stringify(JSON.parse(code))
        fs.writeFileSync(fileName, code)
        count++
      }
      code = null
    }
  })

  spinner.stop()

  console.log(chalk.green(`uglify ${count} js files`))
}
