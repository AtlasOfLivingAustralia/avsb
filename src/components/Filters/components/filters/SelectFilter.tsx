import { useState, useEffect } from 'react';
import { Select, Stack } from '@mantine/core';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

function SelectFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const { key, label, placeholder, items, icon } = filter;
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
      <IconText icon={icon} title={label} />
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
