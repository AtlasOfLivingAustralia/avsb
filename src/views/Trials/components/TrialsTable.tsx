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
} from '@mantine/core';
import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';
import orderBy from 'lodash/orderBy';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// Project components / helpers
import { ThField, TrialDetails } from '#/components';
import { getIsDefined } from '#/helpers';
import AccessionPopover from './AccessionPopover';
import classes from './TrialsTable.module.css';

interface TrialsTableProps {
  events: Event[];
  height?: string | number;
}

function TrialsTable({ events, height }: TrialsTableProps) {
  // const api = useAPI();
  const location = useLocation();
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

  useEffect(() => setSorting(sortBy || '', true), [events]);

  return (
    <Card shadow='lg' p={0} withBorder>
      <Table.ScrollContainer
        minWidth={500}
        h='calc(100vh - 425px)'
        scrollAreaProps={{ onScrollPositionChange: ({ y }) => setScrolled(y !== 0) }}
      >
        <Table stickyHeader highlightOnHover>
          <Table.Thead className={`${classes.header} ${scrolled ? classes.scrolled : ''}`}>
            <Table.Tr>
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
              <Table.Th>
                <Button.Group style={{ justifyContent: 'flex-end' }} p='sm'>
                  <Button
                    variant='light'
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
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {(!events || events?.length === 0) && (
              <Table.Tr>
                <Table.Td colSpan={100}>
                  <Center>
                    <Text size='sm'>No trial data found</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            )}
            {sortedData.map((event) => {
              const trial = event.extensions?.seedbank as SeedBankTrial;
              const [treatment] = event.treatments?.map(
                (treatmentEvent) => treatmentEvent.extensions?.seedbank,
              ) as SeedBankTreatment[];

              const isSelected = selected.includes(event.eventID || '');

              return (
                <Fragment key={event.eventID}>
                  <Table.Tr
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
                    <Table.Td style={{ paddingLeft: 14 }}>
                      {trial?.accessionNumber || event.eventID}
                    </Table.Td>
                    <Table.Td>{event.distinctTaxa?.[0]?.scientificName || 'N/A'}</Table.Td>
                    <Table.Td>
                      <Tooltip.Floating label={<Text size='xs'>{event?.datasetTitle}</Text>}>
                        <Box maw={250}>
                          <Text size='sm' lineClamp={2}>
                            {event?.datasetTitle}
                          </Text>
                        </Box>
                      </Tooltip.Floating>
                    </Table.Td>
                    <Table.Td>
                      {getIsDefined(trial?.adjustedGerminationPercentage) &&
                        `${trial?.adjustedGerminationPercentage?.toFixed(2)}%`}
                    </Table.Td>
                    <Table.Td>
                      {getIsDefined(treatment?.mediaSubstrate) && treatment?.mediaSubstrate}
                    </Table.Td>
                    <Table.Td>
                      <Box maw={250}>
                        <Text size='sm' lineClamp={2}>
                          {treatment?.pretreatment}
                        </Text>
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      {getIsDefined(trial?.viabilityPercentage) &&
                        `${trial?.viabilityPercentage?.toFixed(2)}%`}
                    </Table.Td>
                    <Table.Td>
                      {trial?.testDateStarted
                        ? new Date(trial?.testDateStarted).toLocaleDateString()
                        : ''}
                    </Table.Td>
                    <Table.Td>
                      {getIsDefined(trial?.testLengthInDays) && `${trial?.testLengthInDays} days`}
                    </Table.Td>
                    <Table.Td align='right' style={{ paddingLeft: 0 }}>
                      <Group gap='xs' justify='right' miw={145}>
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
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr style={{ border: 'none' }}>
                    <Table.Td
                      colSpan={100}
                      style={{
                        padding: 0,
                        border: 'none',
                        backgroundColor: 'light-dark(white, var(--mantine-color-dark-6))',
                      }}
                    >
                      <Collapse in={isSelected}>
                        <Box
                          style={{
                            backgroundColor:
                              'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
                            borderBottom: `1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
                          }}
                          p='md'
                        >
                          <TrialDetails event={event} />
                        </Box>
                      </Collapse>
                    </Table.Td>
                  </Table.Tr>
                </Fragment>
              );
            })}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
}

export default TrialsTable;
