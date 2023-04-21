/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { Loader, Select, SelectItem, SelectProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';

import uniqBy from 'lodash/uniqBy';
import orderBy from 'lodash/orderBy';

export interface SearchSelectProps
  extends Omit<
    SelectProps,
    'searchable' | 'searchValue' | 'data' | 'onSearchChange' | 'nothingFound'
  > {
  customTypes?: string[];
  fetchItems: (query: string) => Promise<SelectItem[]>;
}

function SelectSearch({ customTypes = [], fetchItems, ...props }: SearchSelectProps) {
  const [data, setData] = useState<SelectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchDebounced] = useDebouncedValue(search, 150);

  useEffect(() => {
    async function performFetch() {
      try {
        const fetchResult = await fetchItems(searchDebounced);
        setData(fetchResult);
        setError(null);
      } catch (suggestError) {
        setError(suggestError as Error);
      }

      setLoading(false);
    }

    // Only perform a search if the user has provided an input
    if (searchDebounced?.length > 0) performFetch();
  }, [searchDebounced, fetchItems]);

  // Sort the menu items alphabetically by label
  const dataSorted = orderBy(data, [(filter) => filter.label?.toLowerCase()], ['asc']);

  return (
    <Select
      {...props}
      searchable
      clearable
      rightSection={loading ? <Loader size='xs' /> : null}
      icon={<IconSearch size={18} />}
      searchValue={search}
      error={error && error.message}
      nothingFound={
        searchDebounced.length > 0 && !loading
          ? `Nothing found for '${searchDebounced}'`
          : 'Enter search query above'
      }
      onSearchChange={(newValue) => {
        if (search !== newValue) {
          if (newValue !== '') setLoading(true);
          setSearch(newValue);
        }
      }}
      data={[
        ...uniqBy(dataSorted, 'value'),
        ...(search.length > 0
          ? customTypes.map((type) => ({
              type,
              value: `${type}:${search}`,
              label: search,
            }))
          : []),
      ]}
    />
  );
}

export default SelectSearch;