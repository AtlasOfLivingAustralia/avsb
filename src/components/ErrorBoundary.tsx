import waterTap from '#/assets/ecology-water-tap.png';
import spottedPlant from '#/assets/spotted-blue-succulent-plant.png';
import { getErrorMessage } from '#/helpers';
import { Anchor, Center, Code, Group, Image, Stack, Text, Title } from '@mantine/core';
import { Link, useRouteError } from 'react-router-dom';

import { Blob } from '.';

function ErrorBoundary() {
  const error = useRouteError() as Error;

  if ((error as unknown as { status: number }).status === 404) {
    return (
      <Center h='100vh'>
        <Stack gap='xs' justify='center' pb={125} p='xl'>
          <div style={{ position: 'relative', width: 250, height: 250 }}>
            <Blob style={{ position: 'absolute' }} width={250} height={250} />
            <Center h='100%' style={{ zIndex: 10 }}>
              <Image fit='contain' w={125} h={125} src={spottedPlant} alt='Spotted plant' />
            </Center>
          </div>
          <Text
            component={Title}
            variant='gradient'
            gradient={{ from: '#A6CE39', to: '#487759' }}
            size='5rem'
          >
            404
          </Text>
          <Title order={2}>Empty cut test</Title>
          <Text c='dimmed' ta='center'>
            We can&apos;t find the page you&apos;re looking for, perhaps{' '}
            <Anchor component={Link} to='/'>
              go home
            </Anchor>
            ?
          </Text>
          <Text c='dimmed' size='sm' mt='xl'>
            Illustration by{' '}
            <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor>{' '}
            from <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Center>
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
              Oops
            </Text>
            <Title order={3}>A seedy error!</Title>
            <Text mt='sm' size='sm' c='dimmed'>
              {getErrorMessage(error)}
            </Text>
          </Stack>
        </Group>
        {error.stack && (
          <Code block mt='xl' maw={890} w='calc(100vw - 90px)'>
            {error.stack}
          </Code>
        )}
        <Text c='dimmed' size='sm' mt='xl'>
          Illustration by{' '}
          <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor> from{' '}
          <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default ErrorBoundary;
