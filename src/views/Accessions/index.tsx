import { EventMap } from '#/components';
import { Grid } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

function Accessions() {
  const token = useLoaderData() as string;
  return (
    <Grid>
      <Grid.Col sm={8}>Test</Grid.Col>
      <Grid.Col sm={4}>
        <EventMap width='100%' height={300} token={token} itemListHeight={180} />
      </Grid.Col>
    </Grid>
  );
}

export default Accessions;
