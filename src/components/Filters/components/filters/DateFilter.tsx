import { useEffect, useState } from 'react';
import { Stack, Group, Paper, SegmentedControl } from '@mantine/core';
import { DatePickerInput, DateValue, DatesRangeValue } from '@mantine/dates';
import useMounted from '#/helpers/useMounted';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

function DateFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [single, setSingle] = useState<DateValue>(null);
  const [range, setRange] = useState<DatesRangeValue>([null, null]);
  const [operation, setOperation] = useState<string>('equals');
  const mounted = useMounted();

  const { key, label, placeholder, icon } = filter;

  // useEffect handler for select / number input updates
  useEffect(() => {
    if (!mounted) return;
    const hasRange = (range || []).filter((item) => item !== null).length > 0;

    if ((single === null && operation !== 'range') || (!hasRange && operation === 'range')) {
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
        value: single?.getTime(),
      });
    }
    if (operation === 'gte') {
      onChange({
        type: 'range',
        key,
        value: {
          gte: single?.getTime(),
        },
      });
    }
    if (operation === 'lte') {
      onChange({
        type: 'range',
        key,
        value: {
          lte: single?.getTime(),
        },
      });
    }
    if (operation === 'range' && hasRange) {
      onChange({
        type: 'range',
        key,
        value: {
          gte: range[0]?.getTime(),
          lte: range[1]?.getTime(),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [single, range, operation]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) {
      setOperation('equals');
      setSingle(null);
      setRange([null, null]);
    }
  }, [key, resetKey, setSingle, setRange]);

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
        <DatePickerInput
          style={{ flexGrow: 1, display: operation !== 'range' ? 'block' : 'none' }}
          value={single}
          onChange={setSingle}
          placeholder={placeholder}
          clearable
        />
        <DatePickerInput
          style={{ flexGrow: 1, display: operation === 'range' ? 'block' : 'none' }}
          value={range}
          onChange={setRange}
          placeholder={placeholder}
          clearable
          type='range'
        />
      </Group>
    </Stack>
  );
}

export default DateFilter;
