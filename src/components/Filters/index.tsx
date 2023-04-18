/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Text, Drawer, Group, ThemeIcon, SegmentedControl } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons';

// Project components / helpers
import FilterBar from './components/Bar';
import FilterPanel from './components/Panel';

// Config
import { Filter, Predicate } from './types';

interface FiltersProps {
  filters: Filter[];
  predicates: Predicate[];
  onPredicates: (predicates: Predicate[]) => void;
}

type FiltersSort = 'alphabetical' | 'groups';

function Filters({ filters, predicates, onPredicates }: FiltersProps) {
  // State hooks
  const [sort, setSort] = useState<FiltersSort>('groups');
  const [resetKey, setResetKey] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);

  const onRemovePredicate = (predicate: Predicate) => {
    setResetKey(`${predicate.key}-${Date.now()}`);
    onPredicates(predicates.filter(({ key }) => predicate.key !== key));
  };

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} keepMounted>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header style={{ zIndex: 300 }}>
            <Group position='apart' w='100%'>
              <Group>
                <ThemeIcon variant='light' radius='xl' size='xl'>
                  <IconFilter />
                </ThemeIcon>
                <Text size='xl' weight='bold' style={{ fontFamily: 'Lexend Deca, sans-serif' }}>
                  Query Filters
                </Text>
              </Group>
              <Group>
                <SegmentedControl
                  size='xs'
                  value={sort}
                  onChange={(value) => setSort(value as FiltersSort)}
                  data={[
                    { label: 'Groups', value: 'groups' },
                    { label: 'ABC', value: 'alphabetical' },
                  ]}
                />
                <Drawer.CloseButton />
              </Group>
            </Group>
          </Drawer.Header>
          <Drawer.Body>
            <FilterPanel
              sort={sort}
              predicates={predicates}
              filters={filters}
              resetKey={resetKey}
              onPredicates={(newPredicates) => onPredicates(newPredicates)}
              mb='xl'
            />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <FilterBar
        filters={filters}
        predicates={predicates}
        onFiltersOpen={open}
        onRemove={onRemovePredicate}
        mb='lg'
      />
    </>
  );
}

export default Filters;
