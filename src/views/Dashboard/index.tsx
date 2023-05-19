/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
// import { useAuth, hasAuthParams } from 'react-oidc-context';
import { Outlet, useNavigation } from 'react-router-dom';
import { AppShell /* Center, Stack, Text */ } from '@mantine/core';
import {
  NavigationProgress,
  startNavigationProgress,
  resetNavigationProgress,
  completeNavigationProgress,
} from '@mantine/nprogress';

// Project components & helpers
// import { LogoLoader } from '#/components';
import Header from './components/Header';
import './index.css';
import FeedbackModal from './components/FeedbackModal';

function Dashboard() {
  // const auth = useAuth();
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') {
      resetNavigationProgress();
      startNavigationProgress();
    } else {
      completeNavigationProgress();
    }
  }, [state]);

  // If the 'code' & 'state' parameter are in the URL, it means that
  // we've just been redirected from Cognito, and we're retrieving tokens
  // if (auth.isLoading && hasAuthParams()) {
  //   return (
  //     <Center style={{ width: '100vw', height: '100vh' }}>
  //       <Stack align='center' spacing='lg'>
  //         <LogoLoader />
  //         <Text color='dimmed' weight='bold'>
  //           Signing you in
  //         </Text>
  //       </Stack>
  //     </Center>
  //   );
  // }

  return (
    <>
      <FeedbackModal />
      <NavigationProgress stepInterval={20} />
      <AppShell
        padding={0}
        header={<Header />}
        styles={{
          main: {
            paddingBottom: 0,
          },
        }}
      >
        <Outlet />
      </AppShell>
    </>
  );
}

export default Dashboard;
