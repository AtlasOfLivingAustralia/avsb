import {
  Title,
  Text,
  Container,
  Tabs,
  Box,
  Image,
  Group,
  Skeleton,
  Menu,
  ActionIcon,
  Badge,
  ScrollArea,
  Divider,
  useMantineTheme,
  ThemeIcon,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconBrandAsana,
  IconCopy,
  IconDna2,
  IconDotsVertical,
  IconExternalLink,
  IconId,
  IconLeaf,
  IconPhoto,
  IconTestPipe,
} from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Taxon } from '#/api/sources/taxon';
import PageSummary from './components/PageSummary';

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

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const { pathname } = useLocation();
  const { taxon: data } = useLoaderData() as { taxon: Taxon };
  const clipboard = useClipboard({ timeout: 500 });
  const currentPage = pathname.split('/')[3];
  const theme = useMantineTheme();
  const navigate = useNavigate();

  return (
    <>
      <Container size={MAX_WIDTH} py='xl'>
        <Group position='apart' align='start'>
          <Group align='start'>
            <Box mr='md'>
              <Skeleton pos='absolute' width={90} height={90} radius='lg' />
              <Image
                withPlaceholder
                src={
                  data.imageIdentifier &&
                  `${import.meta.env.VITE_ALA_IMAGES}/image/${data.imageIdentifier}/thumbnail`
                }
                width={90}
                height={90}
                radius='lg'
                alt={`Representative image of ${data.classification.scientificName}`}
              />
            </Box>
            <Box>
              <Title>{data.taxonConcept.nameString}</Title>
              <Group spacing='sm'>
                <Text color='dimmed'>{data.commonNames[0]?.nameString || 'No common name'}</Text>
                <Badge radius='sm'>{data.taxonConcept.rankString}</Badge>
              </Group>
            </Box>
          </Group>
          <Menu shadow='md' position='bottom-end'>
            <Menu.Target>
              <ActionIcon size='xl' variant='light' radius='xl' aria-label='View taxon action menu'>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconExternalLink size={14} />}
                component='a'
                target='_blank'
                href={`${import.meta.env.VITE_ALA_BIE}/species/${data.taxonConcept.guid}`}
              >
                View on ALA BIE
              </Menu.Item>
              <Menu.Item
                icon={<IconCopy size={14} />}
                onClick={() => clipboard.copy(data.taxonConcept.guid)}
              >
                Copy Taxon ID
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Tabs variant='default' mt='md' radius='sm' value={currentPage}>
        <Group spacing={0}>
          <Box
            style={{ display: 'flex', alignItems: 'flex-end' }}
            w={`calc(((100vw - ${MAX_WIDTH}px) / 2) + ${theme.spacing.md})`}
            miw={theme.spacing.md}
            h={48}
          >
            <Divider size={2} w='100%' />
          </Box>
          <Tabs.List style={{ flexGrow: 1 }}>
            {tabs.map(({ icon: Icon, tabKey }) => (
              <Tabs.Tab
                key={tabKey}
                value={tabKey.toLowerCase()}
                onClick={() => navigate(tabKey.toLowerCase())}
              >
                <Group spacing='xs'>
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
            h={48}
          >
            <PageSummary
              currentPage={currentPage}
              pr={`calc((100vw - ${MAX_WIDTH}px) / 2)`}
              mb={10}
            />
            <Divider size={2} w='100%' />
          </Box>
        </Group>
        <ScrollArea type='auto' h='calc(100vh - 263px)'>
          <Container size={MAX_WIDTH} py='xl'>
            <Outlet />
          </Container>
        </ScrollArea>
      </Tabs>
    </>
  );
}

Object.assign(Component, { displayName: 'Taxon' });
