import { Box, Paper, Grid, Group, Text, ThemeIcon, Timeline, Divider } from '@mantine/core';
import {
  IconBox,
  IconBrandAsana,
  IconBuildingWarehouse,
  IconChartPie,
  IconCopy,
  IconDropletFilled,
  IconHandStop,
  IconLeaf,
  IconLicense,
  IconNotes,
  IconPackage,
  IconPercentage,
  IconPlant2,
  IconScale,
  IconSchool,
  IconSeeding,
  IconSquareDot,
  IconTemperature,
  IconUser,
  TablerIcon,
} from '@tabler/icons';

// Project imports
import { Event, SeedBankAccession } from '#/api/graphql/types';
import Contact from '../Contact';
import Map from '../Map';

interface AccessionDetail {
  key: keyof SeedBankAccession;
  name: string;
  unit?: string;
  icon: TablerIcon;
}

const accessionDetails: AccessionDetail[] = [
  {
    key: 'seedPerGram',
    name: 'Seed/gm',
    icon: IconSeeding,
  },
  {
    key: 'sampleSize',
    name: 'Sample Size',
    icon: IconBrandAsana,
  },
  {
    key: 'sampleWeight',
    name: 'Sample Weight',
    unit: ' gms',
    icon: IconScale,
  },
  {
    key: 'thousandSeedWeight',
    name: 'Thousand Seed Weight',
    icon: IconBox,
    unit: ' gms',
  },
  {
    key: 'relativeHumidity',
    name: 'Relative Humidity',
    icon: IconDropletFilled,
    unit: '%',
  },
  {
    key: 'purity',
    name: 'Purity',
    icon: IconPercentage,
    unit: '%',
  },
  {
    key: 'purityDebris',
    name: 'Purity / Debris',
    icon: IconChartPie,
    unit: '%',
  },
  {
    key: 'storageTemp',
    name: 'Storage Temperature',
    icon: IconTemperature,
    unit: '° C',
  },
];

const accessionLongDetails: AccessionDetail[] = [
  {
    key: 'primaryStorageSeedBank',
    name: 'Storage Seed Bank',
    icon: IconBuildingWarehouse,
  },
  {
    key: 'primaryCollector',
    name: 'Collector',
    icon: IconUser,
  },
  {
    key: 'preStorageTreatmentNotesHistory',
    name: 'Pre-Storage Treatment/History',
    icon: IconNotes,
  },
  {
    key: 'plantForm',
    name: 'Plant Form',
    icon: IconLeaf,
  },
  {
    key: 'formInStorage',
    name: 'Form in Storage',
    icon: IconSquareDot,
  },
  {
    key: 'degreeOfEstablishment',
    name: 'Cultivated',
    icon: IconPlant2,
  },
  {
    key: 'duplicatesReplicates',
    name: 'Duplicates / Replicates',
    icon: IconCopy,
  },
  {
    key: 'collectionPermitNumber',
    name: 'Permit Number',
    icon: IconLicense,
  },
  {
    key: 'publicationDOI',
    name: 'Publication DOI',
    icon: IconSchool,
  },
];

interface AccessionCardProps {
  event: Event;
}

function AccessionPanel({ event }: AccessionCardProps) {
  const accession = event.extensions?.seedbank as SeedBankAccession;
  return (
    <Grid gutter='xl'>
      <Grid.Col span={12}>
        <Grid gutter='xs'>
          {accessionDetails
            .filter(({ key }) => Boolean(accession[key]))
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
                      {accession[key]}
                      {unit && unit}
                    </Text>
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
        <Divider my='lg' />
        <Grid gutter='xs'>
          {accessionLongDetails
            .filter(({ key }) => Boolean(accession[key]))
            .map(({ key, name, icon: Icon }) => (
              <Grid.Col
                key={key}
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={3}
                // icon={
                //   <ThemeIcon variant='light' size={28} radius='xl'>
                //     <Icon size='1rem' />
                //   </ThemeIcon>
                // }
              >
                <Group>
                  <ThemeIcon variant='light' size={28} radius='xl'>
                    <Icon size='1rem' />
                  </ThemeIcon>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {name}
                    </Text>
                    <Text size='sm' weight='bold'>
                      {accession[key]}
                    </Text>
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
      </Grid.Col>
      <Grid.Col sm={8} md={8} lg={8}>
        <Map width='100%' height={250} center={[137.591797, -26.000092]} />
      </Grid.Col>
      <Grid.Col sm={4} md={4} lg={4}>
        <Paper p='md' h='100%' withBorder>
          <Timeline bulletSize={28}>
            <Timeline.Item bullet={<IconHandStop size={18} />}>
              <Text>Seed Collected</Text>
              <Text color='dimmed' size='xs'>
                {accession.dateCollected || 'Unknown'}
              </Text>
            </Timeline.Item>
            <Timeline.Item bullet={<IconPackage size={18} />}>
              <Text>Seed In Storage</Text>
              <Text color='dimmed' size='xs'>
                {accession.dateInStorage || 'Unknown'}
              </Text>
            </Timeline.Item>
          </Timeline>
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
