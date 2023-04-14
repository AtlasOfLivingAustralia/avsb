import { Box, Text, RangeSlider } from '@mantine/core';
import { FilterItemProps } from '..';

function PercentFilter({ filter, onChange }: FilterItemProps) {
  const { key, label, placeholder } = filter;

  // Callback handler for range slider update
  const onUpdate = ([lower, upper]: [number, number]) =>
    onChange(
      lower === upper
        ? {
            type: 'equals',
            key,
            value: lower,
          }
        : {
            type: 'range',
            key,
            value: {
              gte: lower,
              lte: upper,
            },
          },
    );

  return (
    <Box>
      <Text size='sm'>{label}</Text>
      <Box px='sm' py='md'>
        <RangeSlider
          placeholder={placeholder}
          minRange={0}
          defaultValue={[0, 100]}
          onChangeEnd={onUpdate}
          marks={[
            { value: 0, label: '0%' },
            { value: 50, label: '50%' },
            { value: 100, label: '100%' },
          ]}
        />
      </Box>
    </Box>
  );
}

export default PercentFilter;
