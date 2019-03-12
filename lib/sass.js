'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const ora = require('ora')

const sass = require('node-sass')

const utils = require('./utils')

const cwd = process.cwd()

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3]
  // 输出格式
  let outExt = args[4] || 'css'

  utils.deleteFile(fileDir)

  let count = 1
  const spinner = ora()
  spinner.start()
  spinner.text = 'uglify... \n'

  utils.readFile(cwd, (file, extname) => {
    if (extname === '.scss') {
      let fileName = file.replace(cwd, cwd + `/${fileDir}`)
      outExt = outExt.indexOf('.') > -1 ? outExt : `.${outExt}`
      fileName = replace(extname, outExt)
      let result = sass.renderSync({
        file: file,
        data: '',
        outputStyle: 'compressed',
        outFile: fileName,
        sourceMap: false,
      })

      // if (result.error) {
      //   console.log(chalk.red(result.error))
      //   return
      // }
      // fs.writeFileSync(fileName, result.code)
      result = null
      count++
    }
    code = null
  })

  spinner.stop()

  console.log(chalk.green(`uglify ${count} js files`))
}
