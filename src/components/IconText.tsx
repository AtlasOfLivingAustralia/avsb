import { CSSProperties, PropsWithChildren } from 'react';
import { Box, Text } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

interface IconTextProps {
  icon: TablerIcon;
  title?: string;
  labelWidth?: number;
}

const iconStyle: CSSProperties = {
  marginRight: 12,
  minWidth: 22,
  minHeight: 22,
};

function IconText({ icon: Icon, children, title, labelWidth }: PropsWithChildren<IconTextProps>) {
  return (
    <Box style={{ display: 'flex' }}>
      <Icon size={22} style={iconStyle} />
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
