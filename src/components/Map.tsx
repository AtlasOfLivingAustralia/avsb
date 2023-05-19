/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { ColorScheme, useMantineTheme } from '@mantine/core';

// Mapbox
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

interface MapProps {
  width?: string | number;
  height?: string | number;
  center: mapboxgl.LngLatLike;
}

function Map({ width, height, center }: MapProps) {
  // Map refs
  const mapContainer = useRef<any | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Map state & data
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false);

  // Theme variables
  const theme = useMantineTheme();
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(theme.colorScheme);
  const borderRadius = theme.radius.md;

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
      center,
      zoom: 6,
    });
    new mapboxgl.Marker().setLngLat(center).addTo(map.current);
    map.current.on('render', () => map.current?.resize());
    map.current.on('style.load', () => setStyleLoaded(true));
  }, []);

  return (
    <div style={{ width, height, borderRadius, boxShadow: theme.shadows.md }}>
      <div ref={mapContainer} style={{ width, height, borderRadius }} />
    </div>
  );
}

export default Map;
