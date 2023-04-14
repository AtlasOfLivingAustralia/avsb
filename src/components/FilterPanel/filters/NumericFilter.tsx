import { useEffect } from 'react';
import { NumberInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

import { FilterItemProps } from '..';

function NumericFilter({ filter, onChange }: FilterItemProps) {
  const [value, setValue] = useDebouncedState<number | ''>('', 300);

  const { key, label, placeholder } = filter;

  useEffect(() => {
    if (value === '') {
      onChange({ key, value: null });
      return;
    }

    onChange({
      key,
      value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <NumberInput
      label={label}
      onChange={setValue}
      style={{ flexGrow: 1 }}
      placeholder={placeholder}
    />
  );
}

export default NumericFilter;
