import { Anchor, Center, Group, Image, Stack, Text, Title } from '@mantine/core';

import waterTap from '#/assets/ecology-water-tap.png';

import { Blob } from '.';

interface PageMessageProps {
  title: string;
  subtitle: string;
  message: string;
}

function PageMessage({ title, subtitle, message }: PageMessageProps) {
  return (
    <Center h='100vh'>
      <Stack gap='xs' justify='center' p='xl'>
        <Group gap='xl' mr={50}>
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            <Blob style={{ position: 'absolute' }} width={150} height={150} />
            <Center h='100%' style={{ zIndex: 10 }}>
              <Image fit='contain' w={100} h={100} src={waterTap} alt='Leaky water tap' />
            </Center>
          </div>
          <Stack gap={0}>
            <Text
              component={Title}
              variant='gradient'
              gradient={{ from: '#A6CE39', to: '#487759' }}
              size='2.5rem'
            >
              {title}
            </Text>
            <Title order={3}>{subtitle}</Title>
            <Text mt='sm' size='sm' c='dimmed'>
              {message}
            </Text>
          </Stack>
        </Group>
        <Text c='dimmed' size='sm' mt='xl'>
          Illustration by{' '}
          <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor> from{' '}
          <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default PageMessage;
