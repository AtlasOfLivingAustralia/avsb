import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconSun, IconMoon, IconHome, IconQuestionMark } from '@tabler/icons';
import {
  Header as MantineHeader,
  ActionIcon,
  Button,
  Group,
  useMantineColorScheme,
  MediaQuery,
  Transition,
  Tooltip,
} from '@mantine/core';

// Project components & gelpers
import { Logo, TaxonSearchInput } from '#/components';

const slideTransition = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(10%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

function Header() {
  // const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <Group spacing='lg'>
          <Link to='/' style={{ display: 'flex' }} aria-label='Go to home'>
            <Logo width={50} height={50} />
          </Link>
          <Transition transition={slideTransition} mounted={location.pathname !== '/'}>
            {(styles) => (
              <Button
                style={styles}
                component={Link}
                to='/'
                leftIcon={<IconHome size='0.8rem' />}
                size='xs'
                variant='subtle'
                aria-label='Home'
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
        <Group style={{ flexGrow: 1, maxWidth: 140 }} position='right' spacing='xs'>
          <Tooltip
            transitionProps={{ transition: 'pop' }}
            offset={10}
            withArrow
            label='Help / FAQ'
            position='right'
            aria-label=''
          >
            <ActionIcon
              component={Link}
              to='/help'
              variant='filled'
              radius='xl'
              size={38}
              aria-label='Help and frequently asked questions'
            >
              <IconQuestionMark size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            transitionProps={{ transition: 'pop' }}
            offset={10}
            withArrow
            label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} theme`}
            position='right'
          >
            <ActionIcon
              variant='filled'
              radius='xl'
              size={38}
              onClick={() => toggleColorScheme()}
              aria-label='Switch interface colour scheme'
            >
              {colorScheme === 'dark' ? <IconMoon size={20} /> : <IconSun size={20} />}
            </ActionIcon>
          </Tooltip>
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
