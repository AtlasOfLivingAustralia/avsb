import { AppShell } from '@mantine/core';
import { Outlet, ScrollRestoration } from 'react-router';

// Project components & helpers
import Header from './components/Header';
import NavigationProgress from './components/NavigationProgress';

import './index.css';

function Dashboard() {
  return (
    <>
      <NavigationProgress />
      <ScrollRestoration />
      <AppShell
        padding={0}
        header={{ height: 90 }}
        styles={{
          main: {
            paddingBottom: 0,
          },
        }}
      >
        <AppShell.Header
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
        >
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
