import Constants from './constants';
import Utils from '@jungleford/simple-utils/src/js/utils';

/**
 * Define an array [1, 2, ..., n]` that `n = 2 ^ k`, and a series of methods to compute folding result.
 * Here k is the `power`: given k=1, there are two numbers; given k=2, there are four numbers; given k=3, there are
 * eight numbers... etc.
 *
 * Supported algorithm:
 *   recursive, formula
 *
 * @param power the exponent of the number of the elements.
 * @param original (optional) assign the initial sequence to the folding service.
 *                 If omitted, use the sequence of natural numbers.
 * @constructor
 */
function Folding(power, original) {
  assert(_.isInteger(power) && power > 0, '`power` must be an positive integer.');

  this.power = power;
  this.count = 2 ** power; // n = 2 ^ k
  this.cache = {};
  _.each(Constants.algorithm, alg => {
    this.cache[alg] = {};
  });
  this.reset(original);
}

/**
 * Recursive computing of folding.
 *
 * @param piles a two-dimension array that represents the piles of each step of folding/merging,
 *              and each pile is composed of the current result.
 *              Example: [[x, x], [x, x], [x, x], [x, x]]
 * @param steps a three-dimension array that represents the state of each step during the folding.
 * @return {number[][] | *[][]} the two-dimension array of the merge result.
 *                              Actually it has only one array inside the first level.
 */
function doFoldingByRecursive(piles, steps) {
  if (piles.length === 1) return piles;
  let halfLength = piles.length / 2;

  // Split the piles into half and half.
  let result = [];
  let firstHalf = _.take(piles, halfLength);
  let laterHalf = _.takeRight(piles, halfLength);

  // Reverse the second half piles and then also reverse each pile
  let reversedLaterHalf = _.each(_.reverse(laterHalf), pile => _.reverse(pile));

  // Merge the two halves
  _.each(firstHalf, (unit, index) => {
    result.push(_.concat(unit, reversedLaterHalf[index]));
  });

  // Save each step.
  // Recursive call will change the passed-in `result`, so here must save a full copy.
  steps && steps.push(_.cloneDeep(result));

  // Then folding the result array recursively.
  return doFoldingByRecursive(result, steps);
}

/**
 * Compute the folding result by formula.
 *
 * V(k, 4i-3) = V(k-2, i)
 * V(k, 4i-2) = 2^k - V(k-2, i) + 1
 * V(k, 4i-1) = 2^k - V(k-2, i) + 1
 * V(k, 4i) = V(k-2, i)
 *
 * This algorithm will not save steps.
 *
 * @param power the exponent of the number of the elements.
 * @return {number[]} the array of the folding result.
 */
function doFoldingByFormula(power) {
  assert(typeof power === 'number' && power >= 1, '`power` must larger than 1.\nYour power is: ' + power);

  let result = [];
  let level1Result = [1, 2];

  switch (power) {
    case 1:
      result = level1Result;
      break;
    default:
      let preLevelResult = level1Result;
      for (let level = 2; level <= power; level++) {
        let currentCount = 2 ** level;
        let currentLevelResult = new Array(currentCount);
        _.each(preLevelResult, (number, index) => {
          // Compute the "left" half (the first half)
          let pos = index + 1;
          currentLevelResult[pos - 1] = pos % 2 === 0 ? 2 * preLevelResult[pos - 1] : 2 * preLevelResult[pos - 1] - 1;

          // Compute the "right" half (the later half)
          let mirrorPos = currentCount - pos + 1;
          currentLevelResult[mirrorPos - 1] = pos % 2 === 0 ? currentLevelResult[pos - 1] - 1 : currentLevelResult[pos - 1] + 1;
        });
        preLevelResult = currentLevelResult;
      }
      result = preLevelResult;
  }

  return result;
}

/**
 * Build the original array before computing.
 *
 * @param forceReset (optional) true if you want to reset all internal states when initiating.
 * @return {number[] | *[]} the original array.
 */
