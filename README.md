# math-folding ![npm (scoped)](https://img.shields.io/npm/v/@jungleford/math-folding.svg)

Research for number folding algorithms.

## Install

```bash
$ npm install
```

## Usage

For ES6,

```js
import {Constants, FOF, SOF} from '@jungleford/math-folding';
```

For ES5,

```js
var Constants = require('@jungleford/math-folding').Constants;
var FOF = require('@jungleford/math-folding').FOF;
var SOF = require('@jungleford/math-folding').SOF;
```

## Algorithms

Currently I only resolved First-Order Folding (FOF) and Second-Order Folding (SOF).

So far, this bundle includes two algorithms:

1) **Recursive**

   An algorithm that is simple to implement.

1) **Formula**

   A non-recursive algorithm, which needs somewhat a complicate way to understand, especially for SOF.

## Testing

You need a mocha or karma command line utility, for this package, mocha@5.2.0, mocha-webpack@2.0.0-beta.0 and karma@3.1.4 are recommended.

Inline script is available:

```bash
$ npm test
```

or

```bash
$ npm run karma
```

## Related Projects

* [math-folding-react](https://github.com/jungleford/math-folding-react): Web UI to represent the algorithm by using [React JS](https://github.com/facebook/react) and [Material UI](https://github.com/mui-org/material-ui).
* [math-folding-wechat](https://github.com/jungleford/math-folding-wechat): A mobile UI working on WeiXin mini program (微信小程序).
* [simple-utils](https://github.com/jungleford/simple-utils): A set of simple utilities for internal usage.

# Background: 对折序列问题（Number Folding Problem）

The detailed analysis is [here](https://github.com/jungleford/math-folding/tree/master/docs/index.md). (**Chinese edition only**)