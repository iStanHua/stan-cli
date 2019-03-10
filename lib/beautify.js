'use strict'

// lib/beautify.js

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')

const beautify = require('js-beautify').js
const beautify_css = require('js-beautify').css
const beautify_html = require('js-beautify').html

const utils = require('./utils')

const cwd = process.cwd()

let jsFiles = []
let sccFiles = []
let htmlFiles = []

function readFile() {
  utils.readFile(cwd, (file, extname) => {
    if (extname === '.js') {
      jsFiles.push(file)
    }
    else if (extname === '.css') {
      sccFiles.push(file)
    }
    else if (extname === '.html') {
      htmlFiles.push(file)
    }
  })
}

function js(fileDir) {
  if (jsFiles.length == 0) {
    console.log(chalk.red('`There is no js file in the current directory`'))
    return
  }

  let count = 1
  const spinner = ora('beautifying js file').start()

  jsFiles.forEach(js => {
    fs.readFile(js, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = js.replace(cwd, cwd + `/${fileDir}`)
      if (utils.createDir(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify(data, {
          "indent_size": "1",
          "indent_char": "\t",
          "max_preserve_newlines": "-1",
          "preserve_newlines": false,
          "keep_array_indentation": false,
          "break_chained_methods": true,
          "indent_scripts": "normal",
          "brace_style": "collapse",
          "space_before_conditional": true,
          "unescape_strings": false,
          "jslint_happy": false,
          "end_with_newline": true,
          "wrap_line_length": "0",
          "indent_inner_html": false,
          "comma_first": false,
          "e4x": true
        }))
        count++
      }
    })
  })
  chalk.green(`beautify ${count} js files`)
  spinner.stop()
}

function css(fileDir) {
  if (sccFiles.length == 0) {
    console.log(chalk.red('`There is no css file in the current directory`'))
    return
  }
  let count = 1
  const spinner = ora('beautifying css file').start()
  sccFiles.forEach(css => {
    fs.readFile(css, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = css.replace(cwd, cwd + `/${fileDir}`)
      if (utils.createDir(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify_css(data))
        count++
      }
    })
  })
  chalk.green(`beautify ${count} css files`)
  spinner.stop()
}

function html(fileDir) {
  if (htmlFiles.length == 0) {
    console.log(chalk.red('`There is no html file in the current directory`'))
    return
  }
  let count = 1
  const spinner = ora('beautifying html file').start()
  htmlFiles.forEach(css => {
    fs.readFile(html, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = html.replace(cwd, cwd + `/${fileDir}`)
      if (utils.createDir(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify_html(data))
        count++
      }
    })
  })
  chalk.green(`beautify ${count} html files`)
  spinner.stop()
}

module.exports = function (args) {
  let fileDir = args[3] || 'dist'

  utils.deleteFile(fileDir)
  
  readFile()

  const questions = [{
    type: 'list',
    name: 'type',
    message: 'what do you want to beautify ?',
    choices: [
      'all',
      'js',
      'css',
      'html'
    ]
  }]

  inquirer.prompt(questions).then(function (answers) {
    switch (answers.type) {
      case 'js':
        js(fileDir)
        break
      case 'css':
        css(fileDir)
        break;
      case 'html':
        html(fileDir)
        break
      default:
        js(fileDir)
        css(fileDir)
        html(fileDir)
        break
    }
  })
}