import { Box, Card, Divider, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { IconTestPipe } from '@tabler/icons';
import { Event, SeedBankTreatment } from '#/api/graphql/types';
import { getIsPresent } from '#/helpers';

import IconText from '../IconText';
import fields from './fields';

interface TreatmentCardProps {
  event: Event;
}

function TreatmentCard({ event }: TreatmentCardProps) {
  const treatment = event.extensions?.seedbank as SeedBankTreatment;

  return (
    <>
      {treatment?.pretreatment && (
        <>
          <IconText labelWidth={130} icon={IconTestPipe} title='Pre-Treatment'>
            {treatment.pretreatment || 'Not Supplied'}
          </IconText>{' '}
          <Divider
            my='sm'
            sx={(theme) => ({
              marginLeft: `calc(${theme.spacing.md} * -1)`,
              marginRight: `calc(${theme.spacing.md} * -1)`,
            })}
          />
        </>
      )}
      <Grid gutter='xs'>
        {fields
          // .filter(({ key }) => Boolean(treatment[key]))
          .map(({ key, name, icon: Icon, unit }) => (
            <Grid.Col key={key} xs={4} sm={3} md={2} lg={2} xl={2}>
              <Group>
                <ThemeIcon variant='light' size={28} radius='xl'>
                  <Icon size='1rem' />
                </ThemeIcon>
                <Box>
                  <Text color='dimmed' size='xs'>
                    {name}
                  </Text>
                  {getIsPresent(treatment?.[key]) ? (
                    <Text size='sm' weight='bold'>
                      {treatment?.[key]}
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
      </Grid>
    </>
  );
}

export default TreatmentCard;
