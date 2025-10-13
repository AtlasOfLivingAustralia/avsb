import { SeedbankFieldTrait } from '#/helpers';
import { Box, Divider, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconLeaf, TablerIcon } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

interface FieldTooltipProps {
  label: string;
  description: string;
  examples: string;
  trait?: SeedbankFieldTrait;
  Icon: TablerIcon;
}

function FieldTooltip({
  label,
  description,
  examples,
  children,
  trait,
  Icon,
}: PropsWithChildren<FieldTooltipProps>) {
  return (
    <Tooltip.Floating
      position='right-end'
      maw={300}
      multiline
      label={
        <Box>
          <Group gap='xs' mb={4}>
            <Icon size='1rem' />
            <Text
              fw='bold'
              style={{
                color: 'light-dark(white, var(--mantine-color-dark-6))',
              }}
            >
              {label}
            </Text>
          </Group>
          <Text
            fw='normal'
            size='xs'
            style={{
              color: 'light-dark(white, var(--mantine-color-dark-6))',
            }}
          >
            {description}
          </Text>
          {trait && (
            <Group gap='xs' mt='sm'>
              <ThemeIcon radius='sm' size='sm' color='gray' opacity={0.6}>
                <IconLeaf size='0.7rem' />
              </ThemeIcon>
              <Text
                size='xs'
                style={{
                  color: 'light-dark(white, var(--mantine-color-dark-6))',
                }}
              >
                Supplied by <b>AusTraits</b>, click for definition
              </Text>
            </Group>
          )}
          <Divider opacity={0.15} my='xs' />
          <Text
            fw='normal'
            size='xs'
            style={{
              color: 'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))',
            }}
          >
            <b>Example(s):</b> {examples}
          </Text>
        </Box>
      }
    >
      {children}
    </Tooltip.Floating>
  );
}

export default FieldTooltip;
