/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from 'react';
import { Accordion, Divider, Stack, StackProps, createStyles } from '@mantine/core';
import { Predicate } from '#/api/graphql/types';

import isEqual from 'lodash/isEqual';
import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

import PercentFilter from './filters/PercentFilter';
import NumericGreaterLessFilter from './filters/NumericGreaterLessFilter';
import NumericFilter from './filters/NumericFilter';
import TextFilter from './filters/TextFilter';
import SelectFilter from './filters/SelectFilter';
import SelectSearchFilter from './filters/SelectSearchFilter';
import DateFilter from './filters/DateFilter';

import { Filter, FilterItemProps } from '../types';

const filterComponents: { [key: string]: any } = {
  text: TextFilter,
  numeric: NumericFilter,
  numericGreaterLess: NumericGreaterLessFilter,
  percent: PercentFilter,
  select: SelectFilter,
  selectSearch: SelectSearchFilter,
  date: DateFilter,
};

function FilterItem({ filter, resetKey, onChange, icon }: FilterItemProps) {
  const Component = filterComponents[filter.type];
  return <Component {...{ filter, resetKey, onChange, icon }} />;
}

const useStyles = createStyles((theme) => ({
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
  },
}));

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
  const { classes } = useStyles();

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

  // Reset the selected predicates for UI consistency
  useEffect(() => {
    if (predicates.length !== 0) onPredicates([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              <Stack spacing='xl' mt='xs'>
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
    <Stack {...rest} spacing='lg'>
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
