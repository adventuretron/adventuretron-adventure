var read = require('read-directory')

module.exports = function (challengepath, callback) {
  read(challengepath, function (err, files) {
    var errors = []

    if (err) {
      errors.push(err)
      callback(errors)
    }

    callback(null, files)
  })
}
