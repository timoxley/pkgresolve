"use strict"

var test = require('tape')
var resolve = require('../')

test('can resolve package from globally installed package', function(t) {
  resolve('fstream-npm').fromGlobal('npm', function(err, path) {
    t.ifError(err)
    t.ok(path)
    t.doesNotThrow(function() {
      t.ok(require(path))
    })
    t.end()
  })
})

test('can resolve package from locally installed package', function(t) {
  resolve('through').from('tape', function(err, path) {
    t.ifError(err)
    t.ok(path)
    t.doesNotThrow(function() {
      t.ok(require(path))
    })
    t.end()
  })
})

test('gets nully value if cannot find package', function(t) {
  resolve('asdasdasd').fromGlobal('npm', function(err, path) {
    t.ifError(err)
    t.ok(path == null) // loose equal
    t.end()
  })
})

test('cannot achieve command injection', function(t) {
  resolve('through').from('tape echo ""; pwd #', function(err, path) {
    t.ok(err)
    t.end()
  })
})


