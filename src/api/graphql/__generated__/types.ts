/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  /** A field whose value conforms to the standard internet email address format as specified in HTML Spec: https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address. */
  EmailAddress: { input: unknown; output: unknown; }
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: { input: unknown; output: unknown; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: unknown; output: unknown; }
  /** The `Long` scalar type represents 52-bit integers */
  Long: { input: number; output: number; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: unknown; output: unknown; }
};

export type AccessionStatus =
  | 'INSTITUTIONAL'
  | 'PROJECT';

export type AgentIdentifierType =
  | 'ORCID'
  | 'OTHER'
  | 'WIKIDATA';

export type AppRole =
  | 'APP'
  | 'IPT';

export type BasisOfRecord =
  | 'FOSSIL_SPECIMEN'
  | 'HUMAN_OBSERVATION'
  | 'LITERATURE'
  | 'LIVING_SPECIMEN'
  | 'MACHINE_OBSERVATION'
  | 'MATERIAL_CITATION'
  | 'MATERIAL_SAMPLE'
  | 'OBSERVATION'
  | 'OCCURRENCE'
  | 'PRESERVED_SPECIMEN'
  | 'UNKNOWN';

export type CitesAppendix =
  | 'I'
  | 'II'
  | 'III';

export type CollectionContentType =
  | 'ARCHAEOLOGICAL_C14'
  | 'ARCHAEOLOGICAL_CERAMIC_ARTIFACTS'
  | 'ARCHAEOLOGICAL_COPROLITES'
  | 'ARCHAEOLOGICAL_FAUNAL_ARTIFACTS'
  | 'ARCHAEOLOGICAL_FAUNAL_REMAINS'
  | 'ARCHAEOLOGICAL_FLORAL_ARTIFACTS'
  | 'ARCHAEOLOGICAL_FLORAL_REMAINS'
  | 'ARCHAEOLOGICAL_HUMAN_REMAINS'
  | 'ARCHAEOLOGICAL_LITHIC_ARTIFACTS'
  | 'ARCHAEOLOGICAL_METAL_ARTIFACTS'
  | 'ARCHAEOLOGICAL_OTHER'
  | 'ARCHAEOLOGICAL_TECHONOLOGICAL_PROCESSES_REMAINS'
  | 'ARCHAEOLOGICAL_TEXTILES_BASKETRY'
  | 'ARCHAEOLOGICA_WOODEN_ARTIFACTS'
  | 'BIOLOGICAL_ANIMAL_BUILT_STRUCTURES'
  | 'BIOLOGICAL_ANIMAL_DERIVED'
  | 'BIOLOGICAL_BIOFLUIDS'
  | 'BIOLOGICAL_CELLS_TISSUE'
  | 'BIOLOGICAL_ENDOSKELETONS'
  | 'BIOLOGICAL_EXOSKELETONS'
  | 'BIOLOGICAL_FECES'
  | 'BIOLOGICAL_LIVING_CELL_OR_TISSUE_CULTURES'
  | 'BIOLOGICAL_LIVING_ORGANISMS'
  | 'BIOLOGICAL_MOLECULAR_DERIVATES'
  | 'BIOLOGICAL_OTHER'
  | 'BIOLOGICAL_PLANT_DERIVED'
  | 'BIOLOGICAL_PRESERVED_ORGANISMS'
  | 'EARTH_PLANETARY_ASTEROIDS'
  | 'EARTH_PLANETARY_COMETS'
  | 'EARTH_PLANETARY_COSMIC_INTERPLANETARY_DUST'
  | 'EARTH_PLANETARY_GAS'
  | 'EARTH_PLANETARY_GEMS'
  | 'EARTH_PLANETARY_ICE'
  | 'EARTH_PLANETARY_LUNAR_MATERIALS'
  | 'EARTH_PLANETARY_METALS_ORES'
  | 'EARTH_PLANETARY_METEORITES'
  | 'EARTH_PLANETARY_MINERALS'
  | 'EARTH_PLANETARY_OTHER'
  | 'EARTH_PLANETARY_ROCKS'
  | 'EARTH_PLANETARY_SEDIMENTS'
  | 'EARTH_PLANETARY_SOILS'
  | 'EARTH_PLANETARY_SPACE_EXPOSED_MATERIALS'
  | 'EARTH_PLANETARY_WATER'
  | 'HUMAN_DERIVED_BIOFLUIDS_HUMAN'
  | 'HUMAN_DERIVED_BLOOD_HUMAN'
  | 'HUMAN_DERIVED_CELLS_HUMAN'
  | 'HUMAN_DERIVED_FECES_HUMAN'
  | 'HUMAN_DERIVED_MOLECULAR_DERIVATIVES'
  | 'HUMAN_DERIVED_OTHER'
  | 'HUMAN_DERIVED_TISSUE_HUMAN'
  | 'PALEONTOLOGICAL_CONODONTS'
  | 'PALEONTOLOGICAL_INVERTEBRATE_FOSSILS'
  | 'PALEONTOLOGICAL_INVERTEBRATE_MICROFOSSILS'
  | 'PALEONTOLOGICAL_OTHER'
  | 'PALEONTOLOGICAL_PETRIFIED_WOOD'
  | 'PALEONTOLOGICAL_PLANT_FOSSILS'
  | 'PALEONTOLOGICAL_TRACE_FOSSILS'
  | 'PALEONTOLOGICAL_VERTEBRATE_FOSSILS'
  | 'RECORDS_ASSOCIATED_DATA'
  | 'RECORDS_DERIVED_DATA'
  | 'RECORDS_DOCUMENTATION'
  | 'RECORDS_DOCUMENTS'
  | 'RECORDS_IMAGES'
  | 'RECORDS_MAPS'
  | 'RECORDS_OTHER'
  | 'RECORDS_RADIOGRAPH'
  | 'RECORDS_RECORDINGS'
  | 'RECORDS_SEISMOGRAMS';

export type CollectionsSortField =
  | 'NUMBER_SPECIMENS';

export type ContactType =
  | 'ADDITIONAL_DELEGATE'
  | 'ADMINISTRATIVE_POINT_OF_CONTACT'
  | 'AUTHOR'
  | 'CONTENT_PROVIDER'
  | 'CURATOR'
  | 'CUSTODIAN_STEWARD'
  | 'DATA_ADMINISTRATOR'
  | 'DISTRIBUTOR'
  | 'EDITOR'
  | 'HEAD_OF_DELEGATION'
  | 'METADATA_AUTHOR'
  | 'NODE_MANAGER'
  | 'NODE_STAFF'
  | 'ORIGINATOR'
  | 'OWNER'
  | 'POINT_OF_CONTACT'
  | 'PRINCIPAL_INVESTIGATOR'
  | 'PROCESSOR'
  | 'PROGRAMMER'
  | 'PUBLISHER'
  | 'REGIONAL_NODE_REPRESENTATIVE'
  | 'REVIEWER'
  | 'SYSTEM_ADMINISTRATOR'
  | 'TECHNICAL_POINT_OF_CONTACT'
  | 'TEMPORARY_DELEGATE'
  | 'TEMPORARY_HEAD_OF_DELEGATION'
  | 'USER';

export type Continent =
  | 'AFRICA'
  | 'ANTARCTICA'
  | 'ASIA'
  | 'EUROPE'
  | 'NORTH_AMERICA'
  | 'OCEANIA'
  | 'SOUTH_AMERICA';

export type Country =
  | 'AA'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'XZ'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW'
  | 'ZZ';

export type CountryUsageSortField =
  | 'COUNTRY_CODE'
  | 'RECORD_COUNT';

