/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from 'react';
import { Event, SeedBankAccession } from '#/api/graphql/types';
import {
  Box,
  Button,
  Card,
  Center,
  Collapse,
  Divider,
  Group,
  ScrollArea,
  Table,
  Text,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconChevronDown,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

// Project components / helpers
import { AccessionDetails } from '#/components';
import { getIsPresent } from '#/helpers';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    transition: 'box-shadow 150ms ease',
    zIndex: 100,

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.md,
  },
}));

interface AccessionTableProps {
  events: Event[];
}

function AccessionTable({ events }: AccessionTableProps) {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const sortedEvents = orderBy(events || [], ['extensions.seedbank.accessionNumber'], ['asc']);

  return (
    <Card withBorder p={0}>
      <ScrollArea
        type='auto'
        h='calc(100vh - 425px)'
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th style={{ paddingLeft: 25 }}>Catalogue</th>
              <th>Institution</th>
              <th>Date Collected</th>
              <th>Thousand Seed Weight</th>
              <th>Purity</th>
              <th>Storage Temp</th>
              <th>Collector</th>
              <th>
                <Button.Group style={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant='light'
                    p={8}
                    size='sm'
                    onClick={() => setSelected(events.map(({ eventID }) => eventID || ''))}
                  >
                    <IconArrowsMaximize size={14} />
                  </Button>
                  <Button variant='light' p={8} size='sm' onClick={() => setSelected([])}>
                    <IconArrowsMinimize size={14} />
                  </Button>
                </Button.Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {(!events || events?.length === 0) && (
              <tr>
                <td colSpan={8}>
                  <Center>
                    <Text>No accession data found</Text>
                  </Center>
                </td>
              </tr>
            )}
            {sortedEvents.map((event) => {
              const accession = event.extensions?.seedbank as SeedBankAccession;
              const isSelected = selected.includes(event.eventID || '');
              return (
                <Fragment key={event.eventID}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      const className = (e.target as any)?.className;
                      if (!(typeof className === 'string' && className.includes('Button'))) {
                        setSelected(
                          isSelected
                            ? (selected as string[]).filter((eventID) => eventID !== event.eventID)
                            : [...(selected as string[]), event.eventID || ''],
                        );
                      }
                    }}
                  >
                    <td style={{ paddingLeft: 25 }}>
                      {accession?.accessionNumber || event.eventID}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                    <td>
                      {getIsPresent(accession?.dateCollected) &&
                        new Date(accession?.dateCollected || 0).toLocaleDateString()}
                    </td>
                    <td>
                      {getIsPresent(accession?.thousandSeedWeight) &&
                        `${accession?.thousandSeedWeight}g`}
                    </td>
                    <td>
                      {getIsPresent(accession?.purityPercentage) &&
                        `${accession.purityPercentage}%`}
                    </td>
                    <td>
                      {getIsPresent(accession?.storageTemperatureInCelsius) &&
                        `${accession?.storageTemperatureInCelsius}°C`}
                    </td>
                    <td>
                      {getIsPresent(accession?.primaryCollector) && accession?.primaryCollector}
                    </td>
                    <td align='right'>
                      <Group spacing='xs' position='right' miw={130}>
                        <Button
                          styles={{
                            label: {
                              textDecoration: 'underline',
                              textUnderlineOffset: 2,
                              textDecorationColor:
                                theme.colorScheme === 'dark'
                                  ? 'rgba(165, 216, 255, 0.25)'
                                  : 'rgba(34, 139, 230, 0.25)',
                            },
                          }}
                          rightIcon={<IconArrowUpRight size='1rem' />}
                          component={Link}
                          to={event.eventID || '/'}
                          variant='subtle'
                          size='xs'
                          px='xs'
                        >
                          All Details
                        </Button>
                        <Divider orientation='vertical' />
                        <IconChevronDown
                          style={{
                            transition: 'transform ease-out 200ms',
                            transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                          size={16}
                        />
                      </Group>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={8}
                      style={{
                        padding: 0,
                        border: 'none',
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
                      }}
                    >
                      <Collapse in={isSelected}>
                        <Box p='md'>
                          <AccessionDetails event={event} />
                        </Box>
                      </Collapse>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
}

export default AccessionTable;
