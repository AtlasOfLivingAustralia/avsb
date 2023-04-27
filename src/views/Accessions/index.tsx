/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Group, Pagination } from '@mantine/core';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';

// Project components / helpers
import { gqlQueries, performGQLQuery } from '#/api';
import useMounted from '#/helpers/useMounted';
import queries from '#/api/queries';
import { Downloads, Filters, Predicate } from '#/components';

// Accession components
import AccessionTable from './components/AccessionTable';

// Config
import filters from './filters';

function Accessions() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
  const [predicates, setPredicates] = useState<Predicate[]>([]);

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

  if (params.accession) return <Outlet />;

  return (
    <>
      <Group mb='lg' position='apart'>
        <Filters
          predicates={predicates}
          filters={filters}
          onPredicates={(preds) => {
            setPage(1);
            setPredicates(preds);
          }}
        />
        <Downloads />
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
