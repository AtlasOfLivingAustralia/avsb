import { ComboboxItem } from '@mantine/core';
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
  items?: (string | ComboboxItem)[];
  fetchItems?: (query: string) => Promise<ComboboxItem[]>;
  icon?: TablerIcon;
}

export interface FilterItemProps {
  filter: Filter;
  resetKey: string;
  onChange: (value: Predicate) => void;
  icon?: TablerIcon;
}
