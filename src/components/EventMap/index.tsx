import { Button, Checkbox, Flex, Group, Paper, Pill } from '@mantine/core';
import Draw from '@mapbox/mapbox-gl-draw';
import { IconLayersIntersect2, IconSearch, IconStack2 } from '@tabler/icons-react';

// Mapbox
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { FullscreenControl, type LngLatLike, Map as MapboxMap, Popup } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import wellknown, { type GeoJSONPolygon } from 'wellknown';

import { useComputedColorScheme } from '@mantine/core';

// Project-imports
import { type EventSearchResult, type Predicate, performGQLQuery, useGQLQuery } from '#/api';
import queries from '#/api/queries';
import { getMapLayer, getWktFromGeohash } from '#/helpers';
import ItemList from './components/ItemList';
import LayerList from './components/LayerList';
import { SelectionRecords } from './components/SelectionRecords';
import { drawStyles } from './drawStyles';

interface MapPoint {
  geohash: string | null;
  count: number | null;
}

interface MapProps {
  predicate: Predicate;
  width?: string | number;
  height?: string | number;
  initialToken?: string;
  shadow?: string;
  radius?: string;
  transparent?: boolean;
  initialCenter?: LngLatLike;
  initialZoom?: number;
  zoomOnLoad?: number;

  // Items config
  itemListHeight?: number;
  itemsTopOffset?: number;
  itemsLeftOffset?: number;

  // Layers config
  layersListHeight?: number;
  layersTopOffset?: number;
  layersRightOffset?: number;
  onLoad?: () => void;
}

const TRANSPARENT_LIGHT = 'mapbox://styles/jackbrinkman/cmi7z3aob000h01si4rd8cuv8';
const TRANSPARENT_DARK = 'mapbox://styles/jackbrinkman/cmi6r8ly500bf01st7az16yo2';
const MAP_CENTER: LngLatLike = [135, -30];
const RECORDS_PREDICATE: Predicate = { type: 'isNotNull', key: 'decimalLongitude' };

