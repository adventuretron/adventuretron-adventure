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

    return html`<div>
      ${description(challenge, lang)}
    </div>`
  }
}
