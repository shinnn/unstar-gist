'use strict';

const isGistStarred = require('is-gist-starred');
const starGist = require('star-gist');
const unstarGist = require('.');
const test = require('tape');

process.env.GITHB_TOKEN = '';

test('unstarGist()', t => {
  t.plan(7);

  t.strictEqual(unstarGist.name, 'unstarGist', 'should have a function name.');

  starGist('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST})
  .then(() => unstarGist('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST}))
  .then(response => {
    t.strictEqual(response.statusCode, 204, 'should be resolved with a response object.');
    return isGistStarred('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST});
  })
  .then(starred => t.strictEqual(starred, false, 'should unstar a gist.'))
  .catch(t.fail);

  unstarGist('9'.repeat(99), {token: process.env.TOKEN_FOR_TEST}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      `404 Not Found (Gist not found: https://gist.github.com/${'9'.repeat(99)})`,
      'should fail when it cannot find the gist.'
    );
  }).catch(t.fail);

  unstarGist('908bced575270f6ef80e', {token: 'invalid_token'}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '401 Unauthorized (Bad credentials)',
      'should fail when the token is not valid.'
    );
  }).catch(t.fail);

  unstarGist(1).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '1 is not a string. Expected a gist ID for exmaple https://gist.github.com/tim/34309 -> "34309".',
      'should fail when it takes a non-string argument.'
    );
  }).catch(t.fail);

  unstarGist('').then(t.fail, err => {
    t.strictEqual(
      err.message,
      'Expected a string of gist ID, but received an empty string.',
      'should fail when the first argument is an empty string.'
    );
  }).catch(t.fail);
});
