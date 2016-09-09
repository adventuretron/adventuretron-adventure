var fs = require('fs')
var path = require('path')
var html = require('adventuretron/html')
var markdown = require('adventuretron/markdown')
var codeInput = require('adventuretron/code-input')
var next = require('adventuretron/next')

var initialCode = `function fun () {
  return ''
}`

module.exports = {
  i18n: require('./i18n'),
  content: function (params, send) {
    var challenge = params.challenge
    var description = challenge.description[params.language]
    var value = challenge.answer && challenge.answer.code ? challenge.answer.code : initialCode

    var inputOptions = {
      headerText: 'Write a function',
      descriptionText: 'The function must return the string "this is fun".',
      value: value,
      editor: { hideOutput: true },
      verify: verify
    }

    function verify (code) {
      try {
        var answerFunction = new Function('return ' + code)()
        var answer = answerFunction()
      } catch (err) {
        send('challenges:error', {
          answer: {
            output: answer,
            code: code
          },
          error: 'Incorrect!'
        })
      }

      if (answer && answer === 'this is fun') {
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
        <h1>You did it!</h2>
        ${next(nextOptions)}
      </div>`
    } else if (challenge.error) {
      return html`<div>
        ${description}
        <h2>Something went wrong!</h2>
        ${JSON.stringify(challenge)}
        ${codeInput(inputOptions)}
      </div>`
    } else {
      return html`<div>
        ${description}
        ${codeInput(inputOptions)}
      </div>`
    }
  }
}
