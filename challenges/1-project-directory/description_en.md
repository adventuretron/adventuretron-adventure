# Create a workshop

In this section we'll create the project directory and files for an Adventuretron workshop.

## What files & directories?

The bare minimum required for an Adventuretron workshop are these files & directories:

```
- index.html
- main.js
- renderer.js
- i18n/
  - en.json
- challenges/
  - example-challenge/
    - description.md
    - i18n.js
    - index.js
```

Let's go through each one in detail:

## index.html

The index.html file is what is served by electron to render your workshop. You might add stylesheets or make other global customizations to the workshop here, but most commonly all you'll need is a file with this content:

```html
<!doctype html>
<html lang="en">
<head>
<title>adventuretron example</title>
<meta charset="utf-8">
<link rel="stylesheet" href="bundle.css">
</head>
<body>
<script src="renderer.js"></script>
</body>
</html>
```

## main.js

```js
var path = require('path')
var adventuretron = require('adventuretron/main')

var app = adventuretron({
  title: 'Example adventuretron workshop',
  index: 'file://' + path.join(__dirname, 'index.html')
})
```

## renderer.js

```js
var path = require('path')
var createApp = require('adventuretron/renderer')
var css = require('sheetify')

css('adventuretron')

var app = createApp({
  defaultLanguage: 'en',
  languages: {
    'en': 'English',
    'es': 'Español'
  },
  i18n: path.join(__dirname, 'i18n'),
  challenges: path.join(__dirname, 'challenges')
})

app.start()
```

## i18n directory

## challenges directory
