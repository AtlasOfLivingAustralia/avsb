import { Center, Divider, Group, Pagination, Select, Text, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

// Project components / helpers
import {
  EventDocuments,
  EventSearchResult,
  gqlQueries,
  performGQLQuery,
  Predicate,
  Taxon,
} from '#/api';
import { Downloads, Filters } from '#/components';
import { useMounted } from '#/helpers';

// Accession components
import AccessionTable from './components/AccessionTable';
import downloadFields from './downloadFields';
// Config
import filters from './filters';

interface LocationState {
  predicates?: Predicate[];
}

export function Component() {
  // State hooks
  const { state } = useLocation() as { state: LocationState };
  const [filterPredicates, setFilterPredicates] = useState<Predicate[]>(state?.predicates || []);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = useState<EventDocuments>(useLoaderData() as EventDocuments);

  const { taxon } = useRouteLoaderData('taxon') as { taxon: Taxon };
  const params = useParams();
  const mounted = useMounted();
  const events = query?.results;

  // Construct the base predicates array
  const predicates: Predicate[] = [
    gqlQueries.PRED_DATA_RESOURCE,
    {
      type: 'in',
      key: 'taxonKey',
      values: [params.guid || ''],
    },
    {
      type: 'equals',
      key: 'eventType',
      value: 'Accession',
    },
    ...filterPredicates,
  ];

  useEffect(() => {
    async function runQuery() {
      const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
        gqlQueries.QUERY_EVENT_ACCESSIONS,
        {
          predicate: {
            type: 'and',
            predicates,
          },
          size: pageSize,
          from: (page - 1) * pageSize,
        },
      );
      setQuery(data.eventSearch?.documents as EventDocuments);
    }

    if (mounted) runQuery();
  }, [page, pageSize, filterPredicates]);

  if (params.accession) return <Outlet />;

  const downloadFetcher = (data: { eventSearch: EventSearchResult }) =>
    data?.eventSearch?.documents?.results || [];

  return (
    <>
      <Group mb='lg' justify='space-between'>
        <Group>
          <Tooltip
            transitionProps={{ transition: 'pop' }}
            offset={10}
            withArrow
            label='Change number results per page'
            position='right'
          >
            <Select
              value={pageSize.toString()}
              onChange={(value) => {
                setPage(1);
                setPageSize(parseInt(value || '10', 10));
              }}
              w={120}
              data={['10', '20', '40'].map((size) => ({
                label: `${size} results`,
                value: size.toString(),
              }))}
              aria-label='Results per page'
            />
          </Tooltip>
          <Filters
            predicates={filterPredicates}
            filters={filters}
            onPredicates={(preds) => {
              setPage(1);
              setFilterPredicates(preds);
            }}
          />
        </Group>
        <Group>
          <Text c='dimmed' ta='center' size='sm'>
            {(page - 1) * pageSize + 1}-
            {Math.min((page - 1) * pageSize + pageSize, query.total || 0)} of {query.total} total
            records
          </Text>
          <Divider orientation='vertical' />
          <Downloads
            query={gqlQueries.DOWNLOAD_EVENT_ACCESSIONS}
            predicates={predicates}
            fields={downloadFields}
            fetcher={downloadFetcher}
            total={query.total as number}
            fileName={`AVSB Accessions, ${taxon.classification.scientificName}`}
          />
        </Group>
      </Group>
      <AccessionTable events={events || []} />
      <Center pt='md'>
        <Pagination
          value={page}
          total={query ? Math.ceil((query.total as number) / pageSize) : 1}
          onChange={(newPage) => setPage(newPage)}
          getControlProps={(control) => ({
            'aria-label': `${control} pagination button`,
          })}
        />
      </Center>
    </>
  );
}

Object.assign(Component, { displayName: 'Accessions' });
