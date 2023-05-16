import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'quantityInGrams',
  'thousandSeedWeight',
  'storageRelativeHumidityPercentage',
  'primaryCollector',
  'duplicatesReplicates',
];

export default fields;
