import {
  Alert,
  Anchor,
  Badge,
  Box,
  Button,
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
  IconArrowDown,
  IconBuilding,
  IconColorPicker,
  IconDownload,
  IconExternalLink,
  IconFileFunction,
  IconInfoCircle,
  IconPlant,
  IconSeeding,
  IconTestPipe,
} from '@tabler/icons-react';
import { get } from 'lodash';
import { Fragment, useMemo } from 'react';
import { useLoaderData } from 'react-router';
// Helpers
import type { EventSearchResult } from '#/api';
import queries from '#/api/queries';
// Static image assets
import ecologyEarth from '#/assets/ecology-earth.png';
import spottedPlant from '#/assets/spotted-blue-succulent-plant.png';
// Components
import { Blob } from '#/components';
import { StaticDownloads } from '#/components/Downloads/Static';
import LastUpdated from '#/components/LastUpdated';
import { Wave } from '#/components/Wave';
import { scrollTo } from '#/helpers/scrollTo';
import { formatNumber } from '#/helpers/stats';
import { breakpoints } from '#/theme/constants';
import DataExplorer from './components/DataExplorer';
import StatCard from './components/StatCard';

export interface StatisticsLoaderData {
  accessions: EventSearchResult;
  trials: EventSearchResult;
  treatments: EventSearchResult;
  epbc: EventSearchResult;
  nsw: EventSearchResult;
  nt: EventSearchResult;
  sa: EventSearchResult;
  vic: EventSearchResult;
  wa: EventSearchResult;
  tas: EventSearchResult;
  qld: EventSearchResult;
  act: EventSearchResult;
}

const states: { [key: string]: string } = {
  nsw: 'New South Wales',
  nt: 'Nothern Territory',
  sa: 'South Australia',
  vic: 'Victoria',
  wa: 'Western Australia',
  tas: 'Tasmania',
  qld: 'Queensland',
  act: 'Australian Capital Territory',
};

