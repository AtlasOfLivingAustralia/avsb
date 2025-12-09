import { Event, Measurement } from "#/api"
import { Group, MantineStyleProp, Text, ThemeIcon, Tooltip, useComputedColorScheme } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { getConservationDetails } from "./ConservationStatus";

const SENSITIVE_LISTS: { [key: string]: string } = {
  'EPBC Act Threatened Species': 'EPBC',
  'ACT Sensitive Species List': 'ACT',
  'South Australian Sensitive Species': 'SA',
  'Queensland Confidential Species': 'QLD',
  'Victorian Restricted Species List': 'VIC',
  'Western Australia: Sensitive Species': 'WA',
  'Northern Territory Sensitive Species List': 'NT',
  'NSW Sensitive Species List': 'NSW',
  'New Zealand Sensitive Species List for Vascular Plants': 'NZ',
  'Tasmanian Restricted Species': 'TAS'
};

const SENSITIVE_KEYS = Object.keys(SENSITIVE_LISTS);

const SensitiveEmofs = ({ emofs }: { emofs: Measurement[] }) => {
  return (
    <Group gap='md' py={4}>
      {emofs.map((emof) => {
        const details = getConservationDetails(emof.measurementValue || '');

        return (
          <Group gap='xs' key={emof.measurementType}>
            <ThemeIcon color={details.color} variant='light' size='lg' radius='xl'>
              <Text size='xs' fw='bold'>{SENSITIVE_LISTS[emof.measurementType || '']}</Text>
            </ThemeIcon>
            <Text c='light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-4))' size='sm'>
              {emof.measurementValue}
            </Text>
          </Group>
        );
      })}
    </Group>
  )
}

interface SensitiveIconsProps {
  event: Event;
  style?: MantineStyleProp;
}

export const SensitiveIcons = ({ event, style }: SensitiveIconsProps) => {
  const isDark = useComputedColorScheme() === 'dark';
  const emofs = event.measurementOrFacts?.filter(({ measurementType }) =>
    measurementType && SENSITIVE_KEYS.includes(measurementType)
  ) || [];

  if (emofs.length < 1) return null;

  return (
    <Tooltip color={isDark ? 'dark' : 'var(--mantine-color-gray-2)'} position='right' label={<SensitiveEmofs emofs={emofs} />} withArrow>
      <ThemeIcon color='orange' variant='light' opacity={0.6} style={style}>
        <IconAlertTriangle size="1rem" />
      </ThemeIcon>
    </Tooltip>
  );
}