/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Group, Pagination } from '@mantine/core';
import { useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';

// Project components / helpers
import { Downloads, Filters } from '#/components';
import { Taxon } from '#/api/sources/taxon';
import { gqlQueries, performGQLQuery } from '#/api';
import { Event, Predicate } from '#/api/graphql/types';
import queries from '#/api/queries';
import { useMounted, mapTrialTreatments } from '#/helpers';
import TrialsTable from './components/TrialsTable';
import filters from './filters';
import downloadFields from './downloadFields';

function Trials() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<any>(useLoaderData());
  const [filterPredicates, setFilterPredicates] = useState<Predicate[]>([]);

  const taxon = useRouteLoaderData('taxon') as Taxon;
  const params = useParams();
  const mounted = useMounted();
  const events = query?.results as any[];

  const predicates: Predicate[] = [
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
    ...filterPredicates,
  ];

  useEffect(() => {
    async function runQuery() {
      // Perform the first query to retireve the trial data
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_TRIALS, {
        predicate: {
          type: 'and',
          predicates,
        },
        size: 10,
        from: (page - 1) * 10,
      });

      // Extract the event IDs from all of the return trials, then retrieve their associated
      // treatment events
      const eventIDs = (data.eventSearch.documents.results as Event[]).map(
        ({ eventID }) => eventID,
      );
      const { data: treatmentData } = await performGQLQuery(gqlQueries.QUERY_EVENT_TREATMENTS, {
        predicate: {
          type: 'and',
          predicates: [
            queries.PRED_DATA_RESOURCE,
            {
              type: 'equals',
              key: 'eventType',
              value: 'Treatment',
            },
            {
              type: 'in',
              key: 'eventHierarchy',
              values: eventIDs,
            },
          ],
        },
        size: 10,
      });

      setQuery({
        ...(data.eventSearch?.documents || {}),
        results: mapTrialTreatments(
          data.eventSearch?.documents.results || [],
          treatmentData.eventSearch?.documents.results || [],
        ),
      });
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterPredicates]);

  const downloadFetcher = async (data: any) => {
    const eventIDs = (data.eventSearch.documents.results as Event[]).map(({ eventID }) => eventID);
    const { data: treatmentData } = await performGQLQuery(gqlQueries.QUERY_EVENT_TREATMENTS, {
      predicate: {
        type: 'and',
        predicates: [
          queries.PRED_DATA_RESOURCE,
          {
            type: 'equals',
            key: 'eventType',
            value: 'Treatment',
          },
          {
            type: 'in',
            key: 'eventHierarchy',
            values: eventIDs,
          },
        ],
      },
      size: 10000,
    });
    return mapTrialTreatments(
      data.eventSearch?.documents.results || [],
      treatmentData.eventSearch?.documents.results || [],
    );
  };

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
        <Downloads
          query={gqlQueries.DOWNLOAD_EVENT_TRIALS}
          predicates={predicates}
          fields={downloadFields}
          fetcher={downloadFetcher}
          total={query.total}
          fileName={`AVSB Trials, ${taxon.classification.scientificName}`}
        />
      </Group>
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
