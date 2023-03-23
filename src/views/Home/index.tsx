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
  Grid,
  Paper,
  useMantineTheme,
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
        mb={-5}
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='lg'>
          <Box p='xl'>
            <Title mb='xl' pb='md' order={2} weight={600}>
              Our Datasets
            </Title>
            <Grid gutter='xl'>
              {[
                { name: 'Australian National Botanic Gardens Seed Bank' },
                { name: 'Tasmanian Seed Conservation Centre' },
                { name: 'Victorian Conservation Seedbank' },
                { name: 'George Brown Darwin Botanic Gardens' },
                { name: 'WA Department of Parks and Wildlife, Threatened Flora Seed Centre' },
                { name: 'Greening Australia' },
              ].map(({ name }) => (
                <Grid.Col key={name} xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    p='md'
                    shadow='md'
                    h='100%'
                    style={{
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : 'white',
                    }}
                  >
                    <Text
                      sx={{
                        fontFamily: 'Lexend Deca, sans-serif',
                        color:
                          theme.colorScheme === 'dark'
                            ? theme.colors.gray[3]
                            : theme.colors.dark[3],
                      }}
                    >
                      {name}
                    </Text>
                  </Paper>
                </Grid.Col>
              ))}
            </Grid>
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
    </>
  );
}

export default Home;
