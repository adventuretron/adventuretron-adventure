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

The main.js file is required by electron to create a window. Adventuretron wraps the usual electron code with basic defaults.

Unless you're workshop has unique needs, you can have a simple main.js file exactly like this:

```js
var path = require('path')
var adventuretron = require('adventuretron/main')

var app = adventuretron({
  title: 'Example adventuretron workshop',
  index: 'file://' + path.join(__dirname, 'index.html')
})
```

[Learn more about electron's main process.](http://jlord.us/essential-electron/#main-process)

## renderer.js

The renderer.js file is what controls the UI of your workshop. This is the entry point for the interactive elements of your workshop.

[Learn more about electron's renderer process.](http://jlord.us/essential-electron/#main-process)

In this file ou'll need the `adventuretron/renderer` module, and you can use whatever css methods your prefer. We recommend & like to use [sheetify](https://github.com/stackcss/sheetify) and you can see basic usage of that in the example below:

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

It's important to provide the paths to the i18n and challenge directories, as well as the languages for the localization that your workshop provides.

## i18n directory

In the i18n directory you'll provide JSON files with localization for each language that your workshop supports.

This is where you define the UI text that's used throughout your workshop.

Files should be named with the pattern `{language-code}.json`, like `en.json`.

Here's the minimum necessary example for English:

```json
{
  "title": "Example adventuretron workshop",
  "challenges": "Challenges"
}
```

## challenges directory

The challenges directory is where you'll put all the challenges of the workshop.

Each challenge will be a directory. The directory names will be used internally as slugs that represent the challenges.

At a minimum, a challenge must have these files:

```
- description.md
- i18n.js 
- index.js
```

In the next section we'll create the first challenge.

To move on to the next section, it's your turn to create the minimum required files for a workshop.

## Instructions

Use the example code above for the necessary files, and create:

- Your workshop directory
- Inside the workshop directory, create:
  - **main.js** file
  - **renderer.js** file
  - **index.html** file
  - **challenges** directory
  - **i18n** directory
    - **en.json** file

Once you've created those files and copy/pasted in the code from the above examples, test your work by clicking the **Check Workshop Directory** button below.
