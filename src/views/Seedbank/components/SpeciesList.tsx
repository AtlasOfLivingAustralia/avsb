import { CSSProperties, useEffect, useState } from 'react';
import {
  ActionIcon,
  Divider,
  Group,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { FixedSizeList } from 'react-window';
import { IconDownload, IconSearch } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';

type SpeciesFacet = { key: string; count: number };

interface SpeciesListProps {
  species: SpeciesFacet[];
}

interface SpeciesRow {
  index: number;
  style: CSSProperties;
  data: SpeciesFacet[];
}

function Row({ index, style, data }: SpeciesRow) {
  return (
    <Group style={style} key={index} position='apart'>
      <Text size='sm'>{data[index].key}</Text>
      <ThemeIcon variant='light' size='lg' radius='lg' mr='sm'>
        <Text weight='bold' size='xs'>
          {data[index].count}
        </Text>
      </ThemeIcon>
    </Group>
  );
}

function SpeciesList({ species }: SpeciesListProps) {
  const [search, setSearch] = useState<string>('');
  const [filtered, setFiltered] = useState<SpeciesFacet[]>([]);
  const [searchDebounced] = useDebouncedValue(search, 200);

  useEffect(() => {
    setFiltered(
      species.filter(({ key }) => key.toLowerCase().includes(searchDebounced.toLowerCase())),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounced]);

  const onDownloadClick = () => {
    console.log('Download records');
  };

  return (
    <Paper p='md' h='100%' withBorder>
      <Group mb='xs' position='apart'>
        <Text size='xl' sx={(theme) => ({ fontFamily: theme.headings.fontFamily })}>
          {species.length} Species
        </Text>
        <Tooltip label='Download species list' position='left'>
          <ActionIcon variant='subtle' onClick={onDownloadClick}>
            <IconDownload size='1rem' />
          </ActionIcon>
        </Tooltip>
      </Group>
      <TextInput
        icon={<IconSearch size='1rem' />}
        w='100%'
        variant='filled'
        mb='xs'
        placeholder='Search for a species'
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Divider mt='md' mb='xs' />
      <FixedSizeList
        height={310}
        width='calc(100% + 16px)'
        style={{ marginRight: -16 }}
        itemData={filtered}
        itemCount={filtered.length}
        itemSize={45}
      >
        {Row}
      </FixedSizeList>
    </Paper>
  );
}

export default SpeciesList;
