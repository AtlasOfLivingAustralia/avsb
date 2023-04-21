/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { Event, SeedBankTreatment, SeedBankTrial } from '#/api/graphql/types';
import {
  Box,
  Button,
  Card,
  Center,
  Collapse,
  ScrollArea,
  Table,
  Text,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';
import { Fragment, useState } from 'react';
import orderBy from 'lodash/orderBy';

// Project components / helpers
import { TrialDetails } from '#/components';
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

interface TrialsTableProps {
  events: Event[];
  height?: string | number;
}

function TrialsTable({ events, height }: TrialsTableProps) {
  // const api = useAPI();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const sortedEvents = orderBy(events || [], ['extensions.seedbank.accessionNumber'], ['asc']);

  return (
    <Card withBorder p={0}>
      <ScrollArea
        h={height || 'calc(100vh - 420px)'}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <th style={{ paddingLeft: 25 }}>Catalogue</th>
              <th>Institution</th>
              <th>Adj. Germination</th>
              <th>Treatment</th>
              <th>Viability</th>
              <th>Date Tested</th>
              <th>Test Length</th>
              {/* <th>
              <Group spacing='xs'>
                Tested
                <Tooltip label='Test' withArrow position='top'>
                  <ThemeIcon variant='light' size='xs' radius='xl'>
                    <IconQuestionMark />
                  </ThemeIcon>
                </Tooltip>
              </Group>
            </th> */}
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
                    <Text>No trial data found</Text>
                  </Center>
                </td>
              </tr>
            )}
            {sortedEvents.map((event) => {
              const trial = event.extensions?.seedbank as SeedBankTrial;
              const [treatment] = event.treatments?.map(
                (treatmentEvent) => treatmentEvent.extensions?.seedbank,
              ) as SeedBankTreatment[];

              const isSelected = selected.includes(event.eventID || '');

              return (
                <Fragment key={event.eventID}>
                  <tr
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setSelected(
                        isSelected
                          ? (selected as string[]).filter((eventID) => eventID !== event.eventID)
                          : [...(selected as string[]), event.eventID || ''],
                      )
                    }
                  >
                    <td style={{ paddingLeft: 25 }}>{trial?.accessionNumber}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                    <td>
                      {getIsPresent(trial?.adjustedGerminationPercentage) &&
                        `${trial?.adjustedGerminationPercentage}%`}
                    </td>
                    <td>{getIsPresent(treatment?.mediaSubstrate) && treatment?.mediaSubstrate}</td>
                    <td>
                      {getIsPresent(trial?.viabilityPercentage) && `${trial?.viabilityPercentage}%`}
                    </td>
                    <td>
                      {[event.day, event.month, event.year]
                        .filter((part) => part !== null)
                        .join('/')}
                    </td>
                    <td>
                      {getIsPresent(trial?.testLengthInDays) && `${trial?.testLengthInDays} days`}
                    </td>
                    <td align='right' width={85}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <IconChevronDown
                          style={{
                            transition: 'transform ease-out 200ms',
                            transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)',
                          }}
                          size={16}
                        />
                      </div>
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
                        <Box p='md'>
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
