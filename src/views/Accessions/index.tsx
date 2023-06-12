/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Center, Divider, Group, Pagination, Select, Text, Tooltip } from '@mantine/core';
import { Outlet, useLoaderData, useParams, useRouteLoaderData } from 'react-router-dom';

// Project components / helpers
import { SDSResult, gqlQueries, performGQLQuery, Taxon, EventDocuments, Predicate } from '#/api';
import { Downloads, Filters } from '#/components';
import { useMounted } from '#/helpers';

// Accession components
import AccessionTable from './components/AccessionTable';

// Config
import filters from './filters';
import downloadFields from './downloadFields';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  // State hooks
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = useState<EventDocuments>(useLoaderData() as EventDocuments);
  const [filterPredicates, setFilterPredicates] = useState<Predicate[]>([]);

  const { taxon } = useRouteLoaderData('taxon') as { taxon: Taxon; sds: SDSResult | null };
  const params = useParams();
  const mounted = useMounted();
  const events = query?.results as any[];

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
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSIONS, {
        predicate: {
          type: 'and',
          predicates,
        },
        size: pageSize,
        from: (page - 1) * pageSize,
      });
      setQuery(data.eventSearch.documents);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, filterPredicates]);

  if (params.accession) return <Outlet />;

  const downloadFetcher = (data: any) => data.eventSearch.documents.results;

  // // SDS Check
  // if (
  //   query.total === 0 &&
  //   (sds?.instances.length || 0) > 0 &&
  //   isSpeciesInList(taxon.classification.scientificName)
  // ) {
  //   return <SDS instances={sds?.instances || []} />;
  // }

  return (
    <>
      <Group mb='lg' position='apart'>
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
          <Text color='dimmed' align='right' size='sm'>
            {(page - 1) * pageSize + 1}-{Math.min((page - 1) * pageSize + pageSize, query.total)} of{' '}
            {query.total} total records
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
      <AccessionTable events={events} />
      <Center pt='md'>
        <Pagination
          value={page}
          total={query ? Math.ceil((query.total as number) / pageSize) : 1}
          onChange={(newPage) => setPage(newPage)}
        />
      </Center>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Component as any).displayName = 'Accessions';
