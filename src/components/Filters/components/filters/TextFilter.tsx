import { useState, useEffect } from 'react';
import { Stack, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../Panel';

function TextFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<string>('');
  const [debounced] = useDebouncedValue(value, 300);

  const { key, label, placeholder, icon } = filter;

  useEffect(() => {
    if (value === '') {
      onChange({ type: 'equals', key, value: null });
      return;
    }

    onChange({
      type: 'equals',
      key,
      value: debounced,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue('');
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <IconText icon={icon} title={label} />
      <TextInput
        value={value}
        onChange={(event) => setValue(event?.currentTarget.value)}
        style={{ flexGrow: 1 }}
        placeholder={placeholder}
      />
    </Stack>
  );
}

export default TextFilter;
