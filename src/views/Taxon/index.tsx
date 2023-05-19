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
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconDotsVertical, IconExternalLink } from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Taxon as TaxonType } from '#/api/sources/taxon';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const { pathname } = useLocation();
  const data = useLoaderData() as TaxonType;
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <>
      <Container size='xl' py='xl'>
        <Group position='apart' align='start'>
          <Group align='start'>
            <Box mr='md'>
              <Skeleton pos='absolute' width={90} height={90} radius='lg' />
              <Image
                withPlaceholder
                src={
                  data.imageIdentifier &&
                  `https://images.ala.org.au/image/${data.imageIdentifier}/thumbnail`
                }
                width={90}
                height={90}
                radius='lg'
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
              <ActionIcon size='xl' variant='light' radius='xl'>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                icon={<IconExternalLink size={14} />}
                component='a'
                target='_blank'
                href={`https://bie.ala.org.au/species/${data.taxonConcept.guid}`}
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
      <Tabs variant='outline' mt='md' radius='sm' value={pathname.split('/')[3]}>
        <Tabs.List>
          <Group
            px='md'
            style={{
              width: '100%',
              maxWidth: 1320,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {['Summary', 'Accessions', 'Trials', 'Media', 'Sequences'].map((tabKey) => (
              <Tabs.Tab
                key={tabKey}
                value={tabKey.toLowerCase()}
                onClick={() => navigate(tabKey.toLowerCase())}
              >
                {tabKey}
              </Tabs.Tab>
            ))}
          </Group>
        </Tabs.List>
        <ScrollArea type='auto' h='calc(100vh - 250px)'>
          <Container size='xl' py='xl'>
            <Outlet />
          </Container>
        </ScrollArea>
      </Tabs>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Component as any).displayName = 'Taxon';
