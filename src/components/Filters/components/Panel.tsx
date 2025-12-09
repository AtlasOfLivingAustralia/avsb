import { Predicate } from '#/api/graphql/types';
import { useMounted } from '#/helpers';
import { Accordion, Divider, Stack, StackProps } from '@mantine/core';
import groupBy from 'lodash/groupBy';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import { Fragment, ReactElement, useEffect, useState } from 'react';
import { Filter, FilterItemProps } from '../types';
import DateFilter from './filters/DateFilter';
import NumericFilter from './filters/NumericFilter';
import NumericGreaterLessFilter from './filters/NumericGreaterLessFilter';
import PercentFilter from './filters/PercentFilter';
import SelectFilter from './filters/SelectFilter';
import SelectSearchFilter from './filters/SelectSearchFilter';
import MultiSelectFilter from './filters/MultiSelectFilter';
import TextFilter from './filters/TextFilter';

import classes from './Panel.module.css';

const filterComponents: {
  [key: string]: ({ filter, resetKey, onChange }: FilterItemProps) => ReactElement;
} = {
  text: TextFilter,
  numeric: NumericFilter,
  numericGreaterLess: NumericGreaterLessFilter,
  percent: PercentFilter,
  select: SelectFilter,
  selectSearch: SelectSearchFilter,
  multiSelect: MultiSelectFilter,
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
  onPredicates: (value: Predicate[]) => void;
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
  const mounted = useMounted();

  const handleChange = (newPred: Predicate) => {
    if (!onPredicates) return;
    let newPredicates;

    if (newPred.value === null || newPred.values === null) {
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

  // Reset the selected predicates for UI consistency
  useEffect(() => {
    if (predicates.length !== 0 && mounted) onPredicates([]);
  }, [sort]);

  if (sort === 'groups') {
    const sorted = groupBy(
      filters.map((filter) => ({ ...filter, group: filter.group || 'Other' })),
      'group',
    );

    return (
      <Accordion
        defaultValue={[Object.keys(sorted)[0]]}
        multiple
        variant='separated'
        classNames={classes}
      >
        {Object.entries(sorted).map(([group, items]) => (
          <Accordion.Item key={group} value={group}>
            <Accordion.Control>{group}</Accordion.Control>
            <Accordion.Panel>
              <Stack gap='xl' mt='xs'>
                {items.map((filter) => (
                  <FilterItem
                    key={filter.key}
                    resetKey={resetKey}
                    filter={filter}
                    onChange={handleChange}
                  />
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  const sorted = orderBy(filters, [(filter) => filter.label.toLowerCase()], ['asc']);

  return (
    <Stack {...rest} gap='lg'>
      {sorted.map((filter, filterIndex) => (
        <Fragment key={filter.key}>
          <FilterItem resetKey={resetKey} filter={filter} onChange={handleChange} />
          {filterIndex !== sorted.length - 1 && <Divider opacity={0.4} />}
        </Fragment>
      ))}
    </Stack>
  );
}

export default FilterPanel;
