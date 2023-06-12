interface DistinctTaxon {
  count?: number | null;
  key?: string | null;
  rank?: string | null;
  scientificName?: string | null;
  kingdom?: string | null;
  kingdomKey?: string | null;
  phylum?: string | null;
  phylumKey?: string | null;
  class?: string | null;
  classKey?: string | null;
  order?: string | null;
  orderKey?: string | null;
  family?: string | null;
  familyKey?: string | null;
  genus?: string | null;
  genusKey?: string | null;
  species?: string | null;
  speciesKey?: string | null;
}

interface TemporalCoverage {
  gte?: string | null;
  lte?: string | null;
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
  quantityInGrams?: number | null;
  quantityCount?: number | null;
  collectionFill?: string | null;
  purityPercentage?: number | null;
  dateCollected?: number | null;
  dateInStorage?: number | null;
  storageTemperatureInCelsius?: number | null;
  storageRelativeHumidityPercentage?: number | null;
  publicationDOI?: string | null;
  preStorageTreatment?: string | null;
  primaryStorageSeedBank?: string | null;
  degreeOfEstablishment?: string | null;
  primaryCollector?: string | null;
  plantForm?: string | null;
  duplicatesReplicates?: string | null;
  collectionPermitNumber?: string | null;
  thousandSeedWeight?: number | null;
  numberPlantsSampled?: string | null;
  storageBehaviour?: string | null;
  esRatio?: string | null;
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

// type SeedBankExtension = SeedBankAccession | SeedBankTrial | SeedBankTreatment;
interface SeedBankExtension extends SeedBankAccession, SeedBankTrial, SeedBankTreatment {}

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
  eventRemarks?: string | null;
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
  size?: number;
  from?: number;
  total?: number;
  results?: [Event];
}

interface DataArchive {
  url?: string;
  fileSizeInMB?: number;
  modified?: string;
}

interface EventFacetResult_string {
  key?: string;
  count?: number;
  _predicate?: JSON;
}

interface EventFacetResult_float {
  key?: string;
  count?: number;
  _predicate?: JSON;
}

interface EventFacetResult_dataset {
  key?: string;
  count?: number;
  occurrenceCount?: number | null;
  datasetTitle?: string;
  archive?: DataArchive;
  _predicate?: JSON;
}

interface EventFacet {
  kingdoms?: [EventFacetResult_string];
  phyla?: [EventFacetResult_string];
  classes?: [EventFacetResult_string];
  orders?: [EventFacetResult_string];
  families?: [EventFacetResult_string];
  genera?: [EventFacetResult_string];
  species?: [EventFacetResult_string];
  eventHierarchyJoined?: [EventFacetResult_string];
  eventHierarchy?: [EventFacetResult_string];
  eventTypeHierarchyJoined?: [EventFacetResult_string];
  eventTypeHierarchy?: [EventFacetResult_string];
  locality?: [EventFacetResult_string];
  samplingProtocol?: [EventFacetResult_string];
  measurementOrFactTypes?: [EventFacetResult_string];
  stateProvince?: [EventFacetResult_string];
  datasetKey?: [EventFacetResult_dataset];
  measurementOfFactTypes: [EventFacetResult_dataset];
  locationID?: [EventFacetResult_string];
  year?: [EventFacetResult_float];
  month?: [EventFacetResult_float];
  eventType?: [EventFacetResult_string];
  scientificNames?: [EventFacetResult_string];
}

interface EventOccurrenceFacetResult_string {
  key: string;
  count: number;
  _predicate: JSON;
}

interface EventOccurrenceFacet {
  datasetKey?: [EventOccurrenceFacetResult_string];
  kingdom?: [EventOccurrenceFacetResult_string];
  phylum?: [EventOccurrenceFacetResult_string];
  class?: [EventOccurrenceFacetResult_string];
  order?: [EventOccurrenceFacetResult_string];
  family?: [EventOccurrenceFacetResult_string];
  genus?: [EventOccurrenceFacetResult_string];
  species?: [EventOccurrenceFacetResult_string];
  samplingProtocol?: [EventOccurrenceFacetResult_string];
  locationID?: [EventOccurrenceFacetResult_string];
  basisOfRecord?: [EventOccurrenceFacetResult_string];
  stateProvince?: [EventOccurrenceFacetResult_string];
  recordedBy?: [EventOccurrenceFacetResult_string];
  recordedById?: [EventOccurrenceFacetResult_string];
  identifiedBy?: [EventOccurrenceFacetResult_string];
  identifiedById?: [EventOccurrenceFacetResult_string];
  scientificNames?: [EventOccurrenceFacetResult_string];
  month?: [EventOccurrenceFacetResult_string];
  year?: [EventOccurrenceFacetResult_string];
  eventHierarchyJoined?: [EventOccurrenceFacetResult_string];
  eventHierarchy?: [EventOccurrenceFacetResult_string];
  eventTypeHierarchyJoined?: [EventOccurrenceFacetResult_string];
  eventTypeHierarchy?: [EventOccurrenceFacetResult_string];
}

interface Stats {
  count: number;
  min: number | null;
  max: number | null;
  avg: number | null;
  sum: number | null;
}

interface EventStats {
  occurrenceCount: Stats;
  year: Stats;
}

interface EventSearchResult {
  documents?: EventDocuments;
  facet?: EventFacet;
  occurrenceFacet?: EventOccurrenceFacet;
  occurrenceCount?: number;
  stats?: EventStats;
  _predicate?: JSON;
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
  identifier?: string;
  type?: string | null;
  subtypeLiteral?: string | null;
  title?: string | null;
  metadataDate?: string | null;
  metadataLanguage?: string | null;
  metadataLanguageLiteral?: string | null;
  providerManagedID?: string | null;
  rights?: string | null;
  owner?: string | null;
  webStatement?: string | null;
  credit?: string | null;
  creator?: string | null;
  providerLiteral?: string | null;
  description?: string | null;
  tag?: string | null;
  createDate?: string | null;
  IDofContainingCollection?: string | null;
  accessURI?: string | null;
  accessOriginalURI?: string | null;
  format?: string | null;
  hashFunction?: string | null;
  hashValue?: string | null;
  pixelXDimension?: number | null;
  pixelYDimension?: number | null;
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
  EventDocuments,
  EventSearchResult,
  Measurement,
  SeedBankAccession,
  SeedBankTrial,
  SeedBankTreatment,
  SeedBankExtension,
  Contact,
  MediaItem,
};
