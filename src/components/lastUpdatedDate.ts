import { get } from 'lodash';

const PUB_DATE_PATH = 'documents.results[0].dataset.raw.eml:eml.dataset[0].pubDate[0]';
const PUB_DATE_TAG = /<pubDate>\s*([^<]*?)\s*<\/pubDate>/i;
const EARLIEST_YEAR = 1990;
const STORED_ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;
const LEGACY_LABEL =
  /^(January|February|March|April|May|June|July|August|September|October|November|December), \d{4}$/;

export function parsePublicationDate(value: unknown): Date | null {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (typeof value !== 'string') return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  // EML pubDate is a calendar date. Parsing "YYYY-MM-DD" with Date treats it as UTC
  // and can shift the month in timezones behind UTC, so build a local date instead.
  const match = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?(?:$|T|\s)/.exec(trimmed);
  if (match) {
    const year = Number(match[1]);
    const month = match[2] ? Number(match[2]) : 1;
    const day = match[3] ? Number(match[3]) : 1;
    return calendarDate(year, month, day);
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function pubDateFromEml(xml: string): Date | null {
  const match = PUB_DATE_TAG.exec(xml);
  if (!match) return null;

  const parsed = parsePublicationDate(match[1]);
  if (!parsed || !isPlausiblePublicationDate(parsed)) return null;
  return parsed;
}

export function formatPublicationLabel(date: Date): string {
  const month = new Intl.DateTimeFormat('en-AU', { month: 'long' }).format(date);
  return `${month}, ${date.getFullYear()}`;
}

export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function labelFromStoredValue(raw: string): string | null {
  if (LEGACY_LABEL.test(raw)) {
    const year = Number(raw.slice(-4));
    return isPlausibleYear(year) ? raw : null;
  }

  if (!STORED_ISO_DATE.test(raw)) return null;

  const parsed = parsePublicationDate(raw);
  if (!parsed || !isPlausiblePublicationDate(parsed)) return null;
  return formatPublicationLabel(parsed);
}

export function latestPublicationDate(
  datasets: Record<string, unknown> | null | undefined,
): Date | null {
  if (!datasets) return null;

  let latest: Date | null = null;

  for (const result of Object.values(datasets)) {
    const parsed = parsePublicationDate(get(result, PUB_DATE_PATH));
    if (!parsed || !isPlausiblePublicationDate(parsed)) continue;
    if (!latest || parsed.getTime() > latest.getTime()) latest = parsed;
  }

  return latest;
}

function calendarDate(year: number, month: number, day: number): Date | null {
  if (month < 1 || month > 12) return null;

  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

function isPlausiblePublicationDate(date: Date): boolean {
  return isPlausibleYear(date.getFullYear());
}

function isPlausibleYear(year: number): boolean {
  return year >= EARLIEST_YEAR && year <= new Date().getFullYear() + 1;
}
