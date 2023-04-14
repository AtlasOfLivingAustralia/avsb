/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@mantine/core';
import PercentFilter from './filters/PercentFilter';
import NumericGreaterLessFilter from './filters/NumericGreaterLessFilter';
import NumericFilter from './filters/NumericFilter';
import TextFilter from './filters/TextFilter';

type FilterType = 'text' | 'numeric' | 'numericGreaterLess' | 'percent' | 'boolean';

interface Filter {
  key: string;
  label: string;
  placeholder?: string;
  type: FilterType;
}

export interface FilterItemProps {
  filter: Filter;
  onChange: (value: any) => void;
}

const filterComponents: { [key: string]: any } = {
  text: TextFilter,
  numeric: NumericFilter,
  numericGreaterLess: NumericGreaterLessFilter,
  percent: PercentFilter,
};

function FilterItem({ filter, onChange }: FilterItemProps) {
  const Component = filterComponents[filter.type];
  return <Component filter={filter} onChange={onChange} />;
}

interface FilterPanelProps {
  filters: Filter[];
}

function FilterPanel({ filters }: FilterPanelProps) {
  return (
    <Stack spacing='lg'>
      {filters.map((filter) => (
        <FilterItem
          key={filter.key}
          filter={filter}
          onChange={(pred) => console.log(JSON.stringify(pred, null, 2))}
        />
      ))}
    </Stack>
  );
}

export default FilterPanel;
