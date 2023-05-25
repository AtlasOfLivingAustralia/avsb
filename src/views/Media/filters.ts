/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconCalendar, IconCalendarEvent, IconDatabase } from '@tabler/icons';

import { SelectItem } from '@mantine/core';
import { collectoryAPI } from '#/api';
import { Filter } from '#/components';

// Define a data fetcher for the dataset select search
const fetchItems = async (query: string): Promise<SelectItem[]> => {
  const dataResources = await collectoryAPI.dataResourceList();

  return dataResources
    .filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 100)
    .map(({ uid: value, name: label }: any) => ({
      value,
      label,
    }));
};

// Months array
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const filters: Filter[] = [
  {
    key: 'data_resource_uid',
    label: 'Image Resource',
    type: 'selectSearch',
    placeholder: 'Search for a data resource',
    icon: IconDatabase,
    group: 'Media',
    fetchItems,
  },
  {
    key: 'occurrence_date',
    label: 'Occurrence Date',
    type: 'date',
    placeholder: 'Enter DD/MM/YYYY',
    icon: IconCalendar,
    group: 'Media',
  },
  {
    key: 'month',
    label: 'Month',
    type: 'select',
    placeholder: 'Select month',
    icon: IconCalendarEvent,
    group: 'Media',
    items: months,
  },
];

export default filters;
