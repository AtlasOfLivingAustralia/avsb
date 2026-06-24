import { buildCacheKey, getCachedResponse, maybeStoreResponse } from '../cache';

interface OccurrenceSearch {
  pageSize: number;
  startIndex: number;
  totalRecords: number;
  sort: string;
  dir: string;
  status: string;
  occurrences: Occurrence[];
  // facetResults: any[]
  query: string;
  urlParameters: string;
  queryTitle: string;
  activeFacetMap: ActiveFacetMap;
  activeFacetObj: ActiveFacetObj;
}

interface Occurrence {
  uuid: string;
  occurrenceID: string;
  dataHubUid: string[];
  institutionUid: string;
  raw_institutionCode: string;
  institutionName: string;
  raw_collectionCode: string;
  collectionUid: string;
  collectionName: string;
  raw_catalogNumber: string;
  taxonConceptID: string;
  eventDate: number;
  scientificName: string;
  vernacularName: string;
  taxonRank: string;
  taxonRankID: number;
  raw_countryCode: string;
  country: string;
  kingdom: string;
  phylum: string;
  classs: string;
  order: string;
  family: string;
  genus: string;
  genusGuid: string;
  species: string;
  speciesGuid: string;
  stateProvince: string;
  decimalLatitude: number;
  decimalLongitude: number;
  coordinateUncertaintyInMeters: number;
  year: number;
  month: string;
  basisOfRecord: string;
  dataProviderUid: string;
  dataProviderName: string;
  dataResourceUid: string;
  dataResourceName: string;
  assertions: string[];
  speciesGroups: string[];
  spatiallyValid: boolean;
  recordedBy: string[];
  collectors: string[];
  raw_scientificName: string;
  raw_basisOfRecord: string;
  license: string;
  recordNumber: string;
  geospatialKosher: string;
  latLong: string;
  point1: string;
  point01: string;
  point001: string;
  point0001: string;
  point00001: string;
  collector: string[];
  namesLsid: string;
  left: number;
  right: number;
}

interface Lsid {
  name: string;
  displayName: string;
  value: string;
}

interface ActiveFacetMap {
  lsid: Lsid;
}

interface ActiveFacetObj {
  lsid: Lsid[];
}

async function occurrences(params: URLSearchParams): Promise<OccurrenceSearch> {
  const URL = `${import.meta.env.VITE_ALA_BIOCACHE}/occurrences/search?${params.toString()}`;
  const cacheKey = buildCacheKey(URL);

  // Return a cached response (if we have one)
  if (cacheKey) {
    const cachedResponse = getCachedResponse<OccurrenceSearch>(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  const response = await fetch(URL);
  const data = await response.json();

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to fetch occurrences!');
  }

  // Cache the response
  if (cacheKey && response.ok) maybeStoreResponse(cacheKey, data);

  return data;
}

export default {
  occurrences,
};

export type { Occurrence, OccurrenceSearch };
