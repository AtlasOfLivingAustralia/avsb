import { useState } from 'react';
import {
  Anchor,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Paper,
  Skeleton,
  Space,
  Spoiler,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp, IconExternalLink, IconInfoCircle } from '@tabler/icons';
import { useLoaderData, useParams } from 'react-router-dom';

import { EventSearchResult } from '#/api/graphql/types';
import { Contact, EventMap } from '#/components';
import { Wave } from '#/components/Wave';

import SpeciesList from './components/SpeciesList';

interface CollectoryDataResource {
  name: string | null;
  acronym: string | null;
  pubShortDescription: string | null;
  pubDescription: string | null;
  websiteUrl: string | null;
  alaPublicUrl: string | null;
  logoRef: {
    uri: string | null;
  };
  dateCreated: string | null;
  lastUpdated: string | null;
  licenseType: string | null;
  licenseVersion: string | null;
  citation: string | null;
}

interface SeedbankRouteData {
  gql: {
    eventSearch: EventSearchResult;
    accessions: EventSearchResult;
    trials: EventSearchResult;
  };
  collectory: CollectoryDataResource;
}

function Seedbank() {
  const [logoLoaded, setLogoLoaded] = useState<boolean>(false);
  const { gql, collectory } = useLoaderData() as SeedbankRouteData;
  const { eventSearch, accessions, trials } = gql;
  const { _tileServerToken: token, documents, occurrenceFacet } = eventSearch;

  const [event] = documents?.results || [];
  const params = useParams();
  const theme = useMantineTheme();

  const smOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`, true);

  return (
    <>
      <Box
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='xl' pt='xl'>
          <Group
            mt='xl'
            pt='md'
            align='flex-start'
            position={smOrLarger ? 'left' : 'center'}
            spacing='xl'
          >
            <Skeleton circle width={120} height={120} visible={!logoLoaded} mr='xl'>
              <Image
                src={collectory.logoRef?.uri}
                width={120}
                height={120}
                fit='cover'
                radius={60}
                mb={smOrLarger ? 0 : 'lg'}
                withPlaceholder
                onLoad={() => setLogoLoaded(true)}
              />
            </Skeleton>
            <Box>
              <Title maw={550} mb='xs'>
                {event?.datasetTitle}
              </Title>
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
                  {accessions.documents?.total?.toLocaleString()} Accessions
                </Chip>
                <Chip checked={false}>{trials.documents?.total?.toLocaleString()} Trials</Chip>
              </Group>
            </Box>
          </Group>
        </Container>
      </Box>
      <Wave width='100%' height={200} preserveAspectRatio='none' waveType='bodyBottom' />
      {/* <Container size='xl' pt='xl' mt={mdOrLarger ? -125 : -25}> */}
      <Container size='xl' pt='xl' mt={-75}>
        <Grid>
          {(collectory.pubDescription || collectory.pubShortDescription) && (
            <Grid.Col span={12} pb='xl'>
              <Group align='center' mb='sm'>
                <IconInfoCircle size='2rem' style={{ minWidth: 22, minHeight: 22 }} />
                <Title order={4}>About</Title>
              </Group>
              <Spoiler
                maxHeight={65}
                hideLabel={
                  <Divider
                    label={
                      <>
                        <IconChevronUp size={14} />
                        <Box ml={5}>Show Less</Box>
                      </>
                    }
                    labelPosition='center'
                  />
                }
                showLabel={
                  <Divider
                    label={
                      <>
                        <IconChevronDown size={14} />
                        <Box ml={5}>Show More</Box>
                      </>
                    }
                    labelPosition='center'
                  />
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
          <Grid.Col xl={8} lg={8} md={12} sm={12} xs={12}>
            <EventMap width='100%' height={450} token={token} />
          </Grid.Col>
          <Grid.Col xl={4} lg={4} md={12} sm={12} xs={12}>
            <SpeciesList species={occurrenceFacet?.species || []} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Contact dataResource={params.id || ''} />
          </Grid.Col>
        </Grid>
      </Container>
      <Space h={45} />
    </>
  );
}

export default Seedbank;
