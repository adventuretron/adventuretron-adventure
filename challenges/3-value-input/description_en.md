# Value input

In this section, you'll learn to use the `value-input` module to collect a string of text from a user and verify it.

Like in the last challenge, you'll need a `description.md`, `i18n.js`, and an `index.js` file in a new challenge directory named `value-input`.

## index.js

The index.js file will look very similar to the last one, except for these differences:

- a `success` function
- an `error` function
- an `if / else if / else` statement that checks the users's progress going through the challenge via `challenge.success` and `challenge.error`

Here's how the index.js file will look:

```js
var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var valueInput = require('adventuretron/value-input')
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
  
    function success () {
      return html`<div>
        ${next(nextOptions)}
      </div>`
    }

    function error () {
      return html`<div>
        ${description}
        <h2>${uiText.error.headerText}</h2>
        // checktext
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        // checktext
      </div>`
    }
  }
}

```