export function Component() {
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);
  const stats = useLoaderData() as StatisticsLoaderData;

  const conservation = useMemo(
    () =>
      Object.keys(states)
        .map((state) => ({
          name: states[state],
          value: get(stats, state).cardinality?.taxa,
        }))
        .sort(({ value: a }, { value: b }) => b - a),
    [stats],
  );

  return (
    <>
      <Container size='xl' p='lg' mt={-30}>
        <Space h={45} />
        <Center>
          <Stack ta='center' justify='center' gap={4}>
            <Text size='sm' c='dimmed'>
              The following statistics are current as at
            </Text>
            <Text ff='var(--mantine-font-family-headings)' c='dimmed' fz='h2' fw='bold'>
              <LastUpdated />
            </Text>
            <Paper p='xs' mt='lg' radius='xl'>
              <Stack>
                <Flex
                  direction={mdOrLarger ? 'row' : 'column'}
                  justify='center'
                  gap={mdOrLarger ? 'xs' : 4}
                >
                  <Button
                    onClick={() => scrollTo('records')}
                    variant='subtle'
                    leftSection={<IconArrowDown size='1rem' />}
                  >
                    Records
                  </Button>
                  <Divider orientation={mdOrLarger ? 'vertical' : 'horizontal'} />
                  <Button
                    onClick={() => scrollTo('threatened')}
                    variant='subtle'
                    leftSection={<IconArrowDown size='1rem' />}
                  >
                    Threatened species
                  </Button>
                  <Divider orientation={mdOrLarger ? 'vertical' : 'horizontal'} />
                  <Button
                    onClick={() => scrollTo('explore')}
                    component='a'
                    variant='subtle'
                    leftSection={<IconArrowDown size='1rem' />}
                  >
                    Data explorer
                  </Button>
                </Flex>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
      <Wave
        id='records'
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType={mdOrLarger ? 'body' : 'simple'}
      />
      <Box
        mt={mdOrLarger ? -130 : -25}
        mb={-15}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
        pb='xl'
      >
        <Container size='xl' p='lg' pb='xl'>
          <Grid gap='lg'>
            <Grid.Col span={12}>
              <Flex justify='space-between' gap='sm'>
                <Stack gap='md'>
                  <Title fw={600}>Portal Statistics</Title>
                  <Title fw={500} order={3} c='dimmed'>
                    Records
                  </Title>
                </Stack>
                <StaticDownloads
                  mt={6}
                  size='sm'
                  variant='light'
                  leftSection={<IconDownload />}
                  href='/all.zip'
                  download='AVSB All Records 2025'
                >
                  Download all AVSB records
                </StaticDownloads>
              </Flex>
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Accessions'
                value={formatNumber(stats.accessions.documents.total)}
                icon={IconSeeding}
              />
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Trials'
                value={formatNumber(stats.trials.documents.total)}
                icon={IconTestPipe}
              />
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Accessions'
                value={formatNumber(stats.treatments.documents.total)}
                icon={IconColorPicker}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Title fw={500} order={3} c='dimmed' pt='xl'>
                Datasets & Species
              </Title>
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Organisations'
                value={queries.DATA_RESOURCES.length}
                icon={IconBuilding}
              />
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Species with an accession'
                value={formatNumber(stats.accessions.cardinality?.taxa)}
                icon={IconPlant}
              />
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                name='Species with a trial'
                value={formatNumber(stats.trials.cardinality?.taxa)}
                icon={IconFileFunction}
              />
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      <Wave
        id='threatened'
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='xl' p='lg' mt={mdOrLarger ? -110 : -30} mb={mdOrLarger ? -25 : 0}>
        <Group align='flex-start' justify='space-between' gap='xs'>
          <Stack w={mdOrLarger ? 490 : '100%'} mb='xl' gap='xl'>
            <Stack gap='md'>
              <Title fw={600}>Threatened species in our collections</Title>
              <Title fw={500} c='dimmed' order={3}>
                Nationally listed species
              </Title>
              <Text size='sm' mt='md'>
                The Environment Protection and Biodiversity Conservation Act (EPBC Act) is
                Australia&apos;s national legislation for protecting threatened species and
                ecosystems. It recognises species at risk of extinction and prioritises their
                conservation. By storing seeds from nationally listed plants, seed banks provide an
                insurance policy against extinction, enabling restoration and recovery efforts in
                the wild.
              </Text>
              <Text size='sm'>
                The portal contains <b>{stats.epbc.cardinality?.taxa}</b> nationally listed species
                listed under the EPBC act.{' '}
              </Text>
              <Anchor href='https://www.dcceew.gov.au/environment/epbc' target='_blank' size='sm'>
                Read more about the EPBC Act here{' '}
                <IconExternalLink size='1rem' style={{ marginLeft: 4 }} />
              </Anchor>
              <Alert mt='sm' icon={<IconInfoCircle />}>
                While collections are held for these species, they could be small and may not be
                representative of the entire species.
              </Alert>
            </Stack>
          </Stack>
          {mdOrLarger && (
            <div style={{ width: 450, height: 450, transform: 'rotate(85deg)' }}>
              <Blob style={{ position: 'absolute' }} width={450} height={450} />
              <Center h='100%'>
                <Image
                  style={{ zIndex: 10, transform: 'rotate(-85deg)' }}
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
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType={mdOrLarger ? 'body' : 'simple'}
      />
      <Box
        mt={mdOrLarger ? -140 : -25}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
      >
        <Container size='xl' p='lg'>
          <Group align='flex-start' justify='space-between' mt='xl' gap='xs'>
            {mdOrLarger && (
              <div style={{ width: 450, height: 450 }}>
                <Blob style={{ position: 'absolute' }} width={450} height={450} inverse />
                <Center h='100%'>
                  <Image
                    style={{ zIndex: 10 }}
                    w={270}
                    h={283}
                    src={spottedPlant}
                    alt='Watering can with plant'
                  />
                </Center>
              </div>
            )}
            <Stack w={mdOrLarger ? 490 : '100%'} gap='xl'>
              <Stack gap='md' ta={mdOrLarger ? 'right' : 'left'}>
                <Title fw={500} c='dimmed' order={3}>
                  State and Territory listed species
                </Title>
                <Text size='sm'>
                  The Partnership also holds collections for species listed under Australian state
                  and territory legislation.
                </Text>
                <Text size='sm'>
                  Species are counted as threatened if they are listed in any Australian
                  jurisdiction regardless of where the seed was collected or which seed bank holds
                  the collection.
                </Text>
                <Paper mt='lg' withBorder>
                  <Stack gap={0}>
                    <Group justify='space-between' py='xs' px='xs'>
                      <Text c='dimmed' fw='bold' size='sm' ta='left' maw={200}>
                        Applicable environmental legislation
                      </Text>
                      <Text c='dimmed' fw='bold' size='sm' ta='right' maw={200}>
                        Species held in ASBP collections
                      </Text>
                    </Group>
                    <Divider />
                    <ScrollArea h={200}>
                      <Stack gap='xs' py='xs'>
                        {conservation.map(({ name, value }, index) => (
                          <Fragment key={name}>
                            <Flex justify='space-between' px='sm'>
                              <Text size='sm'>{name}</Text>
                              <Badge variant='light' ml='sm' miw={50}>
                                {formatNumber(value)} species
                              </Badge>
                            </Flex>
                            {index !== conservation.length - 1 && <Divider />}
                          </Fragment>
                        ))}
                      </Stack>
                    </ScrollArea>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Group>
        </Container>
      </Box>
      <Wave
        id='explore'
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='xl' p='lg' mt={mdOrLarger ? -80 : -30} mb='xl'>
        <Stack gap='md'>
          <Flex justify='space-between' gap='sm'>
            <Title fw={600}>Data explorer</Title>
            <StaticDownloads
              mt={6}
              size='sm'
              variant='light'
              leftSection={<IconDownload />}
              href='/threatened.zip'
              download='AVSB Threatened Records 2025'
            >
              Download all protected species data
            </StaticDownloads>
          </Flex>
          <Title fw={500} c='dimmed' order={3}>
            Explore accessions for protected species
          </Title>
          <Stack gap='xs' mb='md'>
            <Text x- size='sm'>
              Use the table below to filter and download threatened species records from Australian
              Seed Bank Partnership vaults.
            </Text>
            <Text size='sm'>
              Click the buttons to apply national (EPBC Act) or jurisdictional threatened species
              legislation to filter records for species listed in any Australian state, territory or
              nationally.
            </Text>
          </Stack>
          <DataExplorer />
        </Stack>
      </Container>
    </>
  );
}

Object.assign(Component, { displayName: 'Statistics' });
