/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { Badge, Group, SelectItem, Stack, Text } from '@mantine/core';
import { useAPI } from '#/api';

import SelectSearch, { SearchSelectProps } from './SelectSearch';

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  rankString: string;
  commonName: string;
  type?: string;
}

const SelectMenuItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, type, rankString, commonName, ...others }: ItemProps, ref) => (
    <div ref={ref} key={value} {...others}>
      <Stack spacing={0}>
        {type ? (
          <Text size='sm'>
            Search <b>{label}</b> as {type}
          </Text>
        ) : (
          <>
            <Group position='apart'>
              <Text size='sm'>{label.substring(0, 40)}</Text>
              <Badge>{rankString}</Badge>
            </Group>
            <Text size='xs' opacity={0.65}>
              {commonName || 'N/A'}
            </Text>
          </>
        )}
      </Stack>
    </div>
  ),
);

function TaxonSearchInput(props: Omit<SearchSelectProps, 'fetchItems'>) {
  const api = useAPI();

  // Define select items fetcher for select search
  const fetchItems = async (query: string): Promise<SelectItem[]> => {
    const taxa = await api.taxon.suggest(query);
    return taxa.map(({ name, guid, rankString, commonName }) => ({
      value: guid,
      label: name,
      rankString,
      commonName,
      group: name.split(' ')[0],
    }));
  };

  return (
    <SelectSearch
      {...props}
      fetchItems={fetchItems}
      placeholder='Search for a taxon'
      itemComponent={SelectMenuItem}
    />
  );
}

export default TaxonSearchInput;
