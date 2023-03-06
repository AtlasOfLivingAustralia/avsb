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
import { IconDotsVertical, IconExternalLink } from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Taxon as TaxonType } from '#/api/sources/taxon';

function Taxon() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = useLoaderData() as TaxonType;
  const currentRoute = pathname.substring(pathname.lastIndexOf('/') + 1);

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
                View on ALA
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Tabs variant='outline' mt='md' radius='sm' value={currentRoute}>
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
            {['Trials', 'More'].map((tabKey) => (
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
        <ScrollArea h='calc(100vh - 266px)'>
          <Container size='xl' py='xl'>
            <Outlet />
          </Container>
        </ScrollArea>
      </Tabs>
    </>
  );
}

export default Taxon;
