import { SeedBankAccession } from '#/api/graphql/types';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'sampleWeightInGrams',
  'thousandSeedWeight',
  'relativeHumidityPercentage',
  'purityPercentage',
  'purityDebrisPercentage',
  'storageTemperatureInCelsius',
  'primaryStorageSeedBank',
  'primaryCollector',
  'duplicatesReplicates',
];

export default fields;
