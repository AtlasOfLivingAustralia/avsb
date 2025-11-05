/** biome-ignore-all lint/suspicious/noExplicitAny: Lots of no-typing here */
import { Event, EventSearchResult, Predicate } from '#/api/graphql/types';
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Group,
  GroupProps,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { IconDownload, IconFileDownload } from '@tabler/icons-react';
import { saveAs } from 'file-saver';
import get from 'lodash/get';
import { useState } from 'react';

// Config
import { performGQLQuery } from '#/api';
import { useDisclosure } from '@mantine/hooks';

const DOWNLOAD_CATEGORIES = [
  "Biosecurity management/planning",
  "Citizen science",
  "Collection management",
  "Conservation management/planning",
  "Ecological research",
  "Education",
  "Environmental assessment",
  "Other",
  "Other scientific research",
  "Restoration/remediation",
  "Scientific research",
  "Species modelling",
  "Systematic research/taxonomy"
];

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
  const [downloadReason, setDownloadReason] = useState<string | null>(null);
  const [downloadOrg, setDownloadOrg] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const downloadRecords = async () => {
    if (!isDownloading) {
      try {
        setIsDownloading(true);

        // Push download reason to fathom
        if (window.fathom) {
          window.fathom.trackEvent(`Dataset download - ${downloadReason}`)
        }

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
      close();
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={<Group gap='sm'>
        <ThemeIcon variant='light' size='lg' radius='lg'>
          <IconFileDownload size='1rem' />
        </ThemeIcon>
        <Text
          style={{
            fontFamily: 'var(--mantine-font-family-headings)',
            fontWeight: 'bold',
          }}
        >
          {total} Record{total > 1 ? 's' : ''}
        </Text>
      </Group>}>
        <Stack>
          <TextInput placeholder="Organisation name" value={downloadOrg} onChange={(ev) => setDownloadOrg(ev.currentTarget.value)} />
          <Select value={downloadReason} onChange={setDownloadReason} placeholder="Select download reason" data={DOWNLOAD_CATEGORIES} />
          <Divider opacity={0.5} my="xs" variant="dashed" />
          <Checkbox c="dimmed" size="xs" label="Remember for next time" />
          <Button
            disabled={!downloadReason || downloadOrg.length < 1}
            onClick={downloadRecords}
            size='xs'
            variant='filled'
            loading={isDownloading}
            fullWidth
          >
            {isDownloading ? 'Downloading' : 'Download'}
          </Button>
        </Stack>
      </Modal>
      <Tooltip
        transitionProps={{ transition: 'pop' }}
        offset={10}
        withArrow
        label='Download Records'
        position='left'
      >
        <ActionIcon size={36} variant='outline' color='blue' aria-label='Download records' onClick={open}>
          <IconDownload size='1rem' />
        </ActionIcon>
      </Tooltip>
    </>
  );
}

export default Downloads;
