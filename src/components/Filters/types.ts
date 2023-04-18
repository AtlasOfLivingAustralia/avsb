import { SelectItem } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

type FilterType =
  | 'text'
  | 'select'
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
  items?: (string | SelectItem)[];
  icon?: TablerIcon;
}

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
