var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var verifyDir = require('adventuretron/verify-directory')
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

    var verifyDirOptions = uiText.verifyDir
    verifyDirOptions.files = ['description_en.md', 'index.js', 'i18n.js']

    verifyDirOptions.verify = function verify (err, ok) {
      if (err && !ok) {
        send('challenges:error', err)
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
        <h2>${uiText.error.headerText}</h2>
        <p>${challenge.error.message}</p>
        ${description(challenge, lang)}
        <h2>${uiText.error.headerText}</h2>
        <p>${challenge.error.message}</p>
        ${verifyDir(verifyDirOptions)}
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error && challenge.error.message) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        ${verifyDir(verifyDirOptions)}
      </div>`
    }
  }
}
