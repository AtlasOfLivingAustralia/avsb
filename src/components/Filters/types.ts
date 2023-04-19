import { SelectItem } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

type PredicateType =
  | 'and'
  | 'or'
  | 'not'
  | 'equals'
  | 'in'
  | 'within'
  | 'isNotNull'
  | 'like'
  | 'fuzzy'
  | 'nested'
  | 'range';

type PredicateValue = string | number | null | { gte?: number | ''; lte?: number | '' };

export interface Predicate {
  type: PredicateType;
  key: string;
  value?: PredicateValue;
  values?: PredicateValue[];
  predicate?: Predicate;
  predicates?: Predicate[];
}

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
