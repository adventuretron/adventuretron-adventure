# Welcome to the adventure

Adventuretron is a tool for creating self-guided workshops that run as desktop apps on MacOS, Windows, & Linux.

In this first section of the workshop we'll go over some background info about Adventuretron. Next we'll take a look at the basics of creating an Adventuretron workshop.

## Work in progress

We're still early in the development of Adventuretron. There are weird APIs and messy rough edges. That's why we're making this workshop: with the hope that you'll try this out, and let us know what makes sense, what was easy, what was challenging, and what was ridiculously wrong.

## Overview

### Features
- i18n support
- cross-platform desktop apps
- make workshops for any topic, not just code

### Why create Adventuretron?

After making [javascripting](https://github.com/sethvincent/javascripting) and running a few nodeschool events, I've found that folks struggle with reading all the instructions in the terminal. In part this can be due to various cross-platform issues with specific versions of node. Additionally, trying to have colorized terminal output that is accessible for everybody seems weirdly difficult.

Electron can help with this. [git-it-electron](https://github.com/jlord/git-it-electron) is a great example of how we can have clear, readable instructions in a cross-platform desktop app that still encourages people to learn using the same tools they'd regularly use doing this kind of work.

### What are you using to build this?

The main dependencies of Adventuretron are [electron](http://electron.atom.io/) & [choo](https://github.com/yoshuawuyts/choo).

## What's next?

In the next challenge we'll get a project directory set up for your first Adventuretron workshop!
