import { buildCacheKey, getCachedResponse, maybeStoreResponse } from '../cache';
import { Variables } from './types';

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
  if (response.ok) {
    // caching implementation here
    if (cacheKey) maybeStoreResponse(cacheKey, data);
    return data as T;
  }

  // If errorData is populated, we've recieved an error from the GraphQL server
  const [error] = data?.errors || [];
  const errorObj = new Error(error.message);
  errorObj.stack = error.extensions?.exception?.stacktrace?.join('\n');

  throw errorObj;
}

export default performGQLQuery;
