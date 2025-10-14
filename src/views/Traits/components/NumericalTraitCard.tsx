import { NumericTrait } from '#/api';
import { ActionIcon, Flex, Group, Paper, Skeleton, Text, Tooltip } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';

interface NumericTraitCardProps {
  trait: NumericTrait | null;
}

function NumericTraitCard({ trait }: NumericTraitCardProps) {
  const visible = !trait;

  return (
    <Paper
      p='md'
      h='100%'
      bg='light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-5))'
    >
      <Skeleton visible={visible} mb='xs'>
        <Flex justify='space-between' gap='sm'>
          <Text size='xs' tt='uppercase' c='dimmed' fw='bold'>
            {trait?.trait_name || 'Trait Name'}
          </Text>
          <Tooltip label={<Text size='xs'>View definition</Text>} position='left' withArrow>
            <ActionIcon
              variant='light'
              component='a'
              href={trait?.definition}
              target='_blank'
              size='md'
            >
              <IconBook size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Skeleton>
      <Skeleton visible={visible} mt='sm'>
        <Group gap='xs'>
          {trait?.mean !== '' && (
            <Paper px={8} py={4} withBorder>
              <Text size='xs'>
                <b>Mean</b>&nbsp;{trait?.mean}
                {trait?.unit ? ` ${trait.unit}` : ''}
              </Text>
            </Paper>
          )}
          {trait?.min !== '' && (
            <Paper px={8} py={4} withBorder>
              <Text size='xs'>
                <b>Min</b>&nbsp;{trait?.min}
                {trait?.unit ? ` ${trait.unit}` : ''}
              </Text>
            </Paper>
          )}
          {trait?.max !== '' && (
            <Paper px={8} py={4} withBorder>
              <Text size='xs'>
                <b>Max</b>&nbsp;{trait?.max}
                {trait?.unit ? ` ${trait.unit}` : ''}
              </Text>
            </Paper>
          )}
        </Group>
      </Skeleton>
    </Paper>
  );
}

export default NumericTraitCard;