Folding.prototype.init = function(forceReset) {
  if (forceReset === true) {
    this.reset(this.original);
  }

  return this.original;
};

/**
 * The value of k
 *
 * @return {number} the exponent of the number of the elements.
 */
Folding.prototype.getPower = function() {
  return this.power;
};

/**
 * The value of n.
 *
 * @return {number} the total count of numbers.
 */
Folding.prototype.getCount = function() {
  return this.count;
};

/**
 * @return {boolean} true if computation is finished.
 */
Folding.prototype.isComputeDone = function() {
  return this.computeDone;
};

/**
 * Private method: reset internal states.
 * ATTENTION: NOT RECOMMEND to call this method directly.
 * Keep this as a private method.
 *
 * @param original (optional) re-assign another initial sequence to the folding service.
 *                 If omitted, use the sequence of natural numbers.
 */
Folding.prototype.reset = function(original) {
  assert(original === undefined || _.isArray(original) && original.length === this.count,
    '`original` must be an array with ' + this.count + ' elements.\nYour `original` is: ' + original);

  this.original = original ?
                 _.cloneDeep(original) : // use a copy of the given array
                 Utils.generateNaturalSequence(this.count); // create [1, 2, ..., n]
  this.final = this.original;
  this.steps = [_.map(this.original, n => [n])];
  this.computeDone = false; // expected to true when computing done.
};

/**
 * Give the result of the first order folding problem.
 *
 * Supported algorithm:
 *   recursive, formula
 *
 * @param algorithm (optional) By default, `recursive` is used.
 * @return {number[] | *[]} the final folding result.
 */
Folding.prototype.compute = function(algorithm) {
  assert(algorithm === undefined || typeof algorithm === 'string',
         '`algorithm` must be a flag defined in `Constants`, or it can be just omitted.\nYour algorithm: ' + algorithm);

  algorithm = algorithm || Constants.algorithm.RECURSIVE;
  if (this.cache[algorithm].result) {
    this.final = this.cache[algorithm].result;
    this.steps = this.cache[algorithm].steps;
    this.computeDone = true;
  } else {
    this.computeDone = false;
  }

  if (this.computeDone) return this.final;

  let result = this.original;
  switch (algorithm) {
    case Constants.algorithm.FORMULA:
      result = doFoldingByFormula(this.power);
      break;
    case Constants.algorithm.RECURSIVE:
    default:
      result = doFoldingByRecursive(this.steps[0], this.steps)[0];
  }
  this.cache[algorithm].result = _.cloneDeep(result);
  this.cache[algorithm].steps = _.cloneDeep(this.steps);
  this.final = result;
  this.computeDone = true;
  return result;
};

/**
 * Give the position of an original number in the final sequence.
 * You must run `compute()` first.
 *
 * @param x the original number from 1 to 2^k.
 * @return {number} the position of an original number in the final sequence.
 */
Folding.prototype.positionOf = function(x) {
  if (!this.computeDone) return 1;

  assert(typeof x === 'number' && x >= 1 && x <= this.count, 'the number `x` must be between 1 and ' + this.count + '\nYour number x is: ' + x);
  return _.indexOf(this.final, x) + 1;
};

/**
 * Give the number of position p in the final sequence.
 * You must run `compute()` first.
 *
 * @param p the position in the final sequence.
 * @return {number | *} the value on the given position.
 */
Folding.prototype.valueOf = function(p) {
  if (!this.computeDone) return 1;

  assert(typeof p === 'number' && p >= 1 && p <= this.count, 'the position `p` must be between 1 and ' + this.count + '\nYour position p is: ' + p);
  return this.final[p - 1];
};

/**
 * You must run `compute()` first.
 *
 * @return {Array} All steps in the process of computation.
 */
Folding.prototype.getSteps = function() {
  return this.steps;
};

export default Folding;