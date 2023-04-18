/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Pagination } from '@mantine/core';
import { useLoaderData, useParams } from 'react-router-dom';

// Project components / helpers
import { Filters, Predicate } from '#/components';
import { gqlQueries, performGQLQuery } from '#/api';
import queries from '#/api/queries';
import useMounted from '#/helpers/useMounted';
import TrialsTable from './components/TrialsTable';
import filters from './filters';

function Trials() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
  const [predicates, setPredicates] = useState<Predicate[]>([]);

  const params = useParams();
  const mounted = useMounted();
  const events = query?.results as any[];

  useEffect(() => {
    async function runQuery() {
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_TRIALS, {
        predicate: {
          type: 'and',
          predicates: [
            queries.PRED_DATA_RESOURCE,
            {
              type: 'equals',
              key: 'eventType',
              value: 'Trial',
            },
            {
              type: 'equals',
              key: 'taxonKey',
              value: params.guid,
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

  return (
    <>
      <Filters
        predicates={predicates}
        filters={filters}
        onPredicates={(preds) => {
          setPage(1);
          setPredicates(preds);
        }}
      />
      <TrialsTable events={events} />
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

export default Trials;
