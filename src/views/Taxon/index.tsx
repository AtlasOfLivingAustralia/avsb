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
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconDotsVertical, IconExternalLink } from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Taxon } from '#/api/sources/taxon';
import PageSummary from './components/PageSummary';

const MAX_WIDTH = 1450;

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const { pathname } = useLocation();
  const { taxon: data } = useLoaderData() as { taxon: Taxon };
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 500 });

  const currentPage = pathname.split('/')[3];
  const theme = useMantineTheme();

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
      <Tabs variant='outline' mt='md' radius='sm' value={currentPage}>
        <Group spacing={0}>
          <Box
            style={{ display: 'flex', alignItems: 'flex-end' }}
            w={`calc(((100vw - ${MAX_WIDTH}px) / 2) + ${theme.spacing.md})`}
            miw={theme.spacing.md}
            h={35}
          >
            <Divider w='100%' />
          </Box>
          <Tabs.List style={{ flexGrow: 1 }}>
            {['Summary', 'Accessions', 'Trials', 'Media', 'Sequences'].map((tabKey) => (
              <Tabs.Tab
                key={tabKey}
                value={tabKey.toLowerCase()}
                onClick={() => navigate(tabKey.toLowerCase())}
              >
                {tabKey}
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
            h={35}
          >
            <PageSummary
              currentPage={currentPage}
              pr={`calc((100vw - ${MAX_WIDTH}px) / 2)`}
              mb={6}
            />
            <Divider w='100%' />
          </Box>
          {/* <PageSummary currentPage={currentPage} /> */}
        </Group>
        <ScrollArea type='auto' h='calc(100vh - 250px)'>
          <Container size={MAX_WIDTH} py='xl'>
            <Outlet />
          </Container>
        </ScrollArea>
      </Tabs>
    </>
  );
}

Object.assign(Component, { displayName: 'Taxon' });
