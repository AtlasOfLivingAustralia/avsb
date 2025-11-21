import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMaximize } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

// Mapbox
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import Draw from '@mapbox/mapbox-gl-draw';
import wellknown, { GeoJSONPolygon } from 'wellknown';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';


// Project-imports
import { EventSearchResult, performGQLQuery, Predicate, useGQLQuery } from '#/api';
import queries from '#/api/queries';
import { getMapLayer, getWktFromGeohash } from '#/helpers';
import { useComputedColorScheme } from '@mantine/core';
import ItemList from './components/ItemList';
import { drawStyles } from './drawStyles';

// Initialize MapBox
mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;

interface MapPoint {
  geohash: string | null;
  count: number | null;
}

interface MapProps {
  predicate: Predicate;
  width?: string | number;
  height?: string | number;
  initialToken?: string;
  itemListHeight?: string | number;
  shadow?: string;
  radius?: string;
  transparent?: boolean;
  initialCenter?: LngLatLike;
  initialZoom?: number;
  zoomOnLoad?: number;
  itemsTopOffset?: number;
  itemsLeftOffset?: number;
  onFullscreen?: () => void;
  onLoad?: () => void;
}

const TRANSPARENT_LIGHT = 'mapbox://styles/jackbrinkman/cmi7z3aob000h01si4rd8cuv8';
const TRANSPARENT_DARK = 'mapbox://styles/jackbrinkman/cmi6r8ly500bf01st7az16yo2';
const MAP_CENTER: LngLatLike = [137.591797, -26.000092];

