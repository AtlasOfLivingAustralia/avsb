import { CategoricalTrait } from '#/api';
import { ActionIcon, Flex, Paper, Skeleton, Text, Tooltip } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';

interface CategoricalTraitProps {
  trait: CategoricalTrait | null;
}

function CategoricalTraitCard({ trait }: CategoricalTraitProps) {
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
      <Skeleton visible={visible}>
        <Text>{trait?.trait_values || 'Trait Values'}</Text>
      </Skeleton>
    </Paper>
  );
}

export default CategoricalTraitCard;
