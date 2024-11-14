import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IconSun,
  IconMoon,
  IconHome,
  IconQuestionMark,
  IconArrowBackUp,
  IconChartLine,
} from '@tabler/icons';
import {
  Header as MantineHeader,
  ActionIcon,
  Button,
  Group,
  useMantineColorScheme,
  MediaQuery,
  Transition,
  Tooltip,
  Image,
} from '@mantine/core';

// Project components & gelpers
import { TaxonSearchInput } from '#/components';
import logo from '#/assets/avsb-logo-square.png';

const slideTransition = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(10%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

function Header() {
  const { state, pathname } = useLocation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();

  return (
    <MantineHeader height={60}>
      <Group sx={{ height: '100%' }} px={20} position='apart'>
        <Group spacing='lg'>
          <Link to='/' style={{ display: 'flex' }} aria-label='Go to home'>
            <Image src={logo} />
          </Link>
          <Group spacing={4}>
            <Button
              component={Link}
              to='/dashboard'
              leftIcon={<IconChartLine size='0.8rem' />}
              size='xs'
              variant='subtle'
              aria-label='Portal Statistics'
            >
              Portal Statistics
            </Button>
            <Transition transition={slideTransition} mounted={pathname !== '/'}>
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
            <Transition
              transition={slideTransition}
              mounted={Boolean(state?.from && pathname.includes('/taxon'))}
            >
              {(styles) => (
                <Button
                  style={styles}
                  component={Link}
                  to={state?.from || '/'}
                  state={null}
                  leftIcon={<IconArrowBackUp size='0.8rem' />}
                  size='xs'
                  variant='subtle'
                  aria-label='Go back'
                >
                  Seed Bank
                </Button>
              )}
            </Transition>
          </Group>
        </Group>
        {pathname !== '/' && (
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
        </Group>
      </Group>
    </MantineHeader>
  );
}

export default Header;
