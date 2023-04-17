/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Text, Center, Drawer, Pagination, Group, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';

// Project components / helpers
import { gqlQueries, performGQLQuery } from '#/api';
import useMounted from '#/helpers/useMounted';
import queries from '#/api/queries';
import { FilterBar, FilterPanel } from '#/components';
import { Predicate } from '#/components/FilterPanel';
import AccessionTable from './components/AccessionTable';

// Config
import filters from './filters';

function Accessions() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
  const [predicates, setPredicates] = useState<Predicate[]>([]);
  const [resetKey, setResetKey] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);

  const params = useParams();
  const mounted = useMounted();
  const events = query?.results as any[];

  useEffect(() => {
    async function runQuery() {
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSIONS, {
        predicate: {
          type: 'and',
          predicates: [
            queries.PRED_DATA_RESOURCE,
            {
              type: 'in',
              key: 'taxonKey',
              values: [params.guid],
            },
            {
              type: 'equals',
              key: 'eventType',
              value: 'Accession',
            },
            ...predicates,
          ],
        },
        size: 10,
        from: (page - 1) * 10,
      });
      setQuery(data.eventSearch.documents);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, predicates]);

  const onRemovePredicate = (predicate: Predicate) => {
    setResetKey(`${predicate.key}-${Date.now()}`);
    setPredicates(predicates.filter(({ key }) => predicate.key !== key));
  };

  if (params.accession) return <Outlet />;

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group>
            <ThemeIcon variant='light' radius='xl' size='xl'>
              <IconFilter />
            </ThemeIcon>
            <Text size='xl' weight='bold' style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
              Query Filters
            </Text>
          </Group>
        }
        keepMounted
      >
        <FilterPanel
          value={predicates}
          filters={filters}
          resetKey={resetKey}
          onPredicates={(newPredicates) => {
            setPage(1);
            setPredicates(newPredicates);
          }}
          mb='xl'
        />
      </Drawer>
      <FilterBar
        filters={filters}
        predicates={predicates}
        onFiltersOpen={open}
        onRemove={onRemovePredicate}
        mb='lg'
      />
      <AccessionTable events={events} />
      <Center pt='md'>
        <Pagination
          value={page}
          total={query ? Math.ceil(query.total / 10) : 1}
          onChange={(newPage) => setPage(newPage)}
        />
      </Center>
    </>
  );
}

export default Accessions;
