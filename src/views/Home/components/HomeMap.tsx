import { gqlQueries } from '#/api';
import { Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconPointerFilled } from '@tabler/icons-react';
import { lazy, Suspense, useState } from 'react';

const EventMap = lazy(() => import('#/components/EventMap'));
const SIZE = 470;

export function HomeMap() {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Stack align='center' gap='xl' style={{ transition: 'opacity ease 1200ms', opacity: loaded ? 1 : 0 }}>
      <div style={{ width: SIZE, height: SIZE }}>
        <Suspense>
          <EventMap
            width={SIZE} height={SIZE}
            predicate={gqlQueries.PRED_DATA_RESOURCE}
            itemListHeight={180}
            shadow="none"
            initialCenter={[126.591797, -26.000092]}
            initialZoom={1}
            transparent
            onLoad={() => setLoaded(true)}
            zoomOnLoad={1.5}
            itemsTopOffset={125}
            itemsLeftOffset={-200}
          />
        </Suspense>
      </div>
      <Group gap='md'>
        <ThemeIcon variant='light' size='md'>
          <IconPointerFilled size="1rem" />
        </ThemeIcon>
        <Text maw={400} size='xs' c='dimmed'>Click &amp; drag to interact with the map, use the polygon tool to draw a polygon for an area, double click to close</Text>
      </Group>
    </Stack>
  )
}