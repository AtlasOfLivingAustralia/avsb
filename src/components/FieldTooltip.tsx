import { Box, Divider, Group, Text, Tooltip } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import { PropsWithChildren } from 'react';

interface FieldTooltipProps {
  label: string;
  description: string;
  examples: string;
  Icon: TablerIcon;
}

function FieldTooltip({
  label,
  description,
  examples,
  children,
  Icon,
}: PropsWithChildren<FieldTooltipProps>) {
  return (
    <Tooltip
      position='top'
      withArrow
      maw={300}
      multiline
      label={
        <Box>
          <Group spacing='xs' mb={4}>
            <Icon size='1rem' />
            <Text
              weight='bold'
              sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
              })}
            >
              {label}
            </Text>
          </Group>
          <Text
            size='xs'
            sx={(theme) => ({
              color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
            })}
          >
            {description}
          </Text>
          <Divider opacity={0.15} my='xs' />
          <Text
            size='xs'
            sx={(theme) => ({
              color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
            })}
          >
            <b>Example(s):</b> {examples}
          </Text>
        </Box>
      }
    >
      {children}
    </Tooltip>
  );
}

export default FieldTooltip;
