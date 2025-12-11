import { expect, expectTypeOf, test } from 'vitest';
import { TablerIcon } from '@tabler/icons-react';

import { allFields, SeedbankField } from '../../src/helpers/fieldDefinitions';

const fields = Object.values(allFields);

test.each(fields)('$label has a valid label', ({ label }) => {
  expect(label).toBeDefined();
  expect(label.length).toBeGreaterThan(0);
});

test.each(fields)('$label has a valid description', ({ description }) => {
  expect(description).toBeDefined();
  expect(description.length).toBeGreaterThan(0);
});

test.each(fields)('$label has a valid icon', ({ icon }) => {
  expect(icon).toBeDefined();
  expectTypeOf(icon).toMatchTypeOf<TablerIcon>();
});

test.each(fields)('$label has a valid example', ({ examples }) => {
  expect(examples).toBeDefined();
  expect(examples.length).toBeGreaterThan(0);
});

test.each(fields)('$label matches SeedbankField type', (field) => {
  expectTypeOf(field).toMatchTypeOf<SeedbankField>();
});
