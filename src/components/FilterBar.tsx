/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { MouseEventHandler } from 'react';
import { ActionIcon, Badge, Button, Divider, Group, GroupProps, Text, rem } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons';

import { Predicate } from './FilterPanel';

function getFilterValue(predicate: Predicate) {
  const { value } = predicate;
  if (typeof value === 'object') {
    if (value?.gte !== undefined && value?.lte !== undefined) return `${value?.gte}-${value?.lte}`;
    if (value?.gte !== undefined) return `>${value?.gte}`;
    if (value?.lte !== undefined) return `<${value?.gte}`;
  }

  return `${value}`;
}

interface FilterBarProps extends GroupProps {
  predicates: Predicate[];
  onFiltersOpen?: MouseEventHandler<HTMLButtonElement> | undefined;
  onRemove?: (predicate: Predicate) => void;
}

function FilterBar({ predicates, onFiltersOpen, onRemove, ...rest }: FilterBarProps) {
  return (
    <Group {...rest}>
      <Button
        variant='outline'
        onClick={onFiltersOpen}
        leftIcon={<IconAdjustmentsHorizontal size='1rem' />}
      >
        Filters
      </Button>
      <Divider ml={4} orientation='vertical' />
      {predicates.length > 0 ? (
        predicates.map((predicate) => (
          <Badge
            key={predicate.key}
            variant='outline'
            pl={3}
            leftSection={
              <ActionIcon
                onClick={() => {
                  if (onRemove) onRemove(predicate);
                }}
                size='xs'
                color='blue'
                radius='xl'
                variant='transparent'
              >
                <IconX size={rem(10)} />
              </ActionIcon>
            }
          >
            {predicate.key}:&nbsp;
            {getFilterValue(predicate)}
          </Badge>
        ))
      ) : (
        <Text size='sm' color='dimmed'>
          No filters selected
        </Text>
      )}
    </Group>
  );
}

export default FilterBar;
