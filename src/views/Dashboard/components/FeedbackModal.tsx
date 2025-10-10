import { Button, Modal, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import LogRocket from 'logrocket';
import { useEffect } from 'react';

// Project components & helpers
import { Logo } from '#/components';

function FeedbackModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const logrocketEnabled = import.meta.env.VITE_APP_LOGROCKET_ENABLED === 'true';

  useEffect(() => {
    if (logrocketEnabled) {
      const { name, email } = JSON.parse(localStorage.getItem('asvb-feedback-details') || '{}');
      const lastPrompt = parseInt(localStorage.getItem('asvb-feedback-prompt') || '0', 10);

      if (name) {
        LogRocket.identify(email, { name, email });

        // If lastPrompt is empty/invalid, or it's been more than 30 minutes since the last prompt
      } else if (!lastPrompt || Number.isNaN(lastPrompt) || Date.now() - lastPrompt >= 1800000) {
        localStorage.setItem('asvb-feedback-prompt', Date.now().toString());
        open();
      }
    }
  }, []);

  const form = useForm({
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onSubmit = (data: { name: string; email: string }) => {
    localStorage.setItem('asvb-feedback-details', JSON.stringify(data));
    LogRocket.identify(data.email, data);
    close();
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={close}
      overlayProps={{
        color: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Stack justify='center' gap={8} mb='lg'>
        <Logo width={60} height={60} />
        <Title order={2} mb='sm'>
          Hey there!
        </Title>
      </Stack>
      <Text size='sm' mb='sm'>
        Thanks for participating in the Australian Virtual Seed Bank test!
      </Text>
      <Text size='sm' mb='sm'>
        Please enter your details below so we can capture information about how you use the new
        portal.
      </Text>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          styles={{
            label: {
              marginBottom: 8,
              fontWeight: 'bold',
            },
          }}
          label='Name'
          placeholder='Name'
          {...form.getInputProps('name')}
        />
        <TextInput
          styles={{
            label: {
              marginBottom: 8,
              fontWeight: 'bold',
            },
          }}
          mt='sm'
          label='Email'
          placeholder='Email'
          {...form.getInputProps('email')}
        />
        <Button fullWidth type='submit' mt='xl' disabled={!form.isValid()}>
          Submit
        </Button>
      </form>
    </Modal>
  );
}

export default FeedbackModal;
