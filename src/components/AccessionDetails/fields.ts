import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'quantityCount',
  'quantityInGrams',
  'thousandSeedWeight',
  'storageRelativeHumidityPercentage',
  'primaryCollector',
  'duplicatesReplicates',
];

export default fields;
