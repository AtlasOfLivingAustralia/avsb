/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { SeedBankTrial } from '#/api/graphql/types';
import { Box, Button, Card, Center, Collapse, Table, Text, useMantineTheme } from '@mantine/core';
import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';
import { TrialDetails } from '#/components';
import { Fragment, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getIsPresent } from '#/helpers';

function Trials() {
  // const api = useAPI();
  const trialData = useLoaderData() as any[];
  const theme = useMantineTheme();
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
    <Card withBorder p={0}>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th style={{ paddingLeft: 25 }}>Catalogue</th>
            <th>Institution</th>
            <th>Date Tested</th>
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
                  <td style={{ paddingLeft: 25 }}>{trial?.accessionNumber}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                  <td>
                    {event.day}/{event.month}/{event.year}
                  </td>
                  <td>
                    {getIsPresent(trial?.testLengthInDays) && `${trial?.testLengthInDays} days`}
                  </td>
                  <td>
                    {getIsPresent(trial?.germinateRateInDays) &&
                      `${trial.germinateRateInDays} days`}
                  </td>
                  <td>
                    {getIsPresent(trial?.numberGerminated) && `${trial?.numberGerminated} seeds`}
                  </td>
                  <td>
                    {getIsPresent(trial?.adjustedGerminationPercent) &&
                      `${trial?.adjustedGerminationPercent}%`}
                  </td>
                  <td align='right' width={85}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                      <IconChevronDown
                        style={{
                          transition: 'transform ease-out 200ms',
                          transform: selected.includes(event.eventID)
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
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
                    <Collapse in={selected.includes(event.eventID)}>
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
    </Card>
  );
}

export default Trials;
