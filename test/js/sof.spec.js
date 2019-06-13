import {expect} from 'chai';

import {SOF} from '../../src/js';

describe('[@jungleford/math-folding][FOF] test suite:', () => {

  it('Validate constructor', () => {
    // Invalid arguments
    expect(SOF.bind(SOF, 0)).to.throw('`power` must be an positive integer.');
  });
});