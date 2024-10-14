import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

import stats from '../../../assets/stats.json';

interface StatCardProps {
  id: string;
  name: string;
  icon: TablerIcon;
}

function StatCard({ id, name, icon: Icon }: StatCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = (stats as any)[id];
  return (
    <Box pt='sm' pb='xl'>
      <Group position='apart' pr='md'>
        <Stack spacing={0}>
          <Text size={28} weight='bold' opacity={0.8}>
            {value
              ? value.toLocaleString(undefined, { minimumFractionDigits: 2 }).replace('.00', '')
              : id}
          </Text>
          <Text color='dimmed'>{name}</Text>
        </Stack>
        <ThemeIcon variant='light' size='xl' radius='xl'>
          <Icon size='1rem' />
        </ThemeIcon>
      </Group>
    </Box>
  );
}

export default StatCard;
