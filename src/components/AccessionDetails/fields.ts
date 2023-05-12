import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'sampleWeightInGrams',
  'thousandSeedWeight',
  'relativeHumidityPercentage',
  'primaryCollector',
  'duplicatesReplicates',
];

export default fields;
