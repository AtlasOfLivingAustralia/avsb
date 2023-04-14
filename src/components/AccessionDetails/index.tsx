import { Box, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

// Project imports
import { Event, SeedBankAccession } from '#/api/graphql/types';
import { getIsPresent } from '#/helpers';
import fields from './fields';

interface AccessionDetailsProps {
  event: Event;
}

const missingData = 'Not Supplied';

function AccessionDetails({ event: eventProp }: AccessionDetailsProps) {
  const data = useLoaderData();
  const event = (eventProp || data) as Event;
  const accession = event?.extensions?.seedbank as SeedBankAccession;

  return (
    <Grid gutter='xs'>
      {fields.map(({ key, name, unit, icon: Icon }) => (
        <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
          <Group>
            <ThemeIcon variant='light' size={28} radius='xl'>
              <Icon size='1rem' />
            </ThemeIcon>
            <Box>
              <Text color='dimmed' size='xs'>
                {name}
              </Text>
              {getIsPresent(accession?.[key]) ? (
                <Text size='sm' weight='bold'>
                  {accession?.[key]}
                  {unit && unit}
                </Text>
              ) : (
                <Text size='sm' weight='bold' color='dimmed'>
                  {missingData}
                </Text>
              )}
            </Box>
          </Group>
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default AccessionDetails;
