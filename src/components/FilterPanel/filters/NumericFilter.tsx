import { useState, useEffect } from 'react';
import { NumberInput, Stack } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import IconText from '#/components/IconText';
import { FilterItemProps } from '..';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounded]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue('');
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <IconText icon={icon} title={label} />
      <NumberInput onChange={setValue} style={{ flexGrow: 1 }} placeholder={placeholder} />
    </Stack>
  );
}

export default NumericFilter;
