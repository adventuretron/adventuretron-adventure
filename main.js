var path = require('path')
var adventuretron = require('adventuretron/main')

adventuretron({
  title: 'Example adventuretron workshop',
  index: 'file://' + path.join(__dirname, 'index.html')
})
