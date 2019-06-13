# math-folding ![npm (scoped)](https://img.shields.io/npm/v/@jungleford/math-folding.svg)

Research for number folding algorithms.

## Install

```bash
$ npm install
```

# Background: 对折序列问题（Number Folding Problem）

You can read a detailed analysis (Chinese edition only) at [here](https://github.com/jungleford/math-folding-react).

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

* [simple-utils](https://github.com/jungleford/simple-utils): A set of simple utilities for internal usage.