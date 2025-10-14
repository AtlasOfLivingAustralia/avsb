import { Event, SeedBankTreatment } from '#/api/graphql/types';
import { getIsDefined, treatmentFields } from '#/helpers';
import { Box, Divider, Grid, Group, Text, ThemeIcon } from '@mantine/core';
import { IconFileDescription } from '@tabler/icons-react';
import FieldTooltip from '../FieldTooltip';
import IconText from '../IconText';
import fields from './fields';

interface TreatmentCardProps {
  event: Event;
}

function TreatmentCard({ event }: TreatmentCardProps) {
  const treatment = event.extensions?.seedbank as SeedBankTreatment;
  const pretreatmentField = treatmentFields.pretreatment;

  return (
    <>
      {event.eventRemarks && (
        <IconText mb='xs' labelWidth={130} icon={IconFileDescription} title='Description'>
          {event.eventRemarks || 'Not Available'}
        </IconText>
      )}
      <FieldTooltip
        label={pretreatmentField.label}
        description={pretreatmentField.description}
        examples={pretreatmentField.examples}
        Icon={pretreatmentField.icon}
      >
        <Box>
          <IconText labelWidth={130} icon={pretreatmentField.icon} title={pretreatmentField.label}>
            {treatment.pretreatment || 'Not Available'}
          </IconText>
        </Box>
      </FieldTooltip>
      <Divider
        my='sm'
        style={{
          marginLeft: 'calc(var(--mantine-spacing-md) * -1)',
          marginRight: 'calc(var(--mantine-spacing-md) * -1)',
        }}
      />
      <Grid gutter='xs'>
        {fields
          .map((key) => ({ key, ...treatmentFields[key] }))
          .map(({ key, label, description, examples, icon: Icon, unit }) => (
            <Grid.Col key={key} span={{ xs: 4, sm: 3, md: 2, lg: 2, xl: 2 }}>
              <FieldTooltip {...{ label, description, examples, Icon }}>
                <Group>
                  <ThemeIcon variant='light' size={28} radius='xl'>
                    <Icon size='1rem' />
                  </ThemeIcon>
                  <Box>
                    <Text c='dimmed' size='xs'>
                      {label}
                    </Text>
                    {getIsDefined(treatment?.[key]) ? (
                      <Text size='sm' fw='bold'>
                        {treatment?.[key]}
                        {unit && unit}
                      </Text>
                    ) : (
                      <Text size='sm' fw='bold' c='dimmed'>
                        Not Availablefw=
                      </Text>
                    )}
                  </Box>
                </Group>
              </FieldTooltip>
            </Grid.Col>
          ))}
      </Grid>
    </>
  );
}

export default TreatmentCard;
