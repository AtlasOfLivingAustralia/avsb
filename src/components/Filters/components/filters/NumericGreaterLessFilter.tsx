import { useEffect, useState } from 'react';
import { Stack, Group, Paper, SegmentedControl, NumberInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import useMounted from '#/helpers/useMounted';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

function NumericGreaterLessFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<number | ''>();
  const [upperValue, setUpperValue] = useState<number | ''>();
  const [debounced] = useDebouncedValue(value, 300);
  const [debouncedUpper] = useDebouncedValue(upperValue, 300);
  const [operation, setOperation] = useState<string>('equals');
  const mounted = useMounted();

  const { key, label, placeholder, icon } = filter;

  // useEffect handler for select / number input updates
  useEffect(() => {
    if (!mounted) return;
    console.log(value);
    if (value === '' || value === undefined) {
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
        value: debounced,
      });
    }
    if (operation === 'gte') {
      onChange({
        type: 'range',
        key,
        value: {
          gte: debounced,
        },
      });
    }
    if (operation === 'lte') {
      onChange({
        type: 'range',
        key,
        value: {
          lte: debounced,
        },
      });
    }
    if (operation === 'range' && upperValue !== '' && upperValue !== undefined) {
      onChange({
        type: 'range',
        key,
        value: {
          gte: debounced,
          lte: debouncedUpper,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, debouncedUpper, operation]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) {
      setOperation('equals');
      setValue('');
      setUpperValue('');
    }
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing='sm'>
      <IconText icon={icon} title={label} />
      <Group>
        <Paper withBorder>
          <SegmentedControl
            value={operation}
            onChange={setOperation}
            data={[
              { value: 'equals', label: '=' },
              { value: 'gte', label: '>' },
              { value: 'lte', label: '<' },
              { value: 'range', label: '-' },
            ]}
          />
        </Paper>
        <NumberInput
          onChange={setValue}
          style={{ flexGrow: 1 }}
          placeholder={placeholder}
          precision={2}
        />
      </Group>
      {operation === 'range' && (
        <NumberInput onChange={setUpperValue} placeholder={placeholder} precision={2} />
      )}
    </Stack>
  );
}

export default NumericGreaterLessFilter;
