var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var codeInput = require('adventuretron/code-input')
var next = require('adventuretron/next')
var description = require('adventuretron/description')

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

    return html`<div>
      ${description(challenge, lang)}
      ${next(nextOptions)}
    </div>`
  }
}
