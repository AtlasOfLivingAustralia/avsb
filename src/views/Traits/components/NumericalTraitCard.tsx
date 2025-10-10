import { NumericTrait } from '#/api';
import { ActionIcon, Card, Chip, Group, Skeleton, Text, Tooltip } from '@mantine/core';
import { IconQuestionCircle } from '@tabler/icons';

interface NumericTraitCardProps {
  trait: NumericTrait | null;
}

function NumericTraitCard({ trait }: NumericTraitCardProps) {
  const visible = !trait;

  return (
    <Card h='100%'>
      <Skeleton visible={visible} mb='xs'>
        <Group justify='space-between'>
          <Text size='xs' tt='uppercase' c='dimmed' fw='bold'>
            {trait?.trait_name || 'Trait Name'}
          </Text>
          <Tooltip label='View definition' position='left' withArrow>
            <ActionIcon component='a' href={trait?.definition} target='_blank' size='sm'>
              <IconQuestionCircle size='1rem' />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Skeleton>
      <Skeleton visible={visible}>
        <Group gap='xs'>
          {trait?.mean !== '' && (
            <Chip checked={false} size='xs'>
              <b>Mean</b>&nbsp;{trait?.mean}
              {trait?.unit}
            </Chip>
          )}
          {trait?.min !== '' && (
            <Chip checked={false} size='xs'>
              <b>Min</b>&nbsp;{trait?.min}
              {trait?.unit}
            </Chip>
          )}
          {trait?.max !== '' && (
            <Chip checked={false} size='xs'>
              <b>Max</b>&nbsp;{trait?.max}
              {trait?.unit}
            </Chip>
          )}
        </Group>
      </Skeleton>
    </Card>
  );
}

export default NumericTraitCard;
