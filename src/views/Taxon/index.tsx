import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Flex,
  FloatingIndicator,
  Group,
  Image,
  Paper,
  Skeleton,
  Tabs,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { useClipboard, useMediaQuery } from '@mantine/hooks';
import {
  IconBrandAsana,
  IconCopy,
  IconDna2,
  IconExternalLink,
  IconId,
  IconLeaf,
  IconPhoto,
  IconTestPipe,
} from '@tabler/icons-react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router';
import { Taxon } from '#/api/sources/taxon';
import PageSummary from './components/PageSummary';
import { useState } from 'react';

import classes from './index.module.css';
import { breakpoints } from '#/theme';

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

  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);

  // Tabs state
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <>
      <Container size={MAX_WIDTH} py='xl' mt={-30}>
        <Group justify='space-between' align='start'>
          <Group align='start'>
            <Box mr='md'>
              <Skeleton
                w={90}
                h={90}
                radius='lg'
                visible={Boolean(data.imageIdentifier) && !imageLoaded}
              >
                {data?.imageIdentifier ? (
                  <Image
                    src={
                      data.imageIdentifier &&
                      `${import.meta.env.VITE_ALA_IMAGES}/image/${data.imageIdentifier.split(',')[0]}/thumbnail`
                    }
                    w={90}
                    h={90}
                    radius='lg'
                    alt={`Representative image of ${data.classification.scientificName}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <Paper
                    w={90}
                    h={90}
                    radius='lg'
                    bg='light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-6))'
                  >
                    <Center w={90} h={90}>
                      <IconPhoto
                        style={{
                          color:
                            'light-dark(var(--mantine-color-gray-5), var(--mantine-color-dark-3))',
                        }}
                        size='2rem'
                      />
                    </Center>
                  </Paper>
                )}
              </Skeleton>
            </Box>
            <Box>
              <Title>{data.taxonConcept.nameString}</Title>
              <Group gap='sm'>
                <Text c='dimmed'>{data.commonNames[0]?.nameString || 'No common name'}</Text>
                <Badge variant='light' radius='md'>
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
      <Tabs variant='none' value={currentPage}>
        <Container size={MAX_WIDTH} pb='sm'>
          <Flex justify={'space-between'}>
            <Tabs.List ref={setRootRef} className={classes.list}>
              {tabs.map(({ tabKey, icon: Icon }) => (
                <Tabs.Tab
                  key={tabKey}
                  value={tabKey.toLowerCase()}
                  ref={setControlRef(tabKey.toLowerCase())}
                  className={classes.tab}
                  leftSection={<Icon size='0.8rem' />}
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
                  {tabKey}
                </Tabs.Tab>
              ))}
              <FloatingIndicator
                target={controlsRefs[currentPage]}
                parent={rootRef}
                className={classes.indicator}
              />
            </Tabs.List>
            {mdOrLarger && <PageSummary currentPage={currentPage} />}
          </Flex>
        </Container>
        <Container size={MAX_WIDTH} pt='lg' pb='xl'>
          <Outlet />
        </Container>
      </Tabs>
    </>
  );
}

Object.assign(Component, { displayName: 'Taxon' });
