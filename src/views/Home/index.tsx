import { TaxonSearchInput } from '#/components';
import { Group, Container, Text, Stack, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

function Home() {
  const navigate = useNavigate();
  // return (
  //   <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //     <Header width={700} height={250} />
  //   </div>
  // );
  return (
    <Container size='lg' pt='xl'>
      <Group>
        <Stack p='xl' maw={650}>
          <Title weight='bold' size={36}>
            Open access to
            <br />
            Australia&apos;s seed data
          </Title>
          <Text color='dimmed' mt='md'>
            The Australian Virtual Seed Bank is an online portal that provides access to aggregated
            seed data sourced from seed banks across Australia
          </Text>
          <Text color='dimmed' mb='md'>
            Get started by searching for a taxon below
          </Text>
          <TaxonSearchInput
            variant='filled'
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
