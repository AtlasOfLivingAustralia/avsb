/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, Fragment, lazy } from 'react';
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom';

import {
  Text,
  Card,
  Grid,
  Modal,
  useMantineTheme,
  Stack,
  Group,
  Badge,
  Divider,
  UnstyledButton,
  Alert,
  Skeleton,
  ActionIcon,
} from '@mantine/core';

import { IconAlertTriangle, IconExternalLink, IconMap } from '@tabler/icons';

// Project imports
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Taxon } from '#/api/sources/taxon';
import { ConservationStatus, SDS } from '#/components';
import { SDSInstance } from '#/api';

const EventMap = lazy(() => import('#/components/EventMap'));

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const [mapOpen, { open, close }] = useDisclosure(false);
  const { taxon, sds } = useRouteLoaderData('taxon') as { taxon: Taxon; sds: SDSInstance[] };
  const token = useLoaderData() as string;
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);
  const navigate = useNavigate();

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
        <Suspense fallback={<Skeleton w='100%' h={650} />}>
          <EventMap width='100%' height={650} token={token} itemListHeight={180} />
        </Suspense>
      </Modal>
      <Grid>
        {taxon.taxonConcept.rankString === 'species' &&
          Object.keys(taxon.conservationStatuses).length > 0 && (
            <Grid.Col span={12} pb='lg'>
              <Group align='center'>
                <Group>
                  <IconAlertTriangle size='1.4rem' />
                  <Text size='sm' weight='bold'>
                    Conservation Status
                  </Text>
                </Group>
                {mdOrLarger && <Divider orientation='vertical' mx='xs' />}
                <Group>
                  {Object.entries(taxon.conservationStatuses).map(([key, { status }]) => (
                    <ConservationStatus key={key} place={key} initials={key} status={status} />
                  ))}
                </Group>
              </Group>
            </Grid.Col>
          )}
        <Grid.Col sm={12} md={7} lg={8}>
          {taxon.taxonConcept.rankString === 'species' && sds.length > 0 ? (
            <Card
              style={{ display: 'flex', alignItems: 'center' }}
              shadow='lg'
              h='100%'
              miw={345}
              withBorder
            >
              <SDS instances={sds} />
            </Card>
          ) : (
            <>
              <Suspense fallback={<Skeleton w='100%' height={450} />}>
                <Card shadow='lg' p={0}>
                  <EventMap
                    onFullscreen={open}
                    width='100%'
                    height={450}
                    token={token}
                    itemListHeight={180}
                  />
                </Card>
              </Suspense>
              <Alert
                title='Accession Map'
                icon={<IconMap />}
                mt='sm'
                styles={{ title: { marginBottom: 4 } }}
              >
                Accessions of this species were collected from the locations shown above. Click a
                dot to be shown a list of accessions at that location, then click an accession entry
                to see full accession details. Visit the &apos;Accessions&apos; tab to see details
                for all locations.
              </Alert>
            </>
          )}
        </Grid.Col>
        <Grid.Col sm={12} md={5} lg={4}>
          <Card shadow='lg' h='100%' p={0} withBorder>
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
                    <Group spacing={0}>
                      <UnstyledButton
                        style={{
                          flexGrow: 1,
                          borderTopRightRadius: theme.radius.md,
                          borderBottomRightRadius: theme.radius.md,
                        }}
                        pl='md'
                        pr='xs'
                        py='xs'
                        onClick={() =>
                          navigate(
                            `/taxon/${encodeURIComponent(
                              (taxon.classification as any)[`${rank}Guid`],
                            )}`,
                          )
                        }
                        sx={{
                          '&:hover': {
                            backgroundColor:
                              theme.colorScheme === 'dark'
                                ? theme.colors.dark[4]
                                : theme.colors.gray[2],
                          },
                        }}
                      >
                        <Group position='apart'>
                          <Text maw={200} truncate size='sm'>
                            {(taxon.classification as any)[rank]}
                          </Text>
                          <Badge>{rank}</Badge>
                        </Group>
                      </UnstyledButton>
                      <ActionIcon
                        component='a'
                        href={(taxon.classification as any)[`${rank}Guid`]}
                        target='_blank'
                        variant='light'
                        color='blue'
                        radius='lg'
                        aria-label='Go to original taxon classification'
                        mx='xs'
                      >
                        <IconExternalLink size={14} />
                      </ActionIcon>
                    </Group>
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

Object.assign(Component, { displayName: 'Summary' });
