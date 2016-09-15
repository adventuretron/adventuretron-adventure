var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var checkFiles = require('adventuretron/check-files')
var i18n = require('./i18n')

module.exports = {
  i18n: i18n,
  content: function (params, send) {
    var lang = params.language
    var challenge = params.challenge
    var uiText = i18n[lang]

    var checkFilesOptions = {
      files: ['main.js', 'renderer.js', 'index.html', 'challenges', 'i18n', 'i18n/en.json'],
      verify: function (err, ok) {
        if (err && !ok) {
          send('challenges:error', { error: err })
        } else {
          send('challenges:success')
        }
      }
    }

    if (challenge.success) {
      var nextOptions = uiText.next
      nextOptions.onclick = function () {
        send('challenges:next')
      }

      return html`<div>
        ${next(nextOptions)}
      </div>`
    } else if (challenge.error) {
      return html`<div>
        ${description}
        <h2>Something went wrong!</h2>
        ${checkFiles(checkFilesOptions)}
      </div>`
    } else {
      return html`<div>
        ${description(challenge, lang)}
        ${checkFiles(checkFilesOptions)}
      </div>`
    }
    
  }
}
