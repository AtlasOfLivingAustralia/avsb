import { Center, Container, Group, Title } from '@mantine/core';
import { IconQuestionCircle } from '@tabler/icons';

function Help() {
  return (
    <Container size='xl' pt='xl'>
      <Center>
        <Group>
          <IconQuestionCircle size='2rem' />
          <Title>Help</Title>
        </Group>
      </Center>
    </Container>
  );
}

export default Help;
