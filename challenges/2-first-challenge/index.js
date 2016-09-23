var html = require('adventuretron/html')
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

    var nextOptions = uiText.next
    nextOptions.onclick = function () {
      send('challenges:next')
    }
  
    var checkFilesOptions = uiText.checkFiles
    checkFilesOptions.files = ['description.md', 'index.js', 'i18n.js']

    checkFilesOptions.verify = function verify (err, ok) {
      if (err && !ok) {
        send('challenges:error', { error: err })
      } else {
        send('challenges:success')
      }
    }
  
    function success () {
      return html`<div>
        ${next(nextOptions)}
      </div>`
    }

    function error () {
      return html`<div>
        ${description}
        <h2>${uiText.error.headerText}</h2>
        ${checkFiles(checkFilesOptions)}
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        ${checkFiles(checkFilesOptions)}
      </div>`
    }
  }
}
