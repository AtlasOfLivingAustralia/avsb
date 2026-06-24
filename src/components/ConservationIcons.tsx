import {
  Group,
  type MantineStyleProp,
  Text,
  ThemeIcon,
  Tooltip,
  useComputedColorScheme,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import type { Event, Measurement } from '#/api';
import { getConservationDetails } from './ConservationStatus';

const CONSERVATION_LISTS: { [key: string]: string } = {
  'EPBC Act Threatened Species': 'EPBC',
  'New South Wales : Conservation Status': 'NSW',
  'Northern Territory : Conservation Status': 'NT',
  'South Australia : Conservation Status': 'SA',
  'Victoria : Conservation Status': 'VIC',
  'Western Australia: Conservation Status': 'WA',
  'Tasmania : Conservation Status': 'TAS',
  'Queensland : Conservation Status': 'QLD',
  'Australian Capital Territory : Conservation Status': 'ACT',
};

const CONSERVATION_KEYS = Object.keys(CONSERVATION_LISTS);

const ConservationEmofs = ({ emofs }: { emofs: Measurement[] }) => {
  return (
    <Group gap='md' py={4}>
      {emofs.map((emof) => {
        const details = getConservationDetails(emof.measurementValue || '');

        return (
          <Group gap='xs' key={emof.measurementType}>
            <ThemeIcon color={details.color} variant='light' size='lg' radius='xl'>
              <Text size='xs' fw='bold'>
                {CONSERVATION_LISTS[emof.measurementType || '']}
              </Text>
            </ThemeIcon>
            <Text
              c='light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-4))'
              size='sm'
            >
              {emof.measurementValue}
            </Text>
          </Group>
        );
      })}
    </Group>
  );
};

interface ConservationIconsProps {
  event: Event;
  style?: MantineStyleProp;
}

export const ConservationIcons = ({ event, style }: ConservationIconsProps) => {
  const isDark = useComputedColorScheme() === 'dark';
  const emofs =
    event.measurementOrFacts?.filter(
      ({ measurementType }) => measurementType && CONSERVATION_KEYS.includes(measurementType),
    ) || [];

  if (emofs.length < 1) return null;

  return (
    <Tooltip
      color={isDark ? 'dark' : 'var(--mantine-color-gray-2)'}
      position='right'
      label={<ConservationEmofs emofs={emofs} />}
      withArrow
    >
      <ThemeIcon color='orange' variant='light' opacity={0.6} style={style}>
        <IconAlertTriangle size='1rem' />
      </ThemeIcon>
    </Tooltip>
  );
};
