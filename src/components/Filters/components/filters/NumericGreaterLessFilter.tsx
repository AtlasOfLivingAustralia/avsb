import { useEffect, useState } from 'react';
import { Stack, Group, Paper, SegmentedControl, NumberInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import useMounted from '#/helpers/useMounted';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../Panel';

function NumericGreaterLessFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<number | ''>();
  const [debounced] = useDebouncedValue(value, 300);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, operation]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) {
      setOperation('equals');
      setValue('');
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
            ]}
          />
        </Paper>
        <NumberInput onChange={setValue} style={{ flexGrow: 1 }} placeholder={placeholder} />
      </Group>
    </Stack>
  );
}

export default NumericGreaterLessFilter;
