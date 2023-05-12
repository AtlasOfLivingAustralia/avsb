import { SeedBankTreatment } from '#/api/graphql/types';

const fields: (keyof SeedBankTreatment)[] = [
  'mediaSubstrate',
  'lightHours',
  'darkHours',
  'dayTemperatureInCelsius',
  'nightTemperatureInCelsius',
];

export default fields;
