import { Center, Divider, Flex, Group, Loader, Modal, Pagination, Select, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';

// Project components / helpers
import {
  EventDocuments,
  EventSearchResult,
  gqlQueries,
  performGQLQuery,
  Predicate,
} from '#/api';
import { Downloads, Filters } from '#/components';
import { useMounted } from '#/helpers';

// Accession components
import AccessionTable from '#/views/Accessions/components/AccessionTable';
import downloadFields from '#/views/Accessions/downloadFields';

// Config
import filters from '#/views/Accessions/filters';
import { IconMap } from '@tabler/icons-react';

interface SelectionRecordsProps {
  predicates: Predicate[];
  opened: boolean;
  onClose: () => void;
}

const HEADER_HEIGHT = 66;
const HEIGHT = `calc(100vh - (var(--modal-y-offset) * 2) - ${HEADER_HEIGHT}px - (var(--mantine-spacing-md))`;

export function SelectionRecords({ opened, onClose, predicates: rawPredicates }: SelectionRecordsProps) {
  // State hooks
  const [filterPredicates, setFilterPredicates] = useState<Predicate[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [query, setQuery] = useState<EventDocuments | null>(null);

  const mounted = useMounted();
  const events = query?.results;

  // Construct the base predicates array
  const predicates: Predicate[] = [
    ...rawPredicates,
    ...filterPredicates,
    {
      type: 'equals',
      key: 'eventType',
      value: 'Accession'
    },
    {
      type: 'isNotNull',
      key: 'taxonKey'
    }
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

    if (mounted && opened) {
      try {
        runQuery();
      } catch (error) {
        console.log(error)
      }
    }
  }, [opened, page, pageSize, filterPredicates]);

  const downloadFetcher = (data: { eventSearch: EventSearchResult }) =>
    data?.eventSearch?.documents?.results || [];

  return (
    <Modal
      size="100%"
      opened={opened}
      onClose={() => {
        setTimeout(() => {
          setQuery(null);
          setPage(1);
          setPageSize(10);
          setFilterPredicates([]);
        }, 100);
        onClose();
      }}
      title={<Group gap='sm'>
        <ThemeIcon variant='light' size='lg' radius='lg'>
          <IconMap size='1rem' />
        </ThemeIcon>
        <Text
          style={{
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 'bold',
          }}
        >
          Map Accession Records
        </Text>
      </Group>
      }>
      {query ? (
        <Flex direction='column' pt='md' justify='space-between' h={HEIGHT}>
          <Group justify='space-between' mb='lg'>
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
                fileName={`AVSB Map Accessions`}
              />
            </Group>
          </Group>
          <AccessionTable scrollOffset={320} events={events || []} />
          <Center mb='sm' mt='lg'>
            <Pagination
              value={page}
              total={query ? Math.ceil((query.total as number) / pageSize) : 1}
              onChange={(newPage) => setPage(newPage)}
              getControlProps={(control) => ({
                'aria-label': `${control} pagination button`,
              })}
            />
          </Center>
        </Flex>
      ) : (
        <Center h={HEIGHT}>
          <Loader />
        </Center>
      )}
    </Modal>
  );
}
