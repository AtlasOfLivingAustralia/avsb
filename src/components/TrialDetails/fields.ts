import { SeedBankTrial } from '#/api/graphql/types';

const fields: (keyof SeedBankTrial)[] = [
  'numberGerminated',
  'numberTested',
  'numberFull',
  'numberNotViable',
  'numberEmpty',
];

export default fields;
