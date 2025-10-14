/** biome-ignore-all lint/suspicious/noExplicitAny: Tehe */

import {
  ActionIcon,
  Alert,
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Modal,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconAlertTriangle, IconExternalLink, IconMap } from '@tabler/icons-react';
import { Fragment, lazy, Suspense } from 'react';
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router';
// Project imports
import { SDSInstance } from '#/api';
import { Taxon } from '#/api/sources/taxon';
import { ConservationStatus, SDS } from '#/components';
import { breakpoints } from '#/theme/constants';

import classes from './index.module.css';

const EventMap = lazy(() => import('#/components/EventMap'));

export function Component() {
  const [mapOpen, { open, close }] = useDisclosure(false);
  const { taxon, sds } = useRouteLoaderData('taxon') as {
    taxon: Taxon;
    sds: SDSInstance[];
  };
  const token = useLoaderData() as string;
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);
  const navigate = useNavigate();

  return (
    <>
      <Modal
        classNames={classes}
        title={
          <Text ff='var(--mantine-font-family-headings)' size='lg'>
            Fullscreen Map
          </Text>
        }
        transitionProps={{ transition: 'fade' }}
        opened={mapOpen}
        onClose={close}
        fullScreen
      >
        <Suspense fallback={<Skeleton w='100%' h={650} />}>
          <EventMap width='100%' height={650} token={token} itemListHeight={180} radius={'0'} />
        </Suspense>
      </Modal>
      <Grid>
        {taxon.taxonConcept.rankString === 'species' &&
          Object.keys(taxon.conservationStatuses).length > 0 && (
            <Grid.Col span={12} pb='lg'>
              <Group>
                <Group>
                  <IconAlertTriangle size='1.4rem' />
                  <Text size='sm' fw='bold'>
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
        <Grid.Col span={{ sm: 12, md: 7, lg: 8 }}>
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
        <Grid.Col span={{ sm: 12, md: 5, lg: 4 }}>
          <Card shadow='lg' h='100%' p={0} withBorder>
            <Text fw='bold' mx='md' mt='lg' mb='xs'>
              Classification
            </Text>
            <Stack gap={0}>
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
                    <Group gap={0}>
                      <UnstyledButton
                        className={classes.rank}
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
                      >
                        <Group justify='space-between'>
                          <Text maw={200} truncate size='sm'>
                            {(taxon.classification as any)[rank]}
                          </Text>
                          <Badge variant='light'>{rank}</Badge>
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
                        style={{
                          marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
                          marginRight: `calc(var(--mantine-spacing-md) * -1)`,
                        }}
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
