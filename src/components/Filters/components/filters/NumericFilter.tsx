import { useState, useEffect } from 'react';
import { NumberInput, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

function NumericFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<number | ''>('');
  const [debounded] = useDebouncedValue(value, 300);

  const { key, label, placeholder, icon } = filter;

  useEffect(() => {
    if (value === '' || value === undefined) {
      onChange({ type: 'equals', key, value: null });
      return;
    }

    onChange({
      type: 'equals',
      key,
      value: debounded,
    });
  }, [debounded]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue('');
  }, [key, resetKey, setValue]);

  return (
    <Stack gap='sm'>
      <IconText icon={icon} title={label} />
      <NumberInput
        onChange={(val) => {
          if (val === '' || val === undefined || val === null) {
            setValue('');
          } else if (typeof val === 'number') {
            setValue(val);
          } else {
            const num = Number(val);
            setValue(isNaN(num) ? '' : num);
          }
        }}
        style={{ flexGrow: 1 }}
        placeholder={placeholder}
        decimalScale={2}
      />
    </Stack>
  );
}

export default NumericFilter;
