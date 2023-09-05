import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import {
  Anchor,
  Avatar,
  Box,
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
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconAffiliate,
  IconAlertCircle,
  IconBuildingBank,
  IconCalendar,
  IconDimensions,
  IconExternalLink,
  IconFileInfo,
  IconLicense,
  IconQuestionMark,
  IconTypography,
  IconUser,
  TablerIcon,
} from '@tabler/icons';

// Project / local components
import { gqlQueries, performGQLQuery } from '#/api';
import { Filters } from '#/components';
import { MediaItem, Predicate } from '#/api/graphql/types';
import { useMounted } from '#/helpers';

// Component imports
import MediaCollection from './components/MediaCollection';
import filters, { months } from './filters';

interface ImageProperty {
  key: keyof MediaItem;
  name: string;
  icon: TablerIcon;
}

const imageProperties: ImageProperty[] = [
  {
    key: 'creator',
    name: 'Creator',
    icon: IconUser,
  },
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

interface TaxonMedia {
  specimens: MediaItem[];
  other: MediaItem[];
}

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const initialMedia = useLoaderData() as TaxonMedia;
  const [media, setMedia] = useState<TaxonMedia | null>(initialMedia);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(
    media?.specimens?.[0] || media?.other?.[0] || null,
  );
  const [selectedLoaded, setSelectedLoaded] = useState<boolean>(false);
  const [predicates, setPredicates] = useState<{ [key: string]: Predicate }>({});
  const params = useParams();
  const mounted = useMounted();

  useEffect(() => {
    async function runQuery() {
      const query = {
        ...(predicates.occurrence_date ? predicateToQuery(predicates.occurrence_date) : {}),
        ...(predicates.data_resource_uid
          ? { data_resource_uid: predicates.data_resource_uid.value }
          : {}),
      };

      const { data } = await performGQLQuery(gqlQueries.QUERY_TAXON_MEDIA, {
        key: params.guid,
        specimenParams: {
          query,
          filter: {
            ...(predicates.month
              ? { month: months.indexOf(predicates.month.value as string) + 1 }
              : {}),
            basis_of_record: 'PreservedSpecimen',
          },
          size: 4,
        },
        otherParams: {
          query,
          filter: {
            ...(predicates.month
              ? { month: months.indexOf(predicates.month.value as string) + 1 }
              : {}),
            '-basis_of_record': 'PreservedSpecimen',
          },
        },
        size: 20,
      });
      setMedia(data);
    }

    if (mounted) runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predicates]);

  if (initialMedia === null || initialMedia.specimens.length + initialMedia.other.length === 0)
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
        {initialMedia.specimens?.length > 0 && (
          <MediaCollection
            label='Specimens'
            media={media?.specimens || []}
            selected={selectedMedia}
            onSelect={(item) => {
              setSelectedLoaded(false);
              setSelectedMedia(item);
            }}
            mb='xl'
          />
        )}
        {initialMedia.other?.length > 0 && (
          <MediaCollection
            label='Other'
            disclaimer='The accuracy of the taxa shown in these images may vary'
            media={media?.other || []}
            selected={selectedMedia}
            onSelect={(item) => {
              setSelectedLoaded(false);
              setSelectedMedia(item);
            }}
            mb='xl'
          />
        )}
      </Grid.Col>
      <Grid.Col xs={12} sm={12} md={6} lg={6} xl={5} orderXs={1} orderSm={1} orderMd={2}>
        <Card shadow='lg' padding='lg' radius='md' withBorder>
          <Card.Section pos='relative' h={350}>
            <Image
              pos='absolute'
              src={selectedMedia?.accessURI}
              height={350}
              alt={`Background ${selectedMedia?.title || 'image for currently selected image'}`}
            />
            <Overlay blur={8} opacity={0.1} center>
              <Image
                src={selectedMedia?.accessURI}
                height={350}
                fit='contain'
                styles={{ image: { margin: 0 } }}
                onLoad={() => setSelectedLoaded(true)}
                alt={selectedMedia?.title || 'Currently selected image'}
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
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Avatar variant='filled' radius='xl' mr='sm'>
                <IconBuildingBank size='1rem' />
              </Avatar>
              <Stack spacing={0}>
                <Text>
                  From{' '}
                  <Anchor
                    target='_blank'
                    href={`${import.meta.env.VITE_ALA_COLLECTORY}/public/show/${
                      selectedMedia?.provider
                    }`}
                  >
                    {selectedMedia?.providerLiteral}
                  </Anchor>
                </Text>
                <Text size='xs'>
                  Taken by <b>{selectedMedia?.creator || 'Unknown Creator'}</b>
                </Text>
              </Stack>
            </Box>
          </Group>
          <Divider
            my='md'
            sx={(theme) => ({
              marginLeft: `calc(${theme.spacing.lg} * -1)`,
              marginRight: `calc(${theme.spacing.lg} * -1)`,
            })}
          />
          {selectedMedia?.accessOriginalURI && (
            <Button
              fullWidth
              leftIcon={<IconExternalLink size='1rem' />}
              component='a'
              href={selectedMedia.accessOriginalURI}
              target='_blank'
              size='xs'
            >
              View Original
            </Button>
          )}
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

Object.assign(Component, { displayName: 'Media' });
