import Constants from './constants';
import {Utils, Libs} from '@jungleford/simple-utils';
const assert = Libs.assert;
const _ = Libs._;

/**
 * Define a matrix [[1, 2, ..., 2^k], ..., [..., n]], that `n = 4 ^ k`, and a series of methods to compute folding result.
 * Here k is the `power`: given k=1, there are four numbers; given k=2, there are sixteen numbers; given k=3, there are
 * sixty-four numbers... etc.
 *
 * Supported algorithm:
 *   recursive, formula
 *
 * @param power the exponent of the number of the elements.
 * @param original (optional) assign the initial matrix to the folding service.
 *                 This argument can be a two-dimension or one-dimension array.
 *                 If omitted, use the sequence of natural numbers.
 * @param isFlat (optional) true if `original` is a one-dimension array.
 * @constructor
 */
function Folding(power, original, isFlat) {
  assert(_.isInteger(power) && power > 0, '`power` must be an positive integer.');

  this.power = power;
  this.count = 4 ** power; // n = 4 ^ k
  this.rowCount = 2 ** power;
  this.cache = {};
  _.each(Constants.algorithm, alg => {
    this.cache[alg] = {};
  });
  reset(this, original, isFlat);
}

/**
 * Recursive computing of folding.
 *
 * @param piles a two-dimension array that represents the piles of each step of folding/merging,
 *              and each pile is composed of the current result.
 *              Example: [[x, x], [x, x], [x, x], [x, x]]
 * @param steps a three-dimension array that represents the state of each step during the folding.
 * @return {number[][][] | *[][][]} the three-dimension array of the merge result.
 *                              Actually it has only one two-dimension array inside the first level.
 */
function doFoldingByRecursive(piles, steps) {
  if (piles.length === 1) return piles;
  let halfLength = piles.length / 2;

  /* Step 1: fold the lower half to upper */
  // Split the piles into half and half.
  let result1 = [];
  let firstHalf = _.take(piles, halfLength);
  let laterHalf = _.takeRight(piles, halfLength);

  // Reverse the second half piles and then also reverse each inner pile
  let reversedLaterHalf = _.each(_.reverse(laterHalf), row => _.each(row, column => _.reverse(column)));

  // Merge the two halves
  _.each(firstHalf, (row, rowIndex) => {
    let newFirstHalf = _.map(row, (unit, colIndex) => [...unit, ...reversedLaterHalf[rowIndex][colIndex]]);
    result1.push(newFirstHalf);
  });

  // Save each step.
  // Recursive call will change the passed-in `result`, so here must save a full copy.
  steps && steps.push(_.cloneDeep(result1));

  /* Step 2: fold the right half to left */
  let result2 = [];
  _.each(result1, row => {
    // Split the piles into half and half.
    let firstHalfInRow = _.take(row, halfLength);
    let laterHalfInRow = _.takeRight(row, halfLength);

    // Reverse the second half piles
    let reversedLaterHalfInRow = _.each(_.reverse(laterHalfInRow), unit => {
      return _.reverse(unit); // and then also reverse each unit
    });

    // Merge the two halves
    let nextTurnRows = [];
    _.each(firstHalfInRow, (unit, index) => {
      nextTurnRows.push([...unit, ...reversedLaterHalfInRow[index]]);
    });
    result2.push(nextTurnRows);
  });

  // Save each step.
  // Recursive call will change the passed-in `result`, so here must save a full copy.
  steps && steps.push(_.cloneDeep(result2));

  // Then folding the result array recursively.
  return doFoldingByRecursive(result2, steps);
}

//===== Beginning of formula algorithm
/**
 * Compute how may levels of regular segment groups in current result.
 *
 * @param power the exponent of the number of the elements.
 * @return {number} level count of regular segment groups.
 */
function rsLevelCount(power) {
  let levelCount = 0;
  for (let i = 1; 4 ** (power - i) >= 4; i++) {
    levelCount++;
  }

  return levelCount;
}

function closure(u, f, i) {
  return p => (2 * (f + i) + 1) * u - p + 1;
}

/**
 * Generate a list to represent a Regular Segment Group.
 *
 * @param list an array
 * @param u unit of a regular segment, its length should be 4^i
 * @param f the start position of the first number in a regular segment
 * @param gCount the count of the regular segments, which in a group
 */
