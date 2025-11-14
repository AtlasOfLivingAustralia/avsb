import { ComboboxItem } from '@mantine/core';
import {
  IconCalendar,
  IconCircle,
  IconCircleDot,
  IconCircleDotted,
  IconCircleOff,
  IconClock,
  IconDatabase,
  IconExclamationCircle,
  IconId,
  IconPercentage,
  IconReceiptTax,
  IconRotateClockwise2,
  IconSeeding,
} from '@tabler/icons-react';

import { Filter } from '#/components';
import { EventSearchResult, gqlQueries, performGQLQuery } from '#/api';
import { sensitiveLists } from '#/helpers/stats';

// Define a data fetcher for the dataset select search
const fetchItems = async (query: string): Promise<ComboboxItem[]> => {
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
    group: 'Test',
  },
  {
    key: 'datasetTitle',
    label: 'Institution',
    type: 'selectSearch',
    placeholder: 'Search for an institution',
    icon: IconDatabase,
    group: 'Test',
    fetchItems,
  },
  {
    key: 'seedbank_testDateStarted',
    label: 'Test Date Started',
    type: 'date',
    placeholder: 'Enter DD/MM/YYYY',
    icon: IconCalendar,
    group: 'Test',
  },
  {
    key: 'seedbank_testLengthInDays',
    label: 'Test Length (days)',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconClock,
    group: 'Test',
  },
  {
    key: 'seedbank_germinationRateInDays',
    label: 'Germination Rate (days)',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconRotateClockwise2,
    group: 'Germination',
  },
  {
    key: 'seedbank_adjustedGerminationPercentage',
    label: 'Adjusted Germination %',
    type: 'percent',
    placeholder: '10',
    icon: IconReceiptTax,
    group: 'Germination',
  },
  {
    key: 'seedbank_viabilityPercentage',
    label: 'Viability %',
    type: 'percent',
    placeholder: '10',
    icon: IconPercentage,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberGerminated',
    label: 'Number Germinated',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconSeeding,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberFull',
    label: 'Number Full',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircleDot,
    group: 'Germination',
  },
  {
    key: 'seedbank_numberEmpty',
    label: 'Number Empty',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircle,
    group: 'Germination',
  },
  // {
  //   key: 'seedbank_numberNotViable',
  //   label: 'Number Not Viable',
  //   type: 'numericGreaterLess',
  //   placeholder: '10',
  //   icon: IconCircleOff,
  //   group: 'Germination',
  // },
  {
    key: 'seedbank_numberTested',
    label: 'Number Tested',
    type: 'numericGreaterLess',
    placeholder: '10',
    icon: IconCircleDotted,
    group: 'Germination',
  },
  {
    key: 'measurementOrFactTypes',
    label: 'Sensitive Status',
    type: 'multiSelect',
    placeholder: 'Select sensitive statuses',
    icon: IconExclamationCircle,
    items: sensitiveLists,
    group: 'Sensitive',
  },
];

export default filters;
