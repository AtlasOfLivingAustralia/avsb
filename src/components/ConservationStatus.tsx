import { DefaultMantineColor, Group, Text, ThemeIcon } from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertOctagon,
  IconAlertTriangle,
  IconFlag,
  IconQuestionMark,
  IconX,
  TablerIcon,
} from '@tabler/icons';

const getConservationDetails = (
  status: string,
): { color: DefaultMantineColor; icon: TablerIcon } => {
  switch (status.toLowerCase()) {
    case 'extinct':
      return {
        color: 'dark',
        icon: IconX,
      };
    case 'locally extinct':
      return {
        color: 'dark',
        icon: IconX,
      };
    case 'critically endangered':
      return {
        color: 'red',
        icon: IconAlertOctagon,
      };
    case 'endangered':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'rare':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'vulnerable':
      return {
        color: 'yellow',
        icon: IconAlertCircle,
      };
    case 'near threatened':
      return {
        color: 'yellow',
        icon: IconFlag,
      };
    default:
      return {
        color: 'red',
        icon: IconQuestionMark,
      };
  }
};

interface ConservationStatusProps {
  place: string;
  initials: string;
  status: string;
}

function ConservationStatus({ place, status, initials }: ConservationStatusProps) {
  const { color } = getConservationDetails(status);

  return (
    <Group spacing='sm'>
      <ThemeIcon variant='light' radius='xl' size='xl' color={color}>
        <Text weight='bold' color={color} size='xs'>
          {initials}
        </Text>
      </ThemeIcon>
      <Text size='sm'>
        {status} in {place}
      </Text>
    </Group>
  );
}

export default ConservationStatus;
