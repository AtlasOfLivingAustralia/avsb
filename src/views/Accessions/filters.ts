import {
  IconBox,
  IconChartPie,
  IconDatabase,
  IconDropletFilled,
  IconHandStop,
  IconId,
  IconPackage,
  IconPercentage,
  IconScale,
  IconSeeding,
  IconTemperature,
} from '@tabler/icons';

import { SelectItem } from '@mantine/core';
import { gqlQueries, performGQLQuery } from '#/api';
import { Filter } from '#/components';

// Define a data fetcher for the dataset select search
const fetchItems = async (query: string): Promise<SelectItem[]> => {
  const { data } = await performGQLQuery(gqlQueries.QUERY_DATASET_SUGGEST, {
    predicate: { type: 'like', key: 'datasetTitle', value: `*${query}*` },
  });

  return (data.eventSearch?.facet?.datasetKey || [])
    .filter((result: any) => result !== null)
    .map(({ key: datasetKey, datasetTitle }: any) => ({
      value: datasetKey,
      label: datasetTitle,
    }));
};

const filters: Filter[] = [
  {
    key: 'seedbank_accessionNumber',
    label: 'Accession Number',
    type: 'text',
    placeholder: 'ABC 123456.78',
    icon: IconId,
    group: 'Collection',
  },
  {
    key: 'datasetKey',
    label: 'Dataset',
    type: 'selectSearch',
    placeholder: 'Search for a dataset',
    icon: IconDatabase,
    group: 'Collection',
    fetchItems,
  },
  {
    key: 'seedbank_seedPerGram',
    label: 'Seed/GM',
    type: 'numericGreaterLess',
    placeholder: 'Enter seeds',
    icon: IconSeeding,
    group: 'Collection',
  },
  // {
  //   key: 'seedbank_formInStorage',
  //   label: 'Form in Storage',
  //   type: 'select',
  //   placeholder: 'Select one',
  //   items: [{ label: 'Thing', value: 'testing' }],
  // },
  {
    key: 'seedbank_thousandSeedWeight',
    label: 'Thousand Seed Weight',
    type: 'numericGreaterLess',
    placeholder: 'Enter weight',
    icon: IconBox,
    group: 'Collection',
  },
  {
    key: 'seedbank_sampleWeightInGrams',
    label: 'Sample Weight',
    type: 'numericGreaterLess',
    placeholder: 'Enter weight',
    icon: IconScale,
    group: 'Collection',
  },
  {
    key: 'seedbank_purityPercentage',
    label: 'Purity %',
    type: 'percent',
    icon: IconPercentage,
    group: 'Collection',
  },
  {
    key: 'seedbank_purityDebrisPercentage',
    label: 'Purity / Debris %',
    type: 'percent',
    icon: IconChartPie,
    group: 'Collection',
  },
  {
    key: 'seedbank_dateCollected',
    label: 'Date Collected',
    type: 'date',
    placeholder: 'Click to select date',
    icon: IconHandStop,
    group: 'Collection',
  },
  {
    key: 'seedbank_dateInStorage',
    label: 'Date In Storage',
    type: 'date',
    placeholder: 'Click to select date',
    icon: IconPackage,
    group: 'Storage',
  },
  {
    key: 'seedbank_storageTemperatureInCelsius',
    label: 'Storage Temperature',
    type: 'numericGreaterLess',
    placeholder: 'Enter temperature',
    icon: IconTemperature,
    group: 'Storage',
  },
  {
    key: 'seedbank_relativeHumidityPercentage',
    label: 'Relative Humidity %',
    type: 'percent',
    placeholder: 'Enter temperature',
    icon: IconDropletFilled,
    group: 'Storage',
  },
  // {
  //   key: 'seedbank_plantForm',
  //   label: 'Plant form',
  //   type: 'select',
  //   placeholder: 'Select plant form',
  //   items: [{ label: 'Thing', value: 'testing' }],
  // },
];

export default filters;
