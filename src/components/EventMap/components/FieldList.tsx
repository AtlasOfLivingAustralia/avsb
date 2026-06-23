import {
  Accordion,
  Box,
  Center,
  Highlight,
  Skeleton,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import type { Field, FieldObject } from '#/api';
import classes from './ItemList.module.css';

interface FieldListProps {
  fields: Field[] | null;
  search: string;
  onSelect: (item: FieldObject) => void;
}

function FieldList({ fields, search, onSelect }: FieldListProps) {
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
              {field.objects.map((object) => (
                <UnstyledButton onClick={() => onSelect(object)} px='md' py='xs' key={object.id} className={classes.item}>
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
                </UnstyledButton>
              ))}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default FieldList;
