import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'quantityCount',
  'quantityInGrams',
  'thousandSeedWeight',
  'storageRelativeHumidityPercentage',
  'purityPercentage',
  'storageTemperatureInCelsius',
  'numberPlantsSampled',
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
  'herbariumVoucher',
];

export { fields, longFields };
