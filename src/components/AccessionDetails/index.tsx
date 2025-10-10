import { Box, Divider, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { IconMapPin } from '@tabler/icons';
import { useLoaderData } from 'react-router-dom';

// Project imports
import { Event, SeedBankAccession } from '#/api';
import { accessionFields, getIsDefined } from '#/helpers';
import FieldTooltip from '../FieldTooltip';
import IconText from '../IconText';
import fields from './fields';

interface AccessionDetailsProps {
  event: Event;
}

function AccessionDetails({ event: eventProp }: AccessionDetailsProps) {
  const data = useLoaderData();
  const event = (eventProp || data) as Event;
  const accession = event?.extensions?.seedbank as SeedBankAccession;

  return (
    <>
      <Grid gutter='xs'>
        {fields
          .map((key) => ({ key, ...accessionFields[key] }))
          .map(({ key, label, description, examples, unit, icon: Icon }) => (
            <Grid.Col key={key} span={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
              <FieldTooltip {...{ label, description, examples, Icon }}>
                <Group>
                  <ThemeIcon variant='light' size={28} radius='xl'>
                    <Icon size='1rem' />
                  </ThemeIcon>
                  <Box>
                    <Text c='dimmed' size='xs'>
                      {label}
                    </Text>
                    {getIsDefined(accession?.[key]) ? (
                      <Text size='sm' fw='bold'>
                        {accession?.[key]}
                        {unit && unit}
                      </Text>
                    ) : (
                      <Text size='sm' fw='bold' c='dimmed'>
                        Not Available
                      </Text>
                    )}
                  </Box>
                </Group>
              </FieldTooltip>
            </Grid.Col>
          ))}
      </Grid>
      {event.locality && (
        <>
          <Divider my='md' />
          <IconText labelWidth={150} icon={IconMapPin} title='Collection Locality'>
            {event.locality}
          </IconText>
        </>
      )}
    </>
  );
}

export default AccessionDetails;
