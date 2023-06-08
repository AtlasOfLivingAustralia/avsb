/* eslint-disable @typescript-eslint/no-explicit-any */
import { Title, Text, Code, Stack, Image, Center, Anchor, Group } from '@mantine/core';
import { Link, useRouteError } from 'react-router-dom';

import { getErrorMessage } from '#/helpers';
import spottedPlant from '#/assets/spotted-blue-succulent-plant.png';
import waterTap from '#/assets/ecology-water-tap.png';

import { Blob } from '.';

function ErrorBoundary() {
  const error = useRouteError() as Error;

  if ((error as any).status === 404) {
    return (
      <Center h='100vh'>
        <Stack spacing='xs' align='center' pb={125} p='xl'>
          <div style={{ position: 'relative', width: 250, height: 250 }}>
            <Blob style={{ position: 'absolute' }} width={250} height={250} />
            <Center h='100%' style={{ zIndex: 10 }}>
              <Image fit='contain' width={125} height={125} src={spottedPlant} />
            </Center>
          </div>
          <Title variant='gradient' gradient={{ from: '#A6CE39', to: '#487759' }} size='5rem'>
            404
          </Title>
          <Title order={2}>Empty cut test</Title>
          <Text color='dimmed' align='center'>
            We can&apos;t find the page you&apos;re looking for, perhaps{' '}
            <Anchor component={Link} to='/'>
              go home
            </Anchor>
            ?
          </Text>
          <Text color='dimmed' size='sm' mt='xl'>
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
      <Stack spacing='xs' align='center' p='xl'>
        <Group spacing='xl' mr={50}>
          <div style={{ position: 'relative', width: 150, height: 150 }}>
            <Blob style={{ position: 'absolute' }} width={150} height={150} />
            <Center h='100%' style={{ zIndex: 10 }}>
              <Image fit='contain' width={100} height={100} src={waterTap} />
            </Center>
          </div>
          <Stack spacing={0}>
            <Title variant='gradient' gradient={{ from: '#A6CE39', to: '#487759' }} size='2.5rem'>
              Oops
            </Title>
            <Title order={3}>A seedy error!</Title>
            <Text mt='sm' size='sm' color='dimmed'>
              {getErrorMessage(error)}
            </Text>
          </Stack>
        </Group>
        {error.stack && (
          <Code block mt='xl' maw={890} w='calc(100vw - 90px)'>
            {error.stack}
          </Code>
        )}
        <Text color='dimmed' size='sm' mt='xl'>
          Illustration by{' '}
          <Anchor href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>Icons 8</Anchor> from{' '}
          <Anchor href='https://icons8.com/illustrations'>Ouch!</Anchor>
        </Text>
      </Stack>
    </Center>
  );
}

export default ErrorBoundary;
