import queries from '#/api/queries';
import {
  Alert,
  Anchor,
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBuilding,
  IconColorPicker,
  // IconDownload,
  IconExternalLink,
  // IconEye,
  IconFileFunction,
  IconInfoCircle,
  IconPlant,
  IconSeeding,
  IconTestPipe,
} from '@tabler/icons-react';
import { Fragment } from 'react';
import { useLoaderData } from 'react-router';

import { Blob } from '#/components';
import { Wave } from '#/components/Wave';
import { breakpoints } from '#/theme/constants';

import ecologyEarth from '../../assets/ecology-earth.png';
import stats from '../../assets/stats.json';
import StatCard from './components/StatCard';

const recordStats = [
  {
    id: 'accessions',
    name: 'Accessions',
    icon: IconSeeding,
  },
  {
    id: 'trials',
    name: 'Trials',
    icon: IconTestPipe,
  },
  {
    id: 'treatments',
    name: 'Treatments',
    icon: IconColorPicker,
  },
];

const speciesStats = [
  {
    id: 'speciesWithAccession',
    name: 'Species with Accession',
    icon: IconPlant,
  },
  {
    id: 'speciesWithTrial',
    name: 'Species with Trial',
    icon: IconFileFunction,
  },
];

interface Dataset {
  datasetTitle: string;
  datasetKey: string;
}

export function Component() {
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);

  const datasets = useLoaderData() as { [key: string]: Dataset };

  // EPBC Calculations
  const epbcDatasets = Object.entries(stats.epbcSpecies)
    .sort(([, a], [, b]) => b - a)
    .filter(([key]) => queries.DATA_RESOURCES.includes(key));

  return (
    <>
      <Container size='lg' p='lg' mt={-30}>
        <Space h={45} />
        <Center>
          <Text c='dimmed' size='lg' fw='bold'>
            The following statistics are current as at September, 2025
          </Text>
        </Center>
      </Container>
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType={mdOrLarger ? 'body' : 'simple'}
      />
      <Box
        mt={mdOrLarger ? -125 : -25}
        mb={-5}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
      >
        <Container size='lg' p='lg'>
          <Grid>
            <Grid.Col span={12}>
              <Title>Records</Title>
            </Grid.Col>
            {recordStats.map((stat, index) => (
              <>
                <Grid.Col key={stat.id} span={{ xl: 3, lg: 3, md: 3, sm: 12, xs: 12 }}>
                  <StatCard {...stat} />
                </Grid.Col>
                {index !== recordStats.length - 1 && (
                  <Grid.Col span={mdOrLarger ? 'content' : 12}>
                    {mdOrLarger ? (
                      <Divider orientation='vertical' h='100%' px='lg' />
                    ) : (
                      <Divider w='100%' />
                    )}
                  </Grid.Col>
                )}
              </>
            ))}
            <Grid.Col span={12}>
              <Divider variant='dashed' my='sm' />
            </Grid.Col>
            <Grid.Col span={12}>
              <Title>Datasets</Title>
            </Grid.Col>
            <Grid.Col span={{ xl: 3, lg: 3, md: 3, sm: 12, xs: 12 }}>
              <StatCard
                id={epbcDatasets.length.toString()}
                name='Organisations'
                icon={IconBuilding}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Divider variant='dashed' my='sm' />
            </Grid.Col>
            <Grid.Col span={12}>
              <Title>Species</Title>
            </Grid.Col>
            {speciesStats.map((stat, index) => (
              <>
                <Grid.Col key={stat.id} span={{ xl: 3, lg: 3, md: 4, sm: 12, xs: 12 }}>
                  <StatCard {...stat} />
                </Grid.Col>
                {index !== speciesStats.length - 1 && (
                  <Grid.Col span={mdOrLarger ? 'content' : 12}>
                    {mdOrLarger ? (
                      <Divider orientation='vertical' h='100%' px='lg' />
                    ) : (
                      <Divider w='100%' />
                    )}
                  </Grid.Col>
                )}
              </>
            ))}
          </Grid>
        </Container>
      </Box>
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='lg' p='lg' mt={mdOrLarger ? -80 : -30} mb='xl'>
        <Group align='flex-start' justify='space-between'>
          <Stack w={mdOrLarger ? 500 : '100%'} mb='xl' gap='xl'>
            <Stack gap='xs'>
              <Title fw='bold' size={42}>
                Threatened species in our collections
              </Title>
              <Title c='dimmed' order={2}>Nationally listed species</Title>
              <Text size='sm' mt='md'>
                The Environment Protection and Biodiversity Conservation Act (EPBC Act) is
                Australia&apos;s national legislation for protecting threatened species and
                ecosystems. It recognises species at risk of extinction and prioritises their
                conservation. By storing seeds from nationally listed plants, seed banks provide an
                insurance policy against extinction, enabling restoration and recovery efforts in the
                wild.
              </Text>
              <Text size='sm'>The portal contains{' '}
                <b>{stats.epbcSpecies.total}</b> nationally listed species listed under the EPBC act.{' '}
              </Text>
              <Anchor href='https://www.dcceew.gov.au/environment/epbc' target='_blank' size='sm'>
                Read more about the EPBC Act here{' '}
                <IconExternalLink size='1rem' style={{ marginLeft: 4 }} />
              </Anchor>
              <Alert mt='sm' icon={<IconInfoCircle />}>While collections are held for these species, they could be small and may not be representative of the entire species.</Alert>
            </Stack>
            <Stack>
              <Title c='dimmed' order={2}>State and Territory listed species</Title>
              <Text size='sm'>

              </Text>
              <Paper withBorder>
                <ScrollArea h={200}>
                  <Stack gap='xs' py='xs'>
                    {epbcDatasets.map(([key, count], index) => (
                      <Fragment key={key}>
                        <Flex justify='space-between' px='sm'>
                          <Text size='sm'>{datasets[key]?.datasetTitle || 'Unknown Dataset'}</Text>
                          <Badge variant='light' ml='sm' miw={50}>
                            {count}
                          </Badge>
                        </Flex>
                        {index !== epbcDatasets.length - 1 && <Divider />}
                      </Fragment>
                    ))}
                  </Stack>
                </ScrollArea>
              </Paper>
            </Stack>
          </Stack>
          {mdOrLarger && (
            <div style={{ width: 450, height: 450 }}>
              <Blob style={{ position: 'absolute' }} width={450} height={450} />
              <Center h='100%'>
                <Image
                  style={{ zIndex: 10 }}
                  w={200}
                  h={330}
                  src={ecologyEarth}
                  alt='Watering can with plant'
                />
              </Center>
            </div>
          )}
        </Group>
      </Container>
    </>
  );
}

Object.assign(Component, { displayName: 'Statistics' });
