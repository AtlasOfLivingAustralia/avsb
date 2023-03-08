import { Button, Paper, Transition, useMantineTheme } from '@mantine/core';

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0.6)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
};

interface ItemListProps {
  open: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any;
  onClose?: () => void;
}

function ItemList({ open, events, onClose }: ItemListProps) {
  const theme = useMantineTheme();

  return (
    <Transition mounted={open} transition={scaleY}>
      {(styles) => (
        <div
          style={{
            ...styles,
            position: 'absolute',
            color: 'white',
            zIndex: 10,
            padding: theme.spacing.lg,
          }}
        >
          <Paper p='sm' withBorder>
            <Button onClick={onClose}>test</Button>
          </Paper>
        </div>
      )}
    </Transition>
  );
}

export default ItemList;
