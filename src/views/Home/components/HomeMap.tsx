import { gqlQueries } from '#/api';
import { Group, Stack, Text } from '@mantine/core';
import { IconPointerFilled } from '@tabler/icons-react';
import { lazy, Suspense, useState } from 'react';

const EventMap = lazy(() => import('#/components/EventMap'));

export function HomeMap() {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Stack align='center' gap='xl' style={{ transition: 'opacity ease 1200ms', opacity: loaded ? 1 : 0 }}>
      <div style={{ width: 500, height: 500 }}>
        <Suspense>
          <EventMap
            width={500} height={500}
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
      <Group gap='sm'>
        <IconPointerFilled size="1rem" />
        <Text size='xs' c='dimmed'>Click & drag to interact with the map and points</Text>
      </Group>
    </Stack>
  )
}