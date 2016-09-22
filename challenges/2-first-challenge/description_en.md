# Your First Challenge


## Required files

At a minimum, a challenge must have these files:

```sh
example-challenge/
  ├─ description.md
  ├─ i18n.js
  └─ index.js
```

Let's go through each of the files in detail.

## description.md

This markdown file contains the main content for the workshop.

To localize this content, add an underscore followed by the language code to the filename, like this: `description_en.md`.

If you leave the underscore & language code out of the filename, it assumes the content is in English.

You can put any valid markdown in this file.

## i18n.js

The i18n.js file contains all the localization for any text in this challenge outside of the description.

At a minimum, you must include the strings for the title & slug of the challenge and for the next button that's used to progress to the next challenge.

Here's an example:

```js
module.exports = {
  en: {
    title: 'Your First Challenge',
    slug: 'first-challenge',
    next: {
      headerText: 'Next challenge',
      descriptionText: 'On to new adventures!',
      buttonText: 'Next'
    }
  }
}
``` 

### index.js

The index.js file manages all the logic of the challenge. It displays different html based on the state of the user's progress through the challenge.

Here's a  basic example that returns the description and a next button for moving on to the next challenge:

```js
var html = require('adventuretron/html')
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
```

The above example is perfect for an introductory challenge that gives an overview of the workshop and introduces basic concepts.

### Copy code from examples

To create your first challenge, copy the code from the description.md, i18n.js, and index.js examples above into a directory named `first-challenge`.

When you're finished, you should have this file structure inside your workshop's `challenges` directory:

```sh
first-challenge/
  ├─ description.md
  ├─ i18n.js
  └─ index.js
```
