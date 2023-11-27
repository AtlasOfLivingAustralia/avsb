import { Title, Text, Stack, Image, Center, Anchor, Group } from '@mantine/core';

import waterTap from '#/assets/ecology-water-tap.png';

import { Blob } from '.';

interface PageMessageProps {
  title: string;
  subtitle: string;
  message: string;
}

function PageMessage({ title, subtitle, message }: PageMessageProps) {
  return (
    <Center h="100vh">
      <Stack spacing='xs' align='center' p='xl'>
        <Group spacing='xl' mr={50}>
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            <Blob style={{ position: 'absolute' }} width={150} height={150} />
            <Center h='100%' style={{ zIndex: 10 }}>
              <Image fit='contain' width={100} height={100} src={waterTap} alt='Leaky water tap' />
            </Center>
          </div>
          <Stack spacing={0}>
            <Title variant='gradient' gradient={{ from: '#A6CE39', to: '#487759' }} size='2.5rem'>
              {title}
            </Title>
            <Title order={3}>{subtitle}</Title>
            <Text mt='sm' size='sm' color='dimmed'>
              {message}
            </Text>
          </Stack>
        </Group>
        <Text color='dimmed' size='sm' mt='xl'>
          Illustration by{' '}
          <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor> from{' '}
          <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default PageMessage;
