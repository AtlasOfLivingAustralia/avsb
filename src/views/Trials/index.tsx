import { Center, Divider, Group, Pagination, Select, Text, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useParams, useRouteLoaderData } from 'react-router-dom';
import { gqlQueries, performGQLQuery } from '#/api';
import { Event, EventDocuments, EventSearchResult, Predicate } from '#/api/graphql/types';
import queries from '#/api/queries';
import { Taxon } from '#/api/sources/taxon';
// Project components / helpers
import { Downloads, Filters } from '#/components';
import { useMounted, mapTrialTreatments } from '#/helpers';
import TrialsTable from './components/TrialsTable';
import downloadFields from './downloadFields';
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
      const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
        gqlQueries.QUERY_EVENT_TRIALS,
        {
          predicate: {
            type: 'and',
            predicates,
          },
          size: pageSize,
          from: (page - 1) * pageSize,
        },
      );

      // Extract the event IDs from all of the return trials, then retrieve their associated
      // treatment events
      const eventIDs = (data.eventSearch?.documents?.results as Event[]).map(
        ({ eventID }) => eventID,
      );
      const { data: treatmentData } = await performGQLQuery<{
        data: { eventSearch: EventSearchResult };
      }>(gqlQueries.QUERY_EVENT_TREATMENTS, {
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
          data.eventSearch?.documents?.results || [],
          treatmentData.eventSearch?.documents?.results || [],
        ) as [Event],
      });
    }

    if (mounted) runQuery();
  }, [page, pageSize, filterPredicates]);

  const downloadFetcher = async (data: { eventSearch: EventSearchResult }) => {
    const eventIDs = data.eventSearch.documents?.results?.map(({ eventID }) => eventID);
    const { data: treatmentData } = await performGQLQuery<{
      data: { eventSearch: EventSearchResult };
    }>(gqlQueries.QUERY_EVENT_TREATMENTS, {
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
      data.eventSearch.documents?.results || [],
      treatmentData.eventSearch?.documents?.results || [],
    );
  };

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
          <Text c='dimmed' ta='right' size='sm'>
            {(page - 1) * pageSize + 1}-
            {Math.min((page - 1) * pageSize + pageSize, query.total || 0)} of {query.total} total
            records
          </Text>
          <Divider orientation='vertical' />
          <Downloads
            query={gqlQueries.DOWNLOAD_EVENT_TRIALS}
            predicates={predicates}
            fields={downloadFields}
            fetcher={downloadFetcher}
            total={query.total as number}
            fileName={`AVSB Trials, ${taxon.classification.scientificName}`}
          />
        </Group>
      </Group>
      <TrialsTable events={events || []} />
      <Center pt='md'>
        <Pagination
          value={page}
          total={query ? Math.ceil((query.total as number) / pageSize) : 1}
          onChange={(newPage) => setPage(newPage)}
          getControlProps={(control) => ({ 'aria-label': `${control} pagination button` })}
        />
      </Center>
    </>
  );
}

Object.assign(Component, { displayName: 'Trials' });
