# Create a workshop

In this section we'll create the project directory and files for an Adventuretron workshop.

We'll create the files automatically using the Adventuretron command-line tool, but first let's take a look at the files to see what they are and what they are for.

## What files & directories?

The bare minimum required for an Adventuretron workshop are these files & directories:

```sh
adventuretron-example/
├─ index.html
├─ main.js
├─ renderer.js
├─ style.css
├─ i18n/
│  └─ en.json
├─ challenges/
    └─ example-challenge/
        ├─ description.md
        ├─ i18n.js
        └─ index.js
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

In this file you'll need the `adventuretron/renderer` module, and you can use whatever css methods your prefer. We recommend & use to use [csskit](https://github.com/csskit/csskit) and you can see basic usage of that in the `style.css` section.

Here's what the renderer.js file looks like by default:

```js
var path = require('path')
var createApp = require('adventuretron/renderer')

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

## style.css

The main css file for your workshop.

To get the base Adventuretron styles you'll import them like so:

```
@import "adventuretron";
```

And use a css bundler like [csskit](https://npmjs.com/csskit) to bundle the css dependencies.

You can add any custom styles to this file that you want.

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

```sh
example-challenge/
├─ description.md
├─ i18n.js 
└─ index.js
```

In the next section we'll create the first challenge.

To move on to the next section, it's your turn to create the minimum required files for a workshop.

## Instructions

To complete this section of the workshop, you will:

- Create directories & files using `adventuretron new`
- Install dependencies
- Review code from examples

### Run `adventuretron new` in your workshop directory

First, install the Adventuretron command-line tool:

```
npm i -g adventuretron
```

Next create a new directory and move into it:

```
mkdir adventure
cd adventure
```

Now create your new Adventuretron workshop:

```
adventuretron new
```

### Review code from examples

Take a look through the example code created after running `adventuretron new`. It should look like the examples above.

### Review npm scripts

The `adventuretron new` command adds `build`, `watch`, and `start` scripts to your package.json file. Here they are so you know what to expect:

```json
"scripts": {
  "build": "csskit bundle style.css -o bundle.css",
  "watch": "csskit watch style.css -o bundle.css",
  "start": "npm run build && electron ."
},
```

#### `build` script

Run the following:

```sh
npm run build
```

You should see output similar to this:

```sh
> adventuretron-example@0.0.1 build /path/to/your/workshop/directory/adventuretron-example
> csskit bundle style.css -o bundle.css
```

#### `watch` script

Run the following:

```sh
npm run watch
```

You should see output similar to this:

```sh
> adventuretron-example@0.0.1 build /path/to/your/workshop/directory/adventuretron-example
> csskit watch style.css -o bundle.css
```

#### `start` script

```sh
npm run start
```

You should see output similar to the following:

```sh
> adventure@1.0.0 start /Users/sdv/workspace/adventuretron/tmp/adventure
> npm run build && electron .

> adventure@1.0.0 build /Users/sdv/workspace/adventuretron/tmp/adventure
> csskit bundle style.css -o bundle.css
```

## Check your work

Once you've followed the above instructions, test your work by clicking the **Check Your Workshop Directory** button below and selecting your directory.
