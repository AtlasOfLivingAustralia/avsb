/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState, forwardRef, ComponentPropsWithoutRef } from 'react';
import { Loader, Select, SelectItem, SelectProps, Stack, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useAPI } from '#/api';

interface SuggestedTaxon {
  scientificName: string;
  key: string;
}

interface TaxonSearchInputProps
  extends Omit<
    SelectProps,
    'searchable' | 'searchValue' | 'data' | 'value' | 'onSearchChange' | 'nothingFound'
  > {
  customTypes?: string[];
}

function uniqueTaxa(taxa: SuggestedTaxon[]): SuggestedTaxon[] {
  const seen: string[] = [];
  const out: SuggestedTaxon[] = [];

  // Only push unique taxon suggestions
  for (let i = 0; i < taxa.length; i += 1) {
    if (!seen.includes(taxa[i].key)) {
      seen.push(taxa[i].key);
      out.push(taxa[i]);
    }
  }

  return out;
}

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  value: string;
  type?: string;
}

const SelectMenuItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, label, type, ...others }: ItemProps, ref) => (
    <div ref={ref} key={value} {...others}>
      <Stack spacing={0}>
        {type ? (
          <Text size='sm'>
            Search <b>{label}</b> as {type}
          </Text>
        ) : (
          <>
            <Text size='sm'>{label}</Text>
            <Text size='xs' opacity={0.65}>
              {value}
            </Text>
          </>
        )}
      </Stack>
    </div>
  ),
);

function TaxonSearchInput({ customTypes = [], ...props }: TaxonSearchInputProps) {
  const [data, setData] = useState<SelectItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>('');
  const [query] = useDebouncedValue(search, 150);
  const api = useAPI();

  useEffect(() => {
    async function suggestTaxa() {
      try {
        const taxa = await api.taxon.suggest(query);
        setData(
          uniqueTaxa(taxa).map(({ scientificName, key }) => ({
            value: key,
            label: scientificName,
            group: scientificName.split(' ')[0],
          })),
        );
        setError(null);
      } catch (suggestError) {
        setError(suggestError as Error);
      }

      setLoading(false);
    }

    if (query?.length > 0) suggestTaxa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, api.taxon]);

  return (
    <Select
      {...props}
      searchable
      clearable
      rightSection={loading ? <Loader size='xs' /> : null}
      icon={<IconSearch size={18} />}
      placeholder={
        customTypes.length > 0
          ? `Search for a Taxon / ${customTypes.join(' / ')}`
          : 'Search for a Taxon'
      }
      searchValue={search}
      error={error && error.message}
      itemComponent={SelectMenuItem}
      nothingFound={
        (query.length && !loading) > 0 ? `No taxa found for '${query}'` : 'Enter search query above'
      }
      onSearchChange={(newValue) => {
        if (search !== newValue) {
          if (newValue !== '') setLoading(true);
          setSearch(newValue);
        }
      }}
      data={[
        ...data,
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

export default TaxonSearchInput;
