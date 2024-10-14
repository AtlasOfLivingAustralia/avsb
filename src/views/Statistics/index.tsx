import { Fragment } from 'react';
import {
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
  // Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBuilding,
  IconColorPicker,
  // IconDownload,
  IconExternalLink,
  // IconEye,
  IconFileFunction,
  IconPlant,
  IconSeeding,
  IconTestPipe,
} from '@tabler/icons';
import { useLoaderData } from 'react-router-dom';
import queries from '#/api/queries';

import { Wave } from '#/components/Wave';
import { Blob } from '#/components';

import StatCard from './components/StatCard';
import stats from '../../assets/stats.json';
import ecologyEarth from '../../assets/ecology-earth.png';

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

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);

  const datasets = useLoaderData() as { [key: string]: Dataset };

  // EPBC Calculations
  const epbcDatasets = Object.entries(stats.epbcSpecies)
    .sort(([, a], [, b]) => b - a)
    .filter(([key]) => queries.DATA_RESOURCES.includes(key));

  const epbcCount = Object.values(epbcDatasets)
    .reduce((prev, [, count]) => prev + count, 0)
    .toLocaleString(undefined, { minimumFractionDigits: 2 })
    .replace('.00', '');

  return (
    <>
      {/* <Container size='lg' p='lg'>
        <Space h={45} />
        <Grid gutter='xl'>
          <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Group spacing='xl'>
              <IconEye size='4rem' />
              <Stack spacing={0}>
                <Title>1, 234</Title>
                <Text c='dimmed' size='lg'>
                  Site views
                </Text>
              </Stack>
            </Group>
          </Grid.Col>
          <Grid.Col xl={6} lg={6} md={6} sm={12} xs={12}>
            <Group spacing='xl'>
              <IconDownload size='4rem' />
              <Stack spacing={0}>
                <Title>1, 234</Title>
                <Text c='dimmed' size='lg'>
                  Data downloads
                </Text>
              </Stack>
            </Group>
          </Grid.Col>
        </Grid>
      </Container> */}
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType={mdOrLarger ? 'body' : 'simple'}
      />
      <Box
        mt={mdOrLarger ? -125 : -25}
        mb={-5}
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='lg' p='lg'>
          <Grid>
            <Grid.Col span={12}>
              <Title>Records</Title>
            </Grid.Col>
            {recordStats.map((stat, index) => (
              <>
                <Grid.Col key={stat.id} xl={3} lg={3} md={3} sm={12} xs={12}>
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
            <Grid.Col xl={3} lg={3} md={3} sm={12} xs={12}>
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
                <Grid.Col key={stat.id} xl={3} lg={3} md={4} sm={12} xs={12}>
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
      <Container size='lg' p='lg' mt={mdOrLarger ? -120 : -30} mb='xl'>
        <Group position='apart'>
          <Stack w={mdOrLarger ? 500 : '100%'} mb='xl' spacing='xl'>
            <Title weight='bold' size={42}>
              <Text
                component='span'
                inherit
                variant='gradient'
                gradient={{ from: '#A6CE39', to: '#487759' }}
              >
                {epbcCount}
              </Text>{' '}
              EPBC Species
            </Title>
            <Text>
              The Environment Protection and Biodiversity Conservation (EPBC) establishes
              comprehensive measures for protecting and managing plants, animals, habitats, and
              locations that hold national and international significance. The portal contains{' '}
              <b>{epbcCount}</b> species listed under this act.
            </Text>
            <Anchor href='https://www.dcceew.gov.au/environment/epbc' target='_blank'>
              Read more about the EPBC act here{' '}
              <IconExternalLink size='1rem' style={{ marginLeft: 4 }} />
            </Anchor>
            <Paper withBorder>
              <ScrollArea h={200}>
                <Stack spacing='xs' py='xs'>
                  {epbcDatasets.map(([key, count], index) => (
                    <Fragment key={key}>
                      <Flex justify='space-between' align='center' key={key} px='sm'>
                        <Text>{datasets[key].datasetTitle}</Text>
                        <Badge ml='sm' miw={50}>
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
          {mdOrLarger && (
            <div style={{ width: 450, height: 450 }}>
              <Blob style={{ position: 'absolute' }} width={450} height={450} />
              <Center h='100%' style={{ zIndex: 10 }}>
                <Image width={200} height={330} src={ecologyEarth} alt='Watering can with plant' />
              </Center>
            </div>
          )}
        </Group>
      </Container>
    </>
  );
}

Object.assign(Component, { displayName: 'Statistics' });
