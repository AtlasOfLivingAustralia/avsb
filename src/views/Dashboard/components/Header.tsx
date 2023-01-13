import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { IconLogout, IconBug, IconSun, IconMoon } from '@tabler/icons';
import {
  Header as MantineHeader,
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';

// Project components & gelpers
import { Logo } from '#/components';
import getNameInitials from '#/helpers/getNameInitials';

function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const handleSignOut = useCallback(async () => {
    await auth.removeUser();
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
      logout_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    });

    window.location.href = `${import.meta.env.VITE_OIDC_LOGOUT_URI}?${params.toString()}`;
  }, [auth]);

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <Logo width={50} height={50} />
        <Group>
          <ActionIcon variant='light' radius='xl' size={38} onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? <IconMoon size={20} /> : <IconSun size={20} />}
          </ActionIcon>
          {auth.isAuthenticated ? (
            <Menu shadow='md' position='bottom-end'>
              <Menu.Target>
                <UnstyledButton>
                  <Avatar radius='xl'>{getNameInitials(auth.user?.profile)}</Avatar>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item icon={<IconLogout size={14} />} onClick={handleSignOut}>
                  Sign Out
                </Menu.Item>
                {import.meta.env.MODE === 'development' && (
                  <>
                    <Menu.Divider />
                    <Menu.Label>Developer</Menu.Label>
                    <Menu.Item icon={<IconBug size={14} />} onClick={() => navigate('debug')}>
                      Debug Information
                    </Menu.Item>
                  </>
                )}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button variant='light' onClick={() => auth.signinRedirect()}>
              Sign In
            </Button>
          )}
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;