import queries from '#/api/queries';
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
  IconExternalLink,
  IconFileFunction,
  IconInfoCircle,
  IconPlant,
  IconSeeding,
  IconTestPipe,
} from '@tabler/icons-react';
import { Fragment } from 'react';

import { Blob } from '#/components';
import { Wave } from '#/components/Wave';
import { breakpoints } from '#/theme/constants';
import { stats } from '#/helpers/stats';

import ecologyEarth from '../../assets/ecology-earth.png';
import seedSprouting from '../../assets/seed-sprouting.png';
import StatCard from './components/StatCard';
import DataExplorer from './components/DataExplorer';

const STATE_SENSITIVE = Object.entries(stats.stateSensitive);

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
    name: 'Species with an accession',
    icon: IconPlant,
  },
  {
    id: 'speciesWithTrial',
    name: 'Species with a trial',
    icon: IconFileFunction,
  },
];

export function Component() {
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);

  return (
    <>
      <Container size='lg' p='lg' mt={-30}>
        <Space h={45} />
        <Center>
          <Stack ta='center' justify='center' gap={4}>
            <Text size='sm' c='dimmed'>
              The following statistics are current as at
            </Text>
            <Text ff='var(--mantine-font-family-headings)' c='dimmed' fz="h2" fw='bold'>
              November, 2025
            </Text>
            <Paper p='xs' mt='lg' radius='xl'>
              <Stack>
                <Flex direction={mdOrLarger ? 'row' : 'column'} justify='center' gap='xs'>
                  <Button href="#records" component='a' variant='light' leftSection={<IconArrowDown size="1rem" />}>Records</Button>
                  <Button href="#threatened" component='a' variant='light' leftSection={<IconArrowDown size="1rem" />}>Threatened species</Button>
                  <Button href="#explore" component='a' variant='light' leftSection={<IconArrowDown size="1rem" />}>Data explorer</Button>
                </Flex>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
      <Wave
        id="records"
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
        pb='xl'
      >
        <Container size='lg' p='lg' pb='xl'>
          <Grid gutter='lg'>
            <Grid.Col span={12}>
              <Title order={2} c='dimmed'>Records</Title>
            </Grid.Col>
            {recordStats.map((stat) => (
              <Grid.Col key={stat.id} span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
                <StatCard {...stat} />
              </Grid.Col>
            ))}
            <Grid.Col span={12}>
              <Title order={2} c='dimmed' pt='xl'>Datasets & Species</Title>
            </Grid.Col>
            <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
              <StatCard
                id={queries.DATA_RESOURCES.length}
                name='Organisations'
                icon={IconBuilding}
              />
            </Grid.Col>
            {speciesStats.map((stat) => (
              <Grid.Col key={stat.id} span={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>
                <StatCard {...stat} />
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
      <Wave
        id="threatened"
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='lg' p='lg' mt={mdOrLarger ? -80 : -30} mb='md'>
        <Group align='flex-start' justify='space-between' gap="xs">
          <Stack w={mdOrLarger ? 490 : '100%'} mb='xl' gap='xl'>
            <Stack gap='md'>
              <Title fw='bold'>
                Threatened species in our collections
              </Title>
              <Title c='dimmed' order={3}>Nationally listed species</Title>
              <Text size='sm' mt='md'>
                The Environment Protection and Biodiversity Conservation Act (EPBC Act) is
                Australia&apos;s national legislation for protecting threatened species and
                ecosystems. It recognises species at risk of extinction and prioritises their
                conservation. By storing seeds from nationally listed plants, seed banks provide an
                insurance policy against extinction, enabling restoration and recovery efforts in the
                wild.
              </Text>
              <Text size='sm'>The portal contains{' '}
                <b>{stats.epbcTotal}</b> nationally listed species listed under the EPBC act.{' '}
              </Text>
              <Anchor href='https://www.dcceew.gov.au/environment/epbc' target='_blank' size='sm'>
                Read more about the EPBC Act here{' '}
                <IconExternalLink size='1rem' style={{ marginLeft: 4 }} />
              </Anchor>
              <Alert mt='sm' icon={<IconInfoCircle />}>While collections are held for these species, they could be small and may not be representative of the entire species.</Alert>
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
        mt={mdOrLarger ? -125 : -25}
        mb={-5}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
      >
        <Container size='lg' p='lg'>
          <Group align='flex-start' justify='space-between' mt='xl' gap='xs'>
            {mdOrLarger && (
              <div style={{ width: 450, height: 450 }}>
                <Blob style={{ position: 'absolute' }} width={450} height={450} inverse />
                <Center h='100%'>
                  <Image
                    style={{ zIndex: 10 }}
                    w={300}
                    h={300}
                    src={seedSprouting}
                    alt='Watering can with plant'
                  />
                </Center>
              </div>
            )}
            <Stack w={mdOrLarger ? 490 : '100%'} mb='xl' gap='xl'>
              <Stack gap='md' ta={mdOrLarger ? 'right' : 'left'}>
                <Title c='dimmed' order={3}>State and Territory listed species</Title>
                <Text size='sm'>
                  The Partnership also holds collections of species listed under relevant state and territory legislation:
                </Text>
                <Paper withBorder>
                  <ScrollArea h={200}>
                    <Stack gap='xs' py='xs'>
                      {STATE_SENSITIVE.map(([list, count], index) => (
                        <Fragment key={list}>
                          <Flex justify='space-between' px='sm'>
                            <Text size='sm'>{list}</Text>
                            <Badge variant='light' ml='sm' miw={50}>
                              {count}
                            </Badge>
                          </Flex>
                          {index !== STATE_SENSITIVE.length - 1 && <Divider />}
                        </Fragment>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Paper>
              </Stack>
            </Stack>
          </Group>
        </Container>
      </Box>
      <Wave
        id="explore"
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='lg' p='lg' mt={mdOrLarger ? -80 : -30} mb='xl'>
        <Stack gap='md'>
          <Title fw='bold'>
            Data explorer
          </Title>
          <Title c='dimmed' order={3} mb='xl'>Explore accessions for protected species</Title>
          <DataExplorer />
        </Stack>
      </Container>
    </>
  );
}

Object.assign(Component, { displayName: 'Statistics' });
