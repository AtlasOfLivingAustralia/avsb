import { Fragment, useEffect, useState } from 'react';
import { Box, Grid, Group, Paper, Text, ThemeIcon, Title } from '@mantine/core';
import { IconNotes } from '@tabler/icons';

import { Event, SeedBankTrial } from '#/api/graphql/types';
import { useGQLQuery } from '#/api';
import { getIsPresent } from '#/helpers';
import queries from '#/api/queries';

import IconText from '../IconText';
import fields from './fields';
import TreatmentCard from '../TreatmentCard';

interface TreatmentQuery {
  data?: {
    eventSearch: {
      documents: {
        results: Event[];
      };
    };
  };
}

interface TrialDetailsProps {
  event: Event;
}

function TrialDetails({ event }: TrialDetailsProps) {
  const trial = event.extensions?.seedbank as SeedBankTrial;
  const { data, error, update } = useGQLQuery<TreatmentQuery>(
    queries.QUERY_EVENT_TREATMENTS,
    {
      predicate: {
        type: 'and',
        predicates: [
          {
            type: 'in',
            key: 'eventTypeHierarchy',
            values: ['Treatment'],
          },
          {
            type: 'equals',
            key: 'eventHierarchy',
            value: event.eventID,
          },
        ],
      },
    },
    { lazy: false },
  );
  const treatments = data?.data?.eventSearch.documents.results;

  return (
    <Grid gutter='xs'>
      {fields
        // .filter(({ key }) => Boolean(treatment[key]))
        .map(({ key, name, icon: Icon, unit }) => (
          <Grid.Col key={key} xs={3} sm={3} md={3} lg={3} xl={3}>
            <Group>
              <ThemeIcon variant='light' size={28} radius='xl'>
                <Icon size='1rem' />
              </ThemeIcon>
              <Box>
                <Text color='dimmed' size='xs'>
                  {name}
                </Text>
                {getIsPresent(trial?.[key]) ? (
                  <Text size='sm' weight='bold'>
                    {trial[key]}
                    {unit && unit}
                  </Text>
                ) : (
                  <Text size='sm' weight='bold' color='dimmed'>
                    Not Supplied
                  </Text>
                )}
              </Box>
            </Group>
          </Grid.Col>
        ))}
      <Grid.Col span={12} pt={trial?.preTestProcessingNotes ? 'mt' : 0}>
        {trial?.preTestProcessingNotes && (
          <IconText labelWidth={225} icon={IconNotes} title='Pre-Test Processing / Notes'>
            {trial?.preTestProcessingNotes || 'Not Supplied'}
          </IconText>
        )}
      </Grid.Col>
      {treatments && (
        <Grid.Col span={12}>
          <Paper withBorder p='md' mt='sm'>
            {treatments.map((treatment, num) => (
              <Fragment key={treatment.eventID}>
                <Text
                  style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                  mb='xs'
                  mt={num !== 0 ? 'md' : 0}
                >
                  Treatment {num + 1}
                </Text>
                <TreatmentCard event={treatment} />
              </Fragment>
            ))}
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  );
}

export default TrialDetails;
