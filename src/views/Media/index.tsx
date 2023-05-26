import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Loader,
  Overlay,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAffiliate,
  IconAlertCircle,
  IconCalendar,
  IconDimensions,
  IconExternalLink,
  IconFileInfo,
  IconInfoCircle,
  IconLicense,
  IconQuestionMark,
  IconTypography,
  TablerIcon,
} from '@tabler/icons';

// Project / local components
import { gqlQueries, performGQLQuery } from '#/api';
import { Filters } from '#/components';
import { MediaItem, Predicate } from '#/api/graphql/types';
import { getNameInitials, useMounted } from '#/helpers';

// Component imports
import MediaImage from './components/MediaImage';
import filters, { months } from './filters';

interface ImageProperty {
  key: keyof MediaItem;
  name: string;
  icon: TablerIcon;
}

const imageProperties: ImageProperty[] = [
  {
    key: 'pixelXDimension',
    name: 'Original Width',
    icon: IconDimensions,
  },
  {
    key: 'pixelYDimension',
    name: 'Original Height',
    icon: IconDimensions,
  },
  {
    key: 'webStatement',
    name: 'License',
    icon: IconLicense,
  },
  {
    key: 'format',
    name: 'File Format',
    icon: IconFileInfo,
  },
  {
    key: 'title',
    name: 'Title',
    icon: IconTypography,
  },
  {
    key: 'createDate',
    name: 'Creation Date',
    icon: IconCalendar,
  },
  {
    key: 'type',
    name: 'Type',
    icon: IconQuestionMark,
  },
  {
    key: 'subtypeLiteral',
    name: 'Subtype',
    icon: IconAffiliate,
  },
];

const predicateToQuery = ({ type, key, value }: Predicate) => {
  if (type === 'equals') {
    const iso = new Date(value as number).toISOString();
    return {
      [key || '']: `[${iso} TO ${iso}]`,
    };
  }

  if (type === 'range') {
    const { gte, lte } = value as { gte?: number | ''; lte?: number | '' };

    // Construct dates from GTE & LTE values
    const gteIso = gte ? new Date(gte).toISOString() : null;
    const lteIso = lte ? new Date(lte).toISOString() : null;

    return { [key || '']: `[${gteIso || '*'} TO ${lteIso || '*'}]` };
  }

  return {};
};

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const [media, setMedia] = useState<MediaItem[] | null>(useLoaderData() as MediaItem[]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(media?.[0] || null);
  const [selectedLoaded, setSelectedLoaded] = useState<boolean>(false);
  const [predicates, setPredicates] = useState<{ [key: string]: Predicate }>({});
  const params = useParams();
  const mounted = useMounted();

  useEffect(() => {
    async function runQuery() {
      const { data } = await performGQLQuery(gqlQueries.QUERY_TAXON_MEDIA, {
        key: params.guid,
        params: {
          query: {
            ...(predicates.occurrence_date ? predicateToQuery(predicates.occurrence_date) : {}),
            ...(predicates.data_resource_uid
              ? { data_resource_uid: predicates.data_resource_uid.value }
              : {}),
          },
          filter: {
            ...(predicates.month
              ? { month: months.indexOf(predicates.month.value as string) + 1 }
              : {}),
          },
        },
        size: 20,
      });
      setMedia(data?.taxonMedia);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predicates]);

  if (media === null)
    return (
      <Center h='calc(100vh - 380px)'>
        <Stack align='center'>
          <IconAlertCircle size='3rem' />
          <Text color='dimmed'>No media found for this taxon</Text>
        </Stack>
      </Center>
    );

  return (
    <Grid gutter='xl'>
      <Grid.Col span={12}>
        <Filters
          predicates={Object.values(predicates)}
          filters={filters}
          onPredicates={(data) => {
            setPredicates(data.reduce((prev, cur) => ({ ...prev, [cur.key || '']: cur }), {}));
          }}
        />
      </Grid.Col>
      <Grid.Col xs={12} sm={12} md={6} lg={6} xl={7} orderXs={2} orderSm={2} orderMd={1}>
        {media?.length > 0 ? (
          <Grid gutter='xs' h='100%'>
            {media?.map((item) => (
              <Grid.Col key={item.identifier} xs={4} sm={4} md={4} lg={3} xl={3}>
                <MediaImage
                  item={item}
                  onClick={() => {
                    if (item.identifier !== selectedMedia?.identifier) {
                      setSelectedLoaded(false);
                      setSelectedMedia(item);
                    }
                  }}
                  selected={selectedMedia?.identifier === item.identifier}
                  width='100%'
                  height={150}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Paper h='100%' withBorder>
            <Center h='100%'>
              <Stack align='center'>
                <IconInfoCircle size='3rem' />
                <Text color='dimmed'>No matching media found</Text>
              </Stack>
            </Center>
          </Paper>
        )}
      </Grid.Col>
      <Grid.Col xs={12} sm={12} md={6} lg={6} xl={5} orderXs={1} orderSm={1} orderMd={2}>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Card.Section pos='relative' h={350}>
            <Image pos='absolute' src={selectedMedia?.accessOriginalURI} height={350} />
            <Overlay blur={8} opacity={0.1} center>
              <Image
                src={selectedMedia?.accessOriginalURI}
                height={350}
                fit='contain'
                styles={{ image: { margin: 0 } }}
                onLoad={() => setSelectedLoaded(true)}
              />
            </Overlay>
            {!selectedLoaded && (
              <Overlay opacity={0.4} center>
                <Loader />
              </Overlay>
            )}
          </Card.Section>
          <Center pt='sm'>
            <Text size='sm'>{selectedMedia?.title}</Text>
          </Center>
          <Divider
            my='sm'
            sx={(theme) => ({
              marginLeft: `calc(${theme.spacing.lg} * -1)`,
              marginRight: `calc(${theme.spacing.lg} * -1)`,
            })}
          />
          <Group position='apart' mt='md' mb='xs'>
            <Group>
              <Avatar variant='filled' radius='xl'>
                {getNameInitials({
                  given_name: selectedMedia?.creator?.split(' ')?.[0],
                  family_name: selectedMedia?.creator?.split(' ')?.[1],
                })}
              </Avatar>
              <Text weight='bold'>{selectedMedia?.creator || 'Unknown Creator'}</Text>
            </Group>
            {selectedMedia?.accessOriginalURI && (
              <Button
                leftIcon={<IconExternalLink size='1rem' />}
                component='a'
                href={selectedMedia.accessOriginalURI}
                target='_blank'
                variant='outline'
                size='xs'
              >
                View Original
              </Button>
            )}
          </Group>
          <Divider
            my='md'
            sx={(theme) => ({
              marginLeft: `calc(${theme.spacing.lg} * -1)`,
              marginRight: `calc(${theme.spacing.lg} * -1)`,
            })}
          />
          <List spacing='xs'>
            {imageProperties
              .filter(({ key }) => selectedMedia?.[key])
              .map(({ key, name, icon: Icon }) => (
                <List.Item
                  key={key}
                  icon={
                    <ThemeIcon variant='light' size={26} radius='xl'>
                      <Icon size='1rem' />
                    </ThemeIcon>
                  }
                >
                  <Text size='sm' weight='bold'>
                    {name}
                  </Text>
                  <Text size='sm' color='dimmed'>
                    {selectedMedia?.[key]}
                  </Text>
                </List.Item>
              ))}
          </List>
        </Card>
      </Grid.Col>
    </Grid>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Component as any).displayName = 'Media';
