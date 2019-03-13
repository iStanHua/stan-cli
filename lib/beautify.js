// lib/beautify.js

'use strict'

const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const ora = require('ora')

const beautify = require('js-beautify').js
const beautify_css = require('js-beautify').css
const beautify_html = require('js-beautify').html

const utils = require('./utils')

const cwd = process.cwd()

let files = {
  js: [],
  css: [],
  html: []
}

function readFile() {
  utils.readFile(cwd, (file, extname) => {
    if (extname === '.js') {
      files['js'].push(file)
    }
    else if (extname === '.css') {
      files['css'].push(file)
    }
    else if (extname === '.html') {
      files['html'].push(file)
    }
  })
}

function beautifyFile(type, fileDir) {
  const spinner = ora()

  spinner.start()
  spinner.text = `processing... \n`

  if (files[type].length == 0) {
    spinner.fail(`There is no ${type} file in the current directory`)
    return
  }

  files[type].forEach(file => {
    let data = fs.readFileSync(file, 'utf8')
    let fileName = file.replace(cwd, cwd + `/${fileDir}`)
    let code = ''
    if (type == 'js') {
      code = beautify(data, {
        indent_size: '1',
        indent_char: '\t',
        max_preserve_newlines: '-1',
        preserve_newlines: false,
        keep_array_indentation: false,
        break_chained_methods: true,
        indent_scripts: 'normal',
        brace_style: 'collapse',
        space_before_conditional: true,
        unescape_strings: false,
        jslint_happy: false,
        end_with_newline: true,
        wrap_line_length: '0',
        indent_inner_html: false,
        comma_first: false,
        e4x: true
      })
    }
    else if (type == 'css') {
      code = beautify_css(data)
    }
    else if (type == 'html') {
      code = beautify_html(data)
    }

    if (utils.createDir(path.dirname(fileName))) {
      fs.writeFileSync(fileName, code)
      spinner.text = `${fileName} created \n`
    }
  })

  spinner.succeed('process completed')

  spinner.stop()
}

module.exports = function (args) {
  // 保存文件名
  let fileDir = args[3]

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
    if (answers.type === 'all') {
      beautifyFile('js', fileDir)
      beautifyFile('css', fileDir)
      beautifyFile('html', fileDir)
    }
    else {
      beautifyFile(answers.type, fileDir)
    }
  })
}