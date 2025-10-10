import { AppShell } from '@mantine/core';
import {
  completeNavigationProgress,
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

// Project components & helpers
import Header from './components/Header';
import './index.css';

function Dashboard() {
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') {
      resetNavigationProgress();
      startNavigationProgress();
    } else {
      completeNavigationProgress();
    }
  }, [state]);

  return (
    <>
      <NavigationProgress stepInterval={20} portalProps={{ 'aria-hidden': true }} />
      <AppShell
        padding={0}
        header={{ height: 60 }}
        styles={{
          main: {
            paddingBottom: 0,
          },
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default Dashboard;
