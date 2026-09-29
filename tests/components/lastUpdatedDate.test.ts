import { expect, test } from 'vitest';
import {
  formatPublicationLabel,
  labelFromStoredValue,
  latestPublicationDate,
  parsePublicationDate,
  pubDateFromEml,
  toIsoDate,
} from '../../src/components/lastUpdatedDate';

function dataset(pubDate: unknown) {
  return {
    documents: {
      results: [
        {
          dataset: {
            raw: {
              'eml:eml': {
                dataset: [{ pubDate: [pubDate] }],
              },
            },
          },
        },
      ],
    },
  };
}

test('parses a date-only publication date as that calendar day', () => {
  const parsed = parsePublicationDate('2025-12-01T00:00:00.000Z');

  expect(parsed?.getFullYear()).toBe(2025);
  expect(parsed?.getMonth()).toBe(11);
  expect(parsed?.getDate()).toBe(1);
  expect(parsed ? formatPublicationLabel(parsed) : null).toBe('December, 2025');
});

test('rejects calendar dates that do not exist', () => {
  expect(parsePublicationDate('2025-02-31')).toBeNull();
  expect(parsePublicationDate('2025-13-01')).toBeNull();
  expect(parsePublicationDate('')).toBeNull();
  expect(parsePublicationDate(null)).toBeNull();
});

test('selects the latest plausible publication date and skips invalid ones', () => {
  const latest = latestPublicationDate({
    missing: { documents: { results: [] } },
    invalid: dataset('not-a-date'),
    early: dataset('2024-06-15'),
    latest: dataset('2025-11-02'),
    impossible: dataset('3025-01-01'),
    empty: null,
  });

  expect(latest ? toIsoDate(latest) : null).toBe('2025-11-02');
  expect(latest ? formatPublicationLabel(latest) : null).toBe('November, 2025');
});

test('accepts a stored calendar date and a legacy label, and drops anything else', () => {
  expect(labelFromStoredValue('2025-11-02')).toBe('November, 2025');
  expect(labelFromStoredValue('December, 2025')).toBe('December, 2025');
  expect(labelFromStoredValue('3025-01-01')).toBeNull();
  expect(labelFromStoredValue('not a date')).toBeNull();
});

test('reads a publication date from EML and ignores anything else', () => {
  expect(pubDateFromEml('<dataset><pubDate>2025-11-02</pubDate></dataset>')?.getMonth()).toBe(10);
  expect(pubDateFromEml('<dataset><pubDate>3025-01-01</pubDate></dataset>')).toBeNull();
  expect(pubDateFromEml('<dataset></dataset>')).toBeNull();
});

test('returns null when no dataset has a publication date', () => {
  expect(latestPublicationDate(null)).toBeNull();
  expect(latestPublicationDate({})).toBeNull();
  expect(latestPublicationDate({ a: dataset(undefined) })).toBeNull();
});
