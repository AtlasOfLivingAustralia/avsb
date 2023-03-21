import { Box, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { IconNotes } from '@tabler/icons';

import { Event, SeedBankTrial } from '#/api/graphql/types';
import { getIsPresent } from '#/helpers';

import IconText from '../IconText';
import fields from './fields';

interface TrialDetailsProps {
  event: Event;
}

function TrialDetails({ event }: TrialDetailsProps) {
  const trial = event.extensions?.seedbank as SeedBankTrial;

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
    </Grid>
  );
}

export default TrialDetails;
