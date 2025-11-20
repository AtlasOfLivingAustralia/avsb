import { EventSearchResult, gqlQueries, performGQLQuery } from '#/api';
import queries from '#/api/queries';
import { Center, Group, Loader, Stack, Text, Transition } from '@mantine/core';
import { IconPointerFilled } from '@tabler/icons-react';
import { lazy, Suspense, useEffect, useState } from 'react';

const EventMap = lazy(() => import('#/components/EventMap'));

export function HomeMap() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    async function getToken() {
      const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(queries.QUERY_EVENT_MAP, { predicate: gqlQueries.PRED_DATA_RESOURCE });

      if (data.eventSearch._tileServerToken) {
        setToken(data.eventSearch._tileServerToken);
      }
    }

    getToken();
  }, []);

  return (
    <Stack align='center' gap='xl' style={{ transition: 'opacity ease 1200ms', opacity: loaded ? 1 : 0 }}>
      <div style={{ width: 500, height: 500 }}>
        <Suspense>
          <EventMap
            width={500} height={500}
            token={token}
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