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

    var verifyDirOptions = uiText.verifyDir
    verifyDirOptions.files = ['main.js', 'renderer.js', 'index.html', 'challenges', 'i18n', 'i18n/en.json']

    verifyDirOptions.verify = function verify (err, ok) {
      console.log('err', err)
      if (err && !ok) {
        send('challenges:error', err)
      } else {
        send('challenges:success')
      }
    }

    function success () {
      var nextOptions = uiText.next
      nextOptions.onclick = function () {
        send('challenges:next')
      }

      return html`<div>
        ${next(nextOptions)}
      </div>`
    }

    function error () {
      return html`<div>
        <h2>${uiText.error.headerText}</h2>
        <p>${challenge.error.message}</p>
        ${description(challenge, lang)}
        ${verifyDir(verifyDirOptions)}
        <h2>${uiText.error.headerText}</h2>
        <p>${challenge.error.message}</p>
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
