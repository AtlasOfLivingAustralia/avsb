import { type CSSProperties, useEffect, useState } from 'react';
import queries from '#/api/queries';
import classes from './LastUpdated.module.css';
import {
  formatPublicationLabel,
  labelFromStoredValue,
  pubDateFromEml,
  toIsoDate,
} from './lastUpdatedDate';

const STORAGE_KEY = 'avsb-last-updated';
const DATASET_KEY = /^[A-Za-z_]\w*$/;
const FALLBACK_LABEL = 'Calculating';

function datasetKeys(): string[] {
  return queries.DATA_RESOURCES.map((key) => key.replace(/#.*$/, '').trim()).filter((key) =>
    DATASET_KEY.test(key),
  );
}

function readStoredLabel(): string | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const label = labelFromStoredValue(raw);
    if (label) return label;

    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors (private browsing, blocked storage)
  }
  return null;
}

function writeStoredDate(date: Date): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, toIsoDate(date));
  } catch {
    // Ignore quota or permission errors
  }
}

// Shared across mounts so Home and Statistics do not each walk the dataset list.
let inflightPromise: Promise<string | null> | null = null;
let abortController: AbortController | null = null;
let latestLabel: string | null = null;
const listeners = new Set<(label: string) => void>();

function notify(label: string) {
  latestLabel = label;
  for (const listener of listeners) listener(label);
}

function subscribe(listener: (label: string) => void) {
  listeners.add(listener);
  if (latestLabel) listener(latestLabel);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) abortController?.abort();
  };
}

async function fetchEmlDate(key: string, signal: AbortSignal): Promise<Date | null> {
  const response = await fetch(
    `${import.meta.env.VITE_ALA_COLLECTORY}/ws/eml/${encodeURIComponent(key)}`,
    { signal },
  );
  if (!response.ok) return null;
  return pubDateFromEml(await response.text());
}

async function fetchLatestLabel(signal: AbortSignal): Promise<string | null> {
  let latest: Date | null = null;

  for (const key of datasetKeys()) {
    if (signal.aborted) break;

    try {
      // biome-ignore lint/performance/noAwaitInLoops: show the first date immediately and cancel the rest on unmount
      const date = await fetchEmlDate(key, signal);
      if (!date || (latest && date.getTime() <= latest.getTime())) continue;

      latest = date;
      notify(formatPublicationLabel(latest));
    } catch (error) {
      if (signal.aborted) break;
      console.error(`Failed to load publication date for ${key}`, error);
    }
  }

  if (!latest || signal.aborted) return latest ? formatPublicationLabel(latest) : null;

  writeStoredDate(latest);
  return formatPublicationLabel(latest);
}

function getOrFetchLabel(): Promise<string | null> {
  if (inflightPromise && !abortController?.signal.aborted) return inflightPromise;

  abortController = new AbortController();
  const { signal } = abortController;
  const promise = fetchLatestLabel(signal).finally(() => {
    if (inflightPromise === promise) {
      inflightPromise = null;
      abortController = null;
    }
  });
  inflightPromise = promise;
  return promise;
}

export default function LastUpdated() {
  const [label, setLabel] = useState(readStoredLabel);

  useEffect(() => {
    if (readStoredLabel() || datasetKeys().length === 0) return;

    let isMounted = true;
    const unsubscribe = subscribe((next) => {
      if (isMounted) setLabel(next);
    });

    getOrFetchLabel();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (label) return label;

  const seen = new Map<string, number>();

  return (
    <>
      <span aria-hidden='true'>
        {[...FALLBACK_LABEL].map((char, index) => {
          const count = (seen.get(char) ?? 0) + 1;
          seen.set(char, count);

          return (
            <span
              key={`${char}-${count}`}
              className={classes.letter}
              style={{ '--index': index } as CSSProperties}
            >
              {char}
            </span>
          );
        })}
      </span>
      <span className={classes.accessible}>{FALLBACK_LABEL}</span>
    </>
  );
}
