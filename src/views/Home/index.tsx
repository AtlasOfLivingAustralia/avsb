import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Image,
  type MantineSpacing,
  Space,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowUpRight,
  IconDatabase,
  IconExternalLink,
  IconMessageCircleQuestion,
  IconSeedlingFilled,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router';

// Static logos
import logoGrey from '#/assets/avsb-logo-grey.png';
import logoWhite from '#/assets/avsb-logo-white.png';
import wateringCan from '#/assets/watering-can-and-plant.png';

import { Blob, TaxonSearchInput } from '#/components';
import { Wave } from '#/components/Wave';
import { breakpoints } from '#/theme/constants';
import { HomeMap } from './components/HomeMap';
import Summaries from './components/Summaries';

function Home() {
  const navigate = useNavigate();
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);
  const colorScheme = useComputedColorScheme();
  const pagePadding: MantineSpacing | undefined = mdOrLarger ? undefined : 'xl';

  return (
    <>
      <Container size='xl' pt={mdOrLarger ? 'xl' : 0} mt={-30}>
        <Group justify='space-between' pt={mdOrLarger ? 'xl' : 0}>
          <Stack
            py='xl'
            px={pagePadding}
            w={mdOrLarger ? 'calc(100vw - 530px)' : '100%'}
            maw={mdOrLarger ? 600 : undefined}
          >
            <Title
              fw='bold'
              size={42}
              style={{
                color: 'light-dark(var(--mantine-color-dark-4), var(--mantine-color-gray-2))',
              }}
            >
              <Text
                component='span'
                inherit
                variant='gradient'
                gradient={{ from: '#A6CE39', to: '#487759' }}
              >
                Open access
              </Text>
              &nbsp;to
              <br />
              Australia&apos;s conservation seed banks
            </Title>
            <Text mt='sm' c='light-dark(var(--mantine-color-gray-8),var(--mantine-color-gray-5))'>
              The Australian Virtual Seed Bank connects you with seed collection and germination
              information from seed banks across Australia.
            </Text>
            <Text c='light-dark(var(--mantine-color-gray-8),var(--mantine-color-gray-5))'>
              Co-developed by the{' '}
              <Anchor href='https://www.seedpartnership.org.au/' target='_blank'>
                Australian Seed Bank Partnership
              </Anchor>{' '}
              and the{' '}
              <Anchor href='https://www.ala.org.au/' target='_blank'>
                Atlas of Living Australia
              </Anchor>
              , this resource supports research, restoration, and species recovery.
            </Text>
            <Text
              fw={600}
              mt='sm'
              mb='md'
              c='light-dark(var(--mantine-color-gray-8),var(--mantine-color-gray-5))'
            >
              Start your journey now by searching for a plant species or family below
            </Text>
            <TaxonSearchInput
              onChange={(guid) => {
                if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
              }}
            />
          </Stack>
          {mdOrLarger && <HomeMap />}
        </Group>
      </Container>
      {mdOrLarger && <Space h={40} />}
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType={mdOrLarger ? 'body' : 'simple'}
      />
      <Box
        mt={mdOrLarger ? -125 : -25}
        mb={-5}
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
      >
        <Container size='xl'>
          <Box px={pagePadding}>
            <Group pt={mdOrLarger ? 0 : 'xl'} justify='space-between'>
              <Stack
                w={mdOrLarger ? 'calc(100vw - 530px)' : '100%'}
                maw={mdOrLarger ? 600 : undefined}
              >
                <Group mb='md'>
                  <IconSeedlingFilled size='2rem' />
                  <Title order={2} fw={600}>
                    Inside the vault
                  </Title>
                </Group>
                <Text c='light-dark(var(--mantine-color-gray-7),var(--mantine-color-gray-5))'>
                  Our{' '}
                  <Anchor component={Link} to='/dashboard'>
                    Seed Bank Snapshot
                  </Anchor>{' '}
                  page reveals the story behind Australia&apos;s conservation collections. Discover
                  who is contributing to country-wide seed banking efforts, explore national counts
                  of our seed accessions, trials, and treatments, and download information about the
                  National and State listed threatened species we hold.
                </Text>
                <Text c='light-dark(var(--mantine-color-gray-7),var(--mantine-color-gray-5))'>
                  These insights empower conservation planning, research, and policy decisions to
                  protect Australia&apos;s plants for the future.
                </Text>
                <Group mt='lg'>
                  <Button
                    component={Link}
                    to='/dashboard'
                    variant='light'
                    rightSection={<IconArrowUpRight size='1.2rem' />}
                  >
                    Seed Bank Snapshot
                  </Button>
                </Group>
              </Stack>
              {mdOrLarger && (
                <div style={{ width: 400, height: 400 }}>
                  <Blob style={{ position: 'absolute' }} width={400} height={400} inverse />
                  <Center h='100%'>
                    <Image
                      w={245}
                      h={280}
                      style={{ zIndex: 10 }}
                      src={wateringCan}
                      alt='Vault spilling seeds'
                    />
                  </Center>
                </div>
              )}
            </Group>
            <Space h={20} />
            <Divider
              color='light-dark(var(--mantine-color-gray-4),var(--mantine-color-dark-4))'
              my='xl'
              variant='dashed'
            />
            <Space h={20} />
            <Stack>
              <Group justify='space-between'>
                <Group>
                  <IconDatabase size='2rem' />
                  <Title order={2} fw={600}>
                    Our Datasets
                  </Title>
                </Group>
                <Text
                  c='light-dark(var(--mantine-color-dark-3), var(--mantine-color-gray-6))'
                  size='xs'
                >
                  Last Updated December, 2025
                </Text>
              </Group>
              <Text c='light-dark(var(--mantine-color-gray-7),var(--mantine-color-gray-5))'>
                Browse the collections provided by our seed bank partners. Click a dataset below to
                view their collections and germination records.
              </Text>
              <Summaries mt='md' />
            </Stack>
          </Box>
        </Container>
        <Space h={25} />
      </Box>
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <Container size='xl'>
        <Box mt={mdOrLarger ? -100 : 0} px={pagePadding} py='xl'>
          <Group justify={mdOrLarger ? 'space-between' : 'center'} mb='xl' pb='xl'>
            <Stack
              align={mdOrLarger ? 'flex-start' : 'center'}
              w={mdOrLarger ? '70%' : '100%'}
              gap='md'
            >
              <Image
                w={80}
                src={colorScheme === 'dark' ? logoWhite : logoGrey}
                alt='Australian virtual seedbank logo'
              />
              <Text c='dimmed' size='sm' ta={mdOrLarger ? 'left' : 'center'}>
                We acknowledge Partnership organisations for providing their data, and the Director
                of National Parks and the Council of Heads of Australian Botanic Gardens for support
                to update this critical resource. The Australian Virtual Seed Bank is more than a
                portal; it&apos;s a testament to the power of national collaboration, data
                transparency, and a shared commitment to native plant conservation.
              </Text>
              <Text c='dimmed' size='sm' mt='xl'>
                Illustration by{' '}
                <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor>{' '}
                from <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
              </Text>
            </Stack>
            <Stack>
              <Group>
                <IconMessageCircleQuestion size='1.5rem' />
                <Text size='lg' style={{ fontFamily: 'var(--mantine-font-family-headings)' }}>
                  Have a query?
                </Text>
              </Group>
              <Button
                variant='light'
                leftSection={<IconExternalLink size='1rem' />}
                component='a'
                href='https://www.seedpartnership.org.au/about-us/contact-us/'
                target='_blank'
              >
                Contact Us
              </Button>
            </Stack>
          </Group>
        </Box>
      </Container>
    </>
  );
}

export default Home;
