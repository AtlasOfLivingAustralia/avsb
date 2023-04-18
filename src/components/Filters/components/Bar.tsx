/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { MouseEventHandler } from 'react';
import { ActionIcon, Badge, Button, Divider, Group, GroupProps, Text, rem } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons';

import { Filter, Predicate } from '../types';

function getPredicateValue(predicate: Predicate) {
  const { key, value } = predicate;

  // Date handling
  if (value && key.toLowerCase().includes('date')) {
    if (typeof value === 'object') {
      if (value?.gte !== undefined && value?.lte !== undefined)
        return `${new Date(value.gte).toLocaleDateString()}-${new Date(
          value.lte,
        ).toLocaleDateString()}`;
      if (value?.gte !== undefined) return `>${new Date(value.gte).toLocaleDateString()}`;
      if (value?.lte !== undefined) return `<${new Date(value.lte).toLocaleDateString()}`;
    } else {
      return new Date(value).toLocaleDateString();
    }
  }

  if (typeof value === 'object') {
    if (value?.gte !== undefined && value?.lte !== undefined) return `${value?.gte}-${value?.lte}`;
    if (value?.gte !== undefined) return `>${value?.gte}`;
    if (value?.lte !== undefined) return `<${value?.lte}`;
  }

  if (key.toLowerCase().includes('date')) return new Date(value as number).toLocaleDateString();
  return `${value}`;
}

interface FilterBarProps extends GroupProps {
  filters: Filter[];
  predicates: Predicate[];
  onFiltersOpen?: MouseEventHandler<HTMLButtonElement> | undefined;
  onRemove?: (predicate: Predicate) => void;
}

function FilterBar({ filters, predicates, onFiltersOpen, onRemove, ...rest }: FilterBarProps) {
  const getPredicateLabel = (key: string) =>
    filters.find(({ key: filterKey }) => key === filterKey)?.label;

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
            {getPredicateLabel(predicate.key) || predicate.key}:&nbsp;
            {getPredicateValue(predicate)}
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
