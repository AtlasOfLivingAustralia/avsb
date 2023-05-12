import { Box, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';

// Project imports
import { Event, SeedBankAccession } from '#/api/graphql/types';
import { getIsPresent } from '#/helpers';
import { accessionFields } from '#/helpers/fields';
import fields from './fields';
import FieldTooltip from '../FieldTooltip';

interface AccessionDetailsProps {
  event: Event;
}

function AccessionDetails({ event: eventProp }: AccessionDetailsProps) {
  const data = useLoaderData();
  const event = (eventProp || data) as Event;
  const accession = event?.extensions?.seedbank as SeedBankAccession;

  return (
    <Grid gutter='xs'>
      {fields
        .map((key) => ({ key, ...accessionFields[key] }))
        .map(({ key, label, description, examples, unit, icon: Icon }) => (
          <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
            <FieldTooltip {...{ label, description, examples, Icon }}>
              <Group>
                <ThemeIcon variant='light' size={28} radius='xl'>
                  <Icon size='1rem' />
                </ThemeIcon>
                <Box>
                  <Text color='dimmed' size='xs'>
                    {label}
                  </Text>
                  {getIsPresent(accession?.[key]) ? (
                    <Text size='sm' weight='bold'>
                      {accession?.[key]}
                      {unit && unit}
                    </Text>
                  ) : (
                    <Text size='sm' weight='bold' color='dimmed'>
                      Not Supplied
                    </Text>
                  )}
                </Box>
              </Group>
            </FieldTooltip>
          </Grid.Col>
        ))}
    </Grid>
  );
}

export default AccessionDetails;
