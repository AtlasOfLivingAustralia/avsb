/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, Fragment } from 'react';
import { useLoaderData, useRouteLoaderData } from 'react-router-dom';

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
  ThemeIcon,
  DefaultMantineColor,
  Skeleton,
} from '@mantine/core';

import {
  IconAlertCircle,
  IconAlertOctagon,
  IconAlertTriangle,
  IconExternalLink,
  IconFlag,
  IconMap,
  IconX,
  TablerIcon,
} from '@tabler/icons';

// Project imports
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Taxon } from '#/api/sources/taxon';
import { EventMap } from '#/components';

// const EventMap = lazy(() => import('#/components/EventMap'));

const conservationDetails: { [key: string]: { color: DefaultMantineColor; icon: TablerIcon } } = {
  extinct: {
    color: 'dark',
    icon: IconX,
  },
  'locally extinct': {
    color: 'dark',
    icon: IconX,
  },
  'critically endangered': {
    color: 'red',
    icon: IconAlertOctagon,
  },
  endangered: {
    color: 'orange',
    icon: IconAlertTriangle,
  },
  vulnerable: {
    color: 'yellow',
    icon: IconAlertCircle,
  },
  'near threatened': {
    color: 'yellow',
    icon: IconFlag,
  },
};

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const [mapOpen, { open, close }] = useDisclosure(false);
  const token = useLoaderData() as string;
  const taxon = useRouteLoaderData('taxon') as Taxon;
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);

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
        {Object.keys(taxon.conservationStatuses).length > 0 && (
          <Grid.Col span={12} pb='lg'>
            <Group align='center'>
              <Group>
                <IconAlertTriangle size='1.2rem' />
                <Text size='sm' weight='bold'>
                  Conservation Status
                </Text>
              </Group>
              {mdOrLarger && <Divider orientation='vertical' mx='xs' />}
              <Group>
                {Object.entries(taxon.conservationStatuses).map(([key, { status }]) => {
                  const { color } = conservationDetails[status.toLowerCase()];

                  return (
                    <Group key={key} spacing='sm'>
                      <ThemeIcon variant='light' radius='xl' size='xl' color={color}>
                        <Text weight='bold' color={color} size='xs'>
                          {key}
                        </Text>
                      </ThemeIcon>
                      <Text size='sm'>{status}</Text>
                    </Group>
                  );
                })}
              </Group>
            </Group>
          </Grid.Col>
        )}
        <Grid.Col sm={7} md={8} lg={9}>
          <Suspense fallback={<Skeleton w='100%' height={450} />}>
            <EventMap
              onFullscreen={open}
              width='100%'
              height={450}
              token={token}
              itemListHeight={180}
            />
          </Suspense>
          <Alert
            title='Accession Map'
            icon={<IconMap />}
            mt='sm'
            styles={{ title: { marginBottom: 4 } }}
          >
            Accessions of this species were collected from the locations shown above. Click a dot to
            be taken to that accession, or visit the &apos;Accessions&apos; tab to see details for
            all locations.
          </Alert>
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
                          backgroundColor:
                            theme.colorScheme === 'dark'
                              ? theme.colors.dark[4]
                              : theme.colors.gray[2],
                        },
                      }}
                    >
                      <Group position='apart'>
                        <Text maw={160} truncate size='sm'>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Component as any).displayName = 'Summary';
