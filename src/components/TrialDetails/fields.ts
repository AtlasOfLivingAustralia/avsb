import { SeedBankTrial } from '#/api/graphql/types';

const fields: (keyof SeedBankTrial)[] = [
  'numberGerminated',
  'numberTested',
  'numberFull',
  'numberEmpty',
];

export default fields;
