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
        <Text>{trait?.trait_values || 'Trait Values'}</Text>
      </Skeleton>
    </Card>
  );
}

export default CategoricalTraitCard;
