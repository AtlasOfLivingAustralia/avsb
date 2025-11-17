type Variables = { [key: string]: unknown };

const CACHE_PREFIX = 'gql:';
const MAX_CACHE_SIZE_BYTES = 100 * 1024; // 100kb
const HASH_MOD = 2 ** 32;
const HASH_MULTIPLIER = 31;

const canUseSessionStorage = () =>
  typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

const hashPayload = (payload: string) => {
  let hash = 0;
  for (let i = 0; i < payload.length; i += 1) {
    hash = (hash * HASH_MULTIPLIER + payload.charCodeAt(i)) % HASH_MOD;
  }
  return hash.toString(16);
};

const shouldSkipCaching = (query: string) => query.includes('_tileServerToken');

const buildCacheKey = (query: string, variables?: Variables) => {
  if (shouldSkipCaching(query)) return null;

  const payload = JSON.stringify({ query, variables: variables || {} });
  const hash = hashPayload(payload);
  return `${CACHE_PREFIX}${hash}`;
};

const getCachedResponse = <T>(cacheKey: string): T | null => {
  if (!canUseSessionStorage()) return null;

  const cached = window.sessionStorage.getItem(cacheKey);
  if (!cached) return null;

  try {
    return JSON.parse(cached) as T;
  } catch {
    // Remove the item from sessionStorage if the data isn't valid JSON
    window.sessionStorage.removeItem(cacheKey);
    return null;
  }
};

const maybeStoreResponse = (cacheKey: string, data: unknown) => {
  if (!canUseSessionStorage()) return;

  const serialized = JSON.stringify(data);
  const encoder = typeof TextEncoder !== 'undefined' ? new TextEncoder() : null;
  const sizeInBytes = encoder ? encoder.encode(serialized).length : serialized.length * 2;

  // Don't store any big reponses (i.e. downloads) so sessionStorage doesn't fill up
  if (sizeInBytes > MAX_CACHE_SIZE_BYTES) return;

  try {
    window.sessionStorage.setItem(cacheKey, serialized);
  } catch {
    // Best effort cache; ignore quota errors
  }
};

export { buildCacheKey, getCachedResponse, maybeStoreResponse };
export type { Variables };
