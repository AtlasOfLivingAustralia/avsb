import { DefaultMantineColor, Group, Text, ThemeIcon, useMantineTheme } from '@mantine/core';
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
    case 'sensitive':
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
  const theme = useMantineTheme();

  return (
    <Group spacing='md' position='center'>
      <ThemeIcon
        opacity={initials ? 1 : 0.6}
        variant={initials ? 'light' : 'gradient'}
        radius='xl'
        size={initials ? 'xl' : 'md'}
        color={color}
        gradient={{ from: theme.colors[color][9], to: theme.colors[color][6] }}
      >
        {initials && (
          <Text weight='bold' color={color} size='xs'>
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
