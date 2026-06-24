import {
  Accordion,
  Box,
  Center,
  Flex,
  Highlight,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import type { Field, FieldObject } from '#/api';
import classes from './ItemList.module.css';
import { IconCheck } from '@tabler/icons-react';
import { useMemo } from 'react';

interface FieldListProps {
  fields: Field[] | null;
  search: string;
  selected: FieldObject[];
  onSelect: (item: FieldObject) => void;
}

function FieldList({ fields, search, selected, onSelect }: FieldListProps) {
  const defaultValue = useMemo(() => [...new Set(selected.map((field) => field.fid))], [selected]);
  const isSearching = search.trim().length > 0;

  if (!fields) {
    return [0, 1, 2, 3, 4].map((key) => (
      <Box key={key} px='md' py='xs'>
        <Skeleton h={45} />
      </Box>
    ));
  }

  if (fields.length === 0) {
    return (
      <Center p='lg' h='100%'>
        <Text c='dimmed' size='sm' ta='center'>
          No spatial layers match your search
        </Text>
      </Center>
    );
  }

  return (
    <Accordion
      multiple
      defaultValue={defaultValue}
      {...(isSearching ? { value: fields.map((field) => field.id) } : {})}
    >
      {fields.map((field) => (
        <Accordion.Item key={field.id} value={field.id}>
          <Accordion.Control>
            <Text size='sm' lineClamp={2}>
              {field.name}
            </Text>
          </Accordion.Control>
          <Accordion.Panel styles={{ content: { padding: 0 } }}>
            <Stack gap={0}>
              {field.objects.map((object) => {
                const isSelected = selected.findIndex(({ id }) => object.id === id) > -1;

                return (
                  <UnstyledButton
                    onClick={() => onSelect(object)}
                    px='md'
                    py='xs'
                    key={object.id}
                    className={`${classes.item}${isSelected ? ` ${classes.selected}` : ''}`}
                    aria-selected={isSelected}
                  >
                    <Flex align='center' justify='space-between'>
                      <Stack gap={0}>
                        {isSearching ? (
                          <Highlight size='sm' highlight={search}>
                            {object.name}
                          </Highlight>
                        ) : (
                          <Text size='sm'>{object.name}</Text>
                        )}
                        <Text size='xs' c='dimmed'>
                          {object.area_km.toFixed(2)} km&sup2;
                        </Text>
                      </Stack>
                      <ThemeIcon className={`${classes.icon}${isSelected ? ` ${classes.iconShow}` : ''}`} variant='light' size='sm'>
                        <IconCheck size='1rem' />
                      </ThemeIcon>
                    </Flex>
                  </UnstyledButton>
                );
              })}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FieldList;
