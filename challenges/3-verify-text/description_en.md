# Verifying text

In this section, you'll learn to use the `verify-text` module to collect a string of text from a user and verify it.

Like in the last challenge, you'll need a `description.md`, `i18n.js`, and an `index.js` file in a new challenge directory named `verify-text`.

## index.js

The index.js file will look very similar to the last one, except for these differences:

- a `verify` function
- a `success` function
- an `error` function
- an `if / else if / else` statement that checks the users's progress going through the challenge via `challenge.success` and `challenge.error`

Here's how the index.js file will look:

```js

var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var verifyText = require('adventuretron/verify-text')

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

    var inputOptions = uiText.verifyText
    inputOptions.verify = function verify (answer) {
      if (answer === 'cool') {
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
        ${verifyText(inputOptions)}
      </div>`
    }

    if (challenge.success) {
      return success()
    } else if (challenge.error) {
      return error()
    } else {
      return html`<div>
        ${description(challenge, lang)}
        ${verifyText(inputOptions)}
      </div>`
    }
  }
}
```

Let's break this code up into pieces and examine it.

## The `require` statements

```js
var html = require('adventuretron/html')
var next = require('adventuretron/next')
var description = require('adventuretron/description')
var verifyText = require('adventuretron/verify-text')

var i18n = require('./i18n')
```

The above modules are the minimum required for creating a challenge that verifies a string of text.

The `html` module, which is actually the dependency [bel](https://github.com/shama/bel), creates the HTML that is rendered in the app.

The `next` module is responsible for creating a button that users click to move on to the next challenge.

The `description` module renders the challenge's description in the current language of the user.

The `verifyText` module creates the input form and helps with the validation of the text.

The `i18n` module is the localization object for this challenge. Note that it is requiring the local `i18n.js` file in the same directory.

## The setup

```js
module.exports = {
  i18n: i18n,
  content: function (params, send) {
    var lang = params.language
    var challenge = params.challenge
    var uiText = i18n[lang]
    
    // ... challenge logic/rendering code
  }
}
```

Every challenge is an object that is assigned to `module.exports`.

The two required properties:

- `i18n`, which is a reference to the challenge's `i18n.js` file, 
- `content`, a function that takes a `params` object with all the state of the workshop, and a `send` function that is used to change the state based on a user's actions.

## Options for the `next` module

```js
var nextOptions = uiText.next
nextOptions.onclick = function () {
  send('challenges:next')
}

var inputOptions = uiText.verifyText
```

The `next` module will be passed the `nextOptions` object, which is primarily comprised of the i18n strings from the `next` property in the challenge's `i18n.js` file. We're also setting up an `onclick` method that advances the user to the next challenge when the **Next** button is clicked by calling `send('challenges:next')`.


## Options for the `verifyText` module

The `verifyText` module will be passed the `inputOptions` object. We're using strings from the `i18n.js` file again, and this time instead of an `onclick` method, we're creating a `verify` method.

The `verifyText` module calls this function, and passes the answer that a user provides as the single argument.

Your job is to match that answer against the expected answer, and if it is correct, call `send('challenges:success')`, or if it is incorrect, call `send('challenges:error')`. With each of those `send` calls you'll be passing the answer as the second argument.

In this example we're expecting the answer `cool`, and use an `if/else` statement to make the correct `send` call. 

```js
var inputOptions = uiText.verifyText
inputOptions.verify = function verify (answer) {
  if (answer === 'cool') {
    send('challenges:success', answer)
  } else {
    send('challenges:error', answer)
  }
}
```

## success function

In the `success` function we use the `html` module to return a div that contains the html of the `next` module. Note that we're passing in the `nextOptions` object to `next`.

This is the function that is called if a user successfully completes a challenge.

```js
function success () {
  return html`<div>
    ${next(nextOptions)}
  </div>`
}
```

## error function

In the `error` function we use the `html` module to return the output of the `description` module, the error information from the error, and the output of the `verifyText` module.

This is the function that is called if a user enters an answer incorrectly.

```js
function error () {
  return html`<div>
    ${description(challenge, lang)}
    <h2>${uiText.error.headerText}</h2>
    verifyText(inputOptions)
  </div>`
}
```

## returning appropriate html

Finally, using an `if/else` statement we put together the `success` and `error` functions and the default html output when a challenge is first loaded.

The default HTML output is similar to that of the `error` function, except it is only the `description` and `verifyText` output.

```js
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
```

## i18n.js

In the index.js file we saw many functions that made use of the strings in the `i18n.js` file of this challenge.

Here's how the `i18n.js` file should look:

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
    verifyText: {
      headerText: 'Write the word "cool"',
      descriptionText: 'That\'s all you have to do',
      buttonText: 'Check your answer'
    }
  }
}
```

In this example we only have strings for English. When it is translated to Spanish, for example, we would add an `es` section to this object with all the same properties: `title`, `error`, `next`, `verifyText`, etc.

## description.md

The description.md file can contain any text formatted with markdown that will help the user complete the challenge and learn any necessary contextual information.

Here's an example:

```md
# Type the word `cool`

In this exercise, all you have to do is type the word `cool` into the text box below!
```

## Put it all together

Now that we've reviewed all the contents of this challenge, create the `description.md`, `i18n.js`, & `index.js` files in a directory that is inside the `challenges` directory of your workshop.
