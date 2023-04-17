/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { SelectItem, Stack, StackProps } from '@mantine/core';
import isEqual from 'lodash/isEqual';

import PercentFilter from './filters/PercentFilter';
import NumericGreaterLessFilter from './filters/NumericGreaterLessFilter';
import NumericFilter from './filters/NumericFilter';
import TextFilter from './filters/TextFilter';
import SelectFilter from './filters/SelectFilter';
import DateFilter from './filters/DateFilter';

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
  | 'numeric'
  | 'numericGreaterLess'
  | 'percent'
  | 'date'
  | 'boolean';

export interface Filter {
  key: string;
  label: string;
  placeholder?: string;
  type: FilterType;
  items?: (string | SelectItem)[];
}

export interface FilterItemProps {
  filter: Filter;
  resetKey: string;
  onChange: (value: Predicate) => void;
}

const filterComponents: { [key: string]: any } = {
  text: TextFilter,
  numeric: NumericFilter,
  numericGreaterLess: NumericGreaterLessFilter,
  percent: PercentFilter,
  select: SelectFilter,
  date: DateFilter,
};

function FilterItem({ filter, resetKey, onChange }: FilterItemProps) {
  const Component = filterComponents[filter.type];
  return <Component {...{ filter, resetKey, onChange }} />;
}

interface FilterPanelProps extends StackProps {
  filters: Filter[];
  value: Predicate[];
  resetKey: string;
  onPredicates?: (value: Predicate[]) => void;
}

function FilterPanel({
  filters,
  value: predicates,
  resetKey,
  onPredicates,
  ...rest
}: FilterPanelProps) {
  const [lastPredicates, setLastPredicates] = useState<Predicate[]>([]);

  const handleChange = (newPred: Predicate) => {
    if (!onPredicates) return;
    let newPredicates;
    if (newPred.value === null) {
      newPredicates = predicates.filter(({ key }) => newPred.key !== key);
    } else {
      const existing = predicates.find(({ key }) => newPred.key === key);
      newPredicates = existing
        ? predicates.map((pred) => (pred.key === newPred.key ? newPred : pred))
        : [...predicates, newPred];
    }

    if (!isEqual(newPredicates, lastPredicates)) {
      setLastPredicates(newPredicates);
      onPredicates(newPredicates);
    }
  };

  return (
    <Stack {...rest} spacing='lg'>
      {filters.map((filter) => (
        <FilterItem key={filter.key} resetKey={resetKey} filter={filter} onChange={handleChange} />
      ))}
    </Stack>
  );
}

export default FilterPanel;
