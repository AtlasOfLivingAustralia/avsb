import { useEffect, useState } from 'react';
import { Select, SelectProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useAPI } from '#/api';

interface SuggestedTaxon {
  scientificName: string;
  key: string;
}

type TaxonSearchInputProps = Omit<
  SelectProps,
  'searchable' | 'searchValue' | 'data' | 'value' | 'onSearchChange' | 'nothingFound'
>;

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

function TaxonSearchInput(props: TaxonSearchInputProps) {
  const [data, setData] = useState<SuggestedTaxon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState<string>('');
  const [query] = useDebouncedValue(search, 350);
  const api = useAPI();

  useEffect(() => {
    async function suggestTaxa() {
      try {
        const taxa = await api.taxon.suggest(query);
        setData(uniqueTaxa(taxa));
        setError(null);
      } catch (suggestError) {
        setError(suggestError as Error);
      }
    }

    if (query?.length > 0 && !data.map((item) => item.scientificName).includes(query))
      suggestTaxa();

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, api.taxon]);

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      searchable
      clearable
      icon={<IconSearch size={18} />}
      placeholder='Enter species name'
      searchValue={search}
      error={error && error.message}
      nothingFound={
        (query.length && !loading) > 0 ? `No taxa found for '${query}'` : 'Enter search query above'
      }
      onSearchChange={(newValue) => {
        if (newValue.length === 0) setData([]);
        setLoading(true);
        setSearch(newValue);
      }}
      data={data.map(({ scientificName, key }) => ({
        value: key,
        label: scientificName,
        group: scientificName.split(' ')[0],
      }))}
    />
  );
}

export default TaxonSearchInput;
