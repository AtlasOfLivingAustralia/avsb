import { useEffect, useState } from 'react';
import { Stack, Group, Paper, SegmentedControl } from '@mantine/core';
import { DateInput, DateValue } from '@mantine/dates';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useMounted from '#/helpers/useMounted';

import IconText from '#/components/IconText';
import { FilterItemProps } from '../../types';

dayjs.extend(customParseFormat);

function DateFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [single, setSingle] = useState<DateValue>(null);
  const [range, setRange] = useState<DateValue>(null);
  const [operation, setOperation] = useState<string>('equals');
  const mounted = useMounted();

  const { key, label, placeholder, icon } = filter;

  // useEffect handler for select / number input updates
  useEffect(() => {
    if (!mounted) return;

    if (single === null || (operation === 'range' && range === null)) {
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
        value: (single as Date)?.getTime(),
      });
    }
    if (operation === 'gte') {
      onChange({
        type: 'range',
        key,
        value: {
          gte: (single as Date)?.getTime(),
        },
      });
    }
    if (operation === 'lte') {
      onChange({
        type: 'range',
        key,
        value: {
          lte: (single as Date)?.getTime(),
        },
      });
    }
    if (operation === 'range') {
      onChange({
        type: 'range',
        key,
        value: {
          gte: (single as Date)?.getTime(),
          lte: (range as Date)?.getTime(),
        },
      });
    }
  }, [single, range, operation]);

  useEffect(() => {
    if (resetKey.split('-')[0] === key) {
      setOperation('equals');
      setSingle(null);
      setRange(null);
    }
  }, [key, resetKey, setSingle, setRange]);

  return (
    <Stack gap='sm'>
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
        <DateInput
          style={{ flexGrow: 1 }}
          value={single}
          valueFormat='DD/MM/YYYY'
          onChange={setSingle}
          onInput={({ target }) => {
            if ((target as HTMLInputElement).value === '') setSingle(null);
          }}
          placeholder={placeholder}
          dateParser={(input) => dayjs(input, 'DD/MM/YYYY').toDate()}
        />
        <DateInput
          value={range}
          valueFormat='DD/MM/YYYY'
          style={{ flexGrow: 1, display: operation === 'range' ? 'block' : 'none' }}
          onChange={setRange}
          onInput={({ target }) => {
            if ((target as HTMLInputElement).value === '') setRange(null);
          }}
          placeholder={placeholder}
          dateParser={(input) => dayjs(input, 'DD/MM/YYYY').toDate()}
        />
      </Group>
    </Stack>
  );
}

export default DateFilter;
