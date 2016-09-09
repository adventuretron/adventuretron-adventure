var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var fileInput = require('adventuretron/file-input')
var next = require('adventuretron/next')

module.exports = {
  i18n: require('./i18n'),
  content: function (params, send) {
    var challenge = params.challenge
    var description = challenge.description[params.language]
    var value

    var inputOptions = {
      headerText: 'Write a module',
      descriptionText: 'Create a module that is a function that returns an object with the property "adventure."',
      verify: verify
    }

    function verify (code) {
      try {
        var answerFunction = new Function('return ' + code)()
        var answer = answerFunction('weee')
      } catch (err) {
        send('challenges:error', {
          answer: {
            output: answer,
            code: code
          },
          error: 'Incorrect!'
        })
      }

      if (answer && answer.adventure && answer.adventure === 'weee') {
        send('challenges:success', { output: answer, code: code })
      } else {
        send('challenges:error', {
          answer: {
            output: answer,
            code: code
          },
          error: 'Incorrect!'
        })
      }
    }

    if (challenge.success) {
      var nextOptions = {
        onclick: function onclick (e) {
          send('challenges:next')
        }
      }

      return html`<div>
        <h1>You did it! The example is over!</h2>
        <p>Thanks for trying out the adventuretron example!</p>
      </div>`
    } else if (challenge.error) {
      return html`<div>
        ${description}
        <h2>Something went wrong!</h2>
        ${JSON.stringify(challenge)}
        ${fileInput(inputOptions)}
      </div>`
    } else {
      return html`<div>
        ${description}
        ${fileInput(inputOptions)}
      </div>`
    }
  }
}
