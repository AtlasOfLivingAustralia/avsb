/* eslint-disable react/jsx-props-no-spreading */
import { CSSProperties, PropsWithChildren } from 'react';
import { Box, BoxProps, Text } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

interface IconTextProps extends BoxProps {
  icon?: TablerIcon;
  title?: string;
  labelWidth?: number;
}

const iconStyle: CSSProperties = {
  marginRight: 12,
  minWidth: 22,
  minHeight: 22,
};

function IconText({
  icon: Icon,
  children,
  title,
  labelWidth,
  ...rest
}: PropsWithChildren<IconTextProps>) {
  return (
    <Box style={{ display: 'flex' }} {...rest}>
      {Icon && <Icon size={22} style={iconStyle} />}
      <Box style={{ display: 'flex', flexDirection: 'row' }}>
        {title && (
          <Text weight='bold' miw={labelWidth || 125} size='sm'>
            {title}
          </Text>
        )}
        <Text size='sm' color='dimmed'>
          {children}
        </Text>
      </Box>
    </Box>
  );
}

export default IconText;
