import logo from '#/assets/avsb-logo-square.png';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Tooltip,
  Transition,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconChartLine,
  IconHome,
  IconMoon,
  IconQuestionMark,
  IconSun,
} from '@tabler/icons';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// Project components & gelpers
import { TaxonSearchInput } from '#/components';

const slideTransition = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(10%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

function Header() {
  const { state, pathname } = useLocation();
  const { toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <Group h={60} px={20} justify='space-between'>
      <Group gap='lg'>
        <Link to='/' style={{ display: 'flex' }} aria-label='Go to home'>
          <Image src={logo} />
        </Link>
        <Group gap={4}>
          <Button
            component={Link}
            to='/dashboard'
            leftSection={<IconChartLine size='0.8rem' />}
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
                leftSection={<IconHome size='0.8rem' />}
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
                leftSection={<IconArrowBackUp size='0.8rem' />}
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
        <Box visibleFrom='md' style={{ flexGrow: 1, maxWidth: 400 }}>
          <TaxonSearchInput
            variant='filled'
            style={{ width: '100%' }}
            onChange={(guid) => {
              if (guid) navigate(`/taxon/${encodeURIComponent(guid)}`);
            }}
          />
        </Box>
      )}
      <Group style={{ flexGrow: 1, maxWidth: 140 }} justify='right' gap='xs'>
        <Tooltip
          transitionProps={{ transition: 'pop' }}
          offset={10}
          withArrow
          label='Help / FAQ'
          position='right'
          aria-label='Help / FAP'
        >
          <ActionIcon
            color='gray'
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
            color='gray'
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
  );
}

export default Header;