function addRegularSegment(list, u, f, gCount) {
  for (let i = 0; i < gCount; i++) {
    list.push({
      from: (f + i) * u + 1,
      to: (f + i + 1) * u,
      next: closure(u, f, i) // must use a closure here, because next(p) is called in the runtime and p will be passed in.
    });
  }
}

/**
 * Build up "Regular Segment Group" mappings.
 * Structure:
 *
 * [{
 *   from: from_position_1,
 *   to: to_position_1,
 *   next: function_to_calculate_next_odd_position
 * }, {
 *   from: from_position_2,
 *   to: to_position_2,
 *   next: function_to_calculate_next_odd_position
 * }]
 *
 * position1 and position2 are positive integers,
 * and position_of_next_odd is a function which returns the succeeded odd of a given even.
 *
 * @param power the exponent of the number of the elements.
 * @return {*[]} an array list of regular segment mappings.
 */
function buildRsgMapping(power) {
  let levelCount = rsLevelCount(power);
  let rsg = [];

  for (let level = 1; level <= levelCount; level++) {
    let from = 2;
    let unit = 4 ** (power - level); // each time to next level: shrink to a lower size of regular segment
    let groupCount;
    if (level === 1) {
      groupCount = 2;
      addRegularSegment(rsg, unit, from, groupCount);
    } else {
      groupCount = 4;
      for (let i = 1; i <= 2 ** (level - 2); i++) {
        addRegularSegment(rsg, unit, from, groupCount);
        let t = level - 3;
        while (t > 0 && i % (2 ** t) !== 0) {
          t--;
        }
        /*
         * next_from = current_from + groupCount + (2 * unit) / unit + (4 * upper_unit + 2 * unit) / unit
         *           = current_from + 4          + 2                 + 4 * upper_unit / unit       + 2
         *           = current_from + 8 + 4 * upper_unit / unit
         *
         * upper_unit depends on the concrete level of upper regular segment, may be one or more bigger level.
         * the upper level one has a 4 times length than current level, and the upper upper one has a 16 times length,
         * and so on.
         */
        from += groupCount + 2 + 4 ** (2 + t) + 2;
      }
    }
  }

  return rsg;
}

/**
 * Build up a list of factors with internal relative sequence for "Non-regular Segment"
 *
 * @param power the exponent of the number of the elements.
 * @return {number[]} an array of even factors with the internal relative indexes
 */
function buildFactorsSequence(power) {
  let evenFactors = Array.from(new Array(2 ** (power - 1)), (val, index) => 2 * (index + 1)); // [2, 4, 6, ..., 2^(k-1)]
  let evenFactorsSequence = [{factor: evenFactors.pop(), index: 1}]; // the internal relative index begins from 1

  /*
   * Calculate the sequence of even factors.
   */
  for (let i = 0; i <= power - 2; i++) { // fetch i numbers from the factors each time
    let temp = _.cloneDeep(evenFactorsSequence); // a copy of previous level of settled
    for (let j = 0; j < 2 ** i; j++) {
      evenFactorsSequence.push({
        factor: evenFactors.pop(),
        index: temp[j].index + 2 ** (power - i - 1) // the middle position in each interval between even factors
      });
    }
  }

  /*
   * Now we can calculate the sequence of odd factors.
   */
  let oddFactorsSequence = [];
  _.each(evenFactorsSequence, even => {
    oddFactorsSequence.push({
      factor: 2 ** power - even.factor + 1,
      index: even.index + 1
    });
  });

  let factorsSequence = [...evenFactorsSequence, ...oddFactorsSequence].sort((f1, f2) => f1.index - f2.index);

  return _.map(factorsSequence, 'factor'); // pick up all factors by sorted indexes
}

/**
 * Build up "Non-regular Segment" mappings.
 * Structure:
 *
 * [{
 *   number: the_number_1,
 *   position: the_absolute_position_1
 * }, {
 *   number: the_number_2,
 *   position: the_absolute_position_2
 * }]
 *
 * @param power the exponent of the number of the elements.
 * @return {*[]} an array list of non-regular segment mappings.
 */
