import { Button, Checkbox, Flex, Group, Paper } from '@mantine/core';
import { IconLayersIntersect2, IconSearch } from '@tabler/icons-react';
import type { Map as MapboxMap } from 'mapbox-gl';
import type { RefObject } from 'react';
import MapboxControl from './MapboxControl';
import classes from './MapControls.module.css';

interface RecordsControlProps {
  map: MapboxMap | null;
  drawn: boolean;
  filtered: boolean;
  inverseRef: RefObject<HTMLInputElement | null>;
  onInverseChange: () => void;
  onOpen: () => void;
}

function RecordsControl({
  map,
  drawn,
  filtered,
  inverseRef,
  onInverseChange,
  onOpen,
}: RecordsControlProps) {
  return (
    <MapboxControl map={map} position='bottom' className={`${classes.control} ${classes.records}`}>
      <Group gap='xs' wrap='nowrap'>
        <Paper
          style={{
            transition: 'all ease 200ms',
            width: drawn ? 116 : 0,
            overflow: 'hidden',
            opacity: drawn ? 1 : 0,
          }}
          px={8}
          withBorder
        >
          <Flex align='center' justify='center' h={29} gap='sm'>
            <IconLayersIntersect2 size='1rem' style={{ minWidth: '1rem', minHeight: '1rem' }} />
            <Checkbox
              ref={inverseRef}
              onChange={onInverseChange}
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
          onClick={onOpen}
          aria-label={`View ${filtered ? 'selected' : 'map'} records`}
        >
          {filtered ? 'Selected' : 'Map'} records
        </Button>
      </Group>
    </MapboxControl>
  );
}

export default RecordsControl;
