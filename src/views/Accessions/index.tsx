/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Divider, Group, Pagination, Text } from '@mantine/core';
import { Outlet, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';

// Project components / helpers
import { gqlQueries, performGQLQuery } from '#/api';
import { Taxon } from '#/api/sources/taxon';
import { Predicate } from '#/api/graphql/types';
import { Downloads, Filters } from '#/components';
import queries from '#/api/queries';
import useMounted from '#/helpers/useMounted';

// Accession components
import AccessionTable from './components/AccessionTable';

// Config
import filters from './filters';
import downloadFields from './downloadFields';

function Accessions() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
  const [filterPredicates, setFilterPredicates] = useState<Predicate[]>([]);

  const taxon = useRouteLoaderData('taxon') as Taxon;
  const params = useParams();
  const mounted = useMounted();
  const events = query?.results as any[];

  // Construct the base predicates array
  const predicates: Predicate[] = [
    queries.PRED_DATA_RESOURCE,
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
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSIONS, {
        predicate: {
          type: 'and',
          predicates,
        },
        size: 10,
        from: (page - 1) * 10,
      });
      setQuery(data.eventSearch.documents);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterPredicates]);

  if (params.accession) return <Outlet />;

  const downloadFetcher = (data: any) => data.eventSearch.documents.results;

  return (
    <>
      <Group mb='lg' position='apart'>
        <Filters
          predicates={filterPredicates}
          filters={filters}
          onPredicates={(preds) => {
            setPage(1);
            setFilterPredicates(preds);
          }}
        />
        <Group>
          <Text color='dimmed' align='right' size='sm'>
            {query.total} total records
          </Text>
          <Divider orientation='vertical' />
          <Downloads
            query={gqlQueries.DOWNLOAD_EVENT_ACCESSIONS}
            predicates={predicates}
            fields={downloadFields}
            fetcher={downloadFetcher}
            total={query.total}
            fileName={`AVSB Accessions, ${taxon.classification.scientificName}`}
          />
        </Group>
      </Group>
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
