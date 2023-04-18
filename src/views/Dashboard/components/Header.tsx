import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { IconLogout, IconBug, IconSun, IconMoon, IconHome } from '@tabler/icons';
import {
  Header as MantineHeader,
  ActionIcon,
  Avatar,
  Button,
  Group,
  Menu,
  UnstyledButton,
  useMantineColorScheme,
  MediaQuery,
  Transition,
} from '@mantine/core';

// Project components & gelpers
import { Logo, TaxonSearchInput } from '#/components';
import getNameInitials from '#/helpers/getNameInitials';

function Header() {
  const auth = useAuth();
  const location = useLocation();
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
        <Group spacing='lg'>
          <Link to='/' style={{ display: 'flex' }}>
            <Logo width={50} height={50} />
          </Link>
          <Transition transition='pop' mounted={location.pathname !== '/'}>
            {(styles) => (
              <Button
                style={styles}
                component={Link}
                to='/'
                leftIcon={<IconHome size='0.8rem' />}
                size='xs'
                variant='light'
              >
                Home
              </Button>
            )}
          </Transition>
        </Group>
        {location.pathname !== '/' && (
          <MediaQuery styles={{ display: 'none' }} smallerThan='sm'>
            <TaxonSearchInput
              variant='filled'
              style={{ width: 400 }}
              onChange={(guid) => {
                if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
              }}
            />
          </MediaQuery>
        )}
        <Group style={{ flexGrow: 1, maxWidth: 140 }} position='right'>
          <ActionIcon variant='filled' radius='xl' size={38} onClick={() => toggleColorScheme()}>
            {colorScheme === 'dark' ? <IconMoon size={20} /> : <IconSun size={20} />}
          </ActionIcon>
          {/* {auth.isAuthenticated ? (
            <Menu shadow='md' position='bottom-end'>
              <Menu.Target>
                <UnstyledButton>
                  <Avatar variant='filled' radius='xl'>
                    {getNameInitials(auth.user?.profile)}
                  </Avatar>
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
          )} */}
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;
