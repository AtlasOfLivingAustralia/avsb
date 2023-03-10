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
  _tileServerToken?: string;
  _meta?: JSON;
}

interface SeedBankAccession {
  eventID: string;
  accessionNumber: string | null;
  seedPerGram: number | null;
  formInStorage: string | null;
  sampleWeight: number | null;
  sampleSize: number | null;
  purityDebris: number | null;
  purity: number | null;
  dateCollected: string | null;
  dateInStorage: string | null;
  storageTemp: number | null;
  relativeHumidity: number | null;
  publicationDOI: string | null;
  preStorageTreatmentNotesHistory: string | null;
  primaryStorageSeedBank: string | null;
  cultivated: string | null;
  primaryCollector: string | null;
  plantForm: string | null;
  duplicatesReplicates: string | null;
  collectionPermitNumber: string | null;
  thousandSeedWeight: number | null;
  numberPlantsSampled: string | null;
  storageBehaviour: string | null;
  embryoType: string | null;
  dormancyClass: string | null;
}

interface SeedBankTrial {
  eventID: string;
  testDateStarted: string | null;
  testLengthInDays: string | null;
  collectionFillRate: string | null;
  numberGerminated: number | null;
  germinationRate: number | null;
  adjustedGermination: number | null;
  viability: number | null;
  numberFull: number | null;
  numberEmpty: number | null;
  numberTested: number | null;
  preTestProcessingNotes: string | null;
}

interface SeedBankTreatment {
  eventID: string;
  pretreatment: string | null;
  mediaSubstrate: string | null;
  nightTemp: number | null;
  dayTemp: number | null;
  darkHours: number | null;
  lightHours: number | null;
}

interface Contact {
  individualName?: [
    {
      givenName?: [string];
      surName?: [string];
    },
  ];
  positionName?: [string];
  electronicMailAddress?: [string];
  organizationName?: [string];
  phone?: [string];
  address?: [
    {
      administrativeArea?: [string];
      city?: [string];
      country?: [string];
      deliveryPoint?: [string];
      postalCode?: [string];
    },
  ];
}

interface MediaItem {
  identifier: string;
  type: string | null;
  subtypeLiteral: string | null;
  title: string | null;
  metadataDate: string | null;
  metadataLanguage: string | null;
  metadataLanguageLiteral: string | null;
  providerManagedID: string | null;
  rights: string | null;
  owner: string | null;
  webStatement: string | null;
  credit: string | null;
  creator: string | null;
  providerLiteral: string | null;
  description: string | null;
  tag: string | null;
  createDate: string | null;
  IDofContainingCollection: string | null;
  accessURI: string | null;
  accessOriginalURI: string | null;
  format: string | null;
  hashFunction: string | null;
  hashValue: string | null;
  pixelXDimension: number;
  pixelYDimension: number;
}

export type {
  DistinctTaxon,
  Event,
  EventSearchResult,
  SeedBankAccession,
  SeedBankTrial,
  SeedBankTreatment,
  Contact,
  MediaItem,
};
