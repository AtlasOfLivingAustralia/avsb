import { Button, Pill } from '@mantine/core';
import { IconStack2 } from '@tabler/icons-react';
import type { Map as MapboxMap } from 'mapbox-gl';
import MapboxControl from './MapboxControl';
import classes from './MapControls.module.css';

interface LayersControlProps {
  map: MapboxMap | null;
  count?: number;
  onOpen: () => void;
}

function LayersControl({ map, count, onOpen }: LayersControlProps) {
  return (
    <MapboxControl map={map} position='bottom' className={`${classes.control} ${classes.layers}`}>
      <Button
        leftSection={<IconStack2 size='1rem' />}
        rightSection={
          count != null && (
            <Pill color='blue' size='xs'>
              {count}
            </Pill>
          )
        }
        color='gray'
        radius='lg'
        size='xs'
        onClick={onOpen}
        aria-label='View map layers'
      >
        Layers
      </Button>
    </MapboxControl>
  );
}

export default LayersControl;
