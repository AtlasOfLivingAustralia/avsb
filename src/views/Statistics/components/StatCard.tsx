import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { TablerIcon } from '@tabler/icons-react';

import stats from '../../../assets/stats/2025.json';

interface StatCardProps {
  id: string;
  name: string;
  icon: TablerIcon;
}

function StatCard({ id, name, icon: Icon }: StatCardProps) {
  // biome-ignore lint/suspicious/noExplicitAny: Arbitrary JSON
  const value = (stats as any)[id];
  return (
    <Paper pt='sm' px='sm' pb='lg' withBorder radius='xl' shadow='lg'>
      <Group justify='space-between' align='flex-start'>
        <Stack gap={0}>
          <Text fz={28} fw='bold' opacity={0.8}>
            {value
              ? value.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace('.00', '')
              : id}
          </Text>
          <Text size='sm' c='dimmed'>{name}</Text>
        </Stack>
        <ThemeIcon variant='light' size='xl' radius='xl'>
          <Icon size='1rem' />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

export default StatCard;
