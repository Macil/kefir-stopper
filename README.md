# kefirStopper

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AgentME/kefir-stopper/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/kefir-stopper.svg?style=flat)](https://www.npmjs.com/package/kefir-stopper) [![CircleCI Status](https://circleci.com/gh/AgentME/kefir-stopper.svg?style=shield)](https://circleci.com/gh/AgentME/kefir-stopper)

This is a small javascript library for use with the Kefir library which creates
a Kefir property with a destroy method which causes it to emit an event and end
immediately. This works well with Kefir's `takeUntilBy` method.

Works with Node.js and CommonJS bundlers like Browserify and Webpack.

    yarn add kefir-stopper

## Usage

Examples use ES6, but ES6 is not necessary to use kefirStopper.
([Babel](https://babeljs.io/) is an excellent tool to use to get ES6!)

```javascript
const Kefir = require('kefir');
const kefirStopper = require('kefir-stopper');

const stopper = kefirStopper();

function userHitCancel() {
  stopper.destroy();
}

console.log('Loading...');
Kefir.later(5000, null)
  .takeUntilBy(stopper)
  .onValue(() => console.log('Done.'));
```

A stopper object also has a `stopped` property which is a boolean that starts
as false and is set to true once its `destroy` method is called.

## Types

[Flow](https://flowtype.org/) type declarations for this module are included!
If you are using Flow, they won't require any configuration to use.
