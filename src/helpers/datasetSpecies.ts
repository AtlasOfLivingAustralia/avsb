import speciesData from '#/assets/species.json';

interface Species {
  _meta: {
    updated: number;
  };
  all: string[];
  datasets: {
    [key: string]: string[];
  };
}

export const getSpeciesForDr = (dataResource: string): string[] =>
  (speciesData as Species).datasets[dataResource];

export const isSpeciesInList = (scientificName: string): boolean =>
  speciesData.all.findIndex((species) =>
    species.toLowerCase().includes(scientificName.toLowerCase()),
  ) > -1;

export const speciesListLastUpdated = new Date(speciesData._meta.updated).toLocaleDateString();
