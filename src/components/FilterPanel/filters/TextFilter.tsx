import { useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';

import { FilterItemProps } from '..';

function TextFilter({ filter, onChange }: FilterItemProps) {
  const [value, setValue] = useDebouncedState<string>('', 300);

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
    <TextInput
      label={label}
      onChange={(event) => setValue(event.currentTarget.value)}
      style={{ flexGrow: 1 }}
      placeholder={placeholder}
    />
  );
}

export default TextFilter;
