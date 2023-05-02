import { EventMap } from '#/components';
import { Container, Grid, Title } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

function Seedbank() {
  const token = useLoaderData() as string;

  return (
    <Container size='lg' pt='xl'>
      <Title>Seed Bank Name</Title>
      <Grid>
        <Grid.Col>
          <EventMap width='100%' height={450} token={token} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Seedbank;
