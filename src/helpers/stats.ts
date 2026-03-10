import stats from '#/assets/stats/2026.json';

const sensitiveLists = Object.keys(stats.stateSensitive);
const conservationLists = ['EPBC Act Threatened Species', ...Object.keys(stats.stateConservation)];

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace('.00', '');

export { formatNumber, stats, sensitiveLists, conservationLists };
