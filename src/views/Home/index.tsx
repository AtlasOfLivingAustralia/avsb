import { Blob, TaxonSearchInput } from '#/components';
import { Group, Container, Text, Stack, Title, Box, Center, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import wateringCan from '#/assets/watering-can-and-plant.png';

function Home() {
  const navigate = useNavigate();
  // return (
  //   <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //     <Header width={700} height={250} />
  //   </div>
  // );
  return (
    <Container size='xl' pt='xl'>
      <Group position='apart'>
        <Stack p='xl' maw={550}>
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
          <Text mt='md' size='lg'>
            The Australian Virtual Seed Bank is an online portal that provides access to aggregated
            seed data sourced from seed banks across Australia
          </Text>
          <Text mt='xs' size='lg' mb='md'>
            Get started by searching for a taxon below
          </Text>
          <TaxonSearchInput
            onChange={(guid) => {
              if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
            }}
          />
        </Stack>
        <div style={{ width: 450, height: 450 }}>
          <Blob style={{ position: 'absolute' }} width={450} height={450} />
          <Center h='100%' style={{ zIndex: 10 }}>
            <Image width={250} height={285} src={wateringCan} />
          </Center>
        </div>
      </Group>
    </Container>
  );
}

export default Home;
