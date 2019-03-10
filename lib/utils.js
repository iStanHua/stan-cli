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
      let curPath = path.join(sourcePath, f)
      if (fs.statSync(curPath).isDirectory()) {
        this.readFile(curPath, callback)
      } else {
        typeof callback === 'function' && callback(curPath, path.extname(curPath))
      }
    })
  }
}