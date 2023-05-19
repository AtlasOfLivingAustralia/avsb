/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, Fragment, useState } from 'react';
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

import { Link, useLocation } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

// Project components / helpers
import { FieldTooltip, TrialDetails } from '#/components';
import { getIsPresent, trialFields } from '#/helpers';

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

interface ThTooltipProps<T> {
  style?: CSSProperties;
  field: keyof T;
}

function ThTooltip({ field, style }: ThTooltipProps<SeedBankTrial>) {
  const { icon: Icon, label, ...props } = trialFields[field];
  return (
    <th style={style}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FieldTooltip {...{ label, Icon, ...props }}>
        <Text>{label}</Text>
      </FieldTooltip>
    </th>
  );
}

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

  const sortedEvents = orderBy(
    events.map((event) => {
      const date = new Date();
      if (event.year) date.setFullYear(event.year);
      if (event.month) date.setMonth(event.month);
      if (event.day) date.setDate(event.day);

      date.setHours(0, 0, 0, 0);

      return {
        ...event,
        eventDateTs: date.getTime(),
      };
    }) || [],
    ['eventDateTs', 'extensions.seedbank.accessionNumber'],
    ['desc'],
  );

  return (
    <Card withBorder p={0}>
      <ScrollArea
        type='auto'
        h={height || 'calc(100vh - 425px)'}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr>
              <ThTooltip style={{ paddingLeft: 25 }} field='accessionNumber' />
              <th>Taxon</th>
              <th>Institution</th>
              <ThTooltip field='adjustedGerminationPercentage' />
              <th>Treatment</th>
              <ThTooltip field='viabilityPercentage' />
              <ThTooltip field='testDateStarted' />
              <ThTooltip field='testLengthInDays' />
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
                    <td style={{ paddingLeft: 25 }}>{trial?.accessionNumber}</td>
                    <td>{event.distinctTaxa?.[0].scientificName}</td>
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
                    <td align='right'>
                      <Group spacing='xs' position='right' miw={145}>
                        {location.pathname.endsWith('trials') && (
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
                            disabled={!event.parentEventID}
                            component={Link}
                            to={`../accessions/${event.parentEventID}`}
                            variant='subtle'
                            size='xs'
                            px='xs'
                          >
                            View Accession
                          </Button>
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
