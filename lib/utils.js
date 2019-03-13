// lib/utils.js

'use strict'

const fs = require('fs')
const path = require('path')

module.exports = {

  /**
   * 递归创建目录
   * @param {String} sourcePath  来源路径
   */
  createDir(sourcePath) {
    if (fs.existsSync(sourcePath)) {
      return true
    } else {
      if (this.createDir(path.dirname(sourcePath))) {
        fs.mkdirSync(sourcePath)
        return true
      }
    }
  },

  /**
   * 读目录中的所有文件包括子目录
   * @param {String} sourcePath    来源路径
   * @param {Function} callback    回调函数
   */
  readFile(sourcePath, callback) {
    fs.readdirSync(sourcePath).forEach(f => {
      if (f.indexOf('node_modules') > -1 || f.indexOf('.idea') > -1 || f.indexOf('.vscode') > -1
        || f.indexOf('.DS_Store') > -1 || f.indexOf('.git') > -1|| f.indexOf('.bundle') > -1) return
      let curPath = path.join(sourcePath, f)
      if (fs.statSync(curPath).isDirectory()) {
        this.readFile(curPath, callback)
      } else {
        typeof callback === 'function' && callback(curPath, path.extname(curPath))
      }
    })
  },

  /**
   * 复制目录中的所有文件包括子目录
   * @param {String} src       需要复制的目录
   * @param {String} dst       复制到指定的目录
   * @param {String} filterExt 过滤文件格式
   * @param {Array} filterList 返回过滤文件列表
   */
  copyFile(src, dst, filterExt, filterList = []) {
    if (!fs.existsSync(dst)) {
      fs.mkdirSync(dst)
    }
    fs.readdirSync(src).forEach((file, index) => {
      let curPath = path.join(src, file)
      let dstPath = path.join(dst, file)
      if (fs.statSync(curPath).isDirectory()) {
        fs.mkdirSync(dstPath)
        this.copyFile(curPath, dstPath, filterExt, filterList)
      } else {
        if (filterExt && path.extname(curPath) === filterExt) {
          filterList.push(curPath)
        }
        else {
          fs.writeFileSync(dstPath, fs.readFileSync(curPath))
        }
      }
    })
  },

  /**
   * 删除目录
   * @param {String} src  目录
   */
  deleteFile(src) {
    if (fs.existsSync(src)) {
      fs.readdirSync(src).forEach((file, index) => {
        var curPath = path.join(src, file)
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteFile(curPath)
        } else {
          fs.unlinkSync(curPath)
        }
      })
      fs.rmdirSync(src)
    }
  },

  /**
   * 字符串转驼峰式
   * @param {String} str 带_的字符串
   */
  stringToCamel(str) {
    if (!str) return ''
    return str.replace(/_(\w)/g, function ($, $1) {
      return $1.toUpperCase()
    })
  }
}