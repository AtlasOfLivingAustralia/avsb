import { useState, useEffect } from 'react';
import { Select, Stack, Text } from '@mantine/core';

import { FilterItemProps } from '..';

function SelectFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const { key, label, placeholder, items } = filter;
  const [value, setValue] = useState<string | null | undefined>(null);

  const onSelect = (newValue: string | null) => {
    setValue(newValue);
    onChange({
      type: 'equals',
      key,
      value: newValue,
    });
  };

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue('');
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <Text size='sm'>{label}</Text>
      <Select
        value={value}
        placeholder={placeholder}
        data={items || []}
        onChange={onSelect}
        searchable
        clearable
        allowDeselect
      />
    </Stack>
  );
}

export default SelectFilter;
