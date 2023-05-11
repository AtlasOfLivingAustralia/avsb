/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { ActionIcon, ColorScheme, Tooltip, useMantineTheme } from '@mantine/core';
import { IconMaximize } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';

// Project-imports
import { getMapLayer, getWktFromGeohash } from '#/helpers';
import { useGQLQuery } from '#/api';
import queries from '#/api/queries';
import ItemList from './components/ItemList';

interface MapPoint {
  geohash: string | null;
  count: number | null;
}

interface MapProps {
  width?: string | number;
  height?: string | number;
  token?: string;
  itemListHeight?: string | number;
  onFullscreen?: () => void;
}

function Map({ width, height, token, itemListHeight, onFullscreen }: MapProps) {
  // Map refs
  const mapContainer = useRef<any | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const params = useParams();

  // Map state & data
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const { data: selectedEvents, update: updateSelectedEvents } = useGQLQuery(
    params.guid ? queries.QUERY_EVENT_MAP_POINT : queries.QUERY_EVENT_MAP_POINT_KEY,
    {},
    { lazy: true },
  );

  // Theme variables
  const theme = useMantineTheme();
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(theme.colorScheme);
  const borderRadius = theme.radius.md;

  // Helper function to add the events layer to the map
  const addLayer = () => {
    if (map.current) {
      const tile = `${import.meta.env.VITE_API_EVENT_TILE}/event/mvt/{z}/{x}/{y}?queryId=${token}`;

      map.current.addLayer(getMapLayer(tile));
      map.current.on('mouseenter', 'events', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });
      map.current.on('click', 'events', (e) => {
        setSelectedPoint({
          geohash: e.features?.[0].properties?._key,
          count: e.features?.[0].properties?._count,
        });
      });
    }
  };

  // Helper function to safely update the map events layer
  const updateLayer = () => {
    if (map.current?.getSource('events')) {
      map.current?.removeLayer('events');
      map.current?.removeSource('events');
    }

    addLayer();
  };

  // Query events based on the selected location
  useEffect(() => {
    if (selectedPoint?.geohash) {
      updateSelectedEvents({
        predicate: {
          type: 'and',
          predicates: [
            queries.PRED_DATA_RESOURCE,
            {
              type: 'within',
              key: 'scoordinates',
              value: getWktFromGeohash(selectedPoint.geohash),
            },
            ...(params.guid
              ? [
                  {
                    type: 'equals',
                    key: 'taxonKey',
                    value: params.guid,
                  },
                ]
              : []),
          ],
        },
      });
    }
  }, [selectedPoint]);

  // Effect hook to respond to query changes
  useEffect(() => {
    if (token && styleLoaded) updateLayer();
  }, [token, styleLoaded]);

  useEffect(() => {
    if (currentScheme !== theme.colorScheme && styleLoaded) {
      setCurrentScheme(theme.colorScheme);
      setStyleLoaded(false);
      map.current?.setStyle(
        `mapbox://styles/mapbox/${theme.colorScheme === 'dark' ? 'light' : 'dark'}-v11`,
      );
    }
  }, [theme.colorScheme, styleLoaded]);

  // Add the map to the DOM when the component loads
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${theme.colorScheme === 'dark' ? 'light' : 'dark'}-v11`,
      center: [137.591797, -26.000092],
      zoom: 2.5,
    });
    map.current.on('render', () => map.current?.resize());
    map.current.on('style.load', () => setStyleLoaded(true));
  }, []);

  return (
    <div style={{ position: 'relative', width, height, borderRadius, boxShadow: theme.shadows.md }}>
      <ItemList
        onClose={() => setSelectedPoint(null)}
        events={selectedEvents}
        open={Boolean(selectedPoint)}
        contentHeight={itemListHeight}
      />
      {onFullscreen && (
        <Tooltip label='Toggle Fullscreen' color='blue' position='left' withArrow>
          <ActionIcon
            onClick={onFullscreen}
            variant='filled'
            size='lg'
            pos='absolute'
            top={theme.spacing.md}
            right={theme.spacing.md}
            style={{ zIndex: 20 }}
          >
            <IconMaximize />
          </ActionIcon>
        </Tooltip>
      )}
      <div ref={mapContainer} style={{ width, height, borderRadius }} />
    </div>
  );
}

export default Map;
