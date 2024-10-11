import {
  Anchor,
  Box,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconColorPicker,
  IconDownload,
  IconEye,
  IconFileFunction,
  IconPlant,
  IconSeeding,
  IconTestPipe,
} from '@tabler/icons';

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

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);

  return (
    <>
      <Container size='lg' p='lg'>
        <Space h={45} />
        <Grid gutter='xl'>
          <Grid.Col md={6} sm={12}>
            <Paper px='lg' radius='lg' withBorder>
              <StatCard id='accessions' icon={IconEye} name='Site views' />
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} sm={12}>
            <Paper px='lg' radius='lg' withBorder>
              <StatCard id='accessions' icon={IconDownload} name='Data downloads' />
            </Paper>
          </Grid.Col>
        </Grid>
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
            <Grid.Col span={12} mt='xl'>
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
          <Stack w={mdOrLarger ? 500 : '100%'} mb='xl'>
            <Title weight='bold' size={42}>
              <Text
                component='span'
                inherit
                variant='gradient'
                gradient={{ from: '#A6CE39', to: '#487759' }}
              >
                {stats.epbcSpecies
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })
                  .replace('.00', '')}
              </Text>{' '}
              EPBC Species
            </Title>
            <Text>
              The Australian Virtual Seedbank contains records of{' '}
              <b>
                {stats.epbcSpecies
                  .toLocaleString(undefined, { minimumFractionDigits: 2 })
                  .replace('.00', '')}
              </b>{' '}
              records listed under the The Environment Protection and Biodiversity Conservation
              (EPBC) Act.
            </Text>
            <Text>
              The act stablishes comprehensive measures for protecting and managing plants, animals,
              habitats, and locations that hold national and international significance.
            </Text>
            <Anchor href='https://www.dcceew.gov.au/environment/epbc' target='_blank'>
              Read more about the EPBC act here
            </Anchor>
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