function buildNrsMapping(power) {
  let nrs = []; // NRS has 2^(k+1) numbers
  let base = 2 ** power;
  let factors = buildFactorsSequence(power);

  /*
   * First, calculate all intervals of NRS.
   */
  let levelCount = rsLevelCount(power) - 1; // for Non-regular Segments, do not care about the later half zone
  let intervals = [];
  let offset = 0;

  intervals.push({
    from: offset + 1,
    to: offset + 8
  });

  for (let level = 1; level <= levelCount; level++) {
    for (let i = 0; i < 2 ** (level - 1); i++) {
      let t = level - 1;
      while (t > 0 && i % (2 ** t) !== 0) {
        t--;
      }

      offset += 8 + 4 ** (2 + t);

      intervals.push({
        from: offset + 1,
        to: offset + 8
      });
    }
  }

  /*
   * Second, locate all even/odd numbers in the intervals.
   */
  let i = 0;
  _.each(intervals, interval => {
    for (let j = 2; j < 6; j++) {
      nrs.push({
        number: base * factors[i], // even number
        position: interval.from + j
      });

      nrs.push({
        number: 4 ** power + 1 - base * factors[i], // numbers spaced in-between are summed up to 4^k+1
        position: interval.from + j + (j < 4 ? -2 : 2)
      });

      i++;
    }
  });

  return nrs;
}

/**
 * Compute the folding result by formula.
 * This algorithm will not save steps.
 *
 * @param power the exponent of the number of the elements.
 * @param originalFlat (Optional) the flatted original matrix, which should be a one-dimension array.
 *                     If undefined, use the natural number sequence.
 * @return {number[]} the array of the folding result.
 */
function doFoldingByFormula(power, originalFlat) {
  assert(_.isInteger(power) && power >= 1, '`power` must larger than 1.\nYour power is: ' + power);
  if (originalFlat !== undefined) {
    assert(_.isArray(originalFlat) && originalFlat.length === 4 ** power,
      '`originalFlat` must be an array with ' + (4 ** power) + ' elements.\nYour `originalFlat` is: ' + originalFlat);
  }

  if (power === 1) { // ordinary result for k=1
    return originalFlat ?
           [originalFlat[0], originalFlat[2], originalFlat[3], originalFlat[1]] :
           [1, 3, 4, 2];
  }

  let count = 4 ** power;
  let result = new Array(count);
  let currentPos = 1, nextPos = 1;
  result[currentPos - 1] = 1; // place 1 (or the first object in the original array)
                              // to the first position in the result array.

  let rsg = buildRsgMapping(power); // Regular Segment Groups
  let nrs = buildNrsMapping(power); // Non-regular Segments

  for (let v = 1; v < count; v++) {
    if (v % 2 === 1) {
      /*
       * Odd number
       * use the "symmetry rule" to get the position of the succeeded even number.
       *
       * P(x+1) = 4^k - P(x) + 1
       */
      nextPos = count - currentPos + 1;
    } else {
      /*
       * Even number
       * Look up "Table I" (Regular Segment Group Mapping)
       */
      let rs = _.find(rsg, rs => currentPos >= rs.from && currentPos <= rs.to);
      if (rs) { // the even number exists in a regular segment
        nextPos = rs.next(currentPos);
      } else { // the even number doesn't exist in any regular segment
        /*
         * Look up "Table II" (Non-regular Segment Mapping)
         */
        let s = _.find(nrs, s => v + 1 === s.number); // search the next odd
        nextPos = s.position;
      }
    }

    result[nextPos - 1] = v + 1; // the succeeded number
    currentPos = nextPos; // move forward the pointer of current position
  }

  return originalFlat ? _.map(result, number => originalFlat[number - 1]) : result;
}
//==== End of formula algorithm

/**
 * Private method: reset internal states.
 *
 * @param SOF the folding service.
 * @param original (optional) re-assign another initial sequence to the folding service.
 *                 If omitted, use the matrix of natural numbers.
 * @param isFlat (optional) true if `original` is a one-dimension array.
 */
function reset(SOF, original, isFlat) {
  assert(original === undefined || _.isArray(original) &&
                                   (!isFlat && original.length === SOF.rowCount && original[0].length === SOF.rowCount ||
                                    isFlat === true && original.length === SOF.count),
    '`original` must be a matrix with ' + SOF.rowCount + '*' + SOF.rowCount + ' elements.\n' +
    'Or an array with ' + SOF.count + ' elements.\n' +
    'Your `original` is: ' + original);

  if (original) {
    let temp = _.cloneDeep(original); // use a copy of the given array/matrix
    SOF.original = isFlat ? Utils.arrayToMatrix(temp, SOF.count, SOF.rowCount) : temp;
    SOF.originalFlat = isFlat ? temp : Utils.matrixToArray(SOF.original);
  } else {
    // build up a two-dimension array [[1, 2, ..., 2k], ..., [..., n]]
    SOF.original = Utils.generateNaturalMatrix(SOF.rowCount);
    SOF.originalFlat = Utils.generateNaturalSequence(SOF.count);
  }
  SOF.final = SOF.original; // the final array is two-dimension
  SOF.finalFlat = SOF.originalFlat;
  SOF.steps = [_.map(SOF.final, row => _.map(row, number => [number]))];// steps is 4-dimension array
  SOF.computeDone = false; // expected to true when computing done.
}

