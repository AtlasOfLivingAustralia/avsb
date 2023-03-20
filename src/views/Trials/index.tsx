/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { Event, SeedBankTrial } from '#/api/graphql/types';
import {
  Box,
  Button,
  Card,
  Center,
  Collapse,
  Paper,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';
import { TrialDetails } from '#/components';
import { Fragment, useState } from 'react';
// import { useLoaderData } from 'react-router-dom';

function Trials() {
  // const api = useAPI();
  // const trialData = useLoaderData() as any[];
  const theme = useMantineTheme();
  const trialData: Event[] = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((iter) => ({
    eventID: `15312-7141-${iter}`,
    parentEventID: '15312',
    year: 2014,
    month: 8,
    day: 25,
    datasetTitle: 'Tasmanian Seed Conservation Centre',
    country: 'Australia',
    stateProvince: null,
    extensions: {
      seedbank: {
        eventID: `15312-7141-${iter}`,
        accessionNumber: 'CBG 1234567.8',
        testDateStarted: '2001-02-01',
        testLengthInDays: 10,
        numberGerminated: 10,
        germinateRateInDays: 2,
        adjustedGerminationPercent: 100,
        viabilityPercent: 98,
        numberFull: 10,
        numberEmpty: 0,
        numberTested: 10,
        preTestProcessingNotes: 'Pre test processing notes',
      },
    },
  }));
  const [selected, setSelected] = useState<string[]>([]);
  const [events] = useState<any[]>(trialData);

  // useEffect(() => {
  //   setEvents(trialData as any[]);
  //   setSelected(trialData[0] || null);
  //   // return () => setSelected(null);
  // }, [trialData]);

  if (trialData.length === 0) {
    return (
      <Center>
        <Text>No trial data found</Text>
      </Center>
    );
  }

  return (
    <Card withBorder>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Catalogue</th>
            <th>Date Tested</th>
            <th>Institution</th>
            <th>Test Length</th>
            <th>Germinate Rate</th>
            <th>Germinated</th>
            <th>Adj. Germination</th>
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
                  onClick={() => setSelected(events.map(({ eventID }) => eventID))}
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
          {events.map((event) => {
            const trial = event.extensions?.seedbank as SeedBankTrial;
            const isSelected = selected.includes(event.eventID);
            return (
              <Fragment key={event.eventID}>
                <tr
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setSelected(
                      isSelected
                        ? selected.filter((eventID) => eventID !== event.eventID)
                        : [...selected, event.eventID],
                    )
                  }
                >
                  <td>{trial?.accessionNumber}</td>
                  <td>
                    {event.day}/{event.month}/{event.year}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                  <td>{trial?.testLengthInDays && `${trial?.testLengthInDays} days`}</td>
                  <td>{trial?.germinateRateInDays && `${trial.germinateRateInDays} days`}</td>
                  <td>{trial?.numberGerminated && `${trial?.numberGerminated} seeds`}</td>
                  <td>
                    {trial?.adjustedGerminationPercent && `${trial?.adjustedGerminationPercent}%`}
                  </td>
                  <td align='right'>
                    <IconChevronDown
                      style={{
                        transition: 'transform ease-out 200ms',
                        transform: selected.includes(event.eventID)
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      }}
                      size={16}
                    />
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
                    <Collapse in={selected.includes(event.eventID)}>
                      <Box py='xs'>
                        <Paper p='sm' withBorder>
                          <TrialDetails event={event} />
                        </Paper>
                      </Box>
                    </Collapse>
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
}

export default Trials;
