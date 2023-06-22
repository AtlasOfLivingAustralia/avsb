/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Text,
  Group,
  ThemeIcon,
  GroupProps,
  ActionIcon,
  Tooltip,
  Popover,
  Button,
} from '@mantine/core';
import { IconDownload, IconFileDownload } from '@tabler/icons';
import { Event, EventSearchResult, Predicate } from '#/api/graphql/types';
import { saveAs } from 'file-saver';
import get from 'lodash/get';

// Config
import { performGQLQuery } from '#/api';

export type DownloadField = { label: string; key: string; formatter?: (field: any) => any };

interface DownloadsProps extends GroupProps {
  query: string;
  total: number;
  fields: DownloadField[];
  predicates: Predicate[];
  fileName: string;
  fetcher: (data: any) => object[] | Promise<object[]>;
}

// Helper function to convert an event object to CSV string
// given an array of fields
const eventToCSV = (event: Event, fields: DownloadField[]) =>
  fields
    .map(({ key, formatter }) => {
      let value = get(event, key, '');
      if (typeof formatter === 'function') value = formatter(value);
      return value === null || value === undefined ? '' : value;
    })
    .map((value) => (value.toString().includes(',') ? `"${value}"` : value))
    .join(',');

const eventsToCSV = (events: Event[], fields: DownloadField[]) => {
  const header = fields.map(({ label }) => label).join(',');
  return [header, ...events.map((event) => eventToCSV(event, fields))].join('\n');
};

function Downloads({ query, total, predicates, fields, fileName, fetcher }: DownloadsProps) {
  // Download state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const downloadRecords = async () => {
    if (!isDownloading) {
      try {
        setIsDownloading(true);
        const { data: response } = await performGQLQuery<{
          data: { eventSearch: EventSearchResult };
        }>(query, {
          predicate: {
            type: 'and',
            predicates,
          },
        });

        // Save the object array as a CSV file
        saveAs(
          new Blob([eventsToCSV(await fetcher(response), fields)], {
            type: 'text/csv;charset=utf-8',
          }),
          `${fileName}, ${new Date().toLocaleDateString()}.csv`,
        );
      } catch (error) {
        console.log(error);
      }

      setIsDownloading(false);
    }
  };

  return (
    <Popover width={200} position='left' withArrow shadow='md'>
      <Popover.Target>
        <Tooltip
          transitionProps={{ transition: 'pop' }}
          offset={10}
          withArrow
          label='Download Records'
          position='left'
        >
          <ActionIcon size={36} variant='outline' color='blue'>
            <IconDownload size='1rem' />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Group spacing='sm'>
          <ThemeIcon variant='light' size='lg' radius='lg'>
            <IconFileDownload size='1rem' />
          </ThemeIcon>
          <Text
            sx={(theme) => ({
              fontFamily: theme.headings.fontFamily,
              fontWeight: 'bold',
            })}
          >
            {total} Records
          </Text>
        </Group>
        <Group mt='md'>
          <Button
            onClick={downloadRecords}
            size='xs'
            variant='filled'
            loading={isDownloading}
            fullWidth
          >
            {isDownloading ? 'Downloading' : 'Download'}
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}

export default Downloads;
