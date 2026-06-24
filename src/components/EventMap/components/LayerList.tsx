import { spatialAPI, type Field, type FieldObject, type Predicate } from '#/api';
import {
  ActionIcon,
  Button,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Transition,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconWorldExclamation, IconX } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import FieldList from './FieldList';

const slideX = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(15%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

function fieldObjectMatchesQuery(object: FieldObject, query: string): boolean {
  return (
    object.name.toLowerCase().includes(query) ||
    object.description.toLowerCase().includes(query) ||
    object.fieldname.toLowerCase().includes(query)
  );
}

function filterSpatialFields(fields: Field[], query: string): Field[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return fields;

  return fields
    .map((field) => ({
      ...field,
      objects: field.objects.filter((object) => fieldObjectMatchesQuery(object, normalizedQuery)),
    }))
    .filter((field) => field.objects.length > 0);
}

interface LayerListProps {
  open: boolean;
  contentHeight?: number;
  topOffset?: number;
  rightOffset?: number;
  onSelect: (predicate: Predicate | null) => void;
  onClose?: () => void;
}

function LayerList({
  open,
  contentHeight,
  topOffset,
  rightOffset,
  onSelect,
  onClose,
}: LayerListProps) {
  const [spatialFields, setSpatialFields] = useState<Field[] | null>(null);
  const [selected, setSelected] = useState<FieldObject[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 200);

  const filteredFields = useMemo(
    () => (spatialFields ? filterSpatialFields(spatialFields, debouncedSearch) : null),
    [spatialFields, debouncedSearch],
  );

  const handleSelect = (newObject: FieldObject) => {
    if (selected.findIndex((object) => object.id === newObject.id) > -1) {
      setSelected((objects) => objects.filter(({ id }) => id !== newObject.id));
    } else {
      setSelected((objects) => [...objects, newObject]);
    }
  }

  useEffect(() => {
    if (selected.length === 0) {
      onSelect(null)
    } else {
      onSelect({
        type: 'or',
        predicates: selected.flatMap((object) => ({
          type: 'and',
          predicates: [
            {
              type: 'equals',
              key: 'measurementType',
              value: object.fieldname
            },
            {
              type: 'equals',
              key: 'measurementValue',
              value: object.name
            }
          ]
        }))
      })
    }
  }, [selected]);

  useEffect(() => {
    async function fetchSpatial() {
      try {
        const data = await spatialAPI.fields(import.meta.env.VITE_API_SPATIAL_FIELDS.split(','));
        setSpatialFields(data);
      } catch (fetchError) {
        setError(fetchError as Error);
      }
    }

    if (!spatialFields) fetchSpatial();
  }, []);

  return (
    <Transition mounted={open} transition={slideX}>
      {(styles) => (
        <div
          style={{
            ...styles,
            position: 'absolute',
            zIndex: 15,
            top: `calc(var(--mantine-spacing-md) + ${topOffset || 0}px)`,
            right: `calc(var(--mantine-spacing-md) + ${rightOffset || 0}px)`,
          }}
        >
          <Paper style={{ overflow: 'hidden' }} w={260} shadow='md' withBorder>
            <Group p='xs' justify='space-between'>
              <Text c='dimmed' fw='bold' size='sm' tt='uppercase'>
                Spatial Layers
              </Text>
              <ActionIcon
                variant='light'
                radius='xl'
                onClick={onClose}
                aria-label='Close full screen map'
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
            <Divider />
            <TextInput
              variant='unstyled'
              placeholder='Search for spatial layers'
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              leftSection={<IconSearch size='1rem' />}
              aria-label='Search spatial layers'
            />
            <Divider />
            {error ? (
              <Center p='lg' h={contentHeight || 300}>
                <Stack ta='center' align='center' gap={4}>
                  <ThemeIcon variant='light' mb='md' size='xl' radius='xl'>
                    <IconWorldExclamation />
                  </ThemeIcon>
                  <Text fw='bold' size='md'>Error</Text>
                  <Text c='dimmed' size='sm'>{error.message}</Text>
                </Stack>
              </Center>
            ) : (
              <Stack h={(contentHeight || 300) - (selected.length > 0 ? 30 : 0)} gap={0} style={{ overflowY: 'auto' }}>
                <FieldList
                  fields={filteredFields}
                  search={debouncedSearch}
                  selected={selected}
                  onSelect={handleSelect}
                />
              </Stack>
            )}
            {selected.length > 0 && (
              <Button
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                size='xs'
                variant='light'
                fullWidth
                onClick={() => setSelected([])}
              >
                Clear {selected.length} layer{selected.length > 1 ? 's' : ''}
              </Button>
            )}
          </Paper>
        </div>
      )}
    </Transition>
  );
}

export default LayerList;
