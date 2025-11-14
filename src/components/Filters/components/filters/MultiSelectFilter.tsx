import { useState, useEffect } from 'react';
import { MultiSelect, Stack } from '@mantine/core';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

function MultiSelectFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const { key, label, placeholder, items, icon } = filter;
  const [value, setValue] = useState<string[]>([]);

  const onSelect = (newValue: string[]) => {
    setValue(newValue);
    onChange({
      type: 'in',
      key,
      values: newValue.length > 0 ? newValue : null,
    });
  };

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue([]);
  }, [key, resetKey, setValue]);

  return (
    <Stack gap='sm'>
      <IconText icon={icon} title={label} />
      <MultiSelect
        value={value}
        placeholder={placeholder}
        data={items || []}
        onChange={onSelect}
        searchable
        clearable
      />
    </Stack>
  );
}

export default MultiSelectFilter;
