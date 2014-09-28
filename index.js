"use strict"

var execFile = require('child_process').execFile

module.exports = function(pkgName) {
  return {
    from: function from(from, fn) {
      return module.exports._resolveFrom(from, pkgName, false, fn)
    },
    fromGlobal: function fromGlobal(from, fn) {
      return module.exports._resolveFrom(from, pkgName, true, fn)
    }
  }
}

module.exports._resolveFrom = function resolveFrom(from, pkgName, useGlobal, fn) {
  var cmd = "npm"
  var args = [
    'explore',
    from,
    (useGlobal ? '-g' : ''),
    '--silent',
    '--',
    "node -p \"try {require.resolve('"+pkgName+"')}catch(e) {''}\""
  ]

  execFile(cmd, args, function(err, pkgPath) {
    if (err) return fn(err)
    pkgPath = pkgPath.trim()
    if (!pkgPath) return fn(null, null)
    return fn(null, pkgPath)
  })
}
