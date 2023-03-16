import { useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Text, Card, Grid, Modal, Button, Paper, useMantineTheme } from '@mantine/core';

// Project imports
import { Event, EventSearchResult } from '#/api/graphql/types';
import { EventMap, IconText } from '#/components';
import { useDisclosure } from '@mantine/hooks';

interface EventSearchResponse {
  eventSearch: EventSearchResult;
}

function Summary() {
  const [mapOpen, { open, close }] = useDisclosure(false);
  const { eventSearch } = useLoaderData() as EventSearchResponse;
  const [records] = useState<Event[]>(eventSearch.documents.results);
  const taxon = useRouteLoaderData('taxon');
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        transitionProps={{ transition: 'fade' }}
        size='100%'
        opened={mapOpen}
        onClose={close}
        centered
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[8],
        }}
      >
        <EventMap
          width='100%'
          height={650}
          token={eventSearch._tileServerToken}
          itemListHeight={180}
        />
      </Modal>
      <Grid>
        <Grid.Col sm={7}>
          <Card withBorder h='100%'>
            <Text size='xl' weight='bold'>
              Taxonomy
            </Text>
            <IconText title='Kingdom'>Kingdom</IconText>
          </Card>
        </Grid.Col>
        <Grid.Col sm={5}>
          <Paper h={400} withBorder>
            <EventMap
              onFullscreen={open}
              width='100%'
              height={400}
              token={eventSearch._tileServerToken}
              itemListHeight={180}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Summary;
