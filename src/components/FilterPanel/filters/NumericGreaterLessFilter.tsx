import { useEffect, useState } from 'react';
import { Box, Text, Group, Paper, SegmentedControl, NumberInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import useMounted from '#/helpers/useMounted';

import { FilterItemProps } from '..';

function NumericGreaterLessFilter({ filter, onChange }: FilterItemProps) {
  const [value, setValue] = useState<number | undefined | ''>();
  const [debounced] = useDebouncedValue(value, 300);
  const [operation, setOperation] = useState<string>('equals');
  const { key, label, placeholder } = filter;
  const mounted = useMounted();

  // useEffect handler for select / number input updates
  useEffect(() => {
    if (!mounted) return;
    console.log('effect');
    if (value === '') {
      onChange({
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

  return (
    <Box>
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
        <NumberInput
          value={value}
          onChange={setValue}
          style={{ flexGrow: 1 }}
          placeholder={placeholder}
        />
      </Group>
    </Box>
  );
}

export default NumericGreaterLessFilter;