var html = require('adventuretron/html')
var md = require('adventuretron/markdown')

module.exports = {
  en: {
    title: 'Workshop setup',
    verifyDir: {
      buttonText: 'Check Your Workshop Directory'
    },
    error: {
      headerText: 'Something is not quite right!'
    },
    next: {
      headerText: 'Your workshop directory is looking good!',
      descriptionText: md`
        Make sure your workshop is set up correctly by running \`electron .\` inside your workshop directory.
      `,
      buttonText: 'Next challenge!'
    }
  }
}
