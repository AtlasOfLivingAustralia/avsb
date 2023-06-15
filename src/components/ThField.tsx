import { CSSProperties, PropsWithChildren } from 'react';
import { Box, Center, Text, UnstyledButton, createStyles, rem } from '@mantine/core';

import { FieldTooltip } from '#/components';
import { SeedBankExtension } from '#/api';
import { allFields } from '#/helpers';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
    marginLeft: 'auto',
  },
}));

interface ThBaseProps {
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function ThBase({ children, sorted, reversed, onSort }: PropsWithChildren<ThBaseProps>) {
  const { classes } = useStyles();

  // Select the correct
  let Icon = reversed ? IconChevronUp : IconChevronDown;
  if (!sorted) Icon = IconSelector;

  return (
    <UnstyledButton onClick={onSort} className={classes.control}>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
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
  const { classes } = useStyles();
  const field = allFields[fieldKey];

  return (
    <th className={classes.th} style={style}>
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
    </th>
  );
}

export default ThField;
