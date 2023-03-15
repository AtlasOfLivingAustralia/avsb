import { Box, Paper, Grid, Group, Text, ThemeIcon, Timeline, Divider, Stack } from '@mantine/core';
import { IconHandStop, IconLocation, IconMap2, IconMapPin, IconPackage } from '@tabler/icons';

// Project imports
import { Event, SeedBankTrial } from '#/api/graphql/types';
import Contact from '../Contact';
import Map from '../Map';
import HerbariumLink from '../HerbariumLink';
import IconText from '../IconText';

import { fields, longFields } from './details';

interface TrialPanelProps {
  event: Event;
  taxon: string;
}

function TrialPanel({ event, taxon }: TrialPanelProps) {
  const trial = event.extensions?.seedbank as SeedBankTrial;

  return (
    <Grid gutter='xl'>
      <Grid.Col span={12}>
        <Grid gutter='xs'>
          {fields
            .filter(({ key }) => Boolean(trial[key]))
            .map(({ key, name, unit, icon: Icon }) => (
              <Grid.Col key={key} xs={6} sm={4} md={3} lg={3} xl={2}>
                <Group>
                  <ThemeIcon variant='light' size='xl' radius='xl'>
                    <Icon />
                  </ThemeIcon>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {name}
                    </Text>
                    <Text size='xl' weight='bold'>
                      {trial[key]}
                      {unit && unit}
                    </Text>
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
        <Divider my='lg' />
        <Grid gutter='xs'>
          {longFields
            .filter(({ key }) => Boolean(trial[key]))
            .map(({ key, name, icon: Icon }) => (
              <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
                <Group>
                  <ThemeIcon variant='light' size={28} radius='xl'>
                    <Icon size='1rem' />
                  </ThemeIcon>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {name}
                    </Text>
                    <Text size='sm' weight='bold'>
                      {trial[key]}
                    </Text>
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
      </Grid.Col>
      <Grid.Col sm={8} md={8} lg={8}>
        <Paper withBorder>
          {event.decimalLatitude && event.decimalLongitude && (
            <Map
              width='100%'
              height={250}
              center={[event.decimalLatitude, event.decimalLongitude]}
            />
          )}
          <Stack spacing='xs' p='md'>
            {event.locality && (
              <IconText labelWidth={120} title='Locality' icon={IconLocation}>
                {event.locality}
              </IconText>
            )}
            {event.decimalLatitude && (
              <IconText labelWidth={120} title='Decimal Lat' icon={IconMapPin}>
                {event.decimalLatitude}
              </IconText>
            )}
            {event.decimalLongitude && (
              <IconText labelWidth={120} title='Decimal Lng' icon={IconMapPin}>
                {event.decimalLongitude}
              </IconText>
            )}
            {event.stateProvince && (
              <IconText labelWidth={120} title='State Province' icon={IconMap2}>
                {event.stateProvince}
              </IconText>
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col sm={4} md={4} lg={4}>
        <Paper p='md' h='100%' withBorder>
          <Stack justify='space-between' h='100%'>
            <Timeline bulletSize={28}>
              <Timeline.Item bullet={<IconHandStop size={18} />}>
                <Text>Seed Collected</Text>
                <Text color='dimmed' size='xs'>
                  {trial.dateCollected || 'Unknown'}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPackage size={18} />}>
                <Text>Seed In Storage</Text>
                <Text color='dimmed' size='xs'>
                  {trial.dateInStorage || 'Unknown'}
                </Text>
              </Timeline.Item>
            </Timeline>
            {trial?.accessionNumber && (
              <HerbariumLink accession={trial.accessionNumber} taxon={taxon} />
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      {event.datasetKey && (
        <Grid.Col span={12}>
          <Contact dataResource={event.datasetKey} />
        </Grid.Col>
      )}
    </Grid>
  );
}

export default TrialPanel;