function MapComponent({
  predicate,
  width,
  height,
  initialToken,
  itemListHeight,
  shadow,
  radius,
  transparent,
  initialZoom,
  initialCenter,
  zoomOnLoad,
  itemsTopOffset,
  itemsLeftOffset,
  onFullscreen,
  onLoad
}: MapProps) {
  // Map refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const popup = useRef<mapboxgl.Popup>(
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    }),
  );
  const drawControl = useRef<Draw>(    // Create the Draw control
    new Draw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      styles: drawStyles
    }));

  const params = useParams();

  // Map state & data
  const [token, setToken] = useState<string | null>(initialToken || null);
  const [drawPredicate, setDrawPredicate] = useState<Predicate | null>(null);
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const { data: selectedEvents, update: updateSelectedEvents } = useGQLQuery<{
    data: { eventSearch: EventSearchResult };
  }>(
    params.guid ? queries.QUERY_EVENT_MAP_POINT : queries.QUERY_EVENT_MAP_POINT_KEY,
    {},
    { lazy: true },
  );

  // Theme variables
  const colorScheme = useComputedColorScheme('dark');
  const [currentScheme, setCurrentScheme] = useState<'light' | 'dark'>(colorScheme);
  const isDark = colorScheme === 'dark';

  // Generate the style URL
  const styleUrl = transparent ?
    (!isDark ? TRANSPARENT_LIGHT : TRANSPARENT_DARK) :
    `mapbox://styles/mapbox/${isDark ? 'light' : 'dark'}-v11`;

  // Helper function for onPolygons callback
  const handlePolygons = () => {
    const predicates = drawControl
      .current.getAll()
      .features
      .filter(({ geometry }) => geometry.type === 'Polygon')
      .map((feature) => wellknown.stringify(feature.geometry as GeoJSONPolygon))
      .map((value) => ({
        type: 'within',
        key: 'scoordinates',
        value
      })) as Predicate[];

    setDrawPredicate(predicates.length > 0 ? { type: 'or', predicates } : null);
  }

  // Helper function to add the events layer to the map
  const addLayer = () => {
    if (map.current) {
      const tile = `${import.meta.env.VITE_API_ALA
        }/event/tile/event/mvt/{z}/{x}/{y}?queryId=${token}`;

      const config = getMapLayer(tile);
      map.current.addSource('events', config.source);

      // Find the first Mapbox Draw layer in the style
      const style = map.current.getStyle();
      const firstDrawLayer = style.layers?.find((layer) =>
        layer.id.startsWith('gl-draw-'),
      );

      if (firstDrawLayer) {
        // Insert events *before* the first Draw layer,
        // so all gl-draw-* layers are above events.
        map.current.addLayer(config.layer, firstDrawLayer.id);
      } else {
        // Fallback if Draw hasn't added its layers yet
        map.current.addLayer(config.layer);
      }

      map.current.on('mouseenter', 'events', (e) => {
        if (map.current) {
          map.current.getCanvas().style.cursor = 'pointer';

          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.current
            .setLngLat(e.lngLat)
            .setHTML(
              `<span style="color: black;"><b>Lng:</b> ${e.lngLat.lng.toFixed(
                2,
              )}<br/><b>Lat:</b> ${e.lngLat.lat.toFixed(2)}</span>`,
            )
            .addTo(map.current);
        }
      });
      map.current.on('mousemove', 'events', (e) => {
        if (map.current && popup.current) {
          popup.current
            .setLngLat(e.lngLat)
            .setHTML(
              `<span style="color: black;"><b>Lng:</b> ${e.lngLat.lng.toFixed(
                2,
              )}<br/><b>Lat:</b> ${e.lngLat.lat.toFixed(2)}</span>`,
            )
        }
      });
      map.current.on('mouseleave', 'events', () => {
        if (map.current) {
          map.current.getCanvas().style.cursor = '';
          popup.current.remove();
        }
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

  const updateToken = async () => {
    const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
      queries.QUERY_EVENT_MAP,
      {
        predicate: drawPredicate ? {
          type: 'and',
          predicates: [predicate, drawPredicate]
        } : predicate
      }
    );

    if (data.eventSearch._tileServerToken) {
      setToken(data.eventSearch._tileServerToken);
    }
  };

  // Fetch a new token if an initial token does not exist
  useEffect(() => {
    if (!initialToken) updateToken();
  }, []);

  // Fetch a new token if the drawPredicate changes
  useEffect(() => {
    updateToken();
  }, [drawPredicate]);

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
            {
              type: 'equals',
              key: 'eventType',
              value: 'Accession',
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
            ...(params.resource
              ? [
                {
                  type: 'equals',
                  key: 'datasetKey',
                  value: params.resource,
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
    if (currentScheme !== colorScheme && styleLoaded) {
      setCurrentScheme(colorScheme);
      setStyleLoaded(false);
      map.current?.setStyle(styleUrl);
    }
  }, [colorScheme, styleLoaded]);

  // Add the map to the DOM when the component loads
  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: styleUrl,
      center: initialCenter || MAP_CENTER,
      zoom: initialZoom || 2.5,
    });

    map.current.addControl(drawControl.current, 'top-right');
    map.current.on('draw.create', handlePolygons);
    map.current.on('draw.delete', handlePolygons);
    map.current.on('draw.update', handlePolygons);

    map.current.on('render', () => map.current?.resize());
    map.current.on('style.load', () => setStyleLoaded(true));
    map.current.on('load', () => {
      if (onLoad) onLoad();
      if (zoomOnLoad) {
        map.current?.flyTo({
          center: MAP_CENTER,
          zoom: zoomOnLoad,
          speed: 0.2
        });
      }
    })
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: radius || 'var(--mantine-radius-lg)',
        boxShadow: shadow || 'var(--mantine-shadow-md)',
      }}
    >
      <ItemList
        onClose={() => setSelectedPoint(null)}
        documents={selectedEvents?.data.eventSearch.documents || {}}
        open={Boolean(selectedPoint)}
        contentHeight={itemListHeight}
        topOffset={itemsTopOffset}
        leftOffset={itemsLeftOffset}
      />
      {onFullscreen && (
        <Tooltip
          transitionProps={{ transition: 'pop' }}
          label='Toggle Fullscreen'
          color='gray'
          position='left'
          withArrow
        >
          <ActionIcon
            color='gray'
            onClick={onFullscreen}
            variant='filled'
            size='lg'
            pos='absolute'
            bottom='var(--mantine-spacing-md)'
            right='var(--mantine-spacing-md)'
            style={{ zIndex: 20 }}
            aria-label='View full screen map'
          >
            <IconMaximize />
          </ActionIcon>
        </Tooltip>
      )}
      <div
        ref={mapContainer}
        style={{ width, height, borderRadius: radius || 'var(--mantine-radius-lg)' }}
      />
    </div>
  );
}

export default MapComponent;
