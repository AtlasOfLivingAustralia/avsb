import { get } from 'lodash';
import { buildCacheKey, getCachedResponse, maybeStoreResponse } from '../cache';
import { Variables } from './types';
import { mapEventTaxa } from '#/helpers/mapEventTaxon';

async function performGQLQuery<T = unknown>(query: string, variables?: Variables) {
  const cacheKey = buildCacheKey(query, variables);

  // Return a cached response (if we have one)
  if (cacheKey) {
    const cachedResponse = getCachedResponse<T>(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  const response = await fetch(import.meta.env.VITE_API_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  const data = await response.json();

  // If errorData is populated, we've recieved an error from the GraphQL server
  if ((data?.errors || []).length > 0 || !response.ok) {
    const [error] = data?.errors || [];
    const errorObj = new Error(error?.message || 'An error occurred');
    errorObj.stack =
      error?.extensions?.exception?.stacktrace?.join('\n') || 'An unknown error occurred.';

    throw errorObj;
  }

  // Automatically map taxon name / ID emofs to the _taxon field
  const keys = Object.keys(data.data);
  for (let k = 0; k < keys.length; k += 1) {
    const key = keys[k];
    const fullKey = `data.${key}.documents.results[0].measurementOrFacts`;

    if (get(data, fullKey)) {
      data.data[key].documents.results = mapEventTaxa(data.data[key].documents.results);
    }
  }

  if (cacheKey && response.ok) {
    maybeStoreResponse(cacheKey, data);
  }

  return data as T;
}

export default performGQLQuery;
