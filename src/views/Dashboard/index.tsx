import { useAuth } from 'react-oidc-context';
import { Outlet } from 'react-router-dom';
import { AppShell, Center, Stack, Text } from '@mantine/core';

// Project components & helpers
import { Logo } from '#/components';
import Header from './components/Header';
import './index.css';

function Dashboard() {
  const auth = useAuth();

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
    <AppShell header={<Header />}>
      <Outlet />
    </AppShell>
  );
}

export default Dashboard;
