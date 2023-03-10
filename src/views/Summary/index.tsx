import { useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';

// Project imports
import { Event, EventSearchResult } from '#/api/graphql/types';
import { EventMap } from '#/components';

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
      <Grid.Col sm={8}>Test</Grid.Col>
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
