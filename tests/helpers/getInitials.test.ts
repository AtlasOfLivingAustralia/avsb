import { expect, test } from 'vitest';

import getInitials from '../../src/helpers/getInitials';

test('truncates two word string correctly', () => {
  expect(getInitials('Test Organisation')).toEqual('TO');
});

test('truncates three word string correctly', () => {
  expect(getInitials('Test Organisation Blah')).toEqual('TOB');
});

test('capitalises string initials', () => {
  const output = getInitials('Test Organisation Blah');
  expect(output).toEqual(output.toUpperCase());
});

test('maxInitials 3 characters', () => {
  const output = getInitials('Test Organisation Blah Test', 3);
  expect(output).toHaveLength(3);
});

test('maxInitials 2 characters', () => {
  const output = getInitials('Test Organisation Blah Test', 2);
  expect(output).toHaveLength(2);
});
