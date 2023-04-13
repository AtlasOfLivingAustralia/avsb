import { Fragment } from 'react';
import { Box, Grid, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconNotes } from '@tabler/icons';

import { Event, SeedBankTreatment, SeedBankTrial } from '#/api/graphql/types';
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

const isValidTreatment = ({
  pretreatment,
  mediaSubstrate,
  darkHours,
  lightHours,
  dayTemperatureInCelsius,
  nightTemperatureInCelsius,
}: SeedBankTreatment) =>
  Boolean(
    pretreatment ||
      mediaSubstrate ||
      darkHours ||
      lightHours ||
      dayTemperatureInCelsius ||
      nightTemperatureInCelsius,
  );

function TrialDetails({ event }: TrialDetailsProps) {
  const trial = event.extensions?.seedbank as SeedBankTrial;
  const { data } = useGQLQuery<TreatmentQuery>(
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
  const events = data?.data?.eventSearch.documents.results;
  const treatments = (
    (events?.map(({ extensions }) => extensions?.seedbank) as SeedBankTreatment[]) || []
  ).filter((treatment) => isValidTreatment(treatment));

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
      {treatments && treatments.length > 0 && (
        <Grid.Col span={12}>
          <Paper withBorder p='md' mt='sm'>
            {treatments.map((treatment, num) => (
              <Fragment key={treatment.id}>
                <Text
                  style={{ fontFamily: 'Lexend Deca, sans-serif' }}
                  mb='xs'
                  mt={num !== 0 ? 'md' : 0}
                >
                  Treatment {num + 1}
                </Text>
                <TreatmentCard treatment={treatment} />
              </Fragment>
            ))}
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  );
}

export default TrialDetails;
