import { Alert, Button, Center, Divider, Grid, GridProps, Group, Stack, Text } from '@mantine/core';
import { IconAlertCircle, IconAlertTriangle, IconExternalLink } from '@tabler/icons';
import { useParams } from 'react-router';

// Project / local components
import { MediaItem } from '#/api/graphql/types';

// Component imports
import MediaImage from './MediaImage';

interface MediaCollectionProps extends Omit<GridProps, 'children'> {
  label: string;
  disclaimer?: string;
  media: MediaItem[];
  selected: MediaItem | null;
  onSelect: (item: MediaItem) => void;
}

export default function MediaCollection({
  label,
  disclaimer,
  media,
  selected,
  onSelect,
  ...rest
}: MediaCollectionProps) {
  const { guid } = useParams();
  return (
    <Grid gutter='xs' {...rest}>
      <Grid.Col span={12}>
        <Group mb={disclaimer ? 0 : 'md'}>
          <Divider
            style={{ flexGrow: 1 }}
            label={
              <Text size='lg' style={{ fontFamily: 'var(--mantine-font-family-headings)' }}>
                {label}
              </Text>
            }
            labelPosition='left'
            variant='dashed'
          />
          <Button
            component='a'
            target='_blank'
            href={`${import.meta.env.VITE_ALA_BIE}/species/${guid}#gallery`}
            leftSection={<IconExternalLink size='0.8rem' />}
            size='xs'
            variant='subtle'
          >
            View more on ALA BIE
          </Button>
        </Group>
      </Grid.Col>
      {disclaimer && media?.length > 0 && (
        <Grid.Col span={12}>
          <Alert icon={<IconAlertTriangle size='1rem' />} color='yellow'>
            {disclaimer}
          </Alert>
        </Grid.Col>
      )}
      {media?.length > 0 ? (
        media?.map((item) => (
          <Grid.Col key={item.identifier} span={{ xs: 4, sm: 4, md: 4, lg: 3, xl: 3 }}>
            <MediaImage
              item={item}
              onClick={() => {
                if (item.identifier !== selected?.identifier) onSelect(item);
              }}
              selected={selected?.identifier === item.identifier}
              width='100%'
              height={150}
            />
          </Grid.Col>
        ))
      ) : (
        <Grid.Col span={12}>
          <Center>
            <Stack justify='center'>
              <IconAlertCircle size='3rem' />
              <Text c='dimmed'>No media found for this taxon</Text>
            </Stack>
          </Center>
        </Grid.Col>
      )}
    </Grid>
  );
}
