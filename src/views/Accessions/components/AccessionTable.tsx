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
  Tooltip,
} from '@mantine/core';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconArrowUpRight,
  IconChevronDown,
} from '@tabler/icons';
import orderBy from 'lodash/orderBy';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// Project components / helpers
import { AccessionDetails, ThField } from '#/components';
import { getIsDefined } from '#/helpers';
import classes from './AccessionTable.module.css';

interface AccessionTableProps {
  events: Event[];
}

function AccessionTable({ events }: AccessionTableProps) {
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

    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(orderBy(events || [], [field], [reversed ? 'desc' : 'asc']));
  };

  useEffect(() => setSorting(sortBy || '', true), [events]);

  return (
    <Card shadow='lg' p={0} withBorder>
      <ScrollArea
        type='auto'
        h='calc(100vh - 425px)'
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table highlightOnHover>
          <thead className={`${classes.header} ${scrolled ? classes.scrolled : ''}`}>
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
                sorted={sortBy === 'extensions.seedbank.dateCollected'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.dateCollected')}
                fieldKey='dateCollected'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.quantityCount'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.quantityCount')}
                fieldKey='quantityCount'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.purityPercentage'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.purityPercentage')}
                fieldKey='purityPercentage'
              />
              <ThField
                sorted={sortBy === 'extensions.seedbank.storageTemperatureInCelsius'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('extensions.seedbank.storageTemperatureInCelsius')}
                fieldKey='storageTemperatureInCelsius'
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
                <td colSpan={8}>
                  <Center>
                    <Text>No accession data found</Text>
                  </Center>
                </td>
              </tr>
            )}
            {sortedData.map((event) => {
              const accession = event.extensions?.seedbank as SeedBankAccession;
              const isSelected = selected.includes(event.eventID || '');
              return (
                <Fragment key={event.eventID}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      // biome-ignore lint: suspicious/noExplicitAny
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
                    <td>{event.distinctTaxa?.[0]?.scientificName || 'N/A'}</td>
                    <td>
                      <Tooltip.Floating label={<Text size='xs'>{event?.datasetTitle}</Text>}>
                        <Box maw={250}>
                          <Text lineClamp={2}>{event?.datasetTitle}</Text>
                        </Box>
                      </Tooltip.Floating>
                    </td>
                    <td>
                      {getIsDefined(accession?.dateCollected) &&
                        new Date(accession?.dateCollected || 0).toLocaleDateString()}
                    </td>
                    <td>
                      {getIsDefined(accession?.quantityCount) &&
                        `${accession?.quantityCount} seeds`}
                    </td>
                    <td>
                      {getIsDefined(accession?.purityPercentage) &&
                        `${accession.purityPercentage?.toFixed(2)}%`}
                    </td>
                    <td>
                      {getIsDefined(accession?.storageTemperatureInCelsius) &&
                        `${accession?.storageTemperatureInCelsius}°C`}
                    </td>
                    <td align='right'>
                      <Group gap='xs' justify='right' miw={150}>
                        <Button
                          styles={{
                            label: {
                              textDecoration: 'underline',
                              textUnderlineOffset: 2,
                              textDecorationColor:
                                'light-dark(rgba(34, 139, 230, 0.25), rgba(165, 216, 255, 0.25))',
                            },
                          }}
                          rightSection={<IconArrowUpRight size='1rem' />}
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
                        backgroundColor: 'light-dark(white, var(--mantine-color-dark-6))',
                      }}
                    >
                      <Collapse in={isSelected}>
                        <Box
                          style={{
                            backgroundColor:
                              'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-7))',
                            borderTop: `1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))`,
                          }}
                          p='md'
                        >
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
