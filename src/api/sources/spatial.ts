import { buildCacheKey, getCachedResponse, maybeStoreResponse } from '../cache';

interface Layer {
  id: number;
  uid: string;
  name: string;
  displayname: string;
  description: string;
  type: string;
  source: string;
  path: string;
  displaypath: string;
  scale: string;
  extent: string;
  minlatitude: number;
  minlongitude: number;
  maxlatitude: number;
  maxlongitude: number;
  notes: string;
  enabled: boolean;
  environmentalvaluemin: string;
  environmentalvaluemax: string;
  environmentalvalueunits: string;
  lookuptablepath: string;
  metadatapath: string;
  classification1: string;
  classification2: string;
  mddatest: string;
  citation_date: string;
  datalang: string;
  mdhrlv: string;
  respparty_role: string;
  licence_level: string;
  licence_link: string;
  licence_notes: string;
  source_link: string;
  keywords: string;
  path_orig: string;
  path_1km: string;
  path_250m: string;
  getdomain: string;
  pid: string;
  dt_added: string;
  shape: boolean;
  grid: boolean;
}

interface FieldObject {
  id: string;
  pid: string;
  description: string;
  name: string;
  fid: string;
  fieldname: string;
  geometry?: string; // Marked optional as it's missing from this payload
  name_id?: number; // Marked optional as it's missing from this payload
  bbox: string; // Represents WKT POLYGON
  area_km: number;
  degrees?: number; // Marked optional as it's missing from this payload
  distance?: number; // Marked optional as it's missing from this payload
  wmsurl: string;
  featureType: string; // e.g., "MULTIPOLYGON"
  centroid: string; // Represents WKT POINT
}

interface Field {
  id: string;
  name: string;
  desc: string;
  type: string; // e.g., "c"
  spid: string;
  sid?: string; // Marked optional as it's missing from this payload
  sname: string;
  sdesc?: string; // Marked optional as it's missing from this payload
  indb: boolean;
  enabled: boolean;
  last_update: string; // ISO Timestamp string
  namesearch: boolean;
  defaultlayer: boolean;
  intersect: boolean;
  layerbranch: boolean;
  analysis: boolean;
  addtomap: boolean;
  number_of_objects: number;
  wms?: string; // Marked optional as it's missing from the root here
  objects: FieldObject[];

  // Kept Layer as optional in case other endpoints still return it asynchronously
  layer?: Layer;
}

async function fields(cls: string[]): Promise<Field[]> {
  return (await Promise.all(cls.map(field))).filter((field) => field !== null);
}

async function field(cl: string): Promise<Field | null> {
  const URL = `${import.meta.env.VITE_API_SPATIAL}/field/${cl}`;
  const cacheKey = buildCacheKey(URL);

  // Return a cached response (if we have one)
  if (cacheKey) {
    const cachedResponse = getCachedResponse<Field>(cacheKey);
    if (cachedResponse) return cachedResponse;
  }

  const response = await fetch(URL);

  // Ensure we've successfully recieved the data back
  if (!response.ok) {
    throw new Error(`Failed to fetch spatial field data for ${cl}`);
  }

  const data = await response.json();

  // Cache the response
  if (cacheKey && response.ok) maybeStoreResponse(cacheKey, data);

  // Return the data
  return data;
}

export default {
  field,
  fields,
};

export type { Field, FieldObject, Layer };
