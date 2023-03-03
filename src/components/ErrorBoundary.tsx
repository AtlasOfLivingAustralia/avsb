import { Title, Text, Code, Container } from '@mantine/core';
import { useRouteError } from 'react-router-dom';

import { getErrorMessage } from '#/helpers';

function ErrorBoundary() {
  const error = useRouteError() as Error;

  return (
    <Container>
      <Title>Oops, a seedy error!</Title>
      <Text mt='xs'>{getErrorMessage(error)}</Text>
      <Code block mt='lg'>
        {error.stack}
      </Code>
    </Container>
  );
}

export default ErrorBoundary;
