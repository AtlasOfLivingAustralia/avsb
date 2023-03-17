/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { SeedBankTrial } from '#/api/graphql/types';
import { Accordion, Card, Center, Grid, Group, Table, Text } from '@mantine/core';
import { Fragment, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const getMof = (trial: any, type: string) =>
  trial.measurementOrFacts?.find((mof: any) => mof.measurementType === type);
const getSummaryMof = (trial: any, method: string) =>
  trial.measurementOrFacts?.find(
    (mof: any) => mof.measurementType === 'Summary result' && mof.measurementMethod === method,
  );

const formatUnit = (unit: string | null) => {
  if (unit) {
    return unit !== '%' ? ` ${unit}` : unit;
  }
  return '';
};

function Trials() {
  // const api = useAPI();
  const trialData = useLoaderData() as any[];
  const [selected, setSelected] = useState<any | null>(trialData[0] || null);
  const [events, setEvents] = useState<any[]>(trialData);

  useEffect(() => {
    setEvents(trialData as any[]);
    setSelected(trialData[0] || null);
    // return () => setSelected(null);
  }, [trialData]);

  if (trialData.length === 0) {
    return (
      <Center>
        <Text>No trial data found</Text>
      </Center>
    );
  }

  return (
    <Grid gutter='lg'>
      <Grid.Col span={8}>
        <Card shadow='md' withBorder style={{ overflow: 'auto' }}>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Catalogue</th>
                <th>Date</th>
                <th>Institution</th>
                <th>Length</th>
                <th>Germinated</th>
                <th>Full</th>
                <th>Empty</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const trial = event.extensions?.seedbank as SeedBankTrial;
                return (
                  <tr
                    key={event.eventID}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelected(trial)}
                  >
                    <td>N/A</td>
                    <td align='right'>
                      {event.day}/{event.month}/{event.year}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                    <td align='right'>
                      {trial?.testLengthInDays && `${trial?.testLengthInDays} days`}
                    </td>
                    <td align='right'>{trial?.numberGerminated}</td>
                    <td align='right'>{trial?.numberFull}</td>
                    <td align='right'>{trial?.numberEmpty}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        {selected && (
          <Accordion defaultValue='summary'>
            <Accordion.Item value='summary'>
              <Accordion.Control>Trial Summary</Accordion.Control>
              <Accordion.Panel>
                {selected.measurementOrFacts
                  .filter((mof: any) => mof.measurementType === 'Summary result')
                  .sort((a: any, b: any) => a.measurementMethod.localeCompare(b.measurementMethod))
                  .map((mof: any) => (
                    <Group key={mof.measurementID} position='apart'>
                      <Text weight='bold' color='dimmed'>
                        {mof.measurementMethod}
                      </Text>
                      <Text>
                        {mof.measurementValue}
                        {formatUnit(mof.measurementUnit)}
                      </Text>
                    </Group>
                  ))}
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value='all'>
              <Accordion.Control>All Data</Accordion.Control>
              <Accordion.Panel>
                {selected.measurementOrFacts
                  .filter((mof: any) => mof.measurementType !== 'Summary result')
                  .sort((a: any, b: any) => a.measurementMethod?.localeCompare(b.measurementMethod))
                  .map((mof: any) => (
                    <Fragment key={mof.measurementID}>
                      <Text weight='bold' color='dimmed'>
                        {mof.measurementType}
                        {mof.measurementMethod && ` (${mof.measurementMethod})`}
                      </Text>
                      <Text mb='sm'>
                        {mof.measurementValue}
                        {formatUnit(mof.measurementUnit)}
                      </Text>
                    </Fragment>
                  ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Grid.Col>
    </Grid>
  );
}

export default Trials;
