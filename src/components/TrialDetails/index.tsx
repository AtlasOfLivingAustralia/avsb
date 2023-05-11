import { Box, Grid, Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconNotes } from '@tabler/icons';

import { Event, SeedBankTreatment, SeedBankTrial } from '#/api/graphql/types';
import { getIsPresent } from '#/helpers';

import IconText from '../IconText';
import fields from './fields';
import TreatmentCard from '../TreatmentCard';

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
  const events = (event.treatments || []).filter((treatment) =>
    isValidTreatment((treatment.extensions?.seedbank as SeedBankTreatment) || {}),
  ) as Event[];
  const treatments = events.map(({ extensions }) => extensions?.seedbank as SeedBankTreatment);

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
      {treatments.length > 0 && (
        <Grid.Col span={12}>
          {treatments.map((treatment, num) => (
            <Paper
              withBorder
              p='md'
              mt='sm'
              key={treatment.id}
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
              })}
            >
              <Text sx={(theme) => ({ fontFamily: theme.headings.fontFamily })} mb='xs'>
                Treatment {num + 1}
              </Text>
              <TreatmentCard treatment={treatment} />
            </Paper>
          ))}
        </Grid.Col>
      )}
    </Grid>
  );
}

export default TrialDetails;
