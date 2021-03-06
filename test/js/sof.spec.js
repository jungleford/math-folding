import {expect} from 'chai';

import {SOF, Constants} from '../../src/js';

describe('[@jungleford/math-folding][SOF] test suite:', () => {

  let sofWith4 = null;
  let sofWithNaN = null;
  let sofWithNaNFlat = null;

  beforeEach(() => {
    sofWith4 = new SOF(4);
    sofWithNaN = new SOF(4, [
                              ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'],
                              ['十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二'],
                              ['三十三', '三十四', '三十五', '三十六', '三十七', '三十八', '三十九', '四十', '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八'],
                              ['四十九', '五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六', '五十七', '五十八', '五十九', '六十', '六十一', '六十二', '六十三', '六十四'],
                              ['六十五', '六十六', '六十七', '六十八', '六十九', '七十', '七十一', '七十二', '七十三', '七十四', '七十五', '七十六', '七十七', '七十八', '七十九', '八十'],
                              ['八十一', '八十二', '八十三', '八十四', '八十五', '八十六', '八十七', '八十八', '八十九', '九十', '九十一', '九十二', '九十三', '九十四', '九十五', '九十六'],
                              ['九十七', '九十八', '九十九', '一百', '一百○一', '一百○二', '一百○三', '一百○四', '一百○五', '一百○六', '一百○七', '一百○八', '一百○九', '一百一十', '一百一十一', '一百一十二'],
                              ['一百一十三', '一百一十四', '一百一十五', '一百一十六', '一百一十七', '一百一十八', '一百一十九', '一百二十', '一百二十一', '一百二十二', '一百二十三', '一百二十四', '一百二十五', '一百二十六', '一百二十七', '一百二十八'],
                              ['一百二十九', '一百三十', '一百三十一', '一百三十二', '一百三十三', '一百三十四', '一百三十五', '一百三十六', '一百三十七', '一百三十八', '一百三十九', '一百四十', '一百四十一', '一百四十二', '一百四十三', '一百四十四'],
                              ['一百四十五', '一百四十六', '一百四十七', '一百四十八', '一百四十九', '一百五十', '一百五十一', '一百五十二', '一百五十三', '一百五十四', '一百五十五', '一百五十六', '一百五十七', '一百五十八', '一百五十九', '一百六十'],
                              ['一百六十一', '一百六十二', '一百六十三', '一百六十四', '一百六十五', '一百六十六', '一百六十七', '一百六十八', '一百六十九', '一百七十', '一百七十一', '一百七十二', '一百七十三', '一百七十四', '一百七十五', '一百七十六'],
                              ['一百七十七', '一百七十八', '一百七十九', '一百八十', '一百八十一', '一百八十二', '一百八十三', '一百八十四', '一百八十五', '一百八十六', '一百八十七', '一百八十八', '一百八十九', '一百九十', '一百九十一', '一百九十二'],
                              ['一百九十三', '一百九十四', '一百九十五', '一百九十六', '一百九十七', '一百九十八', '一百九十九', '二百', '二百○一', '二百○二', '二百○三', '二百○四', '二百○五', '二百○六', '二百○七', '二百○八'],
                              ['二百○九', '二百一十', '二百一十一', '二百一十二', '二百一十三', '二百一十四', '二百一十五', '二百一十六', '二百一十七', '二百一十八', '二百一十九', '二百二十', '二百二十一', '二百二十二', '二百二十三', '二百二十四'],
                              ['二百二十五', '二百二十六', '二百二十七', '二百二十八', '二百二十九', '二百三十', '二百三十一', '二百三十二', '二百三十三', '二百三十四', '二百三十五', '二百三十六', '二百三十七', '二百三十八', '二百三十九', '二百四十'],
                              ['二百四十一', '二百四十二', '二百四十三', '二百四十四', '二百四十五', '二百四十六', '二百四十七', '二百四十八', '二百四十九', '二百五十', '二百五十一', '二百五十二', '二百五十三', '二百五十四', '二百五十五', '二百五十六']
                         ]);
    sofWithNaNFlat = new SOF(4,
                             ['一', '二', '三', '四', '五', '六', '七', '八',
                              '九', '十', '十一', '十二', '十三', '十四', '十五', '十六',
                              '十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四',
                              '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二',
                              '三十三', '三十四', '三十五', '三十六', '三十七', '三十八', '三十九', '四十',
                              '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八',
                              '四十九', '五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六',
                              '五十七', '五十八', '五十九', '六十', '六十一', '六十二', '六十三', '六十四',
                              '六十五', '六十六', '六十七', '六十八', '六十九', '七十', '七十一', '七十二',
                              '七十三', '七十四', '七十五', '七十六', '七十七', '七十八', '七十九', '八十',
                              '八十一', '八十二', '八十三', '八十四', '八十五', '八十六', '八十七', '八十八',
                              '八十九', '九十', '九十一', '九十二', '九十三', '九十四', '九十五', '九十六',
                              '九十七', '九十八', '九十九', '一百', '一百○一', '一百○二', '一百○三', '一百○四',
                              '一百○五', '一百○六', '一百○七', '一百○八', '一百○九', '一百一十', '一百一十一', '一百一十二',
                              '一百一十三', '一百一十四', '一百一十五', '一百一十六', '一百一十七', '一百一十八', '一百一十九', '一百二十',
                              '一百二十一', '一百二十二', '一百二十三', '一百二十四', '一百二十五', '一百二十六', '一百二十七', '一百二十八',
                              '一百二十九', '一百三十', '一百三十一', '一百三十二', '一百三十三', '一百三十四', '一百三十五', '一百三十六',
                              '一百三十七', '一百三十八', '一百三十九', '一百四十', '一百四十一', '一百四十二', '一百四十三', '一百四十四',
                              '一百四十五', '一百四十六', '一百四十七', '一百四十八', '一百四十九', '一百五十', '一百五十一', '一百五十二',
                              '一百五十三', '一百五十四', '一百五十五', '一百五十六', '一百五十七', '一百五十八', '一百五十九', '一百六十',
                              '一百六十一', '一百六十二', '一百六十三', '一百六十四', '一百六十五', '一百六十六', '一百六十七', '一百六十八',
                              '一百六十九', '一百七十', '一百七十一', '一百七十二', '一百七十三', '一百七十四', '一百七十五', '一百七十六',
                              '一百七十七', '一百七十八', '一百七十九', '一百八十', '一百八十一', '一百八十二', '一百八十三', '一百八十四',
                              '一百八十五', '一百八十六', '一百八十七', '一百八十八', '一百八十九', '一百九十', '一百九十一', '一百九十二',
                              '一百九十三', '一百九十四', '一百九十五', '一百九十六', '一百九十七', '一百九十八', '一百九十九', '二百',
                              '二百○一', '二百○二', '二百○三', '二百○四', '二百○五', '二百○六', '二百○七', '二百○八',
                              '二百○九', '二百一十', '二百一十一', '二百一十二', '二百一十三', '二百一十四', '二百一十五', '二百一十六',
                              '二百一十七', '二百一十八', '二百一十九', '二百二十', '二百二十一', '二百二十二', '二百二十三', '二百二十四',
                              '二百二十五', '二百二十六', '二百二十七', '二百二十八', '二百二十九', '二百三十', '二百三十一', '二百三十二',
                              '二百三十三', '二百三十四', '二百三十五', '二百三十六', '二百三十七', '二百三十八', '二百三十九', '二百四十',
                              '二百四十一', '二百四十二', '二百四十三', '二百四十四', '二百四十五', '二百四十六', '二百四十七', '二百四十八',
                              '二百四十九', '二百五十', '二百五十一', '二百五十二', '二百五十三', '二百五十四', '二百五十五', '二百五十六'],
                             true);
  });

  afterEach(() => {
    sofWith4 = null;
    sofWithNaN = null;
    sofWithNaNFlat = null;
  });

  it('Validate constructor', () => {
    // Invalid arguments
    expect(SOF.bind(SOF, 0)).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, -1)).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, 3.5)).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, '1')).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, [1, 2])).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, {number: 1})).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, null)).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, undefined)).to.throw('`power` must be an positive integer.');
    expect(SOF.bind(SOF, 2, 1)).to.throw('`original` must be a matrix with 4*4 elements.\nOr an array with 16 elements.\nYour `original` is: 1');
    expect(SOF.bind(SOF, 2, '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16')).to.throw('`original` must be a matrix with 4*4 elements.\nOr an array with 16 elements.\nYour `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16');
    expect(SOF.bind(SOF, 2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).to.throw('`original` must be a matrix with 4*4 elements.\nOr an array with 16 elements.\nYour `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16');

    // Valid arguments
    let original4 = sofWith4.init();
    expect(original4).to.be.an('array');
    expect(original4).to.have.lengthOf(16);
    expect(original4).to.eql([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
      [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
      [81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
      [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
      [113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128],
      [129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144],
      [145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160],
      [161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176],
      [177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192],
      [193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208],
      [209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224],
      [225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240],
      [241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256]
    ]);

    let originalNaN = sofWithNaN.init();
    expect(originalNaN).to.be.an('array');
    expect(originalNaN).to.have.lengthOf(16);
    expect(originalNaN).to.eql([
      ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'],
      ['十七', '十八', '十九', '二十', '二十一', '二十二', '二十三', '二十四', '二十五', '二十六', '二十七', '二十八', '二十九', '三十', '三十一', '三十二'],
      ['三十三', '三十四', '三十五', '三十六', '三十七', '三十八', '三十九', '四十', '四十一', '四十二', '四十三', '四十四', '四十五', '四十六', '四十七', '四十八'],
      ['四十九', '五十', '五十一', '五十二', '五十三', '五十四', '五十五', '五十六', '五十七', '五十八', '五十九', '六十', '六十一', '六十二', '六十三', '六十四'],
      ['六十五', '六十六', '六十七', '六十八', '六十九', '七十', '七十一', '七十二', '七十三', '七十四', '七十五', '七十六', '七十七', '七十八', '七十九', '八十'],
      ['八十一', '八十二', '八十三', '八十四', '八十五', '八十六', '八十七', '八十八', '八十九', '九十', '九十一', '九十二', '九十三', '九十四', '九十五', '九十六'],
      ['九十七', '九十八', '九十九', '一百', '一百○一', '一百○二', '一百○三', '一百○四', '一百○五', '一百○六', '一百○七', '一百○八', '一百○九', '一百一十', '一百一十一', '一百一十二'],
      ['一百一十三', '一百一十四', '一百一十五', '一百一十六', '一百一十七', '一百一十八', '一百一十九', '一百二十', '一百二十一', '一百二十二', '一百二十三', '一百二十四', '一百二十五', '一百二十六', '一百二十七', '一百二十八'],
      ['一百二十九', '一百三十', '一百三十一', '一百三十二', '一百三十三', '一百三十四', '一百三十五', '一百三十六', '一百三十七', '一百三十八', '一百三十九', '一百四十', '一百四十一', '一百四十二', '一百四十三', '一百四十四'],
      ['一百四十五', '一百四十六', '一百四十七', '一百四十八', '一百四十九', '一百五十', '一百五十一', '一百五十二', '一百五十三', '一百五十四', '一百五十五', '一百五十六', '一百五十七', '一百五十八', '一百五十九', '一百六十'],
      ['一百六十一', '一百六十二', '一百六十三', '一百六十四', '一百六十五', '一百六十六', '一百六十七', '一百六十八', '一百六十九', '一百七十', '一百七十一', '一百七十二', '一百七十三', '一百七十四', '一百七十五', '一百七十六'],
      ['一百七十七', '一百七十八', '一百七十九', '一百八十', '一百八十一', '一百八十二', '一百八十三', '一百八十四', '一百八十五', '一百八十六', '一百八十七', '一百八十八', '一百八十九', '一百九十', '一百九十一', '一百九十二'],
      ['一百九十三', '一百九十四', '一百九十五', '一百九十六', '一百九十七', '一百九十八', '一百九十九', '二百', '二百○一', '二百○二', '二百○三', '二百○四', '二百○五', '二百○六', '二百○七', '二百○八'],
      ['二百○九', '二百一十', '二百一十一', '二百一十二', '二百一十三', '二百一十四', '二百一十五', '二百一十六', '二百一十七', '二百一十八', '二百一十九', '二百二十', '二百二十一', '二百二十二', '二百二十三', '二百二十四'],
      ['二百二十五', '二百二十六', '二百二十七', '二百二十八', '二百二十九', '二百三十', '二百三十一', '二百三十二', '二百三十三', '二百三十四', '二百三十五', '二百三十六', '二百三十七', '二百三十八', '二百三十九', '二百四十'],
      ['二百四十一', '二百四十二', '二百四十三', '二百四十四', '二百四十五', '二百四十六', '二百四十七', '二百四十八', '二百四十九', '二百五十', '二百五十一', '二百五十二', '二百五十三', '二百五十四', '二百五十五', '二百五十六']
    ]);
  });

  it('Validate parameters', () => {
    expect(sofWith4.getPower()).to.equal(4);
    expect(sofWith4.getCount()).to.equal(256);
    expect(sofWith4.getRowCount()).to.equal(16);
    expect(sofWith4.isComputeDone()).to.equal(false);

    expect(sofWithNaN.getPower()).to.equal(4);
    expect(sofWithNaN.getCount()).to.equal(256);
    expect(sofWithNaN.getRowCount()).to.equal(16);
    expect(sofWithNaN.isComputeDone()).to.equal(false);
  });

  it('Compute by RECURSIVE algorithm', () => {
    expect(sofWith4.compute(Constants.algorithm.RECURSIVE)).to.eql([[1, 241, 256, 16, 128, 144, 129, 113, 120, 136, 137, 121, 9, 249, 248, 8, 56, 200, 201, 57, 73, 185, 184, 72, 65, 177, 192, 80, 64, 208, 193, 49, 52, 196, 205, 61, 77, 189, 180, 68, 69, 181, 188, 76, 60, 204, 197, 53, 5, 245, 252, 12, 124, 140, 133, 117, 116, 132, 141, 125, 13, 253, 244, 4, 20, 228, 237, 29, 109, 157, 148, 100, 101, 149, 156, 108, 28, 236, 229, 21, 37, 213, 220, 44, 92, 172, 165, 85, 84, 164, 173, 93, 45, 221, 212, 36, 33, 209, 224, 48, 96, 176, 161, 81, 88, 168, 169, 89, 41, 217, 216, 40, 24, 232, 233, 25, 105, 153, 152, 104, 97, 145, 160, 112, 32, 240, 225, 17, 18, 226, 239, 31, 111, 159, 146, 98, 103, 151, 154, 106, 26, 234, 231, 23, 39, 215, 218, 42, 90, 170, 167, 87, 82, 162, 175, 95, 47, 223, 210, 34, 35, 211, 222, 46, 94, 174, 163, 83, 86, 166, 171, 91, 43, 219, 214, 38, 22, 230, 235, 27, 107, 155, 150, 102, 99, 147, 158, 110, 30, 238, 227, 19, 3, 243, 254, 14, 126, 142, 131, 115, 118, 134, 139, 123, 11, 251, 246, 6, 54, 198, 203, 59, 75, 187, 182, 70, 67, 179, 190, 78, 62, 206, 195, 51, 50, 194, 207, 63, 79, 191, 178, 66, 71, 183, 186, 74, 58, 202, 199, 55, 7, 247, 250, 10, 122, 138, 135, 119, 114, 130, 143, 127, 15, 255, 242, 2]]);
    expect(sofWith4.positionOf(124)).to.equal(53);
    expect(sofWith4.valueOf(124)).to.equal(112);

    expect(sofWithNaN.compute(Constants.algorithm.RECURSIVE)).to.eql([['一', '二百四十一', '二百五十六', '十六', '一百二十八', '一百四十四', '一百二十九', '一百一十三', '一百二十', '一百三十六', '一百三十七', '一百二十一', '九', '二百四十九', '二百四十八', '八', '五十六', '二百', '二百○一', '五十七', '七十三', '一百八十五', '一百八十四', '七十二', '六十五', '一百七十七', '一百九十二', '八十', '六十四', '二百○八', '一百九十三', '四十九', '五十二', '一百九十六', '二百○五', '六十一', '七十七', '一百八十九', '一百八十', '六十八', '六十九', '一百八十一', '一百八十八', '七十六', '六十', '二百○四', '一百九十七', '五十三', '五', '二百四十五', '二百五十二', '十二', '一百二十四', '一百四十', '一百三十三', '一百一十七', '一百一十六', '一百三十二', '一百四十一', '一百二十五', '十三', '二百五十三', '二百四十四', '四', '二十', '二百二十八', '二百三十七', '二十九', '一百○九', '一百五十七', '一百四十八', '一百', '一百○一', '一百四十九', '一百五十六', '一百○八', '二十八', '二百三十六', '二百二十九', '二十一', '三十七', '二百一十三', '二百二十', '四十四', '九十二', '一百七十二', '一百六十五', '八十五', '八十四', '一百六十四', '一百七十三', '九十三', '四十五', '二百二十一', '二百一十二', '三十六', '三十三', '二百○九', '二百二十四', '四十八', '九十六', '一百七十六', '一百六十一', '八十一', '八十八', '一百六十八', '一百六十九', '八十九', '四十一', '二百一十七', '二百一十六', '四十', '二十四', '二百三十二', '二百三十三', '二十五', '一百○五', '一百五十三', '一百五十二', '一百○四', '九十七', '一百四十五', '一百六十', '一百一十二', '三十二', '二百四十', '二百二十五', '十七', '十八', '二百二十六', '二百三十九', '三十一', '一百一十一', '一百五十九', '一百四十六', '九十八', '一百○三', '一百五十一', '一百五十四', '一百○六', '二十六', '二百三十四', '二百三十一', '二十三', '三十九', '二百一十五', '二百一十八', '四十二', '九十', '一百七十', '一百六十七', '八十七', '八十二', '一百六十二', '一百七十五', '九十五', '四十七', '二百二十三', '二百一十', '三十四', '三十五', '二百一十一', '二百二十二', '四十六', '九十四', '一百七十四', '一百六十三', '八十三', '八十六', '一百六十六', '一百七十一', '九十一', '四十三', '二百一十九', '二百一十四', '三十八', '二十二', '二百三十', '二百三十五', '二十七', '一百○七', '一百五十五', '一百五十', '一百○二', '九十九', '一百四十七', '一百五十八', '一百一十', '三十', '二百三十八', '二百二十七', '十九', '三', '二百四十三', '二百五十四', '十四', '一百二十六', '一百四十二', '一百三十一', '一百一十五', '一百一十八', '一百三十四', '一百三十九', '一百二十三', '十一', '二百五十一', '二百四十六', '六', '五十四', '一百九十八', '二百○三', '五十九', '七十五', '一百八十七', '一百八十二', '七十', '六十七', '一百七十九', '一百九十', '七十八', '六十二', '二百○六', '一百九十五', '五十一', '五十', '一百九十四', '二百○七', '六十三', '七十九', '一百九十一', '一百七十八', '六十六', '七十一', '一百八十三', '一百八十六', '七十四', '五十八', '二百○二', '一百九十九', '五十五', '七', '二百四十七', '二百五十', '十', '一百二十二', '一百三十八', '一百三十五', '一百一十九', '一百一十四', '一百三十', '一百四十三', '一百二十七', '十五', '二百五十五', '二百四十二', '二']]);
    expect(sofWithNaN.positionOf('一百二十四')).to.equal(53);
    expect(sofWithNaN.valueOf(124)).to.equal('一百一十二');

    // Invalid arguments
    expect(sofWith4.positionOf.bind(sofWith4, 0)).to.throw('the number `x` must be between 1 and 256.\nYour number x is: 0');
    expect(sofWith4.positionOf.bind(sofWith4, -1)).to.throw('the number `x` must be between 1 and 256.\nYour number x is: -1');
    expect(sofWith4.positionOf.bind(sofWith4, 3.5)).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: 3.5');
    expect(sofWith4.positionOf.bind(sofWith4, '1')).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: 1');
    expect(sofWith4.positionOf.bind(sofWith4, [1, 2])).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: 1,2');
    expect(sofWith4.positionOf.bind(sofWith4, {number: 1})).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: [object Object]');
    expect(sofWith4.positionOf.bind(sofWith4, null)).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: null');
    expect(sofWith4.positionOf.bind(sofWith4, undefined)).to.throw('the element `x` must exist in the `original` matrix.\nThe flatted `original` is: 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256\nYour `x` is: undefined');

    expect(sofWith4.valueOf.bind(sofWith4, 0)).to.throw('the position `p` must be between 1 and 256.\nYour position p is: 0');
    expect(sofWith4.valueOf.bind(sofWith4, -1)).to.throw('the position `p` must be between 1 and 256.\nYour position p is: -1');
    expect(sofWith4.valueOf.bind(sofWith4, 3.5)).to.throw('the position `p` must be between 1 and 256.\nYour position p is: 3.5');
    expect(sofWith4.valueOf.bind(sofWith4, '1')).to.throw('the position `p` must be between 1 and 256.\nYour position p is: 1');
    expect(sofWith4.valueOf.bind(sofWith4, [1, 2])).to.throw('the position `p` must be between 1 and 256.\nYour position p is: 1,2');
    expect(sofWith4.valueOf.bind(sofWith4, {number: 1})).to.throw('the position `p` must be between 1 and 256.\nYour position p is: [object Object]');
    expect(sofWith4.valueOf.bind(sofWith4, null)).to.throw('the position `p` must be between 1 and 256.\nYour position p is: null');
    expect(sofWith4.valueOf.bind(sofWith4, undefined)).to.throw('the position `p` must be between 1 and 256.\nYour position p is: undefined');
  });

  it('Compute by FORMULA algorithm', () => {
    expect(sofWith4.compute(Constants.algorithm.FORMULA)).to.eql([[1, 241, 256, 16, 128, 144, 129, 113, 120, 136, 137, 121, 9, 249, 248, 8, 56, 200, 201, 57, 73, 185, 184, 72, 65, 177, 192, 80, 64, 208, 193, 49, 52, 196, 205, 61, 77, 189, 180, 68, 69, 181, 188, 76, 60, 204, 197, 53, 5, 245, 252, 12, 124, 140, 133, 117, 116, 132, 141, 125, 13, 253, 244, 4, 20, 228, 237, 29, 109, 157, 148, 100, 101, 149, 156, 108, 28, 236, 229, 21, 37, 213, 220, 44, 92, 172, 165, 85, 84, 164, 173, 93, 45, 221, 212, 36, 33, 209, 224, 48, 96, 176, 161, 81, 88, 168, 169, 89, 41, 217, 216, 40, 24, 232, 233, 25, 105, 153, 152, 104, 97, 145, 160, 112, 32, 240, 225, 17, 18, 226, 239, 31, 111, 159, 146, 98, 103, 151, 154, 106, 26, 234, 231, 23, 39, 215, 218, 42, 90, 170, 167, 87, 82, 162, 175, 95, 47, 223, 210, 34, 35, 211, 222, 46, 94, 174, 163, 83, 86, 166, 171, 91, 43, 219, 214, 38, 22, 230, 235, 27, 107, 155, 150, 102, 99, 147, 158, 110, 30, 238, 227, 19, 3, 243, 254, 14, 126, 142, 131, 115, 118, 134, 139, 123, 11, 251, 246, 6, 54, 198, 203, 59, 75, 187, 182, 70, 67, 179, 190, 78, 62, 206, 195, 51, 50, 194, 207, 63, 79, 191, 178, 66, 71, 183, 186, 74, 58, 202, 199, 55, 7, 247, 250, 10, 122, 138, 135, 119, 114, 130, 143, 127, 15, 255, 242, 2]]);
    expect(sofWith4.positionOf(124)).to.equal(53);
    expect(sofWith4.valueOf(124)).to.equal(112);

    expect(sofWithNaN.compute(Constants.algorithm.RECURSIVE)).to.eql([['一', '二百四十一', '二百五十六', '十六', '一百二十八', '一百四十四', '一百二十九', '一百一十三', '一百二十', '一百三十六', '一百三十七', '一百二十一', '九', '二百四十九', '二百四十八', '八', '五十六', '二百', '二百○一', '五十七', '七十三', '一百八十五', '一百八十四', '七十二', '六十五', '一百七十七', '一百九十二', '八十', '六十四', '二百○八', '一百九十三', '四十九', '五十二', '一百九十六', '二百○五', '六十一', '七十七', '一百八十九', '一百八十', '六十八', '六十九', '一百八十一', '一百八十八', '七十六', '六十', '二百○四', '一百九十七', '五十三', '五', '二百四十五', '二百五十二', '十二', '一百二十四', '一百四十', '一百三十三', '一百一十七', '一百一十六', '一百三十二', '一百四十一', '一百二十五', '十三', '二百五十三', '二百四十四', '四', '二十', '二百二十八', '二百三十七', '二十九', '一百○九', '一百五十七', '一百四十八', '一百', '一百○一', '一百四十九', '一百五十六', '一百○八', '二十八', '二百三十六', '二百二十九', '二十一', '三十七', '二百一十三', '二百二十', '四十四', '九十二', '一百七十二', '一百六十五', '八十五', '八十四', '一百六十四', '一百七十三', '九十三', '四十五', '二百二十一', '二百一十二', '三十六', '三十三', '二百○九', '二百二十四', '四十八', '九十六', '一百七十六', '一百六十一', '八十一', '八十八', '一百六十八', '一百六十九', '八十九', '四十一', '二百一十七', '二百一十六', '四十', '二十四', '二百三十二', '二百三十三', '二十五', '一百○五', '一百五十三', '一百五十二', '一百○四', '九十七', '一百四十五', '一百六十', '一百一十二', '三十二', '二百四十', '二百二十五', '十七', '十八', '二百二十六', '二百三十九', '三十一', '一百一十一', '一百五十九', '一百四十六', '九十八', '一百○三', '一百五十一', '一百五十四', '一百○六', '二十六', '二百三十四', '二百三十一', '二十三', '三十九', '二百一十五', '二百一十八', '四十二', '九十', '一百七十', '一百六十七', '八十七', '八十二', '一百六十二', '一百七十五', '九十五', '四十七', '二百二十三', '二百一十', '三十四', '三十五', '二百一十一', '二百二十二', '四十六', '九十四', '一百七十四', '一百六十三', '八十三', '八十六', '一百六十六', '一百七十一', '九十一', '四十三', '二百一十九', '二百一十四', '三十八', '二十二', '二百三十', '二百三十五', '二十七', '一百○七', '一百五十五', '一百五十', '一百○二', '九十九', '一百四十七', '一百五十八', '一百一十', '三十', '二百三十八', '二百二十七', '十九', '三', '二百四十三', '二百五十四', '十四', '一百二十六', '一百四十二', '一百三十一', '一百一十五', '一百一十八', '一百三十四', '一百三十九', '一百二十三', '十一', '二百五十一', '二百四十六', '六', '五十四', '一百九十八', '二百○三', '五十九', '七十五', '一百八十七', '一百八十二', '七十', '六十七', '一百七十九', '一百九十', '七十八', '六十二', '二百○六', '一百九十五', '五十一', '五十', '一百九十四', '二百○七', '六十三', '七十九', '一百九十一', '一百七十八', '六十六', '七十一', '一百八十三', '一百八十六', '七十四', '五十八', '二百○二', '一百九十九', '五十五', '七', '二百四十七', '二百五十', '十', '一百二十二', '一百三十八', '一百三十五', '一百一十九', '一百一十四', '一百三十', '一百四十三', '一百二十七', '十五', '二百五十五', '二百四十二', '二']]);
    expect(sofWithNaN.positionOf('一百二十四')).to.equal(53);
    expect(sofWithNaN.valueOf(124)).to.equal('一百一十二');
  });

  it('Compute by default algorithm', () => {
    expect(sofWith4.compute()).to.eql([[1, 241, 256, 16, 128, 144, 129, 113, 120, 136, 137, 121, 9, 249, 248, 8, 56, 200, 201, 57, 73, 185, 184, 72, 65, 177, 192, 80, 64, 208, 193, 49, 52, 196, 205, 61, 77, 189, 180, 68, 69, 181, 188, 76, 60, 204, 197, 53, 5, 245, 252, 12, 124, 140, 133, 117, 116, 132, 141, 125, 13, 253, 244, 4, 20, 228, 237, 29, 109, 157, 148, 100, 101, 149, 156, 108, 28, 236, 229, 21, 37, 213, 220, 44, 92, 172, 165, 85, 84, 164, 173, 93, 45, 221, 212, 36, 33, 209, 224, 48, 96, 176, 161, 81, 88, 168, 169, 89, 41, 217, 216, 40, 24, 232, 233, 25, 105, 153, 152, 104, 97, 145, 160, 112, 32, 240, 225, 17, 18, 226, 239, 31, 111, 159, 146, 98, 103, 151, 154, 106, 26, 234, 231, 23, 39, 215, 218, 42, 90, 170, 167, 87, 82, 162, 175, 95, 47, 223, 210, 34, 35, 211, 222, 46, 94, 174, 163, 83, 86, 166, 171, 91, 43, 219, 214, 38, 22, 230, 235, 27, 107, 155, 150, 102, 99, 147, 158, 110, 30, 238, 227, 19, 3, 243, 254, 14, 126, 142, 131, 115, 118, 134, 139, 123, 11, 251, 246, 6, 54, 198, 203, 59, 75, 187, 182, 70, 67, 179, 190, 78, 62, 206, 195, 51, 50, 194, 207, 63, 79, 191, 178, 66, 71, 183, 186, 74, 58, 202, 199, 55, 7, 247, 250, 10, 122, 138, 135, 119, 114, 130, 143, 127, 15, 255, 242, 2]]);
    expect(sofWith4.positionOf(124)).to.equal(53);
    expect(sofWith4.valueOf(124)).to.equal(112);

    expect(sofWithNaN.compute(Constants.algorithm.RECURSIVE)).to.eql([['一', '二百四十一', '二百五十六', '十六', '一百二十八', '一百四十四', '一百二十九', '一百一十三', '一百二十', '一百三十六', '一百三十七', '一百二十一', '九', '二百四十九', '二百四十八', '八', '五十六', '二百', '二百○一', '五十七', '七十三', '一百八十五', '一百八十四', '七十二', '六十五', '一百七十七', '一百九十二', '八十', '六十四', '二百○八', '一百九十三', '四十九', '五十二', '一百九十六', '二百○五', '六十一', '七十七', '一百八十九', '一百八十', '六十八', '六十九', '一百八十一', '一百八十八', '七十六', '六十', '二百○四', '一百九十七', '五十三', '五', '二百四十五', '二百五十二', '十二', '一百二十四', '一百四十', '一百三十三', '一百一十七', '一百一十六', '一百三十二', '一百四十一', '一百二十五', '十三', '二百五十三', '二百四十四', '四', '二十', '二百二十八', '二百三十七', '二十九', '一百○九', '一百五十七', '一百四十八', '一百', '一百○一', '一百四十九', '一百五十六', '一百○八', '二十八', '二百三十六', '二百二十九', '二十一', '三十七', '二百一十三', '二百二十', '四十四', '九十二', '一百七十二', '一百六十五', '八十五', '八十四', '一百六十四', '一百七十三', '九十三', '四十五', '二百二十一', '二百一十二', '三十六', '三十三', '二百○九', '二百二十四', '四十八', '九十六', '一百七十六', '一百六十一', '八十一', '八十八', '一百六十八', '一百六十九', '八十九', '四十一', '二百一十七', '二百一十六', '四十', '二十四', '二百三十二', '二百三十三', '二十五', '一百○五', '一百五十三', '一百五十二', '一百○四', '九十七', '一百四十五', '一百六十', '一百一十二', '三十二', '二百四十', '二百二十五', '十七', '十八', '二百二十六', '二百三十九', '三十一', '一百一十一', '一百五十九', '一百四十六', '九十八', '一百○三', '一百五十一', '一百五十四', '一百○六', '二十六', '二百三十四', '二百三十一', '二十三', '三十九', '二百一十五', '二百一十八', '四十二', '九十', '一百七十', '一百六十七', '八十七', '八十二', '一百六十二', '一百七十五', '九十五', '四十七', '二百二十三', '二百一十', '三十四', '三十五', '二百一十一', '二百二十二', '四十六', '九十四', '一百七十四', '一百六十三', '八十三', '八十六', '一百六十六', '一百七十一', '九十一', '四十三', '二百一十九', '二百一十四', '三十八', '二十二', '二百三十', '二百三十五', '二十七', '一百○七', '一百五十五', '一百五十', '一百○二', '九十九', '一百四十七', '一百五十八', '一百一十', '三十', '二百三十八', '二百二十七', '十九', '三', '二百四十三', '二百五十四', '十四', '一百二十六', '一百四十二', '一百三十一', '一百一十五', '一百一十八', '一百三十四', '一百三十九', '一百二十三', '十一', '二百五十一', '二百四十六', '六', '五十四', '一百九十八', '二百○三', '五十九', '七十五', '一百八十七', '一百八十二', '七十', '六十七', '一百七十九', '一百九十', '七十八', '六十二', '二百○六', '一百九十五', '五十一', '五十', '一百九十四', '二百○七', '六十三', '七十九', '一百九十一', '一百七十八', '六十六', '七十一', '一百八十三', '一百八十六', '七十四', '五十八', '二百○二', '一百九十九', '五十五', '七', '二百四十七', '二百五十', '十', '一百二十二', '一百三十八', '一百三十五', '一百一十九', '一百一十四', '一百三十', '一百四十三', '一百二十七', '十五', '二百五十五', '二百四十二', '二']]);
    expect(sofWithNaN.positionOf('一百二十四')).to.equal(53);
    expect(sofWithNaN.valueOf(124)).to.equal('一百一十二');

    expect(sofWith4.compute('UNKNOWN')).to.eql([[1, 241, 256, 16, 128, 144, 129, 113, 120, 136, 137, 121, 9, 249, 248, 8, 56, 200, 201, 57, 73, 185, 184, 72, 65, 177, 192, 80, 64, 208, 193, 49, 52, 196, 205, 61, 77, 189, 180, 68, 69, 181, 188, 76, 60, 204, 197, 53, 5, 245, 252, 12, 124, 140, 133, 117, 116, 132, 141, 125, 13, 253, 244, 4, 20, 228, 237, 29, 109, 157, 148, 100, 101, 149, 156, 108, 28, 236, 229, 21, 37, 213, 220, 44, 92, 172, 165, 85, 84, 164, 173, 93, 45, 221, 212, 36, 33, 209, 224, 48, 96, 176, 161, 81, 88, 168, 169, 89, 41, 217, 216, 40, 24, 232, 233, 25, 105, 153, 152, 104, 97, 145, 160, 112, 32, 240, 225, 17, 18, 226, 239, 31, 111, 159, 146, 98, 103, 151, 154, 106, 26, 234, 231, 23, 39, 215, 218, 42, 90, 170, 167, 87, 82, 162, 175, 95, 47, 223, 210, 34, 35, 211, 222, 46, 94, 174, 163, 83, 86, 166, 171, 91, 43, 219, 214, 38, 22, 230, 235, 27, 107, 155, 150, 102, 99, 147, 158, 110, 30, 238, 227, 19, 3, 243, 254, 14, 126, 142, 131, 115, 118, 134, 139, 123, 11, 251, 246, 6, 54, 198, 203, 59, 75, 187, 182, 70, 67, 179, 190, 78, 62, 206, 195, 51, 50, 194, 207, 63, 79, 191, 178, 66, 71, 183, 186, 74, 58, 202, 199, 55, 7, 247, 250, 10, 122, 138, 135, 119, 114, 130, 143, 127, 15, 255, 242, 2]]);
    expect(sofWith4.positionOf(124)).to.equal(53);
    expect(sofWith4.valueOf(124)).to.equal(112);
  });
});