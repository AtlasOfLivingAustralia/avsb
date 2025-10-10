import { Measurement } from '#/api/graphql/types';
import { Badge, Box, Group, Paper, PaperProps, Text, Tooltip } from '@mantine/core';

interface MeasurementCardContentProps extends PaperProps {
  measurement: Measurement;
}

interface MeasurementCardProps {
  measurement: Measurement;
}

function MeasurementCardContent({ measurement, ...rest }: MeasurementCardContentProps) {
  return (
    <Paper py={6} px={8} mih={60} withBorder {...rest}>
      <Group justify='space-between' gap='xs'>
        <Text fw='bold' size='sm'>
          {measurement.measurementType}
        </Text>
        {measurement.measurementDeterminedDate && (
          <Badge size='xs'>{measurement.measurementDeterminedDate}</Badge>
        )}
      </Group>
      <Group gap={4} justify='flex-start'>
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
      transitionProps={{ transition: 'pop' }}
      withArrow
      label={
        <Box>
          <Text fw='bold'>Remarks</Text>
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
