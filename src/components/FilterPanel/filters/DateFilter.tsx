import { useEffect, useState } from 'react';
import { Stack, Text, Group, Paper, SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useMounted from '#/helpers/useMounted';

import { FilterItemProps } from '..';

function DateFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<Date | null>();
  const [operation, setOperation] = useState<string>('equals');
  const { key, label, placeholder } = filter;
  const mounted = useMounted();

  // useEffect handler for select / number input updates
  useEffect(() => {
    if (!mounted) return;
    if (value === null) {
      onChange({
        type: 'equals',
        key,
        value: null,
      });
      return;
    }
    if (operation === 'equals') {
      onChange({
        type: 'equals',
        key,
        value: value?.getTime(),
      });
    }
    if (operation === 'gte') {
      onChange({
        type: 'range',
        key,
        value: {
          gte: value?.getTime(),
        },
      });
    }
    if (operation === 'lte') {
      onChange({
        type: 'range',
        key,
        value: {
          lte: value?.getTime(),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, operation]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) {
      setOperation('equals');
      setValue(null);
    }
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <Text size='sm'>{label}</Text>
      <Group>
        <Paper withBorder>
          <SegmentedControl
            value={operation}
            onChange={setOperation}
            data={[
              { value: 'equals', label: '=' },
              { value: 'gte', label: '>' },
              { value: 'lte', label: '<' },
            ]}
          />
        </Paper>
        <DatePickerInput
          style={{ flexGrow: 1 }}
          value={value}
          onChange={setValue}
          placeholder={placeholder}
          clearable
        />
      </Group>
    </Stack>
  );
}

export default DateFilter;
