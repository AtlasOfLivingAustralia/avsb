import { expect, test } from 'vitest';

import getOrgInitials from '../../src/helpers/getOrgInitials';

test('truncates two word org name correctly', () => {
  expect(getOrgInitials('Test Organisation')).toEqual('TO');
});

test('truncates three word org name correctly', () => {
  expect(getOrgInitials('Test Organisation Blah')).toEqual('TOB');
});

test('capitalises organisation initials', () => {
  const output = getOrgInitials('Test Organisation Blah');
  expect(output).toEqual(output.toUpperCase());
});
