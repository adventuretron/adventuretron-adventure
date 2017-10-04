var path = require('path')
var adventuretron = require('adventuretron/renderer')

var app = adventuretron({
  name: 'adventuretron-adventure',
  defaultLanguage: 'en',
  languages: {
    'en': 'English',
    'es': 'Español'
  },
  i18n: path.join(__dirname, 'i18n'),
  challenges: path.join(__dirname, 'challenges')
})

app.start()