export type DataArchive = {
  __typename?: 'DataArchive';
  fileSizeInMB?: Maybe<Scalars['Float']['output']>;
  modified?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type DatasetSubtype =
  | 'DERIVED_FROM_OCCURRENCE'
  | 'GLOBAL_SPECIES_DATASET'
  | 'INVENTORY_REGIONAL'
  | 'INVENTORY_THEMATIC'
  | 'NOMENCLATOR_AUTHORITY'
  | 'OBSERVATION'
  | 'SPECIMEN'
  | 'TAXONOMIC_AUTHORITY';

export type DatasetType =
  | 'CHECKLIST'
  | 'MATERIAL_ENTITY'
  | 'METADATA'
  | 'OCCURRENCE'
  | 'SAMPLING_EVENT';

export type DatasetUsageSortField =
  | 'COUNTRY_CODE'
  | 'DATASET_TITLE'
  | 'RECORD_COUNT';

export type Discipline =
  | 'AGRICULTURAL'
  | 'AGRICULTURAL_AGRICULTURAL_ANIMAL_BREEDING'
  | 'AGRICULTURAL_AGRICULTURAL_HORTICULTURAL_PLANT_BREEDING'
  | 'AGRICULTURAL_AGRONOMY_CROP_SCIENCE'
  | 'AGRICULTURAL_ANIMAL_SCIENCE'
  | 'AGRICULTURAL_ANIMAL_SCIENCE_POULTRY'
  | 'AGRICULTURAL_ENVIRONMENTAL_SCIENCE'
  | 'AGRICULTURAL_FISHING_FISHERIES_SCIENCE'
  | 'AGRICULTURAL_FOOD_SCIENCE_AND_TECHNOLOGY'
  | 'AGRICULTURAL_FOREST_SCIENCES_AND_FORESTRY'
  | 'AGRICULTURAL_HORTICULTURAL_SCIENCE'
  | 'AGRICULTURAL_NATURAL_RESOURCES'
  | 'AGRICULTURAL_PLANT_SCIENCES'
  | 'AGRICULTURAL_SOIL_CHEMISTRY_MICROBIOLOGY'
  | 'AGRICULTURAL_SOIL_SCIENCES'
  | 'AGRICULTURAL_WILDLIFE_RANGE_MANAGEMENT'
  | 'AGRICULTURAL_WOOD_SCIENCE_AND_PULP_TECHNOLOGY'
  | 'ANTHROPOLOGY'
  | 'ANTHROPOLOGY_BIOLOGICAL'
  | 'ANTHROPOLOGY_CULTURAL'
  | 'ANTHROPOLOGY_LINGUISTIC'
  | 'ARCHAEOLOGY'
  | 'ARCHAEOLOGY_HISTORIC'
  | 'ARCHAEOLOGY_PREHISTORIC'
  | 'ARCHAEOLOGY_UNDERWATER'
  | 'ATMOSPHERIC'
  | 'ATMOSPHERIC_CLIMATOLOGY'
  | 'ATMOSPHERIC_METEOROLOGY'
  | 'ATMOSPHERIC_PHYSICS_DYNAMICS'
  | 'BIOLOGICAL'
  | 'BIOLOGICAL_ANATOMY_AND_PHYSIOLOGY'
  | 'BIOLOGICAL_CELLULAR_BIOLOGY_AND_HISTOLOGY'
  | 'BIOLOGICAL_DEVELOPMENT_BIOLOGY_EMBRYOLOGY'
  | 'BIOLOGICAL_ECOLOGY'
  | 'BIOLOGICAL_ENVIRONMENTAL_TOXICOLOGY'
  | 'BIOLOGICAL_EVOLUTIONARY_BIOLOGY'
  | 'BIOLOGICAL_GENETICS_GENOMICS'
  | 'BIOLOGICAL_MICROBIOLOGY_BACTERIOLOGY_VIROLOGY'
  | 'BIOLOGICAL_MOLECULAR_BIOLOGY'
  | 'BIOLOGICAL_NEUROSCIENCES_AND_NEUROBIOLOGY'
  | 'BIOLOGICAL_PARASITOLOGY'
  | 'BIOLOGICAL_PATHOLOGY_ANIMAL_PLANT'
  | 'BIOLOGICAL_TAXONOMY'
  | 'BIOLOGICAL_ZOOLOGY'
  | 'CHEMICAL'
  | 'CHEMICAL_ANALYTICAL'
  | 'CHEMICAL_ASTROCHEMISTRY'
  | 'CHEMICAL_ATMOSPHERIC_CHEMISTRY'
  | 'CHEMICAL_BIOCHEMISTRY'
  | 'CHEMICAL_BIOGEOCHEMISTRY'
  | 'CHEMICAL_COSMOCHEMISTRY'
  | 'CHEMICAL_INORGANIC_CHEMISTRY'
  | 'CHEMICAL_NUCLEAR_CHEMISTRY'
  | 'CHEMICAL_ORGANIC_CHEMISTRY'
  | 'CHEMICAL_PHYSICAL_CHEMISTRY'
  | 'GEOLOGICAL'
  | 'GEOLOGICAL_ECONOMIC_GEOLOGY_MINERAL_RESOURCES'
  | 'GEOLOGICAL_ENERGY_RESOURCE_GEOLOGY'
  | 'GEOLOGICAL_GEOCHEMISTRY'
  | 'GEOLOGICAL_GEOLOGY'
  | 'GEOLOGICAL_GEOPHYSICS_SEISMOLOGY'
  | 'GEOLOGICAL_HYDROLOGY_WATER_RESOURCES'
  | 'GEOLOGICAL_MINERALOGY_PETROLOGY'
  | 'GEOLOGICAL_PALEONTOLOGY'
  | 'GEOLOGICAL_VOLCANOLOGY'
  | 'HEALTH'
  | 'HEALTH_BIOMEDICAL_SCIENCE'
  | 'HEALTH_ENVIRONMENTAL_HEALTH'
  | 'HEALTH_EPIDEMIOLOGY_PUBLIC_HEALTH'
  | 'HEALTH_GENETICS_GENOMICS'
  | 'HEALTH_MICROBIOLOGY_BACTERIOLOGY_VIROLOGY'
  | 'HEALTH_NEUROSCIENCES_AND_NEUROBIOLOGY'
  | 'HEALTH_NUTRITION_SCIENCES'
  | 'HEALTH_PATHOLOGY_HUMAN'
  | 'HEALTH_PHARMACEUTICAL_MEDICINAL_SCIENCES'
  | 'HEALTH_PHARMACOLOGY_HUMAN_AND_ANIMAL'
  | 'HEALTH_TOXICOLOGY'
  | 'HEALTH_VETERINARY_SCIENCES'
  | 'MATERIAL'
  | 'OCEAN'
  | 'OCEAN_MARINE_BIOLOGY_AND_BIOLOGICAL_OCEANOGRAPHY'
  | 'OCEAN_MARINE_GEOLOGY_AND_PALEOCEANOGRAPHY'
  | 'OCEAN_OCEANOGRAPHY_CHEMICAL_PHYSICAL'
  | 'PHYSICS'
  | 'PHYSICS_ACOUSTICS'
  | 'PHYSICS_APPLIED_PHYSICS'
  | 'PHYSICS_ATOMIC_MOLECULAR_CHEMICAL_PHYSICS'
  | 'PHYSICS_BIOPHYSICS'
  | 'PHYSICS_MEDICAL_RADIOLOGICAL'
  | 'PHYSICS_NUCLEAR_PHYSICS'
  | 'PHYSICS_OPTICS_PHOTONICS'
  | 'PHYSICS_PARTICLE_PHYSICS'
  | 'SPACE'
  | 'SPACE_ASTRONOMY'
  | 'SPACE_ASTROPHYSICS'
  | 'SPACE_COSMOLOGY'
  | 'SPACE_PLANETARY_SCIENCE';

export type DistinctTaxon = {
  __typename?: 'DistinctTaxon';
  class?: Maybe<Scalars['String']['output']>;
  classKey?: Maybe<Scalars['String']['output']>;
  count?: Maybe<Scalars['Int']['output']>;
  family?: Maybe<Scalars['String']['output']>;
  familyKey?: Maybe<Scalars['String']['output']>;
  genus?: Maybe<Scalars['String']['output']>;
  genusKey?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  kingdom?: Maybe<Scalars['String']['output']>;
  kingdomKey?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['String']['output']>;
  orderKey?: Maybe<Scalars['String']['output']>;
  phylum?: Maybe<Scalars['String']['output']>;
  phylumKey?: Maybe<Scalars['String']['output']>;
  rank?: Maybe<Scalars['String']['output']>;
  scientificName?: Maybe<Scalars['String']['output']>;
  species?: Maybe<Scalars['String']['output']>;
  speciesKey?: Maybe<Scalars['String']['output']>;
};

export type DistributionStatus =
  | 'ABSENT'
  | 'COMMON'
  | 'DOUBTFUL'
  | 'EXCLUDED'
  | 'IRREGULAR'
  | 'PRESENT'
  | 'RARE';

export type EndpointType =
  | 'BIOCASE'
  | 'BIOCASE_XML_ARCHIVE'
  | 'CAMTRAP_DP_v_0_4'
  | 'COLDP'
  | 'DIGIR'
  | 'DIGIR_MANIS'
  | 'DWC_ARCHIVE'
  | 'EML'
  | 'FEED'
  | 'OAI_PMH'
  | 'OTHER'
  | 'TAPIR'
  | 'TCS_RDF'
  | 'TCS_XML'
  | 'WFS'
  | 'WMS';

export type EstablishmentMeans =
  | 'INTRODUCED'
  | 'INVASIVE'
  | 'MANAGED'
  | 'NATIVE'
  | 'NATURALISED'
  | 'UNCERTAIN';

export type Event = {
  __typename?: 'Event';
  _taxon?: Maybe<EventTaxon>;
  childEventCount?: Maybe<Scalars['Int']['output']>;
  coordinates?: Maybe<Scalars['JSON']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  /** get dataset information via EML */
  dataset: Scalars['JSON']['output'];
  datasetKey?: Maybe<Scalars['String']['output']>;
  datasetTitle?: Maybe<Scalars['String']['output']>;
  day?: Maybe<Scalars['Int']['output']>;
  decimalLatitude?: Maybe<Scalars['Float']['output']>;
  decimalLongitude?: Maybe<Scalars['Float']['output']>;
  distinctTaxa: Array<Maybe<DistinctTaxon>>;
  eventDate?: Maybe<Scalars['String']['output']>;
  eventHierarchy?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  eventHierarchyJoined?: Maybe<Scalars['String']['output']>;
  eventHierarchyLevels?: Maybe<Scalars['Int']['output']>;
  eventID?: Maybe<Scalars['String']['output']>;
  eventName?: Maybe<Scalars['String']['output']>;
  eventRemarks?: Maybe<Scalars['String']['output']>;
  eventType?: Maybe<EventType>;
  eventTypeHierarchy?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  eventTypeHierarchyJoined?: Maybe<Scalars['String']['output']>;
  extensions?: Maybe<EventExtensions>;
  formattedCoordinates?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  locationID?: Maybe<Scalars['String']['output']>;
  measurementOrFactCount?: Maybe<Scalars['Int']['output']>;
  measurementOrFactTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  measurementOrFacts?: Maybe<Array<Maybe<Measurement>>>;
  month?: Maybe<Scalars['Int']['output']>;
  occurrenceCount?: Maybe<Scalars['Int']['output']>;
  parentEvent?: Maybe<Event>;
  parentEventID?: Maybe<Scalars['String']['output']>;
  sampleSizeUnit?: Maybe<Scalars['String']['output']>;
  sampleSizeValue?: Maybe<Scalars['Float']['output']>;
  samplingProtocol?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Get number of distinct species for this event and its children */
  speciesCount: Scalars['Int']['output'];
  stateProvince?: Maybe<Scalars['String']['output']>;
  surveyID?: Maybe<Scalars['String']['output']>;
  temporalCoverage?: Maybe<TemporalCoverage>;
  treatments?: Maybe<Array<Event>>;
  type?: Maybe<Scalars['String']['output']>;
  wktConvexHull?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type EventCardinality = {
  __typename?: 'EventCardinality';
  datasetKey: Scalars['Int']['output'];
  locationID: Scalars['Int']['output'];
  parentEventID: Scalars['Int']['output'];
  species: Scalars['Int']['output'];
  surveyID: Scalars['Int']['output'];
  /** Number of distinct accepted taxa (any rank) among occurrences matching the search */
  taxa: Scalars['Int']['output'];
};

export type EventDocuments = {
  __typename?: 'EventDocuments';
  from: Scalars['Int']['output'];
  results: Array<Maybe<Event>>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EventExtensions = {
  __typename?: 'EventExtensions';
  seedbank?: Maybe<SeedBankExtension>;
};

export type EventFacet = {
  __typename?: 'EventFacet';
  classes?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  datasetKey?: Maybe<Array<Maybe<EventFacetResult_Dataset>>>;
  eventHierarchy?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  eventHierarchyJoined?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  eventType?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  eventTypeHierarchy?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  eventTypeHierarchyJoined?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  families?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  genera?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  kingdoms?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  locality?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  locationID?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  measurementOfFactTypes?: Maybe<Array<Maybe<EventFacetResult_Dataset>>>;
  measurementOrFactTypes?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  month?: Maybe<Array<Maybe<EventFacetResult_Float>>>;
  orders?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  phyla?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  samplingProtocol?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  scientificNames?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  species?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  stateProvince?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  surveyID?: Maybe<Array<Maybe<EventFacetResult_String>>>;
  year?: Maybe<Array<Maybe<EventFacetResult_Float>>>;
};


export type EventFacetClassesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetDatasetKeyArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetEventHierarchyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetEventHierarchyJoinedArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetEventTypeArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetEventTypeHierarchyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetEventTypeHierarchyJoinedArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetFamiliesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetGeneraArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetKingdomsArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetLocalityArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetLocationIdArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetMeasurementOfFactTypesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetMeasurementOrFactTypesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetMonthArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetOrdersArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetPhylaArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetSamplingProtocolArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetScientificNamesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetSpeciesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetStateProvinceArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetSurveyIdArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventFacetYearArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventFacetResult_Dataset = {
  __typename?: 'EventFacetResult_dataset';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  archive?: Maybe<DataArchive>;
  count: Scalars['Int']['output'];
  datasetTitle: Scalars['String']['output'];
  events: EventSearchResult;
  extensions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  key: Scalars['String']['output'];
  occurrenceCount?: Maybe<Scalars['Int']['output']>;
};


export type EventFacetResult_DatasetEventsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventFacetResult_Float = {
  __typename?: 'EventFacetResult_float';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  count: Scalars['Int']['output'];
  events: EventSearchResult;
  key: Scalars['Float']['output'];
};


export type EventFacetResult_FloatEventsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventFacetResult_String = {
  __typename?: 'EventFacetResult_string';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  count: Scalars['Int']['output'];
  events: EventSearchResult;
  key: Scalars['String']['output'];
};


export type EventFacetResult_StringEventsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventMultiFacet = {
  __typename?: 'EventMultiFacet';
  locationIDStateProvince?: Maybe<Array<Maybe<EventMultiFacetResult_String>>>;
};


export type EventMultiFacetLocationIdStateProvinceArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventMultiFacetResult_String = {
  __typename?: 'EventMultiFacetResult_string';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  count: Scalars['Int']['output'];
  events: EventSearchResult;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};


export type EventMultiFacetResult_StringEventsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventOccurrenceFacet = {
  __typename?: 'EventOccurrenceFacet';
  basisOfRecord?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  class?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  datasetKey?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  eventHierarchy?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  eventHierarchyJoined?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  eventTypeHierarchy?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  eventTypeHierarchyJoined?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  family?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  genus?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  identifiedBy?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  identifiedById?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  kingdom?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  locationID?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  month?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  occurrenceStatus?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  order?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  phylum?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  recordedBy?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  recordedById?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  samplingProtocol?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  scientificNames?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  species?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  stateProvince?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
  year?: Maybe<Array<Maybe<EventOccurrenceFacetResult_String>>>;
};


export type EventOccurrenceFacetBasisOfRecordArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetClassArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetDatasetKeyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetEventHierarchyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetEventHierarchyJoinedArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetEventTypeHierarchyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetEventTypeHierarchyJoinedArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetFamilyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetGenusArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetIdentifiedByArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetIdentifiedByIdArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetKingdomArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetLocationIdArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetMonthArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetOccurrenceStatusArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetOrderArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetPhylumArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetRecordedByArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetRecordedByIdArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetSamplingProtocolArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetScientificNamesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetSpeciesArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetStateProvinceArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventOccurrenceFacetYearArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventOccurrenceFacetResult_String = {
  __typename?: 'EventOccurrenceFacetResult_string';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  count: Scalars['Int']['output'];
  key: Scalars['String']['output'];
};

export type EventSearchResult = {
  __typename?: 'EventSearchResult';
  _meta?: Maybe<Scalars['JSON']['output']>;
  _predicate?: Maybe<Scalars['JSON']['output']>;
  /** Register the search predicate with the ES tile server */
  _tileServerToken?: Maybe<Scalars['String']['output']>;
  /** Get number of distinct values for a field. E.g. how many distinct datasetKeys in this result set */
  cardinality?: Maybe<EventCardinality>;
  /** The events that match the filter */
  documents: EventDocuments;
  /** Get number of events per distinct values in a field. E.g. how many events per year. */
  facet?: Maybe<EventFacet>;
  /** Get number of events per distinct values in two or more fields. E.g. how many events per year. */
  multifacet?: Maybe<EventMultiFacet>;
  /** Get number of occurrences matching this search */
  occurrenceCount?: Maybe<Scalars['Int']['output']>;
  /** Get number of occurrences per distinct values in a field. E.g. how many occurrence per year. */
  occurrenceFacet?: Maybe<EventOccurrenceFacet>;
  /** Get statistics for a numeric field. Minimimum value etc. */
  stats?: Maybe<EventStats>;
  /** Get number of events per distinct values in a field. E.g. how many events per year. */
  temporal?: Maybe<EventTemporal>;
};


export type EventSearchResultDocumentsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  randomize?: InputMaybe<Scalars['Boolean']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventSearchResultFacetArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventSearchResultMultifacetArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventStats = {
  __typename?: 'EventStats';
  occurrenceCount: Stats;
  year: Stats;
};

export type EventTaxon = {
  __typename?: 'EventTaxon';
  suppliedName?: Maybe<Scalars['String']['output']>;
  taxonID?: Maybe<Scalars['String']['output']>;
  taxonName?: Maybe<Scalars['String']['output']>;
};

export type EventTemporal = {
  __typename?: 'EventTemporal';
  datasetKey?: Maybe<EventTemporalCardinalityResult>;
  locationID?: Maybe<EventTemporalCardinalityResult>;
};


export type EventTemporalDatasetKeyArgs = {
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type EventTemporalLocationIdArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  include?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventTemporalCardinalityResult = {
  __typename?: 'EventTemporalCardinalityResult';
  cardinality: Scalars['Int']['output'];
  results?: Maybe<Array<Maybe<EventTemporalResult_String>>>;
};

export type EventTemporalResult_String = {
  __typename?: 'EventTemporalResult_string';
  _predicate?: Maybe<Scalars['JSON']['output']>;
  breakdown?: Maybe<Array<Maybe<YearBreakdown>>>;
  count: Scalars['Int']['output'];
  events: EventSearchResult;
  key: Scalars['String']['output'];
  temporal?: Maybe<EventTemporal>;
};


export type EventTemporalResult_StringEventsArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type EventType = {
  __typename?: 'EventType';
  concept?: Maybe<Scalars['String']['output']>;
  lineage?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Extension =
  | 'AMPLIFICATION'
  | 'AUDUBON'
  | 'CHRONOMETRIC_AGE'
  | 'CHRONOMETRIC_DATE'
  | 'CLONING'
  | 'DESCRIPTION'
  | 'DISTRIBUTION'
  | 'DNA_DERIVED_DATA'
  | 'EOL_MEDIA'
  | 'EOL_REFERENCE'
  | 'EXTENDED_MEASUREMENT_OR_FACT'
  | 'GEL_IMAGE'
  | 'GERMPLASM_ACCESSION'
  | 'GERMPLASM_MEASUREMENT_SCORE'
  | 'GERMPLASM_MEASUREMENT_TRAIT'
  | 'GERMPLASM_MEASUREMENT_TRIAL'
  | 'IDENTIFICATION'
  | 'IDENTIFIER'
  | 'IMAGE'
  | 'LOAN'
  | 'MATERIAL_SAMPLE'
  | 'MEASUREMENT_OR_FACT'
  | 'MULTIMEDIA'
  | 'PERMIT'
  | 'PREPARATION'
  | 'PRESERVATION'
  | 'REFERENCE'
  | 'RESOURCE_RELATIONSHIP'
  | 'SPECIES_PROFILE'
  | 'TYPES_AND_SPECIMEN'
  | 'VERNACULAR_NAME';

export type GbifRegion =
  | 'AFRICA'
  | 'ANTARCTICA'
  | 'ASIA'
  | 'EUROPE'
  | 'LATIN_AMERICA'
  | 'NORTH_AMERICA'
  | 'OCEANIA';

export type Habitat =
  | 'FRESHWATER'
  | 'MARINE'
  | 'TERRESTRIAL';

export type IdType =
  | 'HUH'
  | 'IH_IRN'
  | 'ISNI'
  | 'ORCID'
  | 'OTHER'
  | 'RESEARCHER_ID'
  | 'VIAF'
  | 'WIKIDATA';

export type IdentifierType =
  | 'CITES'
  | 'DOI'
  | 'FTP'
  | 'GBIF_NODE'
  | 'GBIF_PARTICIPANT'
  | 'GBIF_PORTAL'
  | 'GRID'
  | 'GRSCICOLL_ID'
  | 'GRSCICOLL_URI'
  | 'HANDLER'
  | 'IH_IRN'
  | 'LSID'
  | 'NCBI_BIOCOLLECTION'
  | 'ROR'
  | 'SYMBIOTA_UUID'
  | 'UNKNOWN'
  | 'URI'
  | 'URL'
  | 'UUID'
  | 'WIKIDATA';

export type Image = {
  __typename?: 'Image';
  IDofContainingCollection?: Maybe<Scalars['String']['output']>;
  accessOriginalURI?: Maybe<Scalars['String']['output']>;
  accessURI?: Maybe<Scalars['String']['output']>;
  createDate?: Maybe<Scalars['String']['output']>;
  creator?: Maybe<Scalars['String']['output']>;
  credit?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  hashFunction?: Maybe<Scalars['String']['output']>;
  hashValue?: Maybe<Scalars['String']['output']>;
  identifier: Scalars['String']['output'];
  metadataDate?: Maybe<Scalars['String']['output']>;
  metadataLanguage?: Maybe<Scalars['String']['output']>;
  metadataLanguageLiteral?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  pixelXDimension?: Maybe<Scalars['Int']['output']>;
  pixelYDimension?: Maybe<Scalars['Int']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  providerLiteral?: Maybe<Scalars['String']['output']>;
  providerManagedID?: Maybe<Scalars['String']['output']>;
  rights?: Maybe<Scalars['String']['output']>;
  subtypeLiteral?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  webStatement?: Maybe<Scalars['String']['output']>;
};

export type InstallationType =
  | 'BIOCASE_INSTALLATION'
  | 'DIGIR_INSTALLATION'
  | 'EARTHCAPE_INSTALLATION'
  | 'HTTP_INSTALLATION'
  | 'IPT_INSTALLATION'
  | 'SYMBIOTA_INSTALLATION'
  | 'TAPIR_INSTALLATION';

export type InstitutionGovernance =
  | 'ACADEMIC_FEDERAL'
  | 'ACADEMIC_FOR_PROFIT'
  | 'ACADEMIC_LOCAL'
  | 'ACADEMIC_NON_PROFIT'
  | 'ACADEMIC_STATE'
  | 'FEDERAL'
  | 'FOR_PROFIT'
  | 'LOCAL'
  | 'NON_PROFIT'
  | 'OTHER'
  | 'STATE';

export type InstitutionType =
  | 'BIOMEDICAL_RESEARCH_INSTITUTE'
  | 'BOTANICAL_GARDEN'
  | 'HERBARIUM'
  | 'LIVING_ORGANISM_COLLECTION'
  | 'MEDICAL_RESEARCH_INSTITUTE'
  | 'MUSEUM'
  | 'MUSEUM_HERBARIUM_PRIVATE_NON_PROFIT'
  | 'OTHER_INSTITUTIONAL_TYPE'
  | 'OTHER_TYPE_RESEARCH_INSTITUTION_BIOREPOSITORY'
  | 'UNIVERSITY_COLLEGE'
  | 'ZOO_AQUARIUM';

export type InterpretationRemarkSeverity =
  | 'ERROR'
  | 'INFO'
  | 'WARNING';

export type Kingdom =
  | 'ANIMALIA'
  | 'ARCHAEA'
  | 'BACTERIA'
  | 'CHROMISTA'
  | 'FUNGI'
  | 'INCERTAE_SEDIS'
  | 'PLANTAE'
  | 'PROTOZOA'
  | 'VIRUSES';

export type Language =
  | 'aar'
  | 'abk'
  | 'afr'
  | 'aka'
  | 'amh'
  | 'ara'
  | 'arg'
  | 'asm'
  | 'ava'
  | 'ave'
  | 'aym'
  | 'aze'
  | 'bak'
  | 'bam'
  | 'bel'
  | 'ben'
  | 'bih'
  | 'bis'
  | 'bod'
  | 'bos'
  | 'bre'
  | 'bul'
  | 'cat'
  | 'ces'
  | 'cha'
  | 'che'
  | 'chu'
  | 'chv'
  | 'cor'
  | 'cos'
  | 'cre'
  | 'cym'
  | 'dan'
  | 'deu'
  | 'div'
  | 'dzo'
  | 'ell'
  | 'eng'
  | 'epo'
  | 'est'
  | 'eus'
  | 'ewe'
  | 'fao'
  | 'fas'
  | 'fij'
  | 'fin'
  | 'fra'
  | 'fry'
  | 'ful'
  | 'gla'
  | 'gle'
  | 'glg'
  | 'glv'
  | 'grn'
  | 'guj'
  | 'hat'
  | 'hau'
  | 'heb'
  | 'her'
  | 'hin'
  | 'hmo'
  | 'hrv'
  | 'hun'
  | 'hye'
  | 'ibo'
  | 'ido'
  | 'iii'
  | 'iku'
  | 'ile'
  | 'ina'
  | 'ind'
  | 'ipk'
  | 'isl'
  | 'ita'
  | 'jav'
  | 'jpn'
  | 'kal'
  | 'kan'
  | 'kas'
  | 'kat'
  | 'kau'
  | 'kaz'
  | 'khm'
  | 'kik'
  | 'kin'
  | 'kir'
  | 'kom'
  | 'kon'
  | 'kor'
  | 'kua'
  | 'kur'
  | 'lao'
  | 'lat'
  | 'lav'
  | 'lim'
  | 'lin'
  | 'lit'
  | 'ltz'
  | 'lub'
  | 'lug'
  | 'mah'
  | 'mal'
  | 'mar'
  | 'mkd'
  | 'mlg'
  | 'mlt'
  | 'mol'
  | 'mon'
  | 'mri'
  | 'msa'
  | 'mya'
  | 'nau'
  | 'nav'
  | 'nbl'
  | 'nde'
  | 'ndo'
  | 'nep'
  | 'nld'
  | 'nno'
  | 'nob'
  | 'nor'
  | 'nya'
  | 'oci'
  | 'oji'
  | 'ori'
  | 'orm'
  | 'oss'
  | 'pan'
  | 'pli'
  | 'pol'
  | 'por'
  | 'pus'
  | 'que'
  | 'roh'
  | 'ron'
  | 'run'
  | 'rus'
  | 'sag'
  | 'san'
  | 'sin'
  | 'slk'
  | 'slv'
  | 'sme'
  | 'smo'
  | 'sna'
  | 'snd'
  | 'som'
  | 'sot'
  | 'spa'
  | 'sqi'
  | 'srd'
  | 'srp'
  | 'ssw'
  | 'sun'
  | 'swa'
  | 'swe'
  | 'tah'
  | 'tam'
  | 'tat'
  | 'tel'
  | 'tgk'
  | 'tgl'
  | 'tha'
  | 'tir'
  | 'ton'
  | 'tsn'
  | 'tso'
  | 'tuk'
  | 'tur'
  | 'twi'
  | 'uig'
  | 'ukr'
  | 'urd'
  | 'uzb'
  | 'ven'
  | 'vie'
  | 'vol'
  | 'wln'
  | 'wol'
  | 'xho'
  | 'yid'
  | 'yor'
  | 'zha'
  | 'zho'
  | 'zul';

export type License =
  | 'CC0_1_0'
  | 'CC_BY_4_0'
  | 'CC_BY_NC_4_0'
  | 'UNSPECIFIED'
  | 'UNSUPPORTED';

export type LifeStage =
  | 'ADULT'
  | 'EMRYO'
  | 'GAMETE'
  | 'GAMETOPHYTE'
  | 'JUVENILE'
  | 'LARVA'
  | 'PUPA'
  | 'SPORE'
  | 'SPOROPHYTE'
  | 'ZYGOTE';

export type LiteratureRelevance =
  | 'GBIF_ACKNOWLEDGED'
  | 'GBIF_AUTHOR'
  | 'GBIF_CITED'
  | 'GBIF_DISCUSSED'
  | 'GBIF_FUNDED'
  | 'GBIF_MENTIONED'
  | 'GBIF_PRIMARY'
  | 'GBIF_PUBLISHED'
  | 'GBIF_USED';

export type LiteratureTopic =
  | 'AGRICULTURE'
  | 'BIODIVERSITY_SCIENCE'
  | 'BIOGEOGRAPHY'
  | 'CITIZEN_SCIENCE'
  | 'CLIMATE_CHANGE'
  | 'CONSERVATION'
  | 'DATA_MANAGEMENT'
  | 'DATA_PAPER'
  | 'ECOLOGY'
  | 'ECOSYSTEM_SERVICES'
  | 'EVOLUTION'
  | 'FRESHWATER'
  | 'HUMAN_HEALTH'
  | 'INVASIVES'
  | 'MARINE'
  | 'PHYLOGENETICS'
  | 'SPECIES_DISTRIBUTIONS'
  | 'TAXONOMY';

export type LiteratureType =
  | 'BILL'
  | 'BOOK'
  | 'BOOK_SECTION'
  | 'CASE'
  | 'COMPUTER_PROGRAM'
  | 'CONFERENCE_PROCEEDINGS'
  | 'ENCYCLOPEDIA_ARTICLE'
  | 'FILM'
  | 'GENERIC'
  | 'HEARING'
  | 'JOURNAL'
  | 'MAGAZINE_ARTICLE'
  | 'NEWSPAPER_ARTICLE'
  | 'PATENT'
  | 'REPORT'
  | 'STATUTE'
  | 'TELEVISION_BROADCAST'
  | 'THESIS'
  | 'WEB_PAGE'
  | 'WORKING_PAPER';

export type MaintenanceUpdateFrequency =
  | 'ANNUALLY'
  | 'AS_NEEDED'
  | 'BIANNUALLY'
  | 'CONTINUALLY'
  | 'DAILY'
  | 'IRREGULAR'
  | 'MONTHLY'
  | 'NOT_PLANNED'
  | 'OTHER_MAINTENANCE_PERIOD'
  | 'UNKNOWN'
  | 'UNKOWN'
  | 'WEEKLY';

export type MasterSourceType =
  | 'GBIF_REGISTRY'
  | 'GRSCICOLL'
  | 'IH';

export type Measurement = {
  __typename?: 'Measurement';
  measurementAccuracy?: Maybe<Scalars['String']['output']>;
  measurementDeterminedBy?: Maybe<Scalars['String']['output']>;
  measurementDeterminedDate?: Maybe<Scalars['String']['output']>;
  measurementID?: Maybe<Scalars['String']['output']>;
  measurementMethod?: Maybe<Scalars['String']['output']>;
  measurementRemarks?: Maybe<Scalars['String']['output']>;
  measurementType?: Maybe<Scalars['String']['output']>;
  measurementUnit?: Maybe<Scalars['String']['output']>;
  measurementValue?: Maybe<Scalars['String']['output']>;
};

export type MediaType =
  | 'InteractiveResource'
  | 'MovingImage'
  | 'Sound'
  | 'StillImage';

export type MetadataType =
  | 'DC'
  | 'EML';

export type MonthBreakdown = {
  __typename?: 'MonthBreakdown';
  c: Scalars['Int']['output'];
  m: Scalars['Int']['output'];
};

export type NamePart =
  | 'GENERIC'
  | 'INFRAGENERIC'
  | 'INFRASPECIFIC'
  | 'SPECIFIC';

export type NameType =
  | 'BLACKLISTED'
  | 'CANDIDATUS'
  | 'CULTIVAR'
  | 'DOUBTFUL'
  | 'HYBRID'
  | 'INFORMAL'
  | 'NO_NAME'
  | 'OTU'
  | 'PLACEHOLDER'
  | 'SCIENTIFIC'
  | 'VIRUS';

export type NameUsageIssue =
  | 'ACCEPTED_NAME_MISSING'
  | 'ACCEPTED_NAME_NOT_UNIQUE'
  | 'ACCEPTED_NAME_USAGE_ID_INVALID'
  | 'ALT_IDENTIFIER_INVALID'
  | 'BACKBONE_MATCH_AGGREGATE'
  | 'BACKBONE_MATCH_FUZZY'
  | 'BACKBONE_MATCH_NONE'
  | 'BASIONYM_AUTHOR_MISMATCH'
  | 'BIB_REFERENCE_INVALID'
  | 'CHAINED_SYNOYM'
  | 'CLASSIFICATION_NOT_APPLIED'
  | 'CLASSIFICATION_RANK_ORDER_INVALID'
  | 'CONFLICTING_BASIONYM_COMBINATION'
  | 'DESCRIPTION_INVALID'
  | 'DISTRIBUTION_INVALID'
  | 'HOMONYM'
  | 'MULTIMEDIA_INVALID'
  | 'NAME_PARENT_MISMATCH'
  | 'NOMENCLATURAL_STATUS_INVALID'
  | 'NO_SPECIES'
  | 'ORIGINAL_NAME_DERIVED'
  | 'ORIGINAL_NAME_NOT_UNIQUE'
  | 'ORIGINAL_NAME_USAGE_ID_INVALID'
  | 'ORTHOGRAPHIC_VARIANT'
  | 'PARENT_CYCLE'
  | 'PARENT_NAME_NOT_UNIQUE'
  | 'PARENT_NAME_USAGE_ID_INVALID'
  | 'PARTIALLY_PARSABLE'
  | 'PUBLISHED_BEFORE_GENUS'
  | 'RANK_INVALID'
  | 'RELATIONSHIP_MISSING'
  | 'SCIENTIFIC_NAME_ASSEMBLED'
  | 'SPECIES_PROFILE_INVALID'
  | 'TAXONOMIC_STATUS_INVALID'
  | 'TAXONOMIC_STATUS_MISMATCH'
  | 'UNPARSABLE'
  | 'VERNACULAR_NAME_INVALID';

export type NodeType =
  | 'COUNTRY'
  | 'OTHER';

export type NomenclaturalCode =
  | 'BACTERIAL'
  | 'BIOCODE'
  | 'BOTANICAL'
  | 'CULTIVARS'
  | 'PHYLOCODE'
  | 'PHYTOSOCIOLOGY'
  | 'VIRUS'
  | 'ZOOLOGICAL';

export type NomenclaturalStatus =
  | 'ABORTED'
  | 'ALTERNATIVE'
  | 'AMBIGUOUS'
  | 'CONFUSED'
  | 'CONSERVED'
  | 'CONSERVED_PROPOSED'
  | 'CORRECTED'
  | 'DENIED'
  | 'DOUBTFUL'
  | 'FORGOTTEN'
  | 'ILLEGITIMATE'
  | 'INVALID'
  | 'LEGITIMATE'
  | 'NEW_COMBINATION'
  | 'NEW_GENUS'
  | 'NEW_SPECIES'
  | 'NUDUM'
  | 'NULL_NAME'
  | 'OBSCURE'
  | 'ORIGINAL_COMBINATION'
  | 'ORTHOGRAPHIC_VARIANT'
  | 'PROTECTED'
  | 'PROVISIONAL'
  | 'REJECTED'
  | 'REJECTED_OUTRIGHT'
  | 'REJECTED_OUTRIGHT_PROPOSED'
  | 'REJECTED_PROPOSED'
  | 'REPLACEMENT'
  | 'SUBNUDUM'
  | 'SUPERFLUOUS'
  | 'SUPPRESSED'
  | 'VALIDLY_PUBLISHED';

export type OccurrenceIssue =
  | 'AMBIGUOUS_COLLECTION'
  | 'AMBIGUOUS_INSTITUTION'
  | 'BASIS_OF_RECORD_INVALID'
  | 'COLLECTION_MATCH_FUZZY'
  | 'COLLECTION_MATCH_NONE'
  | 'CONTINENT_COORDINATE_MISMATCH'
  | 'CONTINENT_COUNTRY_MISMATCH'
  | 'CONTINENT_DERIVED_FROM_COORDINATES'
  | 'CONTINENT_DERIVED_FROM_COUNTRY'
  | 'CONTINENT_INVALID'
  | 'COORDINATE_ACCURACY_INVALID'
  | 'COORDINATE_INVALID'
  | 'COORDINATE_OUT_OF_RANGE'
  | 'COORDINATE_PRECISION_INVALID'
  | 'COORDINATE_PRECISION_UNCERTAINTY_MISMATCH'
  | 'COORDINATE_REPROJECTED'
  | 'COORDINATE_REPROJECTION_FAILED'
  | 'COORDINATE_REPROJECTION_SUSPICIOUS'
  | 'COORDINATE_ROUNDED'
  | 'COORDINATE_UNCERTAINTY_METERS_INVALID'
  | 'COUNTRY_COORDINATE_MISMATCH'
  | 'COUNTRY_DERIVED_FROM_COORDINATES'
  | 'COUNTRY_INVALID'
  | 'COUNTRY_MISMATCH'
  | 'DEPTH_MIN_MAX_SWAPPED'
  | 'DEPTH_NON_NUMERIC'
  | 'DEPTH_NOT_METRIC'
  | 'DEPTH_UNLIKELY'
  | 'DIFFERENT_OWNER_INSTITUTION'
  | 'ELEVATION_MIN_MAX_SWAPPED'
  | 'ELEVATION_NON_NUMERIC'
  | 'ELEVATION_NOT_METRIC'
  | 'ELEVATION_UNLIKELY'
  | 'FOOTPRINT_SRS_INVALID'
  | 'FOOTPRINT_WKT_INVALID'
  | 'FOOTPRINT_WKT_MISMATCH'
  | 'GEODETIC_DATUM_ASSUMED_WGS84'
  | 'GEODETIC_DATUM_INVALID'
  | 'GEOREFERENCED_DATE_INVALID'
  | 'GEOREFERENCED_DATE_UNLIKELY'
  | 'IDENTIFIED_DATE_INVALID'
  | 'IDENTIFIED_DATE_UNLIKELY'
  | 'INDIVIDUAL_COUNT_CONFLICTS_WITH_OCCURRENCE_STATUS'
  | 'INDIVIDUAL_COUNT_INVALID'
  | 'INSTITUTION_COLLECTION_MISMATCH'
  | 'INSTITUTION_MATCH_FUZZY'
  | 'INSTITUTION_MATCH_NONE'
  | 'INTERPRETATION_ERROR'
  | 'MODIFIED_DATE_INVALID'
  | 'MODIFIED_DATE_UNLIKELY'
  | 'MULTIMEDIA_DATE_INVALID'
  | 'MULTIMEDIA_URI_INVALID'
  | 'OCCURRENCE_STATUS_INFERRED_FROM_BASIS_OF_RECORD'
  | 'OCCURRENCE_STATUS_INFERRED_FROM_INDIVIDUAL_COUNT'
  | 'OCCURRENCE_STATUS_UNPARSABLE'
  | 'POSSIBLY_ON_LOAN'
  | 'PRESUMED_NEGATED_LATITUDE'
  | 'PRESUMED_NEGATED_LONGITUDE'
  | 'PRESUMED_SWAPPED_COORDINATE'
  | 'RECORDED_DATE_INVALID'
  | 'RECORDED_DATE_MISMATCH'
  | 'RECORDED_DATE_UNLIKELY'
  | 'REFERENCES_URI_INVALID'
  | 'SCIENTIFIC_NAME_AND_ID_INCONSISTENT'
  | 'SCIENTIFIC_NAME_ID_NOT_FOUND'
  | 'TAXON_CONCEPT_ID_NOT_FOUND'
  | 'TAXON_ID_NOT_FOUND'
  | 'TAXON_MATCH_AGGREGATE'
  | 'TAXON_MATCH_FUZZY'
  | 'TAXON_MATCH_HIGHERRANK'
  | 'TAXON_MATCH_NAME_AND_ID_AMBIGUOUS'
  | 'TAXON_MATCH_NONE'
  | 'TAXON_MATCH_SCIENTIFIC_NAME_ID_IGNORED'
  | 'TAXON_MATCH_TAXON_CONCEPT_ID_IGNORED'
  | 'TAXON_MATCH_TAXON_ID_IGNORED'
  | 'TYPE_STATUS_INVALID'
  | 'ZERO_COORDINATE';

export type OccurrencePersistenceStatus =
  | 'DELETED'
  | 'NEW'
  | 'UNCHANGED'
  | 'UPDATED';

export type OccurrenceSchemaType =
  | 'ABCD_1_2'
  | 'ABCD_2_0_6'
  | 'DWCA'
  | 'DWC_1_0'
  | 'DWC_1_4'
  | 'DWC_2009'
  | 'DWC_MANIS';

export type OccurrenceStatus =
  | 'ABSENT'
  | 'PRESENT';

export type OrganizationUsageSortField =
  | 'COUNTRY_CODE'
  | 'ORGANIZATION_TITLE'
  | 'RECORD_COUNT';

export type Origin =
  | 'AUTONYM'
  | 'BASIONYM_PLACEHOLDER'
  | 'DENORMED_CLASSIFICATION'
  | 'EX_AUTHOR_SYNONYM'
  | 'IMPLICIT_NAME'
  | 'MISSING_ACCEPTED'
  | 'OTHER'
  | 'PROPARTE'
  | 'SOURCE'
  | 'VERBATIM_ACCEPTED'
  | 'VERBATIM_BASIONYM'
  | 'VERBATIM_PARENT';

export type ParticipationStatus =
  | 'AFFILIATE'
  | 'ASSOCIATE'
  | 'FORMER'
  | 'OBSERVER'
  | 'VOTING';

export type PipelineStep_Status =
  | 'ABORTED'
  | 'COMPLETED'
  | 'FAILED'
  | 'QUEUED'
  | 'RUNNING'
  | 'SUBMITTED';

export type Predicate = {
  distance?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['JSON']['input']>;
  longitude?: InputMaybe<Scalars['JSON']['input']>;
  predicate?: InputMaybe<Predicate>;
  predicates?: InputMaybe<Array<InputMaybe<Predicate>>>;
  type?: InputMaybe<PredicateType>;
  value?: InputMaybe<Scalars['JSON']['input']>;
  values?: InputMaybe<Array<InputMaybe<Scalars['JSON']['input']>>>;
};

export type PredicateType =
  | 'and'
  | 'equals'
  | 'fuzzy'
  | 'geoDistance'
  | 'in'
  | 'isNotNull'
  | 'like'
  | 'nested'
  | 'not'
  | 'or'
  | 'range'
  | 'within';

export type PreservationMethodType =
  | 'ALCOHOL'
  | 'DEEP_FROZEN'
  | 'DRIED'
  | 'DRIED_AND_PRESSED'
  | 'FORMALIN'
  | 'FREEZE_DRIED'
  | 'GLYCERIN'
  | 'GUM_ARABIC'
  | 'MICROSCOPIC_PREPARATION'
  | 'MOUNTED'
  | 'NO_TREATMENT'
  | 'OTHER'
  | 'PINNED'
  | 'REFRIGERATED';

export type PreservationType =
  | 'SAMPLE_CRYOPRESERVED'
  | 'SAMPLE_DRIED'
  | 'SAMPLE_EMBEDDED'
  | 'SAMPLE_FLUID_PRESERVED'
  | 'SAMPLE_FREEZE_DRYING'
  | 'SAMPLE_OTHER'
  | 'SAMPLE_PINNED'
  | 'SAMPLE_PRESSED'
  | 'SAMPLE_SKELETONIZED'
  | 'SAMPLE_SLIDE_MOUNT'
  | 'SAMPLE_SURFACE_COATING'
  | 'SAMPLE_TANNED'
  | 'SAMPLE_WAX_BLOCK'
  | 'STORAGE_CONTROLLED_ATMOSPHERE'
  | 'STORAGE_FROZEN_BETWEEN_MINUS_132_AND_MINUS_196'
  | 'STORAGE_FROZEN_MINUS_20'
  | 'STORAGE_FROZEN_MINUS_80'
  | 'STORAGE_INDOORS'
  | 'STORAGE_OTHER'
  | 'STORAGE_OUTDOORS'
  | 'STORAGE_RECORDED'
  | 'STORAGE_REFRIGERATED'
  | 'STORAGE_VACUUM';

export type ProcessingErrorType =
  | 'MISSING_BASIS_OF_RECORD'
  | 'NEGATED_COORDINATES'
  | 'NOT_PARSEABLE_COUNTRY_NAME';

export type Query = {
  __typename?: 'Query';
  /** _empty is nonsense, and only here as we are not allowed to extend an empty type. */
  _empty?: Maybe<Scalars['String']['output']>;
  event?: Maybe<Event>;
  eventSearch?: Maybe<EventSearchResult>;
  location?: Maybe<Event>;
  occurrences?: Maybe<SimpleOccurrenceResults>;
  taxonMedia: Array<Image>;
};


export type QueryEventArgs = {
  datasetKey?: InputMaybe<Scalars['String']['input']>;
  eventID?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEventSearchArgs = {
  apiKey?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  predicate?: InputMaybe<Predicate>;
  size?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLocationArgs = {
  locationID?: InputMaybe<Scalars['String']['input']>;
};


export type QueryOccurrencesArgs = {
  datasetKey?: InputMaybe<Scalars['String']['input']>;
  eventID?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  locationID?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTaxonMediaArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  params?: InputMaybe<Scalars['JSON']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
};

export type Rank =
  | 'ABERRATION'
  | 'BIOVAR'
  | 'CHEMOFORM'
  | 'CHEMOVAR'
  | 'CLASS'
  | 'COHORT'
  | 'CONVARIETY'
  | 'CULTIVAR'
  | 'CULTIVAR_GROUP'
  | 'DOMAIN'
  | 'FAMILY'
  | 'FORM'
  | 'FORMA_SPECIALIS'
  | 'GENUS'
  | 'GRANDORDER'
  | 'GREX'
  | 'INFRACLASS'
  | 'INFRACOHORT'
  | 'INFRAFAMILY'
  | 'INFRAGENERIC_NAME'
  | 'INFRAGENUS'
  | 'INFRAKINGDOM'
  | 'INFRALEGION'
  | 'INFRAORDER'
  | 'INFRAPHYLUM'
  | 'INFRASPECIFIC_NAME'
  | 'INFRASUBSPECIFIC_NAME'
  | 'INFRATRIBE'
  | 'KINGDOM'
  | 'LEGION'
  | 'MAGNORDER'
  | 'MORPH'
  | 'MORPHOVAR'
  | 'NATIO'
  | 'ORDER'
  | 'OTHER'
  | 'PARVCLASS'
  | 'PARVORDER'
  | 'PATHOVAR'
  | 'PHAGOVAR'
  | 'PHYLUM'
  | 'PROLES'
  | 'RACE'
  | 'SECTION'
  | 'SERIES'
  | 'SEROVAR'
  | 'SPECIES'
  | 'SPECIES_AGGREGATE'
  | 'STRAIN'
  | 'SUBCLASS'
  | 'SUBCOHORT'
  | 'SUBFAMILY'
  | 'SUBFORM'
  | 'SUBGENUS'
  | 'SUBKINGDOM'
  | 'SUBLEGION'
  | 'SUBORDER'
  | 'SUBPHYLUM'
  | 'SUBSECTION'
  | 'SUBSERIES'
  | 'SUBSPECIES'
  | 'SUBTRIBE'
  | 'SUBVARIETY'
  | 'SUPERCLASS'
  | 'SUPERCOHORT'
  | 'SUPERFAMILY'
  | 'SUPERKINGDOM'
  | 'SUPERLEGION'
  | 'SUPERORDER'
  | 'SUPERPHYLUM'
  | 'SUPERTRIBE'
  | 'SUPRAGENERIC_NAME'
  | 'TRIBE'
  | 'UNRANKED'
  | 'VARIETY';

export type RelationType =
  | 'ENDORSES'
  | 'HAS_CONSTITUENT'
  | 'HAS_INSTALLATION'
  | 'OWNS'
  | 'SERVES';

export type RunPipelineResponse_ResponseStatus =
  | 'ERROR'
  | 'OK'
  | 'PIPELINE_IN_SUBMITTED'
  | 'UNSUPPORTED_STEP';

export type SeedBankExtension = {
  __typename?: 'SeedBankExtension';
  accessionNumber?: Maybe<Scalars['String']['output']>;
  adjustedGerminationPercentage?: Maybe<Scalars['Float']['output']>;
  collectionFill?: Maybe<Scalars['String']['output']>;
  collectionPermitNumber?: Maybe<Scalars['String']['output']>;
  darkHours?: Maybe<Scalars['Float']['output']>;
  dateCollected?: Maybe<Scalars['Long']['output']>;
  dateInStorage?: Maybe<Scalars['Long']['output']>;
  dayTemperatureInCelsius?: Maybe<Scalars['Float']['output']>;
  degreeOfEstablishment?: Maybe<Scalars['String']['output']>;
  dormancyClass?: Maybe<Scalars['String']['output']>;
  duplicatesReplicates?: Maybe<Scalars['String']['output']>;
  esRatio?: Maybe<Scalars['String']['output']>;
  formInStorage?: Maybe<Scalars['String']['output']>;
  germinationRateInDays?: Maybe<Scalars['Int']['output']>;
  herbariumVoucher?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lightHours?: Maybe<Scalars['Float']['output']>;
  mediaSubstrate?: Maybe<Scalars['String']['output']>;
  nightTemperatureInCelsius?: Maybe<Scalars['Float']['output']>;
  numberEmpty?: Maybe<Scalars['Float']['output']>;
  numberFull?: Maybe<Scalars['Float']['output']>;
  numberGerminated?: Maybe<Scalars['Int']['output']>;
  numberNotViable?: Maybe<Scalars['Float']['output']>;
  numberPlantsSampled?: Maybe<Scalars['String']['output']>;
  numberTested?: Maybe<Scalars['Float']['output']>;
  plantForm?: Maybe<Scalars['String']['output']>;
  populationCode?: Maybe<Scalars['String']['output']>;
  preStorageTreatment?: Maybe<Scalars['String']['output']>;
  preTestProcessingNotes?: Maybe<Scalars['String']['output']>;
  pretreatment?: Maybe<Scalars['String']['output']>;
  primaryCollector?: Maybe<Scalars['String']['output']>;
  primaryStorageSeedBank?: Maybe<Scalars['String']['output']>;
  publicationDOI?: Maybe<Scalars['String']['output']>;
  purityPercentage?: Maybe<Scalars['Float']['output']>;
  quantityCount?: Maybe<Scalars['Int']['output']>;
  quantityInGrams?: Maybe<Scalars['Float']['output']>;
  seedPerGram?: Maybe<Scalars['Float']['output']>;
  storageBehaviour?: Maybe<Scalars['String']['output']>;
  storageRelativeHumidityPercentage?: Maybe<Scalars['Float']['output']>;
  storageTemperatureInCelsius?: Maybe<Scalars['Float']['output']>;
  testDateStarted?: Maybe<Scalars['Long']['output']>;
  testLengthInDays?: Maybe<Scalars['Int']['output']>;
  thousandSeedWeight?: Maybe<Scalars['Float']['output']>;
  viabilityPercentage?: Maybe<Scalars['Float']['output']>;
};

export type Sex =
  | 'FEMALE'
  | 'HERMAPHRODITE'
  | 'MALE'
  | 'NONE';

export type SimpleOccurrence = {
  __typename?: 'SimpleOccurrence';
  basisOfRecord?: Maybe<Scalars['String']['output']>;
  family?: Maybe<Scalars['String']['output']>;
  individualCount?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  kingdom?: Maybe<Scalars['String']['output']>;
  occurrenceStatus?: Maybe<Scalars['String']['output']>;
  scientificName?: Maybe<Scalars['String']['output']>;
};

export type SimpleOccurrenceResults = {
  __typename?: 'SimpleOccurrenceResults';
  from: Scalars['Int']['output'];
  results: Array<Maybe<SimpleOccurrence>>;
  size: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SortOrder =
  | 'ASC'
  | 'DESC';

export type Source =
  | 'DATASET'
  | 'IH_IRN'
  | 'ORGANIZATION';

export type Stats = {
  __typename?: 'Stats';
  avg?: Maybe<Scalars['Float']['output']>;
  count: Scalars['Float']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
};

export type StepRunner =
  | 'DISTRIBUTED'
  | 'STANDALONE'
  | 'UNKNOWN';

export type StepType =
  | 'ABCD_TO_VERBATIM'
  | 'DWCA_TO_VERBATIM'
  | 'EVENTS_HDFS_VIEW'
  | 'EVENTS_INTERPRETED_TO_INDEX'
  | 'EVENTS_VERBATIM_TO_INTERPRETED'
  | 'FRAGMENTER'
  | 'HDFS_VIEW'
  | 'INTERPRETED_TO_INDEX'
  | 'TO_VERBATIM'
  | 'VALIDATOR_ABCD_TO_VERBATIM'
  | 'VALIDATOR_COLLECT_METRICS'
  | 'VALIDATOR_DWCA_TO_VERBATIM'
  | 'VALIDATOR_INTERPRETED_TO_INDEX'
  | 'VALIDATOR_TABULAR_TO_VERBATIM'
  | 'VALIDATOR_UPLOAD_ARCHIVE'
  | 'VALIDATOR_VALIDATE_ARCHIVE'
  | 'VALIDATOR_VERBATIM_TO_INTERPRETED'
  | 'VALIDATOR_XML_TO_VERBATIM'
  | 'VERBATIM_TO_IDENTIFIER'
  | 'VERBATIM_TO_INTERPRETED'
  | 'XML_TO_VERBATIM';

export type TagName =
  | 'ARCHIVE_ORIGIN'
  | 'CONCEPTUAL_SCHEMA'
  | 'CRAWL_ATTEMPT'
  | 'DATASET_ID'
  | 'DATASET_TITLE'
  | 'DATE_LAST_UPDATED'
  | 'DECLARED_COUNT'
  | 'DIGIR_CODE'
  | 'LOCAL_ID'
  | 'MAX_SEARCH_RESPONSE_RECORDS'
  | 'OMIT_FROM_SCHEDULED_CRAWL'
  | 'ORPHANED_ENDPOINT'
  | 'ORPHAN_DOWNLOAD'
  | 'ORPHAN_DWCA_CACHE_TIME'
  | 'ORPHAN_STATUS';

export type TagNamespace =
  | 'ALA'
  | 'COL'
  | 'EOL'
  | 'GBIF_CRAWLER'
  | 'GBIF_DEFAULT_TERM'
  | 'GBIF_HARVESTING'
  | 'GBIF_METASYNC'
  | 'GBIF_ORPHANS'
  | 'GBIF_VALIDATOR'
  | 'PUBLIC';

export type TaxonomicStatus =
  | 'ACCEPTED'
  | 'DOUBTFUL'
  | 'HETEROTYPIC_SYNONYM'
  | 'HOMOTYPIC_SYNONYM'
  | 'MISAPPLIED'
  | 'PROPARTE_SYNONYM'
  | 'SYNONYM';

export type TechnicalInstallationType =
  | 'BIOCASE_INSTALLATION'
  | 'DiGIR_INSTALLATION'
  | 'HTTP_INSTALLATION'
  | 'IPT_INSTALLATION'
  | 'TAPIR_INSTALLATION';

export type TemporalCoverage = {
  __typename?: 'TemporalCoverage';
  gte?: Maybe<Scalars['String']['output']>;
  lte?: Maybe<Scalars['String']['output']>;
};

export type ThreatStatus =
  | 'CRITICALLY_ENDANGERED'
  | 'DATA_DEFICIENT'
  | 'ENDANGERED'
  | 'EXTINCT'
  | 'EXTINCT_IN_THE_WILD'
  | 'LEAST_CONCERN'
  | 'NEAR_THREATENED'
  | 'NOT_APPLICABLE'
  | 'NOT_EVALUATED'
  | 'REGIONALLY_EXTINCT'
  | 'VULNERABLE';

export type TypeDesignationType =
  | 'ABSOLUTE_TAUTONYMY'
  | 'LINNAEAN_TAUTONYMY'
  | 'MONOTYPY'
  | 'ORIGINAL_DESIGNATION'
  | 'PRESENT_DESIGNATION'
  | 'RULING_BY_COMMISSION'
  | 'SUBSEQUENT_DESIGNATION'
  | 'SUBSEQUENT_MONOTYPY'
  | 'TAUTONYMY';

export type TypeStatus =
  | 'ALLOLECTOTYPE'
  | 'ALLONEOTYPE'
  | 'ALLOTYPE'
  | 'COTYPE'
  | 'EPITYPE'
  | 'EXEPITYPE'
  | 'EXHOLOTYPE'
  | 'EXISOTYPE'
  | 'EXLECTOTYPE'
  | 'EXNEOTYPE'
  | 'EXPARATYPE'
  | 'EXSYNTYPE'
  | 'EXTYPE'
  | 'HAPANTOTYPE'
  | 'HOLOTYPE'
  | 'HYPOTYPE'
  | 'ICONOTYPE'
  | 'ISOLECTOTYPE'
  | 'ISONEOTYPE'
  | 'ISOPARATYPE'
  | 'ISOSYNTYPE'
  | 'ISOTYPE'
  | 'LECTOTYPE'
  | 'NEOTYPE'
  | 'NOTATYPE'
  | 'ORIGINALMATERIAL'
  | 'PARALECTOTYPE'
  | 'PARANEOTYPE'
  | 'PARATYPE'
  | 'PLASTOHOLOTYPE'
  | 'PLASTOISOTYPE'
  | 'PLASTOLECTOTYPE'
  | 'PLASTONEOTYPE'
  | 'PLASTOPARATYPE'
  | 'PLASTOSYNTYPE'
  | 'PLASTOTYPE'
  | 'PLESIOTYPE'
  | 'SECONDARYTYPE'
  | 'SUPPLEMENTARYTYPE'
  | 'SYNTYPE'
  | 'TOPOTYPE'
  | 'TYPE'
  | 'TYPE_GENUS'
  | 'TYPE_SPECIES';

export type UserRole =
  | 'ADMIN'
  | 'COL_ADMIN'
  | 'COL_EDITOR'
  | 'DATA_REPO_USER'
  | 'EDITOR'
  | 'GRSCICOLL_ADMIN'
  | 'GRSCICOLL_EDITOR'
  | 'GRSCICOLL_MEDIATOR'
  | 'IDIGBIO_GRSCICOLL_EDITOR'
  | 'REGISTRY_ADMIN'
  | 'REGISTRY_EDITOR'
  | 'USER'
  | 'VOCABULARY_ADMIN'
  | 'VOCABULARY_EDITOR';

export type YearBreakdown = {
  __typename?: 'YearBreakdown';
  c: Scalars['Int']['output'];
  ms?: Maybe<Array<Maybe<MonthBreakdown>>>;
  y: Scalars['Int']['output'];
};
