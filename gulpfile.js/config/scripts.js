const fs = require('fs')
const path = require('path')
const paths = require("../../package.json").paths;

// Functions
function _readFiles(dir) {
    const obj = {}
  
    fs.readdirSync(dir).forEach(filename => {
      
      const name = path.parse(filename).name
      const filepath = path.resolve(dir, filename)
      const stat = fs.lstatSync(filepath)
      const isFile = stat.isFile()
  
      if (isFile) obj[name.toLowerCase()] = `${dir}${filename}`
  
    })
  
    return obj
}

const entries = _readFiles(`./src/scripts/Views/`)

module.exports = { entries }
