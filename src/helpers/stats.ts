import stats from '#/assets/stats/2025.json';

const sensitiveLists = ['EPBC Act Threatened Species', ...Object.keys(stats.stateSensitive)];

export { stats, sensitiveLists };
