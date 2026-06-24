import stats from '#/assets/stats/2026.json';

const sensitiveLists = [
  'ACT Sensitive Species List',
  'South Australian Sensitive Species',
  'Queensland Confidential Species',
  'Victorian Restricted Species List',
  'Western Australia: Sensitive Species',
  'Northern Territory Sensitive Species List',
  'NSW Sensitive Species List',
  'Tasmanian Restricted Species',
];

const conservationLists = ['EPBC Act Threatened Species', ...Object.keys(stats.conservation)];

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace('.00', '');

export { formatNumber, stats, sensitiveLists, conservationLists };
