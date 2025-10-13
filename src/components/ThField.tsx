import { SeedBankExtension } from '#/api';
import { FieldTooltip } from '#/components';
import { allFields } from '#/helpers';
import { Box, Center, Table, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import { CSSProperties, PropsWithChildren } from 'react';
import classes from './ThField.module.css';

interface ThBaseProps {
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function ThBase({ children, sorted, reversed, onSort }: PropsWithChildren<ThBaseProps>) {
  // Select the correct
  let Icon = reversed ? IconChevronUp : IconChevronDown;
  if (!sorted) Icon = IconSelector;

  return (
    <UnstyledButton onClick={onSort} className={classes.control}>
      <Box style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Text fw={500} fz='sm'>
          {children}
        </Text>
        <Center className={classes.icon}>
          <Icon size='0.9rem' stroke={1.5} />
        </Center>
      </Box>
    </UnstyledButton>
  );
}

interface ThFieldProps extends ThBaseProps {
  fieldKey: keyof SeedBankExtension | string;
  style?: CSSProperties;
}

function ThField({ fieldKey, style, ...rest }: ThFieldProps) {
  const field = allFields[fieldKey];

  return (
    <Table.Th className={classes.th} style={style}>
      {field ? (
        <FieldTooltip
          label={field.label}
          description={field.description}
          examples={field.examples}
          Icon={field.icon}
        >
          <Box>
            <ThBase {...rest}>{field.label}</ThBase>
          </Box>
        </FieldTooltip>
      ) : (
        <ThBase {...rest}>{fieldKey}</ThBase>
      )}
    </Table.Th>
  );
}

export default ThField;
