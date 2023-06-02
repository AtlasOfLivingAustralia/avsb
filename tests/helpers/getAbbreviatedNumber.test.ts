import { expect, test } from 'vitest';

import getAbbreviatedNumber from '../../src/helpers/getAbbreviatedNumber';

const abbreviatedNumbers = [
  {
    val: -1000,
    expected: '1K',
  },
  {
    val: 1000,
    expected: '1K',
  },
  {
    val: 1100,
    expected: '1K',
  },
  {
    val: 4000,
    expected: '4K',
  },
  {
    val: 4900,
    expected: '5K',
  },
  {
    val: 49102,
    expected: '49K',
  },
  {
    val: 100000,
    expected: '100K',
  },
];

test.each(abbreviatedNumbers)('$val abbreviated to $expected', ({ val, expected }) => {
  expect(getAbbreviatedNumber(val)).toEqual(expected);
});
