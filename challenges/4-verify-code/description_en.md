# Verifying code

In this section, you'll learn to use the `verify-code` module to verify code entered by the user inside the app.

Like in the last challenge, you'll need a `description.md`, `i18n.js`, and an `index.js` file in a new challenge directory named `verify-code`.

## index.js

The index.js file will look very similar to the last one, except for this difference:

We'll use the `verify-code` module instead of `verify-text`.

We'll also execute the user's code using `new Function` to evaluate what their function is returning.

## index.js

Here's how the index.js file will look:

```js
var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var verifyCode = require('adventuretron/verify-code')
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
  
    var inputOptions = uiText.verifyCode
    inputOptions.verify = function verify (answer) {
      try {
        var answerFunction = new Function('return ' + code)()
        var answer = answerFunction()
      } catch (err) {
        // show the error message
      }

      if (answer && answer === 'cool') {
        send('challenges:success', answer)
      } else {
        send('challenges:error', answer)
      }
    }

    function success () {
      return html`<div>
        ${next(nextOptions)}
      </div>`
    }

    function error () {
      return html`<div>
        ${description(challenge, lang)}
        <h2>${uiText.error.headerText}</h2>
        verifyText(inputOptions)
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        verifyText(inputOptions)
      </div>`
    }
  }
}
```

You'll probably note that most of the above code is identical to the code of the last challenge.

This is due to most of the content being extracted out into the `description.md` and `i18n.js` files.

Some of the repetition and boilerplate is unavoidable, but in future versions of Adventuretron we hope to reduce this.

## i18n.js

The content of this challenge's `i18n.js` file is also very similar:

```js
module.exports = {
  en: {
    title: 'Verify text example',
    error: {
      headerText: 'Something went wrong!' 
    },
    next: {
      headerText: 'Next challenge: text input',
      descriptionText: 'Learn about verifying code in the next challenge',
      buttonText: 'Next!'
    },
    verifyCode: {
      headerText: 'Write that returns the string "cool"',
      descriptionText: 'Use the above editor to write your function',
      buttonText: 'Check your answer'
    }
  }
}
```

## description.md

The description.md file can contain any text formatted with markdown that will help the user complete the challenge and learn any necessary contextual information.

Here's an example:

```md
# Create a function that returns the string `cool`

Using the editor below, write a function that returns the word `cool`.
```

## Put it all together

Now that we've reviewed all the contents of this challenge, create the `description.md`, `i18n.js`, & `index.js` files in a directory that is inside the `challenges` directory of your workshop.