/**
 * Build the original array before computing.
 *
 * @param forceReset (optional) true if you want to reset all internal states when initiating.
 * @return {number[][] | *[][]} the original two-dimension array.
 */
Folding.prototype.init = function(forceReset) {
  if (forceReset === true) {
    reset(this, this.original);
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
 * @return {number} the rows count of the result matrix.
 */
Folding.prototype.getRowCount = function() {
  return this.rowCount;
};

/**
 * @return {boolean} true if computation is finished.
 */
Folding.prototype.isComputeDone = function() {
  return this.computeDone;
};

/**
 * Give the result of the second order folding problem.
 *
 * @param algorithm (optional) By default, `recursive` is used.
 * @param callback (optional) A function that allows you to do something else when computation is done,
 *                 and this folding instance will be passed into the callback as an argument.
 * @return {number[][] | *[][]} the final folding result.
 */
Folding.prototype.compute = function(algorithm, callback) {
  assert(algorithm === undefined || typeof algorithm === 'string',
         '`algorithm` must be a flag defined in `Constants`, or it can be just omitted.\nYour algorithm: ' + algorithm);

  algorithm = algorithm || Constants.algorithm.RECURSIVE;
  if (!this.cache[algorithm]) {
    algorithm = Constants.algorithm.RECURSIVE;
  }
  if (this.cache[algorithm].result) {
    this.final = this.cache[algorithm].result;
    this.finalFlat = this.cache[algorithm].flat;
    this.steps = this.cache[algorithm].steps;
    this.computeDone = true;
  } else {
    this.computeDone = false;
  }

  if (this.computeDone) return this.final;

  let result = this.original;
  switch (algorithm) {
    case Constants.algorithm.FORMULA:
      result = [doFoldingByFormula(this.power, Utils.matrixToArray(this.original))];
      break;
    case Constants.algorithm.RECURSIVE:
    default:
      result = doFoldingByRecursive(this.steps[0], this.steps)[0];
  }
  let finalFlat = Utils.matrixToArray(result);
  this.cache[algorithm].result = _.cloneDeep(result);
  this.cache[algorithm].flat = _.cloneDeep(finalFlat);
  this.cache[algorithm].steps = _.cloneDeep(this.steps);
  this.final = result;
  this.finalFlat = finalFlat;
  this.computeDone = true;

  if (typeof callback === 'function') {
    callback(this);
  }

  return result;
};

/**
 * Function P(x): give the position of an original number in the final sequence.
 * You must run `compute()` first.
 *
 * @param x the original number from 1 to 2^k.
 * @return {number} the position of an original number in the final sequence.
 */
Folding.prototype.positionOf = function(x) {
  if (_.isInteger(x)) {
    assert(x >= 1 && x <= this.count, 'the number `x` must be between 1 and ' + this.count + '.\nYour number x is: ' + x);
  } else {
    assert(_.includes(this.originalFlat, x), 'the element `x` must exist in the `original` matrix.\nThe flatted `original` is: ' + this.originalFlat + '\nYour `x` is: ' + x);
  }

  if (!this.computeDone) return 1;

  return _.indexOf(this.finalFlat, x) + 1;
};

/**
 * Function V(x): give the number of position p in the final sequence.
 * You must run `compute()` first.
 *
 * @param p the position in the final sequence.
 * @return {number | *} the value on the given position.
 */
Folding.prototype.valueOf = function(p) {
  assert(_.isInteger(p) && p >= 1 && p <= this.count, 'the position `p` must be between 1 and ' + this.count + '.\nYour position p is: ' + p);

  if (!this.computeDone) return 1;

  return this.finalFlat[p - 1];
};

/**
 * You must run `compute()` with RECURSIVE algorithm first.
 *
 * @return {Array} All steps in the process of computation.
 */
Folding.prototype.getSteps = function() {
  return this.steps;
};

export default Folding;