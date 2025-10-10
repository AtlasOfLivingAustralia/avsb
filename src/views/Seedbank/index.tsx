import {
  Alert,
  Anchor,
  Box,
  Center,
  Chip,
  Container,
  Divider,
  em,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Space,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import {
  IconChevronDown,
  IconChevronUp,
  IconClock,
  IconDatabaseImport,
  IconExternalLink,
  IconInfoCircle,
  IconLicense,
  IconMap,
} from '@tabler/icons';
import { lazy, Suspense, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

// Project imports
import { DataResource, EventSearchResult } from '#/api';
import { Contact } from '#/components';
import { Wave } from '#/components/Wave';

// Component imports
import SpeciesList from './components/SpeciesList';

const EventMap = lazy(() => import('#/components/EventMap'));

interface SeedbankRouteData {
  gql: {
    eventSearch: EventSearchResult;
    accessions: EventSearchResult;
    trials: EventSearchResult;
  };
  collectory: DataResource;
}

export function Component() {
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);
  const { gql, collectory } = useLoaderData() as SeedbankRouteData;
  const { eventSearch, accessions, trials } = gql;
  const { _tileServerToken: token, documents, stats, occurrenceFacet } = eventSearch;

  const [event] = documents?.results || [];
  const params = useParams();

  const smOrLarger = useMediaQuery(`(min-width: ${em(576)})`, true);

  return (
    <>
      <Box
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
      >
        <Container size='xl' pt='xl'>
          <Group
            mt='xl'
            pt='md'
            align='flex-start'
            justify={smOrLarger ? 'flex-start' : 'center'}
            gap='xl'
          >
            <Skeleton circle width={120} height={120} visible={!logoLoaded} mr='xl'>
              <Image
                src={collectory.logoRef?.uri}
                alt='Seedbank logo'
                w={120}
                h={120}
                fit='cover'
                radius={60}
                mb={smOrLarger ? 0 : 'lg'}
                onLoad={() => setLogoLoaded(true)}
              />
            </Skeleton>
            <Box>
              <Title maw={550}>{event?.datasetTitle}</Title>
              {collectory.institution?.name && (
                <Title order={2} size={22} c='dimmed' maw={550} mb='md'>
                  {collectory.institution?.name}
                </Title>
              )}
              {collectory.websiteUrl && (
                <Anchor
                  size='sm'
                  maw={550}
                  lineClamp={2}
                  href={collectory.websiteUrl}
                  target='_blank'
                >
                  <IconExternalLink size='1rem' style={{ marginRight: 8 }} />
                  {collectory.websiteUrl}
                </Anchor>
              )}
              <Group mt='xl' pt='md'>
                <Chip checked={false}>
                  <b>{accessions.documents?.total?.toLocaleString()}</b>
                  &nbsp;Accessions
                </Chip>
                <Chip checked={false}>
                  <b>{trials.documents?.total?.toLocaleString()}</b>&nbsp;Trials
                </Chip>
              </Group>
            </Box>
          </Group>
        </Container>
      </Box>
      <Wave width='100%' height={200} preserveAspectRatio='none' waveType='bodyBottom' />
      <Container size='xl' pt='xl' mt={-85}>
        <Grid>
          {(collectory.pubDescription || collectory.pubShortDescription) && (
            <Grid.Col span={12} pb='lg'>
              <Group justify='center' mb='sm'>
                <IconInfoCircle size='2rem' style={{ minWidth: 22, minHeight: 22 }} />
                <Title order={3} size={18}>
                  About
                </Title>
              </Group>
              <Spoiler
                maxHeight={65}
                hideLabel={
                  <Center>
                    <Group mt='xs' style={{ fontSize: '0.85rem' }}>
                      <IconChevronUp size={14} />
                      Show Less
                    </Group>
                  </Center>
                }
                showLabel={
                  <Center>
                    <Group mt='xs' style={{ fontSize: '0.85rem' }}>
                      <IconChevronDown size={14} />
                      Show More
                    </Group>
                  </Center>
                }
                styles={{
                  control: {
                    width: '100%',
                  },
                }}
              >
                <Text size='sm'>{collectory.pubDescription || collectory.pubShortDescription}</Text>
              </Spoiler>
            </Grid.Col>
          )}
          <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 12 }}>
            <Paper p='md' withBorder>
              <Group>
                <IconClock />
                <Box>
                  <Text c='dimmed' size='xs'>
                    Records Span
                  </Text>
                  <Text fw='bold'>
                    {stats?.year.min} - {stats?.year.max}
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 12 }}>
            <Paper p='md' withBorder>
              <Group>
                <IconDatabaseImport />
                <Box>
                  <Text c='dimmed' size='xs'>
                    Last Updated
                  </Text>
                  <Text fw='bold'>
                    {collectory.lastUpdated
                      ? new Date(collectory.lastUpdated).toLocaleDateString()
                      : 'Unknown'}
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ xl: 4, lg: 4, sm: 12, xs: 12 }}>
            <Paper p='md' withBorder>
              <Group>
                <IconLicense />
                <Box>
                  <Text c='dimmed' size='xs'>
                    License
                  </Text>
                  <Text fw='bold'>{collectory.licenseType || 'Unknown'}</Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={12} py='xl'>
            <Divider variant='dashed' />
          </Grid.Col>
          <Grid.Col span={{ xl: 8, lg: 8, md: 12, sm: 12, xs: 12 }}>
            <Suspense fallback={<Skeleton w='100%' h={450} />}>
              <EventMap width='100%' height={450} token={token} />
            </Suspense>
            <Alert
              title='Accession Map'
              icon={<IconMap />}
              mt='sm'
              styles={{ title: { marginBottom: 4 } }}
            >
              <Text>
                Accessions were collected from the locations shown above. Click a dot to be shown a
                list of accessions at that location, then click an accession entry to see full
                accession details.
              </Text>
            </Alert>
          </Grid.Col>
          <Grid.Col span={{ xl: 4, lg: 4, md: 12, sm: 12, xs: 12 }}>
            <SpeciesList
              name={event?.datasetTitle || 'Unknown Dataset'}
              species={occurrenceFacet?.species || []}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Contact dataResource={params.resource || ''} />
          </Grid.Col>
        </Grid>
      </Container>
      <Space h={45} />
    </>
  );
}

Object.assign(Component, { displayName: 'Seedbank' });
