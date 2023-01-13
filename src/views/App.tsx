import { useCallback } from 'react';

import {
  AppShell,
  Avatar,
  Button,
  Center,
  Group,
  Header,
  Menu,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useAuth } from 'react-oidc-context';
import { Logo } from '#/components';
import Router from '../Router';

// Helper functions
import getNameInitials from '../helpers/getNameInitials';
import './App.css';

function App() {
  const auth = useAuth();

  const handleSignOut = useCallback(async () => {
    await auth.removeUser();
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
      logout_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    });

    window.location.href = `${import.meta.env.VITE_OIDC_LOGOUT_URI}?${params.toString()}`;
  }, [auth]);

  // If the 'code' & 'state' parameter are in the URL, it means that
  // we've just been redirected from Cognito, and we're retrieving tokens
  if (auth.isLoading && location.href.includes('code=') && location.href.includes('state=')) {
    return (
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Stack align='center' spacing='lg'>
          <div className='logo-loader'>
            <Logo width={100} height={100} />
          </div>
          <Text color='dimmed' weight='bold'>
            Signing you in
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <AppShell
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20} position='apart'>
            <Logo width={50} height={50} />
            {auth.isAuthenticated ? (
              <Menu shadow='md'>
                <Menu.Target>
                  <UnstyledButton>
                    <Avatar radius='xl'>{getNameInitials(auth.user?.profile)}</Avatar>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item onClick={handleSignOut}>Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button variant='light' onClick={() => auth.signinRedirect()}>
                Sign In
              </Button>
            )}
          </Group>
        </Header>
      }
    >
      <Router />
    </AppShell>
  );
}

export default App;
