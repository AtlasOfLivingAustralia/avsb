import { useEffect } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import {
  NavigationProgress,
  startNavigationProgress,
  resetNavigationProgress,
  completeNavigationProgress,
} from '@mantine/nprogress';

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
