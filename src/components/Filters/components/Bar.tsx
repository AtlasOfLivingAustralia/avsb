import { Predicate } from '#/api/graphql/types';
import {
  ActionIcon,
  Badge,
  Button,
  Chip,
  Divider,
  Group,
  GroupProps,
  Paper,
  rem,
  Text,
} from '@mantine/core';
import { IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react';
import { MouseEventHandler } from 'react';

import { Filter } from '../types';

function getPredicateValue(predicate: Predicate) {
  const { key, value, values } = predicate;

  // Date handling
  if (value && key?.toLowerCase().includes('date')) {
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

  if (key?.toLowerCase().includes('date')) return new Date(value as number).toLocaleDateString();

  if (values) return values.join(', ');
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
        leftSection={<IconAdjustmentsHorizontal size='1rem' />}
      >
        Filters
      </Button>
      <Divider ml={4} orientation='vertical' />
      <Group gap={4}>
        {predicates.length > 0 ? (
          predicates.map((predicate) => (
            <Paper
              key={predicate.key}
              bg='light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))'
              pr={8}
              h={36}
              radius='xl'
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ActionIcon
                ml={4}
                mr='xs'
                color='grey'
                onClick={() => {
                  if (onRemove) onRemove(predicate);
                }}
              >
                <IconX size='1rem' />
              </ActionIcon>
              <Text size='xs' style={{ cursor: 'default' }}>
                <b>{getPredicateLabel(predicate.key || '') || predicate.key}</b>&nbsp;
                {getPredicateValue(predicate)}
              </Text>
            </Paper>
          ))
        ) : (
          <Text size='sm' c='dimmed'>
            No filters selected
          </Text>
        )}
      </Group>
    </Group>
  );
}

export default FilterBar;
