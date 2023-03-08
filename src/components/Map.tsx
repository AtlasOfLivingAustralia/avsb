import { useEffect, useRef } from 'react';
import { useMantineTheme } from '@mantine/core';
import MapboxMap, { Marker, MapRef } from 'react-map-gl';

interface MapProps {
  width?: string | number;
  height?: string | number;
}

function Map({ width, height }: MapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const theme = useMantineTheme();
  const borderRadius = theme.radius.lg;

  useEffect(() => {
    mapRef.current?.resize();
  });

  return (
    <div style={{ width, height, borderRadius, boxShadow: theme.shadows.md }}>
      <MapboxMap
        ref={mapRef}
        onRender={(event) => event.target.resize()}
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14,
        }}
        style={{ width, height, borderRadius }}
        mapStyle={`mapbox://styles/mapbox/${theme.colorScheme === 'dark' ? 'light-v9' : 'dark-v9'}`}
        mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color='red' />
      </MapboxMap>
    </div>
  );
}

export default Map;
