import { useState, useEffect } from 'react';
import { NumberInput, Text, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { FilterItemProps } from '..';

function NumericFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<number | ''>('');
  const [debounded] = useDebouncedValue(value, 300);

  const { key, label, placeholder } = filter;

  useEffect(() => {
    if (value === '') {
      onChange({ type: 'equals', key, value: null });
      return;
    }

    onChange({
      type: 'equals',
      key,
      value: debounded,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounded]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue('');
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <Text size='sm'>{label}</Text>
      <NumberInput
        value={value}
        onChange={setValue}
        style={{ flexGrow: 1 }}
        placeholder={placeholder}
      />
    </Stack>
  );
}

export default NumericFilter;
