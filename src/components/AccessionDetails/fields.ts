import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'quantityCount',
  'quantityInGrams',
  'thousandSeedWeight',
  'storageRelativeHumidityPercentage',
  'primaryCollector',
  'duplicatesReplicates',
  'herbariumVoucher',
];

export default fields;
