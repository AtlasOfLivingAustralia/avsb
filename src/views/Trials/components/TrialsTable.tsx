import { Fragment, useEffect, useState } from 'react';
import { Event, SeedBankTreatment, SeedBankTrial } from '#/api/graphql/types';
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
  Tooltip,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';

import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';

import { useLocation } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

// Project components / helpers
import { TrialDetails, ThField } from '#/components';
import { getIsDefined } from '#/helpers';

import AccessionPopover from './AccessionPopover';

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

interface TrialsTableProps {
  events: Event[];
  height?: string | number;
}

function TrialsTable({ events, height }: TrialsTableProps) {
  // const api = useAPI();
  const theme = useMantineTheme();
  const location = useLocation();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Sorting state
  const [sortedData, setSortedData] = useState(events);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // Sorting logic
  const setSorting = (field: string, skipReverse = false) => {
    const sortDirection = skipReverse ? reverseSortDirection : !reverseSortDirection;
    const reversed = field === sortBy ? sortDirection : false;

    // Merge treatment seed bank extension with data
    const mergedEvents = events.map((event) => ({
      ...event,
      extensions: {
        seedbank: {
          ...(event.treatments?.[0]?.extensions?.seedbank || {}),
          ...(event.extensions?.seedbank || {}),
        },
      },
    }));

    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(orderBy(mergedEvents || [], [field], [reversed ? 'desc' : 'asc']));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSorting(sortBy || '', true), [events]);

  return (
    <Card shadow='lg' p={0} withBorder>
      <ScrollArea
        type='auto'
        h={height || 'calc(100vh - 425px)'}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <ThField
                sorted={sortBy === 'extensions.seedbank.accessionNumber'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.accessionNumber')}
                fieldKey='accessionNumber'
              />
              <ThField
                sorted={sortBy === 'distinctTaxa[0].scientificName'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('distinctTaxa[0].scientificName')}
                fieldKey='taxon'
              />
              <ThField
                sorted={sortBy === 'datasetTitle'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('datasetTitle')}
                fieldKey='datasetTitle'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.adjustedGerminationPercentage'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.adjustedGerminationPercentage')}
                fieldKey='adjustedGerminationPercentage'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.mediaSubstrate'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.mediaSubstrate')}
                fieldKey='mediaSubstrate'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.pretreatment'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.pretreatment')}
                fieldKey='pretreatment'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.viabilityPercentage'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.viabilityPercentage')}
                fieldKey='viabilityPercentage'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.testDateStarted'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.testDateStarted')}
                fieldKey='testDateStarted'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.testLengthInDays'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.testLengthInDays')}
                fieldKey='testLengthInDays'
              />
              <th>
                <Button.Group style={{ justifyContent: 'flex-end' }}>
                  <Button
                    variant='light'
                    p={8}
                    size='xs'
                    onClick={() => setSelected(events.map(({ eventID }) => eventID || ''))}
                  >
                    <IconArrowsMaximize size={14} style={{ marginRight: 8 }} />
                    Expand
                  </Button>
                  <Button variant='light' p={8} size='xs' onClick={() => setSelected([])}>
                    <IconArrowsMinimize size={14} style={{ marginRight: 8 }} />
                    Collapse
                  </Button>
                </Button.Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {(!events || events?.length === 0) && (
              <tr>
                <td colSpan={100}>
                  <Center>
                    <Text>No trial data found</Text>
                  </Center>
                </td>
              </tr>
            )}
            {sortedData.map((event) => {
              const trial = event.extensions?.seedbank as SeedBankTrial;
              const [treatment] = event.treatments?.map(
                (treatmentEvent) => treatmentEvent.extensions?.seedbank,
              ) as SeedBankTreatment[];

              const isSelected = selected.includes(event.eventID || '');

              return (
                <Fragment key={event.eventID}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      const className = (e.target as HTMLElement)?.className;
                      if (!(typeof className === 'string' && className.includes('Button'))) {
                        setSelected(
                          isSelected
                            ? (selected as string[]).filter((eventID) => eventID !== event.eventID)
                            : [...(selected as string[]), event.eventID || ''],
                        );
                      }
                    }}
                  >
                    <td style={{ paddingLeft: 25 }}>{trial?.accessionNumber || event.eventID}</td>
                    <td>{event.distinctTaxa?.[0]?.scientificName || 'N/A'}</td>
                    <td>
                      <Tooltip.Floating label={<Text size='xs'>{event?.datasetTitle}</Text>}>
                        <Box maw={250}>
                          <Text lineClamp={2}>{event?.datasetTitle}</Text>
                        </Box>
                      </Tooltip.Floating>
                    </td>
                    <td>
                      {getIsDefined(trial?.adjustedGerminationPercentage) &&
                        `${trial?.adjustedGerminationPercentage?.toFixed(2)}%`}
                    </td>
                    <td>{getIsDefined(treatment?.mediaSubstrate) && treatment?.mediaSubstrate}</td>
                    <td>
                      <Box maw={250}>
                        <Text lineClamp={2}>{treatment?.pretreatment}</Text>
                      </Box>
                    </td>
                    <td>
                      {getIsDefined(trial?.viabilityPercentage) &&
                        `${trial?.viabilityPercentage?.toFixed(2)}%`}
                    </td>
                    <td>
                      {trial?.testDateStarted
                        ? new Date(trial?.testDateStarted).toLocaleDateString()
                        : ''}
                    </td>
                    <td>
                      {getIsDefined(trial?.testLengthInDays) && `${trial?.testLengthInDays} days`}
                    </td>
                    <td align='right' style={{ paddingLeft: 0 }}>
                      <Group spacing='xs' position='right' miw={145}>
                        {location.pathname.endsWith('trials') && (
                          <AccessionPopover parentEvent={event.parentEvent} />
                        )}
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
                      colSpan={100}
                      style={{
                        padding: 0,
                        border: 'none',
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
                      }}
                    >
                      <Collapse in={isSelected}>
                        <Box
                          sx={{
                            backgroundColor:
                              theme.colorScheme === 'dark'
                                ? theme.colors.dark[7]
                                : theme.colors.gray[1],
                            borderTop: `1px solid ${
                              theme.colorScheme === 'dark'
                                ? theme.colors.dark[4]
                                : theme.colors.gray[3]
                            }`,
                          }}
                          p='md'
                        >
                          <TrialDetails event={event} />
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

export default TrialsTable;
