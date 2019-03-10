'use strict'

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const beautify = require('js-beautify').js
const beautify_css = require('js-beautify').css
const beautify_html = require('js-beautify').html

const utils = require('../lib/utils')

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

function js() {
  if (jsFiles.length == 0) {
    console.log(chalk.red('`There is no js file in the current directory`'))
    return
  }

  jsFiles.forEach(js => {
    fs.readFile(js, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = js.replace(cwd, cwd + 'jsFormat')
      if (utils.create(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify(data))
        console.log(`${fileName} created`)
      }
    })
  })
}

function css() {
  if (sccFiles.length == 0) {
    console.log(chalk.red('`There is no css file in the current directory`'))
    return
  }
  sccFiles.forEach(css => {
    fs.readFile(css, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = css.replace(cwd, cwd + 'cssFormat')
      if (utils.create(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify_css(data))
        console.log(`${fileName} created`)
      }
    })
  })
}

function html() {
  if (htmlFiles.length == 0) {
    console.log(chalk.red('`There is no html file in the current directory`'))
    return
  }
  htmlFiles.forEach(css => {
    fs.readFile(html, 'utf8', (err, data) => {
      if (err) console.log(err)
      let fileName = html.replace(cwd, cwd + 'htmlFormat')
      if (utils.create(path.dirname(fileName))) {
        fs.writeFileSync(fileName, beautify_html(data))
        console.log(`${fileName} created`)
      }
    })
  })
}




module.exports = function (args) {
  console.log(args)

  readFile()

  const questions = [{
    type: 'list',
    name: 'type',
    message: 'what do you want to format ?',
    choices: [
      'js',
      'css',
      'html'
    ],
  }]

  inquirer.prompt(questions).then(function (answers) {
    switch (answers.type) {
      case 'js':
        js()
        break
      case 'css':
        css()
        break;
      case 'html':
        html()
        break
      default:
        break
    }
  })
}