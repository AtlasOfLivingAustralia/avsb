import { useAPI } from '#/api';
import { Badge, ComboboxItem, Group, Stack, Text } from '@mantine/core';

import SelectSearch, { SearchSelectProps } from './SelectSearch';

interface TaxonItem extends ComboboxItem {
  rankString?: string;
  commonName?: string;
  type?: string;
}

function TaxonSearchInput(props: Omit<SearchSelectProps, 'fetchItems' | 'renderOption'>) {
  const api = useAPI();

  // Define select items fetcher for select search
  const fetchItems = async (query: string): Promise<ComboboxItem[]> => {
    const taxa = await api.taxon.suggest(query);
    return taxa.map(({ name, guid, rankString, commonName }) => ({
      value: guid,
      label: name,
      rankString,
      commonName,
      group: name.split(' ')[0],
    }));
  };

  // Custom render function for taxon items
  const renderOption = (item: ComboboxItem) => {
    const taxonItem = item as TaxonItem;

    return (
      <Stack gap={0}>
        {taxonItem.type ? (
          <Text size='sm'>
            Search <b>{taxonItem.label}</b> as {taxonItem.type}
          </Text>
        ) : (
          <>
            <Group justify='space-between'>
              <Text size='sm'>{taxonItem.label?.substring(0, 40)}</Text>
              {taxonItem.rankString && <Badge variant='light'>{taxonItem.rankString}</Badge>}
            </Group>
            {taxonItem.commonName && (
              <Text size='xs' opacity={0.65}>
                {taxonItem.commonName}
              </Text>
            )}
          </>
        )}
      </Stack>
    );
  };

  return (
    <SelectSearch
      {...props}
      fetchItems={fetchItems}
      placeholder='Search for a taxon'
      renderOption={renderOption}
    />
  );
}

export default TaxonSearchInput;
