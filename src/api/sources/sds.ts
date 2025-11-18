import { buildCacheKey, getCachedResponse, maybeStoreResponse } from '../cache';

interface SDSInstance {
  generalisation: {
    generalisation: string;
  };
  zone: {
    id: string;
    name: string;
    type: string;
  };
  authority: string;
  dataResourceId: string;
  category: {
    value: string;
    type: string;
  };
}

async function getInstances(guid: string, state: string) {
  const URL = `${
    import.meta.env.VITE_API_ALA
  }/sensitive/api/report?taxonId=${guid}&stateProvince=${state}&country=AUS`;
  const { sensitive, valid, report } = await (await fetch(URL)).json();

  return valid && sensitive ? report.taxon.instances : [];
}

async function get(guid?: string): Promise<SDSInstance[]> {
  if (!guid) return [];

  const cacheKey = buildCacheKey(`sds-${guid}`);

  // Return a cached response (if we have one)
  if (cacheKey) {
    const cachedResponse = getCachedResponse<SDSInstance[]>(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  // Wrap in a try-catch to handle
  try {
    const data = (
      await Promise.all(
        ['QLD', 'NT', 'NSW', 'WA', 'SA', 'ACT', 'VIC', 'TAS'].map((state) =>
          getInstances(guid, state),
        ),
      )
    ).flat();

    // Cache the response
    if (cacheKey) maybeStoreResponse(cacheKey, data);

    return data;
  } catch (_error) {
    return [];
  }
}

export default {
  get,
};

export type { SDSInstance };