function MapComponent({
  predicate,
  width,
  height,
  initialToken,
  shadow,
  radius,
  transparent,
  initialZoom,
  initialCenter,
  zoomOnLoad,
  itemListHeight,
  itemsTopOffset,
  itemsLeftOffset,
  layersListHeight,
  layersTopOffset,
  layersRightOffset,
  onLoad,
}: MapProps) {
  // Map refs
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const popup = useRef<Popup>(
    new Popup({
      closeButton: false,
      closeOnClick: false,
    }),
  );
  const drawControl = useRef<Draw>(
    // Create the Draw control
    new Draw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      styles: drawStyles,
    }),
  );

  // Fullscreen & params hook
  const params = useParams();

  // Map state & data
  const [token, setToken] = useState<string | null>(initialToken || null);
  const [drawPredicate, setDrawPredicate] = useState<Predicate | null>(null);
  const [spatialPredicate, setSpatialPredicate] = useState<Predicate | null>(null);
  const [styleLoaded, setStyleLoaded] = useState<boolean>(false);

  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [layersVisible, setLayersVisible] = useState<boolean>(false);
  const [recordsOpened, setRecordsOpened] = useState<boolean>(false);
  const inverseRef = useRef<HTMLInputElement>(null);
  const { data: selectedEvents, update: updateSelectedEvents } = useGQLQuery<{
    data: { eventSearch: EventSearchResult };
  }>(queries.QUERY_EVENT_MAP_POINT, {}, { lazy: true });

  // Theme variables
  const colorScheme = useComputedColorScheme('dark');
  const [currentScheme, setCurrentScheme] = useState<'light' | 'dark'>(colorScheme);
  const isDark = colorScheme === 'dark';

  // Generate the style URL
  let styleUrl;

  if (transparent) {
    styleUrl = !isDark ? TRANSPARENT_LIGHT : TRANSPARENT_DARK;
  } else {
    styleUrl = `mapbox://styles/mapbox/${isDark ? 'light' : 'dark'}-v11`;
  }

  // Helper function for onPolygons callback
  const handlePolygons = () => {
    const predicates = drawControl.current
      .getAll()
      .features.filter(({ geometry }) => geometry.type === 'Polygon' || geometry.type === 'MultiPolygon')
      .map((feature) => wellknown.stringify(feature.geometry as GeoJSONPolygon))
      .map((value) => ({
        type: 'within',
        key: 'scoordinates',
        value,
      })) as Predicate[];

    if (predicates.length > 0) {
      setDrawPredicate(
        inverseRef.current?.checked
          ? { type: 'not', predicate: { type: 'or', predicates } }
          : { type: 'or', predicates },
      );
    } else {
      setDrawPredicate(null);
    }
  };

  // Helper function to add the events layer to the map
  const addLayer = () => {
    if (map.current) {
      const tile = `${import.meta.env.VITE_API_ES2VT}/event/mvt/{z}/{x}/{y}?queryId=${token}`;

      const config = getMapLayer(tile);
      map.current.addSource('events', config.source);

      // Find the first Mapbox Draw layer in the style
      const style = map.current.getStyle();
      const firstDrawLayer = style.layers?.find((layer) => layer.id.startsWith('gl-draw-'));

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
            );
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
    const predicates = [drawPredicate, spatialPredicate].filter((pred) => !!pred);

    const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
      queries.QUERY_EVENT_MAP,
      {
        predicate: predicates.length > 0
          ? {
            type: 'and',
            predicates: [predicate, ...predicates],
          }
          : predicate,
      },
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
  }, [drawPredicate, spatialPredicate]);

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
    map.current = new MapboxMap({
      container: mapContainer.current,
      style: styleUrl,
      center: initialCenter || MAP_CENTER,
      zoom: initialZoom || 2.25,
      accessToken: import.meta.env.VITE_APP_MAPBOX_TOKEN
    });

    map.current.addControl(drawControl.current, 'top-right');
    map.current.addControl(new FullscreenControl());
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
          speed: 0.2,
        });
      }
    });
  }, []);

  return (
    <>
      <SelectionRecords
        opened={recordsOpened}
        onClose={() => setRecordsOpened(false)}
        predicates={[predicate, RECORDS_PREDICATE, ...([drawPredicate, spatialPredicate].filter((pred) => !!pred))]}
      />
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
        <LayerList
          onSelect={setSpatialPredicate}
          onClose={() => setLayersVisible(false)}
          open={layersVisible}
          contentHeight={layersListHeight}
          topOffset={layersTopOffset}
          rightOffset={layersRightOffset}
        />
        <Group
          gap='xs'
          pos='absolute'
          bottom='var(--mantine-spacing-xl)'
          left='var(--mantine-spacing-md)'
          right='var(--mantine-spacing-md)'
          justify='center'
          style={{ zIndex: 10 }}
        >
          <Paper
            style={{
              transition: 'all ease 200ms',
              width: drawPredicate ? 116 : 0,
              overflow: 'hidden',
              opacity: drawPredicate ? 1 : 0,
            }}
            px={8}
            withBorder
          >
            <Flex align='center' justify='center' h={29} gap='sm'>
              <IconLayersIntersect2 size='1rem' style={{ minWidth: '1rem', minHeight: '1rem' }} />
              <Checkbox
                ref={inverseRef}
                onChange={handlePolygons}
                label='Inverse'
                labelPosition='left'
                size='xs'
                fw={600}
                c='white'
              />
            </Flex>
          </Paper>
          <Button
            leftSection={<IconSearch size='1rem' />}
            color='gray'
            radius='lg'
            size='xs'
            onClick={() => {
              setRecordsOpened(true);
            }}
            aria-label={`View ${(drawPredicate || spatialPredicate) ? 'selected' : 'map'}  records`}
          >
            {drawPredicate ? 'Selected' : 'Map'} records
          </Button>
          <Button
            leftSection={<IconStack2 size='1rem' />}
            rightSection={spatialPredicate && (
              <Pill color='blue' size='xs'>{spatialPredicate.predicates?.length}</Pill>
            )}
            color='gray'
            radius='lg'
            size='xs'
            onClick={() => {
              setLayersVisible(true);
            }}
            aria-label='View map layers'
          >
            Layers
          </Button>
        </Group>
        <div
          ref={mapContainer}
          style={{
            width,
            height,
            borderRadius: radius || 'var(--mantine-radius-lg)',
          }}
        />
      </div>
    </>
  );
}

export default MapComponent;
