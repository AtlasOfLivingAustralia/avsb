import { SeedbankFieldTrait } from '#/helpers';
import { Box, Divider, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconLeaf, TablerIcon } from '@tabler/icons';
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
            weight='normal'
            size='xs'
            sx={(theme) => ({
              color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
            })}
          >
            {description}
          </Text>
          {trait && (
            <Group spacing='xs' mt='sm'>
              <ThemeIcon radius='sm' size='sm' color='gray' opacity={0.6}>
                <IconLeaf size='0.7rem' />
              </ThemeIcon>
              <Text
                size='xs'
                sx={(theme) => ({
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : 'white',
                })}
              >
                Supplied by <b>AusTraits</b>, click for definition
              </Text>
            </Group>
          )}
          <Divider opacity={0.15} my='xs' />
          <Text
            weight='normal'
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
    </Tooltip.Floating>
  );
}

export default FieldTooltip;
