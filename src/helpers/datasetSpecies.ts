import speciesData from '#/assets/species.json';

type SpeciesEntries = { [key: string]: number };

export interface Species {
  _meta: {
    updated: number;
  };
  all: string[];
  datasets: {
    [dataset: string]: SpeciesEntries;
  };
}

export const getSpeciesForDr = (dataResource: string): SpeciesEntries =>
  (speciesData as Species).datasets[dataResource];

export const isSpeciesInList = (scientificName: string): boolean =>
  speciesData.all.findIndex((species) =>
    species.toLowerCase().includes(scientificName.toLowerCase()),
  ) > -1;

export const speciesListLastUpdated = new Date(speciesData._meta.updated).toLocaleDateString();
