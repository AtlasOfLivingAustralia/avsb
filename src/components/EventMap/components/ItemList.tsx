import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';

import { IconX } from '@tabler/icons';
import { Event } from '#/api/graphql/types';

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
  contentHeight?: number | string;
  onClose?: () => void;
}

function ItemList({ open, events, contentHeight, onClose }: ItemListProps) {
  const theme = useMantineTheme();
  const { results, total } = events?.data?.eventSearch?.documents || {};
  // const { results, total } = { results: null, total: 0 };

  return (
    <Transition mounted={open} transition={slideX}>
      {(styles) => (
        <div
          style={{
            ...styles,
            position: 'absolute',
            color: 'white',
            zIndex: 10,
            top: theme.spacing.md,
            left: theme.spacing.md,
          }}
        >
          <Paper w={260} shadow='md' withBorder>
            <Group p='xs' position='apart'>
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
              <Stack spacing={0}>
                {!results &&
                  [0, 1, 2, 3, 4].map((key) => (
                    <Box px='xs' pt='xs' mb='xs'>
                      <Skeleton key={key}>
                        <Text size='sm'>Testing</Text>
                        <Text size='sm'>More testing text that spans two lines</Text>
                      </Skeleton>
                    </Box>
                  ))}
                {results &&
                  results.map((result: Event) => (
                    <UnstyledButton
                      p='xs'
                      key={result.eventID}
                      sx={{
                        '&:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[4] : 'white',
                        },
                      }}
                    >
                      <Text size='sm'>{result.eventID}</Text>
                      <Text size='xs' color='dimmed'>
                        {result.datasetTitle}
                      </Text>
                    </UnstyledButton>
                  ))}
              </Stack>
            </ScrollArea>
          </Paper>
        </div>
      )}
    </Transition>
  );
}

export default ItemList;
