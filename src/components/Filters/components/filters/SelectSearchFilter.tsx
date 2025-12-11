import { useState, useEffect } from 'react';
import { Stack } from '@mantine/core';

import { SelectSearch, IconText } from '#/components';
import { FilterItemProps } from '../../types';

function SelectDataFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const { key, label, placeholder, fetchItems, icon } = filter;
  const [value, setValue] = useState<string | null | undefined>(null);

  if (!fetchItems) throw new Error(`fetchItems property must be present on '${key}' filter!`);

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
    <Stack gap='sm'>
      <IconText icon={icon} title={label} />
      <SelectSearch
        value={value}
        fetchItems={fetchItems}
        onChange={onSelect}
        placeholder={placeholder}
      />
    </Stack>
  );
}

export default SelectDataFilter;
