import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'sampleSize',
  'sampleWeightInGrams',
  'thousandSeedWeight',
  'relativeHumidityPercentage',
  'purityPercentage',
  'purityDebrisPercentage',
  'storageTemperatureInCelsius',
];

const longFields: (keyof SeedBankAccession)[] = [
  'primaryStorageSeedBank',
  'primaryCollector',
  'preStorageTreatmentNotesHistory',
  'plantForm',
  'formInStorage',
  'degreeOfEstablishment',
  'duplicatesReplicates',
  'collectionPermitNumber',
  'collectionFillRate',
  'publicationDOI',
];

export { fields, longFields };
