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

interface SeedBankAccession {
  id?: string;
  accessionNumber?: string | null;
  seedPerGram?: number | null;
  formInStorage?: string | null;
  sampleWeightInGrams?: number | null;
  sampleSize?: number | null;
  collectionFillRate?: string | null;
  purityDebrisPercentage?: number | null;
  purityPercentage?: number | null;
  dateCollected?: number | null;
  dateInStorage?: number | null;
  storageTemperatureInCelsius?: number | null;
  relativeHumidityPercentage?: number | null;
  publicationDOI?: string | null;
  preStorageTreatmentNotesHistory?: string | null;
  primaryStorageSeedBank?: string | null;
  degreeOfEstablishment?: string | null;
  primaryCollector?: string | null;
  plantForm?: string | null;
  duplicatesReplicates?: string | null;
  collectionPermitNumber?: string | null;
  thousandSeedWeight?: number | null;
  numberPlantsSampled?: string | null;
  storageBehaviour?: string | null;
  embryoType?: string | null;
  dormancyClass?: string | null;
}

interface SeedBankTrial {
  id?: string;
  accessionNumber?: string | null;
  testDateStarted?: string | null;
  testLengthInDays?: string | null;
  numberGerminated?: number | null;
  germinationRateInDays?: number | null;
  adjustedGerminationPercentage?: number | null;
  viabilityPercentage?: number | null;
  numberFull?: number | null;
  numberEmpty?: number | null;
  numberTested?: number | null;
  preTestProcessingNotes?: string | null;
}

interface SeedBankTreatment {
  id?: string;
  pretreatment?: string | null;
  mediaSubstrate?: string | null;
  nightTemperatureInCelsius?: number | null;
  dayTemperatureInCelsius?: number | null;
  darkHours?: number | null;
  lightHours?: number | null;
}

type SeedBankExtension = SeedBankAccession | SeedBankTrial | SeedBankTreatment;

interface EventType {
  concept: string | null;
  lineage: [string];
}

interface Event {
  eventID?: string | null;
  type?: string | null;
  eventType?: EventType;
  eventName?: string | null;
  parentEventID?: string | null;
  datasetKey?: string | null;
  locality?: string | null;
  datasetTitle?: string | null;
  samplingProtocol?: [string];
  sampleSizeUnit?: string | null;
  sampleSizeValue?: number;
  stateProvince?: string | null;
  country?: string | null;
  countryCode?: string | null;
  year?: number | null;
  month?: number | null;
  day?: number | null;
  eventDate?: string | null;
  decimalLatitude?: number | null;
  decimalLongitude?: number | null;
  occurrenceCount?: number | null;
  childEventCount?: number | null;
  coordinates?: JSON;
  formattedCoordinates?: string | null;
  measurementOrFactTypes?: [string];
  measurementOrFactCount?: number | null;
  parentEvent?: Event;
  measurementOrFacts?: [Measurement];
  eventHierarchy?: [string];
  eventHierarchyJoined?: string | null;
  eventTypeHierarchy?: [string];
  eventTypeHierarchyJoined?: string | null;
  eventHierarchyLevels?: number | null;
  locationID?: string | null;
  dataset?: JSON;
  speciesCount?: number;
  wktConvexHull?: string | null;
  temporalCoverage?: TemporalCoverage;
  distinctTaxa?: [DistinctTaxon];
  extensions?: {
    seedbank?: SeedBankExtension;
  };
  treatments?: Event[];
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

type PredicateType =
  | 'and'
  | 'or'
  | 'not'
  | 'equals'
  | 'in'
  | 'within'
  | 'isNotNull'
  | 'like'
  | 'fuzzy'
  | 'nested'
  | 'range';

type PredicateValue = string | number | null | { gte?: number | ''; lte?: number | '' };

interface Predicate {
  type: PredicateType;
  key?: string;
  value?: PredicateValue;
  values?: PredicateValue[];
  predicate?: Predicate;
  predicates?: Predicate[];
}

export type {
  PredicateType,
  PredicateValue,
  Predicate,
  DistinctTaxon,
  Event,
  EventSearchResult,
  Measurement,
  SeedBankAccession,
  SeedBankTrial,
  SeedBankTreatment,
  SeedBankExtension,
  Contact,
  MediaItem,
};
