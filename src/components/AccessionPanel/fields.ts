import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'sampleSize',
  'quantityInGrams',
  'thousandSeedWeight',
  'storageRelativeHumidityPercentage',
  'purityPercentage',
  'storageTemperatureInCelsius',
];

const longFields: (keyof SeedBankAccession)[] = [
  'primaryStorageSeedBank',
  'primaryCollector',
  'preStorageTreatment',
  'plantForm',
  'formInStorage',
  'degreeOfEstablishment',
  'duplicatesReplicates',
  'collectionPermitNumber',
  'collectionFill',
  'publicationDOI',
];

export { fields, longFields };
