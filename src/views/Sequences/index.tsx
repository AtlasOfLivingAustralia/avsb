import { Suspense } from 'react';
import { Button, Grid, Group, Paper, Skeleton, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import range from 'lodash/range';

// Project components / helpers
import { Await, useLoaderData } from 'react-router-dom';

import SequenceItem from './components/SequenceItem';

export interface SequenceRecord {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

export interface SequenceResult {
  total: string;
  resultsUrl: string;
  results: SequenceRecord[];
}

interface SequencesLoaderData {
  sequences: Promise<SequenceResult>;
}

function Sequences() {
  const { sequences } = useLoaderData() as SequencesLoaderData;

  return (
    <Suspense
      fallback={
        <>
          <Paper p='sm' mb='lg' withBorder>
            <Skeleton>
              <Group position='apart'>
                <Text weight='bold' size='sm'>
                  Items: 1 to 20 of 1200
                </Text>
                <Button disabled size='xs'>
                  View all records
                </Button>
              </Group>
            </Skeleton>
          </Paper>
          <Grid>
            {range(0, 19).map((key) => (
              <Grid.Col key={key} xs={12} sm={12} md={6} lg={6} xl={6}>
                <SequenceItem h='100%' sequence={null} />
              </Grid.Col>
            ))}
          </Grid>
        </>
      }
    >
      <Await resolve={sequences}>
        {({ total, resultsUrl, results }) => (
          <>
            <Paper p='sm' mb='lg' withBorder>
              <Group position='apart'>
                <Text weight='bold' size='sm'>
                  {total}
                </Text>
                <Button
                  component='a'
                  href={resultsUrl}
                  target='_blank'
                  variant='subtle'
                  size='xs'
                  leftIcon={<IconExternalLink size={16} />}
                >
                  View all records
                </Button>
              </Group>
            </Paper>
            <Grid>
              {results.map((sequence: SequenceRecord) => (
                <Grid.Col key={sequence.link} xs={12} sm={12} md={6} lg={6} xl={6}>
                  <SequenceItem h='100%' sequence={sequence} />
                </Grid.Col>
              ))}
            </Grid>
          </>
        )}
      </Await>
    </Suspense>
  );
}

export default Sequences;