import { AppShell, Avatar, Group, Header } from '@mantine/core';
import Router from './Router';
import Logo from './assets/Logo';

function App() {
  return (
    <AppShell
      header={
        <Header height={60}>
          <Group sx={{ height: '100%' }} px={20} position='apart'>
            <Logo width={50} height={50} />
            <Avatar radius='xl' color='gray' />
          </Group>
        </Header>
      }
    >
      <Router />
    </AppShell>
  );
}

export default App;
