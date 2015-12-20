# unstar-gist

[![NPM version](https://img.shields.io/npm/v/unstar-gist.svg)](https://www.npmjs.com/package/unstar-gist)
[![Build Status](https://travis-ci.org/shinnn/unstar-gist.svg?branch=master)](https://travis-ci.org/shinnn/unstar-gist)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/unstar-gist.svg)](https://coveralls.io/github/shinnn/unstar-gist)
[![Dependency Status](https://david-dm.org/shinnn/unstar-gist.svg)](https://david-dm.org/shinnn/unstar-gist)
[![devDependency Status](https://david-dm.org/shinnn/unstar-gist/dev-status.svg)](https://david-dm.org/shinnn/unstar-gist#info=devDependencies)

Unstar a [gist](https://gist.github.com/)

```javascript
const unstarGist = require('unstar-gist');

unstarGist('2790533', {token: 'xxxx'}).then(response => {
  response.statusCode; //=> 204
  console.log('Unstarred a gist: https://gist.github.com/2790533');
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install unstar-gist
```

## API

```javascript
const unstarGist = require('unstar-gist');
```

### unstarGist(*gistId* [, *options*])

*gistId*: `String` (a [gist](https://help.github.com/articles/about-gists/) ID, for example [https://gist.github.com/tim/34309](https://gist.github.com/tim/34309) → `'34309'`)  
*options*: `Object` ([`gh-get` options](https://github.com/shinnn/gh-get#options))  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It makes an [API](https://developer.github.com/v3/) request to [unstar a gist by the authenticated user](https://developer.github.com/v3/gists/#unstar-a-gist), and returns a promise.

The promise will be [*fulfilled*](https://promisesaplus.com/#point-26) with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_http_incomingmessage) object if successful, otherwise [*rejected*](https://promisesaplus.com/#point-30) with an error.

```javascript
unstarGist('ab12852099', {token: 'xxxxxx'}).catch(err => {
  err.message;
  //=> '404 Not Found (Gist not found: https://gist.github.com/ab12852099)'
});

unstarGist('2790533', {token: 'invalid_token'}).catch(err => {
  err.message;
  //=> '401 Unauthorized (Bad credentials)'
});
```

## Related Projects

* [is-gist-starred](https://github.com/shinnn/is-gist-starred) (Check if you have starred a given gist or not) 
* [star-gist](https://github.com/shinnn/star-gist) (Star a gist)

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
