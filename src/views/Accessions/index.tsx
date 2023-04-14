/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Pagination, Text } from '@mantine/core';
import { Outlet, useLoaderData, useParams } from 'react-router-dom';

// Project components / helpers
import { gqlQueries, performGQLQuery } from '#/api';
import useMounted from '#/helpers/useMounted';
import queries from '#/api/queries';
import AccessionTable from './components/AccessionTable';

function Accessions() {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
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
          ],
        },
        size: 10,
        from: (page - 1) * 10,
      });
      console.log(data.eventSearch.documents);
      setQuery(data.eventSearch.documents);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (events?.length === 0) {
    return (
      <Center>
        <Text>No accession data found</Text>
      </Center>
    );
  }

  if (params.accession) return <Outlet />;

  return (
    <>
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
