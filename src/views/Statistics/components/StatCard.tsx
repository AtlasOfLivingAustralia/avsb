import { Group, Paper, Stack, Text, ThemeIcon } from '@mantine/core';
import { type TablerIcon } from '@tabler/icons-react';

interface StatCardProps {
  name: string;
  value: string | number;
  icon: TablerIcon;
}

function StatCard({ name, value, icon: Icon }: StatCardProps) {
  return (
    <Paper pt='sm' px='sm' pb='lg' withBorder radius='xl' shadow='lg'>
      <Group justify='space-between' align='flex-start'>
        <Stack gap={0}>
          <Text fz={28} fw='bold' opacity={0.8}>
            {value}
          </Text>
          <Text size='sm' c='dimmed'>
            {name}
          </Text>
        </Stack>
        <ThemeIcon variant='light' size='xl' radius='xl'>
          <Icon size='1rem' />
        </ThemeIcon>
      </Group>
    </Paper>
  );
}

export default StatCard;
