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
        <Group position='apart'>
          <Text size='xs' transform='uppercase' color='dimmed' weight='bold'>
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
        <Group spacing='xs'>
          <Chip checked={false} size='xs'>
            <b>Mean</b>&nbsp;{trait?.mean}
            {trait?.unit}
          </Chip>
          {trait?.min !== '' && trait?.max !== '' && (
            <Chip checked={false} size='xs'>
              <b>Range</b>&nbsp;{trait?.min}-{trait?.max}
              {trait?.unit}
            </Chip>
          )}
        </Group>
      </Skeleton>
    </Card>
  );
}

export default NumericTraitCard;
