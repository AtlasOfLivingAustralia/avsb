/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import {
  Button,
  Center,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import LogRocket from 'logrocket';

// Project components & helpers
import { Logo, LogoLoader } from '#/components';

function Dashboard() {
  const auth = useAuth();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const userTestingDetails = localStorage.getItem('user-testing-details');
    if (userTestingDetails) {
      const data = JSON.parse(userTestingDetails);
      LogRocket.identify(data.email, data);
    } else {
      open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onSubmit = (data: { name: string; email: string }) => {
    localStorage.setItem('user-testing-details', JSON.stringify(data));
    LogRocket.identify(data.email, data);
    close();
  };

  // If the 'code' & 'state' parameter are in the URL, it means that
  // we've just been redirected from Cognito, and we're retrieving tokens
  if (auth.isLoading && hasAuthParams()) {
    return (
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Stack align='center' spacing='lg'>
          <LogoLoader />
          <Text color='dimmed' weight='bold'>
            Signing you in
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Stack align='center' spacing={8} mb='lg'>
        <Logo width={60} height={60} />
        <Title order={2} mb='sm'>
          Hey there!
        </Title>
      </Stack>
      <Text size='sm' mb='sm'>
        Thanks for participating in the Australian Virtual Seed Bank test!
      </Text>
      <Text size='sm' mb='sm'>
        Please enter your details below so we can capture information about your experience using
        the new portal.
      </Text>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput label='Name' placeholder='Name' {...form.getInputProps('name')} />
        <TextInput mt='sm' label='Email' placeholder='Email' {...form.getInputProps('email')} />
        <Button fullWidth type='submit' mt='xl'>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default Dashboard;
