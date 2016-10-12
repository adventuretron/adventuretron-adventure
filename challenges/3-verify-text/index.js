var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var readChallenge = require('../../lib/verify-challenge')
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
  
    var verifyOptions = uiText.verifyChallenge

    verifyOptions.verify = function verify (err, ok) {
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
        // verify challenge
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        ${verifyChallenge(verifyOptions)}
      </div>`
    }
  }
}

var assert = require('assert')

function verifyChallenge (options) {
  assert.ok(options, 'adventuretron/verify-directory: options object is required')
  assert.ok(options.buttonText, 'adventuretron/verify-directory: options.buttonText is required')

  var files = options.files
  var headerText = options.headerText
  var buttonText = options.buttonText
  var descriptionText = options.descriptionText

  var prefix = css`
    :host {}

    .dir-finder {
      visibility: hidden;
    }
  `

  var dirFinder = html`<input class="dir-finder" type="file" webkitdirectory onchange=${onchange} />`

  function onclick (e) {
    dirFinder.click()
  }

  function onchange (e) {
    e.preventDefault()
    var dir = e.target.files[0].path
    readChallenge(dir, function (err, files) {
      console.log(err)
    })
  }

  return html`<div class="${prefix} challenge-check-files-input">
    ${headerText ? html`<h2>${headerText}</h2>` : ''}
    ${descriptionText ? html`<p>${descriptionText}</p>` : ''}
    <button onclick=${onclick}>${buttonText}</button>
  </div>`
}
