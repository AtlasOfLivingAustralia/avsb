import { Box, Grid, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconNotes } from '@tabler/icons-react';

import { Event, SeedBankTreatment, SeedBankTrial } from '#/api/graphql/types';
import { getIsDefined, trialFields } from '#/helpers';
import FieldTooltip from '../FieldTooltip';
import IconText from '../IconText';
import TreatmentCard from '../TreatmentCard';
import fields from './fields';

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
  const events = (event.treatments || []).filter(
    (treatment) =>
      isValidTreatment((treatment.extensions?.seedbank as SeedBankTreatment) || {}) ||
      treatment.eventRemarks,
  ) as Event[];

  return (
    <Grid gutter='xs'>
      {fields
        .map((key) => ({ key, ...trialFields[key] }))
        .map(({ key, label, description, examples, icon: Icon, unit }) => (
          <Grid.Col key={key} span={2}>
            <FieldTooltip {...{ label, description, examples, Icon }}>
              <Group>
                <ThemeIcon variant='light' size={28} radius='xl'>
                  <Icon size='1rem' />
                </ThemeIcon>
                <Box>
                  <Text c='dimmed' size='xs'>
                    {label}
                  </Text>
                  {getIsDefined(trial?.[key]) ? (
                    <Text size='sm' fw='bold'>
                      {trial[key]}
                      {unit && unit}
                    </Text>
                  ) : (
                    <Text size='sm' fw='bold' c='dimmed'>
                      Not Available
                    </Text>
                  )}
                </Box>
              </Group>
            </FieldTooltip>
          </Grid.Col>
        ))}
      <Grid.Col span={12} pt={trial?.preTestProcessingNotes ? 'mt' : 0}>
        {trial?.preTestProcessingNotes && (
          <IconText labelWidth={225} icon={IconNotes} title='Pre-Test Processing / Notes'>
            {trial?.preTestProcessingNotes || 'Not Available'}
          </IconText>
        )}
      </Grid.Col>
      {events.length > 0 && (
        <Grid.Col span={12}>
          {events.map((treatment, num) => (
            <Paper
              withBorder
              p='md'
              mt='sm'
              key={`${event.eventID}-${num + 1}`}
              style={{
                backgroundColor:
                  'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
              }}
            >
              <Text style={{ fontFamily: 'var(--mantine-font-family-headings)' }} mb='xs'>
                Trial Conditions {num + 1}
              </Text>
              <TreatmentCard event={treatment} />
            </Paper>
          ))}
        </Grid.Col>
      )}
    </Grid>
  );
}

export default TrialDetails;
