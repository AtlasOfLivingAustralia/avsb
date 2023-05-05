import { SelectItem } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import { Predicate } from '#/api/graphql/types';

export type FiltersSort = 'alphabetical' | 'groups';

type FilterType =
  | 'text'
  | 'select'
  | 'selectSearch'
  | 'numeric'
  | 'numericGreaterLess'
  | 'percent'
  | 'date'
  | 'boolean';

export interface Filter {
  key: string;
  label: string;
  type: FilterType;
  placeholder?: string;
  group?: string;
  items?: (string | SelectItem)[];
  fetchItems?: (query: string) => Promise<SelectItem[]>;
  icon?: TablerIcon;
}

export interface FilterItemProps {
  filter: Filter;
  resetKey: string;
  onChange: (value: Predicate) => void;
  icon?: TablerIcon;
}
