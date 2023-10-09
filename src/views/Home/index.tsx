import {
  Group,
  Container,
  Text,
  Stack,
  Title,
  Center,
  Image,
  Box,
  Space,
  Paper,
  useMantineTheme,
  Anchor,
  Button,
  Chip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Blob, TaxonSearchInput } from '#/components';
import wateringCan from '#/assets/watering-can-and-plant.png';
import { Wave } from '#/components/Wave';
import { IconExternalLink, IconQuestionCircle } from '@tabler/icons';
import Summaries from './components/Summaries';

function Home() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);

  return (
    <>
      <Container size='lg' pt={mdOrLarger ? 'xl' : 0}>
        <Group position='apart' pt={mdOrLarger ? 'xl' : 0}>
          <Stack p='xl' w={mdOrLarger ? 470 : '100%'}>
            <Title weight='bold' size={42}>
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
              Australia&apos;s seed data
            </Title>
            <Text mt='sm'>
              The Australian Virtual Seed Bank is an online portal that provides access to
              aggregated seed data sourced from various seed banks across Australia as part of the{' '}
              <Anchor href='https://www.seedpartnership.org.au/' target='_blank'>
                Australian Seed Bank Partnership
              </Anchor>
            </Text>
            <Text mb='md'>Get started by searching for a taxon below</Text>
            <TaxonSearchInput
              onChange={(guid) => {
                if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
              }}
            />
          </Stack>
          {mdOrLarger && (
            <div style={{ width: 450, height: 450 }}>
              <Blob style={{ position: 'absolute' }} width={450} height={450} />
              <Center h='100%' style={{ zIndex: 10 }}>
                <Image width={250} height={285} src={wateringCan} alt='Watering can with plant' />
              </Center>
            </div>
          )}
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
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='lg'>
          <Box p='xl'>
            <Group position='apart' mb='xl'>
              <Title order={2} weight={600}>
                Our Datasets
              </Title>
              <Chip size='xs' checked={false}>
                Last Updated September, 2023
              </Chip>
            </Group>
            <Summaries mt='md' />
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
      <Box mt={mdOrLarger ? -100 : 0}>
        <Center pb='xl' mb='xl'>
          <Stack>
            <Paper p='xl' pl='md' radius='lg' withBorder>
              <Group spacing='xl'>
                <IconQuestionCircle size='2rem' />
                <Stack>
                  <Text size='lg' sx={{ fontFamily: theme.headings.fontFamily }}>
                    Have a query?
                  </Text>
                  <Button
                    variant='outline'
                    leftIcon={<IconExternalLink size='1rem' />}
                    component='a'
                    href='https://www.seedpartnership.org.au/about-us/contact-us/'
                    target='_blank'
                  >
                    Contact Us
                  </Button>
                </Stack>
              </Group>
            </Paper>
            <Text color='dimmed' size='sm' mt='xl'>
              Illustration by{' '}
              <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor>{' '}
              from <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
            </Text>
          </Stack>
        </Center>
      </Box>
    </>
  );
}

export default Home;
