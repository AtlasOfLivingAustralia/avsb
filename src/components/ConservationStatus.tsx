import { DefaultMantineColor, Group, Text, ThemeIcon } from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertOctagon,
  IconAlertTriangle,
  IconFlag,
  IconQuestionMark,
  IconX,
  TablerIcon,
} from '@tabler/icons-react';

export const getConservationDetails = (
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
    case 'ex':
      return {
        color: 'dark',
        icon: IconX,
      };
    case 'critically endangered':
      return {
        color: 'red',
        icon: IconAlertOctagon,
      };
    case 'cr':
      return {
        color: 'red',
        icon: IconAlertOctagon,
      };
    case 'endangered':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'en':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'rare':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'sensitive':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'listed':
      return {
        color: 'orange',
        icon: IconAlertTriangle,
      };
    case 'vulnerable':
      return {
        color: 'yellow',
        icon: IconAlertCircle,
      };
    case 'vu':
      return {
        color: 'yellow',
        icon: IconAlertCircle,
      };
    case 'near threatened':
      return {
        color: 'yellow',
        icon: IconFlag,
      };
    case 'nt':
      return {
        color: 'yellow',
        icon: IconFlag,
      };
    case 'special least concern':
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
  initials?: string;
  status: string;
}

function ConservationStatus({ place, status, initials }: ConservationStatusProps) {
  const { color } = getConservationDetails(status);

  return (
    <Group gap='md' justify='center'>
      <ThemeIcon
        opacity={initials ? 1 : 0.6}
        variant={initials ? 'light' : 'gradient'}
        radius='xl'
        size={initials ? 'xl' : 'md'}
        color={color}
        gradient={{
          from: `var(--mantine-color-${color}-9)`,
          to: `var(--mantine-color-${color}-6)`,
        }}
      >
        {initials && (
          <Text fw='bold' c={color} size='xs'>
            {initials === 'Q' ? 'QLD' : initials}
          </Text>
        )}
      </ThemeIcon>
      <Text size='sm'>
        <b>{status}</b> in {place}
      </Text>
    </Group>
  );
}

export default ConservationStatus;
