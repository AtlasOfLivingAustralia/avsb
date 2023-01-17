import {
  Title,
  Text,
  Container,
  Tabs,
  useMantineTheme,
  Box,
  Image,
  Group,
  Skeleton,
  Menu,
  ActionIcon,
} from '@mantine/core';
import { IconDotsVertical, IconExternalLink } from '@tabler/icons';
import { useLoaderData } from 'react-router-dom';
import { Taxon as TaxonType } from '#/api/sources/taxon';

function Taxon() {
  const data = useLoaderData() as TaxonType;
  const theme = useMantineTheme();

  return (
    <>
      <Container size='lg' py='xl'>
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
              <Text color='dimmed'>{data.commonNames[0]?.nameString || 'No common name'}</Text>
            </Box>
          </Group>
          <Menu shadow='md' position='bottom-end'>
            <Menu.Target>
              <ActionIcon size='xl' variant='light' radius='xl'>
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconExternalLink size={14} />}>View on ALA</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Tabs variant='outline' mt='md' mx={theme.spacing.md * -1} radius='sm' defaultValue='trials'>
        <Tabs.List>
          <Group
            px='md'
            style={{
              width: '100%',
              maxWidth: 1140,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Tabs.Tab value='trials'>Trials</Tabs.Tab>
            <Tabs.Tab value='more'>More</Tabs.Tab>
          </Group>
        </Tabs.List>
        <Container size='lg' py='xl'>
          <Tabs.Panel value='trials'>
            <Text>Trials tab</Text>
          </Tabs.Panel>
          <Tabs.Panel value='more'>
            <Text>More tab</Text>
          </Tabs.Panel>
        </Container>
      </Tabs>
    </>
  );
}

export default Taxon;
