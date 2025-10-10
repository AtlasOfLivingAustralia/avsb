import { useComputedColorScheme } from '@mantine/core';
// Mapbox
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

interface MapProps {
  width?: string | number;
  height?: string | number;
  center: mapboxgl.LngLatLike;
}

function MapComponent({ width, height, center }: MapProps) {
  // Map refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // Map state & data
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false);

  // Theme variables
  const colorScheme = useComputedColorScheme('dark');
  const [currentScheme, setCurrentScheme] = useState<'light' | 'dark'>(colorScheme);
  const borderRadius = 'var(--mantine-radius-md)';

  useEffect(() => {
    if (currentScheme !== colorScheme && styleLoaded) {
      setCurrentScheme(colorScheme);
      setStyleLoaded(false);
      map.current?.setStyle(
        `mapbox://styles/mapbox/${colorScheme === 'dark' ? 'light' : 'dark'}-v11`,
      );
    }
  }, [colorScheme, styleLoaded]);

  // Add the map to the DOM when the component loads
  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${colorScheme === 'dark' ? 'light' : 'dark'}-v11`,
      center,
      zoom: 6,
    });
    new mapboxgl.Marker().setLngLat(center).addTo(map.current);
    map.current.on('render', () => map.current?.resize());
    map.current.on('style.load', () => setStyleLoaded(true));
  }, []);

  return (
    <div style={{ width, height, borderRadius, boxShadow: 'var(--mantine-shadow-md)' }}>
      <div ref={mapContainer} style={{ width, height, borderRadius }} />
    </div>
  );
}

export default MapComponent;
