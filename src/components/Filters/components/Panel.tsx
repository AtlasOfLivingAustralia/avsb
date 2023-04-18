/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import { Fragment, useState } from 'react';
import { Divider, Stack, StackProps } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

import isEqual from 'lodash/isEqual';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

import PercentFilter from './filters/PercentFilter';
import NumericGreaterLessFilter from './filters/NumericGreaterLessFilter';
import NumericFilter from './filters/NumericFilter';
import TextFilter from './filters/TextFilter';
import SelectFilter from './filters/SelectFilter';
import DateFilter from './filters/DateFilter';

import { Filter, Predicate } from '../types';

export interface FilterItemProps {
  filter: Filter;
  resetKey: string;
  onChange: (value: Predicate) => void;
  icon?: TablerIcon;
}

const filterComponents: { [key: string]: any } = {
  text: TextFilter,
  numeric: NumericFilter,
  numericGreaterLess: NumericGreaterLessFilter,
  percent: PercentFilter,
  select: SelectFilter,
  date: DateFilter,
};

function FilterItem({ filter, resetKey, onChange, icon }: FilterItemProps) {
  const Component = filterComponents[filter.type];
  return <Component {...{ filter, resetKey, onChange, icon }} />;
}

interface FilterPanelProps extends StackProps {
  filters: Filter[];
  predicates: Predicate[];
  sort: 'alphabetical' | 'groups';
  resetKey: string;
  onPredicates?: (value: Predicate[]) => void;
}

function FilterPanel({
  filters,
  predicates,
  sort,
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

  if (sort === 'groups') console.log(groupBy(filters, 'type'));

  const sortedFilters = orderBy(filters, [(filter) => filter.label.toLowerCase()], ['asc']);

  return (
    <Stack {...rest} spacing='lg'>
      {sortedFilters.map((filter, i, arr) => (
        <Fragment key={filter.key}>
          <FilterItem resetKey={resetKey} filter={filter} onChange={handleChange} />
          {i !== arr.length - 1 && <Divider />}
        </Fragment>
      ))}
    </Stack>
  );
}

export default FilterPanel;
