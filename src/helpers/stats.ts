import stats from '#/assets/stats/2025.json';

const sensitiveLists = Object.keys(stats.stateSensitive);
const conservationLists = ['EPBC Act Threatened Species', ...Object.keys(stats.stateConservation)];

export { stats, sensitiveLists, conservationLists };
