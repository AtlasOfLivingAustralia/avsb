import { EventSearchResult } from '#/api/graphql/types';
import { EventMap } from '#/components';
import { Container, Grid, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import SpeciesList from './components/SpeciesList';

function Seedbank() {
  const {
    _tileServerToken: token,
    documents,
    occurrenceFacet,
  } = useLoaderData() as EventSearchResult;
  const [event] = documents?.results || [];

  console.log(documents, occurrenceFacet);

  return (
    <Container size='lg' pt='xl'>
      <Grid>
        <Grid.Col span={12}>
          <Title maw={600}>{event?.datasetTitle}</Title>
        </Grid.Col>
        <Grid.Col xl={8} lg={8} md={12} sm={12} xs={12}>
          <EventMap width='100%' height={450} token={token} />
        </Grid.Col>
        <Grid.Col xl={4} lg={4} md={12} sm={12} xs={12}>
          <SpeciesList species={occurrenceFacet?.species || []} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Seedbank;
