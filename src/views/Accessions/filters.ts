import {
  IconBox,
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
import { EventSearchResult, gqlQueries, performGQLQuery } from '#/api';
import { Filter } from '#/components';

// Define a data fetcher for the dataset select search
const fetchItems = async (query: string): Promise<SelectItem[]> => {
  const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
    gqlQueries.QUERY_DATASET_SUGGEST,
    {
      predicate: {
        type: 'and',
        predicates: [
          { type: 'like', key: 'datasetTitle', value: `*${query}*` },
          gqlQueries.PRED_DATA_RESOURCE,
        ],
      },
    },
  );

  return (data.eventSearch?.facet?.datasetKey || [])
    .filter((result) => result !== null)
    .map(({ datasetTitle }) => ({
      value: datasetTitle || '',
      label: datasetTitle || '',
    }));
};

const filters: Filter[] = [
  {
    key: 'catalogNumber',
    label: 'Accession Number',
    type: 'text',
    placeholder: 'ABC 123456.78',
    icon: IconId,
    group: 'Collection',
  },
  {
    key: 'datasetTitle',
    label: 'Institution',
    type: 'selectSearch',
    placeholder: 'Search for a institution',
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
    key: 'seedbank_quantityInGrams',
    label: 'Quantity (g)',
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
    key: 'seedbank_dateCollected',
    label: 'Date Collected',
    type: 'date',
    placeholder: 'Enter DD/MM/YYYY',
    icon: IconHandStop,
    group: 'Collection',
  },
  {
    key: 'seedbank_dateInStorage',
    label: 'Date In Storage',
    type: 'date',
    placeholder: 'Enter DD/MM/YYYY',
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
    key: 'seedbank_storageRelativeHumidityPercentage',
    label: 'Storage Relative Humidity %',
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
