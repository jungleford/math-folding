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

### API

#### First Ording Folding (FOF)

<escape>
<table>
  <tr>
    <th>Method</th>
    <th colspan="2">Parameters</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="2">Folding</td>
    <td>power</td>
    <td>(Required) The exponent of the number of the elements.</td>
    <td rowspan="2">Constructor.</td>
  </tr>
  <tr>
    <td>original</td>
    <td>(Optional) Assign the initial sequence to the folding service. If omitted, use the sequence of natural numbers.</td>
  </tr>
  <tr>
    <td>init</td>
    <td>forceReset</td>
    <td>(Optional) True if you want to reset all internal states when initiating.</td>
    <td>Returns the original sequence.</td>
  </tr>
  <tr>
    <td>getPower</td>
    <td></td>
    <td></td>
    <td>Returns the power, i.e. the value of <b>k</b>.</td>
  </tr>
  <tr>
    <td>getCount</td>
    <td></td>
    <td></td>
    <td>Returns the total count of numbers, i.e. the value of <b>n</b>.</td>
  </tr>
  <tr>
    <td>compute</td>
    <td>algorithm</td>
    <td>(Optional) The algorithm this service will use. Currently only "<b>recursive</b>" and "<b>formula</b>" are available. If omitted, "<b>recursive</b>" will be used.</td>
    <td>Returns the final sequence (one-dimension array). The core process of FOF. This method will mutate the internal states. User must call this method first to get the results.</td>
  </tr>
  <tr>
    <td>positionOf</td>
    <td>x</td>
    <td>(Required) The original number from 1 to n, or the object value in the original array.</td>
    <td>Returns the position of an original number or object in the final sequence. User must call <b>compute()</b> first.</td>
  </tr>
  <tr>
    <td>valueOf</td>
    <td>p</td>
    <td>(Required) The position in the final sequence.</td>
    <td>Returns the value on the given position. User must call <b>compute()</b> first.</td>
  </tr>
  <tr>
    <td>getSteps</td>
    <td></td>
    <td></td>
    <td>Returns all steps in the process of computation, this is a three-dimension array. Only avaiable for "<b>recursive</b>" algorithm.</td>
  </tr>
</table>
</escape>

#### Second Ording Folding (SOF)

<escape>
<table>
  <tr>
    <th>Method</th>
    <th colspan="2">Parameters</th>
    <th>Description</th>
  </tr>
  <tr>
    <td rowspan="3">Folding</td>
    <td>power</td>
    <td>(Required) The exponent of the number of the elements.</td>
    <td rowspan="3">Constructor.</td>
  </tr>
  <tr>
    <td>original</td>
    <td>(Optional) Assign the initial squre matrix to the folding service. This argument can be a matrix (two-dimension) or a sequence (one-dimension array). If omitted, use the sequence of natural numbers.</td>
  </tr>
  <tr>
    <td>isFlat</td>
    <td>(Optional) True if "original" is a sequence (one-dimension array).</td>
  </tr>
  <tr>
    <td>init</td>
    <td>forceReset</td>
    <td>(Optional) True if you want to reset all internal states when initiating.</td>
    <td>Returns the original matrix.</td>
  </tr>
  <tr>
    <td>getPower</td>
    <td></td>
    <td></td>
    <td>Returns the power, i.e. the value of <b>k</b>.</td>
  </tr>
  <tr>
    <td>getCount</td>
    <td></td>
    <td></td>
    <td>Returns the total count of numbers, i.e. the value of <b>n</b>.</td>
  </tr>
  <tr>
    <td>getRowCount</td>
    <td></td>
    <td></td>
    <td>Returns the rows count of the result matrix., i.e. the value of <b>2^k</b>.</td>
  </tr>
  <tr>
    <td>compute</td>
    <td>algorithm</td>
    <td>(Optional) The algorithm this service will use. Currently only "<b>recursive</b>" and "<b>formula</b>" are available. If omitted, "<b>recursive</b>" will be used.</td>
    <td>Returns the final sequence (two-dimension array), and you should get the first member (i.e. <b>compute(alg)[0]</b>) as the result. The core process of SOF. This method will mutate the internal states. User must call this method first to get the results.</td>
  </tr>
  <tr>
    <td>positionOf</td>
    <td>x</td>
    <td>(Required) The original number from 1 to n, or the object value in the original matrix.</td>
    <td>Returns the position of an original number or object in the final sequence. User must call <b>compute()</b> first.</td>
  </tr>
  <tr>
    <td>valueOf</td>
    <td>p</td>
    <td>(Required) The position in the final sequence.</td>
    <td>Returns the value on the given position. User must call <b>compute()</b> first.</td>
  </tr>
  <tr>
    <td>getSteps</td>
    <td></td>
    <td></td>
    <td>Returns all steps in the process of computation, this is a three-dimension array. Only avaiable for "<b>recursive</b>" algorithm.</td>
  </tr>
</table>
</escape>

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