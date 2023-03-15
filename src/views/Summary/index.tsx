import { useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Text, Card, Grid } from '@mantine/core';

// Project imports
import { Event, EventSearchResult } from '#/api/graphql/types';
import { EventMap, IconText } from '#/components';

interface EventSearchResponse {
  eventSearch: EventSearchResult;
}

function Summary() {
  const { eventSearch } = useLoaderData() as EventSearchResponse;
  const taxon = useRouteLoaderData('taxon');
  const [records] = useState<Event[]>(eventSearch.documents.results);
  console.log(taxon, records);
  return (
    <Grid>
      <Grid.Col sm={8}>
        <Card withBorder h='100%'>
          <Text size='xl' weight='bold'>
            Taxonomy
          </Text>
          <IconText title='Kingdom'>Kingdom</IconText>
        </Card>
      </Grid.Col>
      <Grid.Col sm={4}>
        <EventMap
          width='100%'
          height={300}
          token={eventSearch._tileServerToken}
          itemListHeight={180}
        />
      </Grid.Col>
    </Grid>
  );
}

export default Summary;
