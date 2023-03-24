import { Badge, Box, Group, Paper, PaperProps, Text, Tooltip } from '@mantine/core';
import { Measurement } from '#/api/graphql/types';

interface MeasurementCardContentProps extends PaperProps {
  measurement: Measurement;
}

interface MeasurementCardProps {
  measurement: Measurement;
}

function MeasurementCardContent({ measurement, ...rest }: MeasurementCardContentProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Paper py={6} px={8} mih={60} withBorder {...rest}>
      <Group position='apart' spacing='xs'>
        <Text weight='bold' size='sm'>
          {measurement.measurementType}
        </Text>
        {measurement.measurementDeterminedDate && (
          <Badge size='xs'>{measurement.measurementDeterminedDate}</Badge>
        )}
      </Group>
      <Group spacing={4} position='left'>
        {measurement.measurementValue && <Text size='xs'>{measurement.measurementValue}</Text>}
        {measurement.measurementUnit && <Text size='xs'>{measurement.measurementUnit}</Text>}
        {measurement.measurementMethod && (
          <Text size='xs'>(Method: {measurement.measurementMethod || 'Method'})</Text>
        )}
      </Group>
    </Paper>
  );
}

function MeasurementCard({ measurement }: MeasurementCardProps) {
  return measurement.measurementRemarks ? (
    <Tooltip
      withArrow
      label={
        <Box>
          <Text weight='bold'>Remarks</Text>
          <Text>{measurement.measurementRemarks}</Text>
        </Box>
      }
    >
      <Box>
        <MeasurementCardContent measurement={measurement} />
      </Box>
    </Tooltip>
  ) : (
    <MeasurementCardContent measurement={measurement} />
  );
}

export default MeasurementCard;
