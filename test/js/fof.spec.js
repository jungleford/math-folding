import {expect} from 'chai';

import {FOF, Constants} from '../../src/js';

describe('[@jungleford/math-folding][FOF] test suite:', () => {

  let fofWith4 = null;
  let fofWithNaN = null;

  beforeEach(() => {
    fofWith4 = new FOF(4);
    fofWithNaN = new FOF(4, ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']);
  });

  afterEach(() => {
    fofWith4 = null;
    fofWithNaN = null;
  });

  it('Validate constructor', () => {
    // Invalid arguments
    expect(FOF.bind(FOF, 0)).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, -1)).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, 3.5)).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, '1')).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, [1, 2])).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, {number: 1})).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, null)).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, undefined)).to.throw('`power` must be an positive integer.');
    expect(FOF.bind(FOF, 2, 1)).to.throw('`original` must be an array with 4 elements.\nYour `original` is: 1');
    expect(FOF.bind(FOF, 2, '1,2,3,4')).to.throw('`original` must be an array with 4 elements.\nYour `original` is: 1,2,3,4');
    expect(FOF.bind(FOF, 2, [1, 2, 3])).to.throw('`original` must be an array with 4 elements.\nYour `original` is: 1,2,3');

    // Valid arguments
    let original4 = fofWith4.init();
    expect(original4).to.be.an('array');
    expect(original4).to.have.lengthOf(16);
    expect(original4).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    let originalNaN = fofWithNaN.init();
    expect(originalNaN).to.be.an('array');
    expect(originalNaN).to.have.lengthOf(16);
    expect(originalNaN).to.eql(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六']);
  });

  it('Validate parameters', () => {
    expect(fofWith4.getPower()).to.equal(4);
    expect(fofWith4.getCount()).to.equal(16);
    expect(fofWith4.isComputeDone()).to.equal(false);

    expect(fofWithNaN.getPower()).to.equal(4);
    expect(fofWithNaN.getCount()).to.equal(16);
    expect(fofWithNaN.isComputeDone()).to.equal(false);
  });

  it('Compute by RECURSIVE algorithm', () => {
    expect(fofWith4.compute(Constants.algorithm.RECURSIVE)).to.eql([1, 16, 9, 8, 5, 12, 13, 4, 3, 14, 11, 6, 7, 10, 15, 2]);
    expect(fofWith4.positionOf(12)).to.equal(6);
    expect(fofWith4.valueOf(12)).to.equal(6);

    expect(fofWithNaN.compute(Constants.algorithm.RECURSIVE)).to.eql(['一', '十六', '九', '八', '五', '十二', '十三', '四', '三', '十四', '十一', '六', '七', '十', '十五', '二']);
    expect(fofWithNaN.positionOf('十二')).to.equal(6);
    expect(fofWithNaN.valueOf(12)).to.equal('六');

    // Invalid arguments
    expect(fofWith4.positionOf.bind(fofWith4, 0)).to.throw('the number `x` must be between 1 and 16.\nYour number x is: 0');
    expect(fofWith4.positionOf.bind(fofWith4, -1)).to.throw('the number `x` must be between 1 and 16.\nYour number x is: -1');
    expect(fofWith4.positionOf.bind(fofWith4, 3.5)).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: 3.5');
    expect(fofWith4.positionOf.bind(fofWith4, '1')).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: 1');
    expect(fofWith4.positionOf.bind(fofWith4, [1, 2])).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: 1,2');
    expect(fofWith4.positionOf.bind(fofWith4, {number: 1})).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: [object Object]');
    expect(fofWith4.positionOf.bind(fofWith4, null)).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: null');
    expect(fofWith4.positionOf.bind(fofWith4, undefined)).to.throw('the element `x` must exist in the `original` array.\n`original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\nYour `x` is: undefined');

    expect(fofWith4.valueOf.bind(fofWith4, 0)).to.throw('the position `p` must be between 1 and 16.\nYour position p is: 0');
    expect(fofWith4.valueOf.bind(fofWith4, -1)).to.throw('the position `p` must be between 1 and 16.\nYour position p is: -1');
    expect(fofWith4.valueOf.bind(fofWith4, 3.5)).to.throw('the position `p` must be between 1 and 16.\nYour position p is: 3.5');
    expect(fofWith4.valueOf.bind(fofWith4, '1')).to.throw('the position `p` must be between 1 and 16.\nYour position p is: 1');
    expect(fofWith4.valueOf.bind(fofWith4, [1, 2])).to.throw('the position `p` must be between 1 and 16.\nYour position p is: 1,2');
    expect(fofWith4.valueOf.bind(fofWith4, {number: 1})).to.throw('the position `p` must be between 1 and 16.\nYour position p is: [object Object]');
    expect(fofWith4.valueOf.bind(fofWith4, null)).to.throw('the position `p` must be between 1 and 16.\nYour position p is: null');
    expect(fofWith4.valueOf.bind(fofWith4, undefined)).to.throw('the position `p` must be between 1 and 16.\nYour position p is: undefined');
  });

  it('Compute by FORMULA algorithm', () => {
    expect(fofWith4.compute(Constants.algorithm.FORMULA)).to.eql([1, 16, 9, 8, 5, 12, 13, 4, 3, 14, 11, 6, 7, 10, 15, 2]);
    expect(fofWith4.positionOf(12)).to.equal(6);
    expect(fofWith4.valueOf(12)).to.equal(6);

    expect(fofWithNaN.compute(Constants.algorithm.FORMULA)).to.eql(['一', '十六', '九', '八', '五', '十二', '十三', '四', '三', '十四', '十一', '六', '七', '十', '十五', '二']);
    expect(fofWithNaN.positionOf('十二')).to.equal(6);
    expect(fofWithNaN.valueOf(12)).to.equal('六');
  });

  it('Compute by default algorithm', () => {
    expect(fofWith4.compute()).to.eql([1, 16, 9, 8, 5, 12, 13, 4, 3, 14, 11, 6, 7, 10, 15, 2]);
    expect(fofWith4.positionOf(12)).to.equal(6);
    expect(fofWith4.valueOf(12)).to.equal(6);

    expect(fofWithNaN.compute()).to.eql(['一', '十六', '九', '八', '五', '十二', '十三', '四', '三', '十四', '十一', '六', '七', '十', '十五', '二']);
    expect(fofWithNaN.positionOf('十二')).to.equal(6);
    expect(fofWithNaN.valueOf(12)).to.equal('六');

    expect(fofWith4.compute('UNKNOWN')).to.eql([1, 16, 9, 8, 5, 12, 13, 4, 3, 14, 11, 6, 7, 10, 15, 2]);
    expect(fofWith4.positionOf(12)).to.equal(6);
    expect(fofWith4.valueOf(12)).to.equal(6);
  });
});