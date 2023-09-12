import { CategoricalTrait } from '#/api';
import { ActionIcon, Card, Group, Skeleton, Text, Tooltip } from '@mantine/core';
import { IconQuestionCircle } from '@tabler/icons';

interface CategoricalTraitProps {
  trait: CategoricalTrait | null;
}

function CategoricalTraitCard({ trait }: CategoricalTraitProps) {
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
        <Text>{trait?.trait_values || 'Trait Values'}</Text>
      </Skeleton>
    </Card>
  );
}

export default CategoricalTraitCard;
