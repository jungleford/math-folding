import {expect} from 'chai';

import {FOF} from '../../src/js';

describe('[@jungleford/math-folding][FOF] test suite:', () => {

  it('Validate constructor', () => {
    // Invalid arguments
    expect(FOF.bind(FOF, 0)).to.throw('`power` must be an positive integer.');
  });
});