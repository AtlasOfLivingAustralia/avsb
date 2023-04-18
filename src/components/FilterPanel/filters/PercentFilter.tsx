import { useEffect, useState } from 'react';
import { Box, RangeSlider, Stack } from '@mantine/core';

import IconText from '#/components/IconText';
import { FilterItemProps } from '..';

function PercentFilter({ filter, resetKey, onChange }: FilterItemProps) {
  const [value, setValue] = useState<[number, number]>([0, 100]);
  const { key, label, placeholder, icon } = filter;

  // Callback handler for range slider update
  const onUpdate = ([lower, upper]: [number, number]) => {
    if (lower === upper) {
      onChange({
        type: 'equals',
        key,
        value: lower,
      });
    } else {
      onChange({
        type: 'range',
        key,
        value: {
          gte: lower,
          lte: upper,
        },
      });
    }
  };

  useEffect(() => {
    if (resetKey.split('-')[0] === key) setValue([0, 100]);
  }, [key, resetKey, setValue]);

  return (
    <Stack spacing={0}>
      <IconText icon={icon} title={label} />
      <Box px='sm' py='md'>
        <RangeSlider
          placeholder={placeholder}
          minRange={0}
          value={value}
          onChange={setValue}
          onChangeEnd={onUpdate}
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </Box>
    </Stack>
  );
}

export default PercentFilter;
