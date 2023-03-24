/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
import { SeedBankAccession } from '#/api/graphql/types';
import {
  Box,
  Button,
  Card,
  Center,
  Collapse,
  Group,
  Table,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconArrowsMaximize, IconArrowsMinimize, IconChevronDown } from '@tabler/icons';
import { AccessionDetails } from '#/components';
import { Fragment, useState } from 'react';
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { getIsPresent } from '#/helpers';

function Accessions() {
  // const api = useAPI();
  const accessionData = useLoaderData() as any[];
  const theme = useMantineTheme();
  const params = useParams();
  const [selected, setSelected] = useState<string[]>([]);
  const [events] = useState<any[]>(accessionData);

  if (accessionData.length === 0) {
    return (
      <Center>
        <Text>No trial data found</Text>
      </Center>
    );
  }

  const outletAccession = accessionData.find(({ eventID }) => params.accession === eventID);
  if (outletAccession) {
    return <Outlet context={{ event: outletAccession }} />;
  }

  return (
    <Card withBorder p={0}>
      <Table highlightOnHover>
        <thead>
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
            const accession = event.extensions?.seedbank as SeedBankAccession;
            const isSelected = selected.includes(event.eventID);
            return (
              <Fragment key={event.eventID}>
                <tr
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    const className = (e.target as any)?.className;
                    if (!(typeof className === 'string' && className.includes('Button'))) {
                      setSelected(
                        isSelected
                          ? selected.filter((eventID) => eventID !== event.eventID)
                          : [...selected, event.eventID],
                      );
                    }
                  }}
                >
                  <td style={{ paddingLeft: 25 }}>{accession?.accessionNumber}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{event.datasetTitle}</td>
                  <td>{getIsPresent(accession?.dateCollected) && accession?.dateCollected}</td>
                  <td>
                    {getIsPresent(accession?.thousandSeedWeight) &&
                      `${accession?.thousandSeedWeight} gms`}
                  </td>
                  <td>
                    {getIsPresent(accession?.purityPercentage) && `${accession.purityPercentage}%`}
                  </td>
                  <td>
                    {getIsPresent(accession?.storageTemperatureInCelsius) &&
                      `${accession?.storageTemperatureInCelsius}°C`}
                  </td>
                  <td>
                    {getIsPresent(accession?.primaryCollector) && accession?.primaryCollector}
                  </td>
                  <td align='right' width={150}>
                    <Group spacing='xs' position='right'>
                      <Button
                        component={Link}
                        to={event.eventID}
                        variant='subtle'
                        size='xs'
                        px='xs'
                      >
                        View Details
                      </Button>
                      <IconChevronDown
                        style={{
                          transition: 'transform ease-out 200ms',
                          transform: selected.includes(event.eventID)
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
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
                    <Collapse in={selected.includes(event.eventID)}>
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
    </Card>
  );
}

export default Accessions;
