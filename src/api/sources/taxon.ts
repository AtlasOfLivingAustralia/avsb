interface SuggestedTaxon {
  scientificName: string;
  key: string;
}

async function suggest(query: string): Promise<SuggestedTaxon[]> {
  return (await fetch(`${import.meta.env.VITE_API_ES}/event/suggest/taxonKey?q=${query}`)).json();
}

interface Variant {
  nameString: string;
  nameComplete: string;
  nameFormatted: string;
  identifier: string;
  nomenclaturalCode: string;
  taxonomicStatus: string;
  nomenclaturalStatus: string | null;
  nameAccordingTo: string | null;
  nameAccordingToID: string | null;
  namePublishedIn: string | null;
  namePublishedInYear: string;
  namePublishedInID: string | null;
  nameAuthority: string;
  taxonRemarks: string | null;
  provenance: string | null;
  infoSourceName: string;
  infoSourceURL: string;
  datasetURL: string;
  priority: number;
}

interface Identifier {
  identifier: string;
  nameString: string;
  status: string;
  subject: string | null;
  format: string | null;
  provenance: string | null;
  infoSourceName: string;
  infoSourceURL: string;
  datasetURL: string;
}

interface CommonName {
  nameString: string;
  status: string;
  priority: number;
  language: string;
  temporal: string | null;
  locationID: string | null;
  locality: string | null;
  countryCode: string;
  sex: string | null;
  lifeStage: string | null;
  isPlural: string | null;
  organismPart: string | null;
  taxonRemarks: string | null;
  provenance: string | null;
  labels: string | null;
  infoSourceName: string;
  infoSourceURL: string;
  datasetURL: string;
}

interface Synonym {
  nameString: string;
  nameComplete: string;
  nameFormatted: string;
  nameGuid: string;
  nomenclaturalCode: string;
  taxonomicStatus: string;
  nomenclaturalStatus: string | null;
  nameAccordingTo: string;
  nameAccordingToID: string;
  namePublishedIn: string;
  namePublishedInYear: string;
  namePublishedInID: string | null;
  nameAuthority: string;
  taxonRemarks: string | null;
  provenance: string | null;
  infoSourceURL: string;
  datasetURL: string;
}

interface Classification {
  kingdom: string;
  kingdomGuid: string;
  phylum: string;
  phylumGuid: string;
  class: string;
  classGuid: string;
  subclass: string;
  subclassGuid: string;
  superorder: string;
  superorderGuid: string;
  order: string;
  orderGuid: string;
  family: string;
  familyGuid: string;
  genus: string;
  genusGuid: string;
  scientificName: string;
  guid: string;
  species: string;
  speciesGuid: string;
}

interface TaxonConcept {
  guid: string;
  parentGuid: string;
  nameString: string;
  nameComplete: string;
  nameFormatted: string;
  author: string;
  nomenclaturalCode: string;
  taxonomicStatus: string | null;
  nomenclaturalStatus: string;
  rankString: string;
  nameAuthority: string;
  rankID: number;
  nameAccordingTo: string;
  nameAccordingToID: string | null;
  namePublishedIn: string;
  namePublishedInYear: string;
  namePublishedInID: string;
  provenance: string | null;
  favourite: string | null;
  infoSourceURL: string;
  datasetURL: string;
  taxonConceptID: string;
  scientificNameID: string;
  taxonRemarks: [string];
}

interface Taxon {
  imageIdentifier: string | null;
  variants: [Variant];
  identifiers: [Identifier];
  images: [string];
  simpleProperties: [string];
  categories: [string];
  habitats: [string];
  extantStatuses: [string];
  commonNames: [CommonName];
  synonyms: [Synonym];
  classification: Classification;
  taxonName: [string];
  taxonConcept: TaxonConcept;
}

async function taxonInfo(guid: string): Promise<Taxon> {
  return (await fetch(`${import.meta.env.VITE_API_BIE}/species/${guid}`)).json();
}

export default () => ({
  suggest,
  taxonInfo,
});

export type { Taxon };
