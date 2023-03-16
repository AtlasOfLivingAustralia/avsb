import { TaxonSearchInput } from '#/components';
import { Group, Container, Text, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  // return (
  //   <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //     <Header width={700} height={250} />
  //   </div>
  // );
  return (
    <Container size='xl' pt='xl'>
      <Group>
        <Stack p='xl' maw={550}>
          <Title weight='bold' size={42}>
            Open access to
            <br />
            Australia&apos;s seed data
          </Title>
          <Text mt='md'>
            The Australian Virtual Seed Bank is an online portal that provides access to aggregated
            seed data sourced from seed banks across Australia
          </Text>
          <Text mb='md' weight={600}>
            Get started by searching for a taxon below
          </Text>
          <TaxonSearchInput
            onChange={(guid) => {
              if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
            }}
          />
        </Stack>
      </Group>
    </Container>
  );
}

export default Home;
