import { CSSProperties, useEffect, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { FixedSizeList } from 'react-window';
import { IconArrowUpRight, IconDownload, IconSearch } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';
import { useNavigate, useParams } from 'react-router';
import { saveAs } from 'file-saver';

// Project helpers
import { taxonAPI } from '#/api';
import { orderBy } from 'lodash';

import classes from './SpeciesList.module.css';

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
  const params = useParams();

  const handleRowClick = async () => {
    const [suggest] = await taxonAPI.suggest(data[index].key);
    if (suggest)
      navigate(`/taxon/${encodeURIComponent(suggest.guid)}/accessions`, {
        state: {
          predicates: [
            {
              type: 'equals',
              key: 'datasetKey',
              value: params.resource || '',
            },
          ],
          from: `/seedbank/${params.resource}`,
        },
      });
  };

  return (
    <UnstyledButton onClick={handleRowClick} key={index} className={classes.button} style={style}>
      <Group justify='space-between' pl='md'>
        <Text size='sm' maw={205} truncate>
          {data[index].key}
        </Text>
        <Group gap='xs' mr='sm'>
          <Badge variant='light'>
            {data[index].count} Record{data[index].count > 1 && 's'}
          </Badge>
          <IconArrowUpRight size='1rem' />
        </Group>
      </Group>
    </UnstyledButton>
  );
}

type SpeciesListSort = 'numeric' | 'alphabetical';

function SpeciesList({ name, species }: SpeciesListProps) {
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<SpeciesListSort>('alphabetical');
  const [filtered, setFiltered] = useState<SpeciesFacet[]>(species);
  const [searchDebounced] = useDebouncedValue(search, 200);

  // Sort the filtered entries
  const sorted = orderBy(
    filtered,
    sort === 'alphabetical' ? 'key' : 'count',
    sort === 'alphabetical' ? 'asc' : 'desc',
  );

  useEffect(() => {
    setFiltered(
      species.filter(({ key }) => key.toLowerCase().includes(searchDebounced.toLowerCase())),
    );
  }, [searchDebounced]);

  const onDownloadClick = () => {
    const csv = [
      'Species Name,Count',
      ...sorted.map((record) => Object.values(record).join(',')),
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
      <Group mb='xs' justify='space-between'>
        <Text size='xl' style={{ fontFamily: 'var(--mantine-font-family-headings)' }}>
          {species.length} Species
        </Text>
        <Group gap='xs'>
          <SegmentedControl
            size='xs'
            value={sort}
            onChange={(value) => setSort(value as SpeciesListSort)}
            data={[
              { label: 'ABC', value: 'alphabetical' },
              { label: '#', value: 'numeric' },
            ]}
          />
          <Tooltip label='Download species list' position='left'>
            <ActionIcon
              variant='subtle'
              onClick={onDownloadClick}
              aria-label='Download species list'
            >
              <IconDownload size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
      <TextInput
        leftSection={<IconSearch size='1rem' />}
        w='100%'
        variant='filled'
        mb='xs'
        placeholder='Search for a species'
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <Divider mt='md' mb='xs' />
      <FixedSizeList
        height={430}
        width='calc(100% + (2 * var(--mantine-spacing-md)))'
        style={{
          marginRight: 'calc(var(--mantine-spacing-md) * -1)',
          marginLeft: 'calc(var(--mantine-spacing-md) * -1)',
        }}
        itemData={sorted}
        itemCount={sorted.length}
        itemSize={45}
      >
        {Row}
      </FixedSizeList>
    </Paper>
  );
}

export default SpeciesList;
