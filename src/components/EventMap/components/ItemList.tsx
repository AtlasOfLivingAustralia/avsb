import {
  ActionIcon,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Transition,
  useMantineTheme,
} from '@mantine/core';

import { IconX } from '@tabler/icons';

const slideX = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(-15%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

interface ItemListProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any;
  contentHeight?: number;
  onClose?: () => void;
}

function ItemList({ open, events, contentHeight, onClose }: ItemListProps) {
  const theme = useMantineTheme();
  const { results, total } = events?.data?.eventSearch?.documents || {};

  return (
    <Transition mounted={open} transition={slideX}>
      {(styles) => (
        <div
          style={{
            ...styles,
            position: 'absolute',
            color: 'white',
            zIndex: 10,
            top: theme.spacing.lg,
            left: theme.spacing.lg,
          }}
        >
          <Paper w={260} shadow='md' withBorder>
            <Group p='sm' position='apart'>
              <Skeleton visible={!results} w={160}>
                <Text color='dimmed' weight='bold' size='sm' transform='uppercase'>
                  {total} result{total && total > 1 ? 's' : ''}
                </Text>
              </Skeleton>
              <ActionIcon variant='light' radius='xl' onClick={onClose}>
                <IconX size={16} />
              </ActionIcon>
            </Group>
            <Divider />
            <ScrollArea type='auto' h={contentHeight || 300} offsetScrollbars>
              <Stack p='sm'>
                {!results &&
                  [0, 1, 2, 3, 4].map((key) => (
                    <Skeleton key={key}>
                      <Text>Testing</Text>
                    </Skeleton>
                  ))}
                {results &&
                  results.map((result) => <Text key={result.eventID}>{result.eventID}</Text>)}
              </Stack>
            </ScrollArea>
          </Paper>
        </div>
      )}
    </Transition>
  );
}

export default ItemList;