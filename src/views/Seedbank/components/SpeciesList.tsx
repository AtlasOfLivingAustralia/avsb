import { CSSProperties, useEffect, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Divider,
  Group,
  Paper,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { FixedSizeList } from 'react-window';
import { IconArrowUpRight, IconDownload, IconSearch } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';
import { saveAs } from 'file-saver';
import { taxonAPI } from '#/api';
import { useNavigate } from 'react-router-dom';

type SpeciesFacet = { key: string; count: number };

interface SpeciesListProps {
  name: string;
  species: SpeciesFacet[];
}

interface SpeciesRow {
  index: number;
  style: CSSProperties;
  data: SpeciesFacet[];
}

function Row({ index, style, data }: SpeciesRow) {
  const navigate = useNavigate();

  const handleRowClick = async () => {
    const [suggest] = await taxonAPI.suggest(data[index].key);
    if (suggest) navigate(`/taxon/${encodeURIComponent(suggest.guid)}`);
  };

  return (
    <UnstyledButton
      onClick={handleRowClick}
      key={index}
      style={style}
      sx={{
        transition: 'opacity cubic-bezier(0, 0, 0, 1) 200ms',
        ':hover': {
          opacity: 0.4,
        },
      }}
    >
      <Group position='apart'>
        <Text size='sm'>{data[index].key}</Text>
        <Group spacing='xs' mr='sm'>
          <Badge>
            {data[index].count} Record{data[index].count > 1 && 's'}
          </Badge>
          <IconArrowUpRight size='1rem' />
        </Group>
      </Group>
    </UnstyledButton>
  );
}

function SpeciesList({ name, species }: SpeciesListProps) {
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
    const csv = [
      'Species Name,Count',
      ...species.map((record) => Object.values(record).join(',')),
    ].join('\n');

    saveAs(
      new Blob([csv], {
        type: 'text/csv;charset=utf-8',
      }),
      `Species of ${name}, ${new Date().toLocaleDateString()}.csv`,
    );
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
        height={395}
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
