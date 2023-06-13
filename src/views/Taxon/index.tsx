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
  UnstyledButton,
  HoverCard,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconDotsVertical, IconExternalLink, IconQuestionCircle } from '@tabler/icons';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Taxon } from '#/api/sources/taxon';

const pageDescriptions: { [key: string]: string[] } = {
  summary: [
    'Below you can view information about this taxon, including its taxonomy and locations where seed was collected.',
  ],
  accessions: [
    'Below shows seed accession data for your chosen taxon. You can click on a table row to expand it, or click the details button to see all information about the accession.',
    'Filters are also available to aid in your search.',
  ],
  trials: [
    'Below shows seed trial data for your chosen taxon. You can click on a table row to expand it and see treatment information.',
    'Filters are also available to aid in your search.',
  ],
  media: [
    'Below shows related media for your chosen taxon. Click on an image to see a larger variant & its associated metadata.',
    'Filters are also available to aid in your search.',
  ],
  sequences: [
    'Below are sequences for your chosen taxon, retrieved from GenBank. Click on a card to be redirected to GenBank.',
    "'View all records' redirects to the full list of search results.",
  ],
};

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const { pathname } = useLocation();
  const { taxon: data } = useLoaderData() as { taxon: Taxon };
  const navigate = useNavigate();
  const clipboard = useClipboard({ timeout: 500 });
  const theme = useMantineTheme();

  const currentPage = pathname.split('/')[3];

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
      <Tabs variant='outline' mt='md' radius='sm' value={currentPage}>
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
            <HoverCard width={350} position='left' withArrow offset={12}>
              <HoverCard.Target>
                <UnstyledButton ml='auto' pb={8}>
                  <Group spacing='xs'>
                    <IconQuestionCircle
                      color={
                        theme.colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[4]
                      }
                    />
                    <Text
                      sx={{
                        color:
                          theme.colorScheme === 'dark'
                            ? theme.colors.blue[2]
                            : theme.colors.blue[4],
                        textDecoration: 'underline',
                        textUnderlineOffset: 2,
                        textDecorationColor:
                          theme.colorScheme === 'dark'
                            ? 'rgba(165, 216, 255, 0.25)'
                            : 'rgba(34, 139, 230, 0.25)',
                        textTransform: 'capitalize',
                      }}
                      size='xs'
                      weight='bold'
                    >
                      {currentPage} Page
                    </Text>
                  </Group>
                </UnstyledButton>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack spacing='sm'>
                  {pageDescriptions[currentPage].map((description) => (
                    <Text key={description} size='sm'>
                      {description}
                    </Text>
                  ))}
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
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

Object.assign(Component, { displayName: 'Taxon' });
