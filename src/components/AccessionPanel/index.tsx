import { Box, Paper, Grid, Group, Text, ThemeIcon, Timeline, Stack } from '@mantine/core';
import { IconHandStop, IconLocation, IconMap2, IconMapPin, IconPackage } from '@tabler/icons';

// Project imports
import { Event, SeedBankAccession } from '#/api/graphql/types';
import Contact from '../Contact';
import HerbariumLink from './components/HerbariumLink';
import Map from '../Map';
import IconText from '../IconText';
import { fields, longFields } from './details';

interface AccessionPanelProps {
  event: Event;
  taxon: string;
}

const missingData = 'Not Supplied';

function AccessionPanel({ event, taxon }: AccessionPanelProps) {
  const accession = event.extensions?.seedbank as SeedBankAccession;

  return (
    <Grid gutter='xl'>
      <Grid.Col span={12}>
        <Grid gutter='xs'>
          {fields
            // .filter(({ key }) => Boolean(accession[key]))
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
                    {accession[key] !== undefined ? (
                      <Text size='xl' weight='bold'>
                        {accession[key]}
                        {unit && unit}
                      </Text>
                    ) : (
                      <Text size='xl' weight='bold' color='dimmed'>
                        {missingData}
                      </Text>
                    )}
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
        <Grid gutter='xs' p='sm' mt='md'>
          {longFields
            // .filter(({ key }) => Boolean(accession[key]))
            .map(({ key, name }) => (
              <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
                <Group>
                  {/* <ThemeIcon variant='light' size={28} radius='xl'>
                    <Icon size='1rem' />
                  </ThemeIcon> */}
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {name}
                    </Text>
                    {accession[key] !== undefined ? (
                      <Text size='sm' weight='bold'>
                        {accession[key]}
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
      </Grid.Col>
      <Grid.Col sm={8} md={8} lg={8}>
        <Paper withBorder>
          {event.decimalLatitude && event.decimalLongitude && (
            <Map
              width='100%'
              height={350}
              center={[event.decimalLatitude, event.decimalLongitude]}
            />
          )}
          <Stack spacing='xs' p='md'>
            <IconText labelWidth={120} title='Locality' icon={IconLocation}>
              {event.locality || missingData}
            </IconText>
            <IconText labelWidth={120} title='Decimal Lat' icon={IconMapPin}>
              {event.decimalLatitude || missingData}
            </IconText>
            <IconText labelWidth={120} title='Decimal Lng' icon={IconMapPin}>
              {event.decimalLongitude || missingData}
            </IconText>
            <IconText labelWidth={120} title='State Province' icon={IconMap2}>
              {event.stateProvince || missingData}
            </IconText>
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
                  {accession.dateCollected || missingData}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPackage size={18} />}>
                <Text>Seed In Storage</Text>
                <Text color='dimmed' size='xs'>
                  {accession.dateInStorage || missingData}
                </Text>
              </Timeline.Item>
            </Timeline>
            {accession?.accessionNumber && (
              <HerbariumLink accession={accession.accessionNumber} taxon={taxon} />
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

export default AccessionPanel;
