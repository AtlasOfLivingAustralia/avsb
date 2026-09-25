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

const conservationLists = [
  'EPBC Act Threatened Species',
  'New South Wales : Conservation Status',
  'Northern Territory : Conservation Status',
  'South Australia : Conservation Status',
  'Victoria : Conservation Status',
  'Western Australia: Conservation Status',
  'Tasmania : Conservation Status',
  'Queensland : Conservation Status',
  'Australian Capital Territory : Conservation Status'
];

const formatNumber = (value?: number) =>
  value !== undefined
    ? value.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace('.00', '')
    : '?';

export { conservationLists, sensitiveLists, formatNumber };
