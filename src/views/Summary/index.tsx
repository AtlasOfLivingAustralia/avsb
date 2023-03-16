/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';
import {
  Text,
  Card,
  Grid,
  Modal,
  Paper,
  useMantineTheme,
  Stack,
  Group,
  Badge,
  Divider,
  UnstyledButton,
} from '@mantine/core';

// Project imports
import { Event, EventSearchResult } from '#/api/graphql/types';
import { EventMap } from '#/components';
import { useDisclosure } from '@mantine/hooks';
import { Taxon } from '#/api/sources/taxon';
import { IconExternalLink } from '@tabler/icons';

interface EventSearchResponse {
  eventSearch: EventSearchResult;
}

function Summary() {
  const [mapOpen, { open, close }] = useDisclosure(false);
  const { eventSearch } = useLoaderData() as EventSearchResponse;
  const [records] = useState<Event[]>(eventSearch.documents.results);
  const taxon = useRouteLoaderData('taxon') as Taxon;
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        transitionProps={{ transition: 'fade' }}
        size='100%'
        opened={mapOpen}
        onClose={close}
        centered
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.gray[7] : theme.colors.dark[8],
        }}
      >
        <EventMap
          width='100%'
          height={650}
          token={eventSearch._tileServerToken}
          itemListHeight={180}
        />
      </Modal>
      <Grid>
        <Grid.Col sm={7} md={8} lg={9}>
          <Paper h={450} withBorder>
            <EventMap
              onFullscreen={open}
              width='100%'
              height={450}
              token={eventSearch._tileServerToken}
              itemListHeight={180}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col sm={5} md={4} lg={3}>
          <Card withBorder h='100%' p={0}>
            <Text weight='bold' mx='md' mt='lg' mb='xs'>
              Classification
            </Text>
            <Stack spacing={0}>
              {[
                'kingdom',
                'phylum',
                'class',
                'subclass',
                'superorder',
                'order',
                'family',
                'genus',
                'species',
              ]
                .filter((rank) => Boolean((taxon.classification as any)[rank]))
                .map((rank, index, arr) => (
                  <Fragment key={rank}>
                    <UnstyledButton
                      component='a'
                      px='sm'
                      py='xs'
                      href={(taxon.classification as any)[`${rank}Guid`]}
                      target='_blank'
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.colors.dark[4],
                        },
                      }}
                    >
                      <Group position='apart'>
                        <Text style={{ display: 'flex', alignItems: 'center' }} size='sm'>
                          {(taxon.classification as any)[rank]}
                        </Text>
                        <Group spacing='xs'>
                          <Badge>{rank}</Badge>
                          <IconExternalLink size={14} />
                        </Group>
                      </Group>
                    </UnstyledButton>
                    {index !== arr.length - 1 && (
                      <Divider
                        sx={() => ({
                          marginLeft: `calc(${theme.spacing.md} * -1)`,
                          marginRight: `calc(${theme.spacing.md} * -1)`,
                        })}
                      />
                    )}
                  </Fragment>
                ))}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Summary;
