interface DistinctTaxon {
  count: number | null;
  key: string | null;
  rank: string | null;
  scientificName: string | null;
  kingdom: string | null;
  kingdomKey: string | null;
  phylum: string | null;
  phylumKey: string | null;
  class: string | null;
  classKey: string | null;
  order: string | null;
  orderKey: string | null;
  family: string | null;
  familyKey: string | null;
  genus: string | null;
  genusKey: string | null;
  species: string | null;
  speciesKey: string | null;
}

interface TemporalCoverage {
  gte: string | null;
  lte: string | null;
}

interface Measurement {
  measurementID: string | null;
  measurementType: string | null;
  measurementValue: string | null;
  measurementUnit: string | null;
  measurementAccuracy: string | null;
  measurementDeterminedBy: string | null;
  measurementDeterminedDate: string | null;
  measurementMethod: string | null;
  measurementRemarks: string | null;
}

interface EventType {
  concept: string | null;
  lineage: [string];
}

interface Event {
  eventID: string | null;
  type: string | null;
  eventType: EventType;
  eventName: string | null;
  parentEventID: string | null;
  datasetKey: string | null;
  locality: string | null;
  datasetTitle: string | null;
  samplingProtocol: [string];
  sampleSizeUnit: string | null;
  sampleSizeValue: number;
  stateProvince: string | null;
  country: string | null;
  countryCode: string | null;
  year: number | null;
  month: number | null;
  day: number | null;
  eventDate: string | null;
  decimalLatitude: number | null;
  decimalLongitude: number | null;
  occurrenceCount: number | null;
  childEventCount: number | null;
  coordinates: JSON;
  formattedCoordinates: string | null;
  measurementOrFactTypes: [string];
  measurementOrFactCount: number | null;
  parentEvent: Event;
  measurementOrFacts: [Measurement];
  eventHierarchy: [string];
  eventHierarchyJoined: string | null;
  eventTypeHierarchy: [string];
  eventTypeHierarchyJoined: string | null;
  eventHierarchyLevels: number | null;
  locationID: string | null;
  dataset: JSON;
  speciesCount: number;
  wktConvexHull: string | null;
  temporalCoverage: TemporalCoverage;
  distinctTaxa: [DistinctTaxon];
}

interface EventDocuments {
  size: number;
  from: number;
  total: number;
  results: [Event];
}

interface EventSearchResult {
  documents: EventDocuments;
  // facet: EventFacet
  // occurrenceFacet: EventOccurrenceFacet
  // occurrenceCount: Int
  // cardinality: EventCardinality
  // temporal: EventTemporal
  // stats: EventStats
  // _predicate: JSON
  // _tileServerToken: String
  _meta: JSON;
}

export type { DistinctTaxon, EventSearchResult };
