import {
  ActionIcon,
  Badge,
  Box,
  Container,
  Divider,
  Group,
  Image,
  Skeleton,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconBrandAsana,
  IconCopy,
  IconDna2,
  IconExternalLink,
  IconId,
  IconLeaf,
  IconPhoto,
  IconTestPipe,
} from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import { Taxon } from '#/api/sources/taxon';
import PageSummary from './components/PageSummary';
import { useState } from 'react';

const MAX_WIDTH = 1450;
const tabs = [
  {
    tabKey: 'Summary',
    icon: IconId,
  },
  {
    tabKey: 'Accessions',
    icon: IconBrandAsana,
  },
  {
    tabKey: 'Trials',
    icon: IconTestPipe,
  },
  {
    tabKey: 'Media',
    icon: IconPhoto,
  },
  {
    tabKey: 'Sequences',
    icon: IconDna2,
  },
  {
    tabKey: 'Traits',
    icon: IconLeaf,
  },
];

export function Component() {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { pathname, state } = useLocation();
  const { taxon: data } = useLoaderData() as { taxon: Taxon };
  const clipboard = useClipboard({ timeout: 500 });
  const currentPage = pathname.split('/')[3];
  const navigate = useNavigate();

  return (
    <>
      <Container size={MAX_WIDTH} py='xl'>
        <Group justify='space-between' align='start'>
          <Group align='start'>
            <Box mr='md'>
              <Skeleton w={90} h={90} radius='lg' visible={!data || !imageLoaded}>
                <Image
                  src={
                    data.imageIdentifier &&
                    `${import.meta.env.VITE_ALA_IMAGES}/image/${data.imageIdentifier}/thumbnail`
                  }
                  w={90}
                  h={90}
                  radius='lg'
                  alt={`Representative image of ${data.classification.scientificName}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </Skeleton>
            </Box>
            <Box>
              <Title>{data.taxonConcept.nameString}</Title>
              <Group gap='sm'>
                <Text c='dimmed'>{data.commonNames[0]?.nameString || 'No common name'}</Text>
                <Badge variant='light' radius='sm'>
                  {data.taxonConcept.rankString}
                </Badge>
              </Group>
            </Box>
          </Group>
          <Group gap='sm'>
            <Tooltip label={<Text size='xs'>Copy taxon ID</Text>}>
              <ActionIcon
                onClick={() => clipboard.copy(data.taxonConcept.guid)}
                size='xl'
                variant='light'
                radius='xl'
                aria-label='Copy taxon ID'
              >
                <IconCopy />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={<Text size='xs'>View taxon on ALA</Text>}>
              <ActionIcon
                component='a'
                target='_blank'
                href={`${import.meta.env.VITE_ALA_BIE}/species/${data.taxonConcept.guid}`}
                size='xl'
                variant='light'
                radius='xl'
                aria-label='View taxon on ALA'
              >
                <IconExternalLink />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </Container>
      <Tabs variant='default' mt='md' radius='md' value={currentPage}>
        <Group gap={0}>
          <Box
            style={{ display: 'flex', alignItems: 'flex-end' }}
            w={`calc(((100vw - ${MAX_WIDTH}px) / 2) + var(--mantine-spacing-md))`}
            miw='var(--mantine-spacing-md)'
            h={50}
          >
            <Divider size={2} w='100%' />
          </Box>
          <Tabs.List style={{ flexGrow: 1 }}>
            {tabs.map(({ icon: Icon, tabKey }) => (
              <Tabs.Tab
                key={tabKey}
                value={tabKey.toLowerCase()}
                onClick={() => {
                  if (tabKey !== 'Sequences') {
                    navigate(tabKey.toLowerCase(), { state });
                  } else {
                    window.open(
                      `https://www.ncbi.nlm.nih.gov/nuccore/?term=${encodeURIComponent(
                        data.taxonConcept.nameString,
                      )}`,
                    );
                  }
                }}
              >
                <Group gap='xs'>
                  <ThemeIcon
                    variant='light'
                    color={currentPage === tabKey.toLowerCase() ? 'blue' : 'gray'}
                    radius='lg'
                  >
                    <Icon size='0.9rem' />
                  </ThemeIcon>
                  {tabKey}
                </Group>
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flexGrow: 1,
            }}
            h={50}
          >
            <PageSummary
              currentPage={currentPage}
              pr={`calc((100vw - ${MAX_WIDTH}px) / 2)`}
              mb={10}
            />
            <Divider size={2} w='100%' />
          </Box>
        </Group>
        <Container size={MAX_WIDTH} py='xl'>
          <Outlet />
        </Container>
      </Tabs>
    </>
  );
}

Object.assign(Component, { displayName: 'Taxon' });
