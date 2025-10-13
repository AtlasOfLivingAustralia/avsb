import { Predicate } from '#/api/graphql/types';
import { Drawer, Group, GroupProps, SegmentedControl, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Project components / helpers
import FilterBar from './components/Bar';
import FilterPanel from './components/Panel';

// Config
import { Filter, FiltersSort } from './types';

interface FiltersProps extends GroupProps {
  filters: Filter[];
  predicates: Predicate[];
  onPredicates: (predicates: Predicate[]) => void;
}

function Filters({ filters, predicates, onPredicates, ...rest }: FiltersProps) {
  // State hooks
  const [sort, setSort] = useState<FiltersSort>('groups');
  const [resetKey, setResetKey] = useState<string>('');
  const [opened, { open, close }] = useDisclosure(false);
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const onRemovePredicate = (predicate: Predicate) => {
    // Also filter the location state
    if (state?.predicates) {
      navigate(pathname, {
        state: {
          ...state,
          predicates: ((state?.predicates as Predicate[]) || []).filter(
            ({ key }) => predicate.key !== key,
          ),
        },
        replace: true,
      });
    }

    // Update the reset key & fire the onPredicates event
    setResetKey(`${predicate.key}-${Date.now()}`);
    onPredicates(predicates.filter(({ key }) => predicate.key !== key));
  };

  return (
    <>
      <Drawer.Root opened={opened} onClose={close} keepMounted zIndex={600}>
        <Drawer.Overlay />
        <Drawer.Content aria-label='Filters drawer'>
          <Drawer.Header style={{ zIndex: 300 }}>
            <Group justify='space-between' w='100%'>
              <Group>
                <ThemeIcon variant='light' radius='xl' size='xl'>
                  <IconFilter />
                </ThemeIcon>
                <Text
                  size='xl'
                  fw='bold'
                  style={{ fontFamily: 'var(--mantine-font-family-headings)' }}
                >
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
                <Drawer.CloseButton aria-label='Close filters drawer' />
              </Group>
            </Group>
          </Drawer.Header>
          <Drawer.Body>
            <FilterPanel
              sort={sort}
              predicates={predicates}
              filters={filters}
              resetKey={resetKey}
              onPredicates={onPredicates}
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
        {...rest}
      />
    </>
  );
}

export default Filters;
