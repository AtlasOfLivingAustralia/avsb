import {
  Group,
  Container,
  Text,
  Stack,
  Title,
  Center,
  Image,
  useMantineTheme,
  Box,
  Space,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { Blob, TaxonSearchInput } from '#/components';

import wateringCan from '#/assets/watering-can-and-plant.png';
import { Wave } from '#/components/Wave';

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
              aggregated seed data sourced from various seed banks across Australia
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
                <Image width={250} height={285} src={wateringCan} />
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
        h={500}
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='lg'>
          <Box p='xl'>
            <Title order={2} weight={600}>
              Our Partners
            </Title>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Home;
