import logo from '#/assets/avsb-logo-square.png';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Paper,
  Tooltip,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconChartLine,
  IconHome,
  IconMoon,
  IconQuestionMark,
  IconSun,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

// Project components & helpers
import { TaxonSearchInput } from '#/components';
import classes from './Header.module.css';

const slideTransition = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(10%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

function Header() {
  const { state, pathname } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Color scheme toggle
  const { toggleColorScheme } = useMantineColorScheme();
  const colorScheme = useComputedColorScheme();
  const [, setColorScheme] = useState<'light' | 'dark'>(
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Paper
      className={classes.header}
      data-scrolled={isScrolled}
      shadow={isScrolled ? 'xl' : 'none'}
    >
      <Group h={60} px={20} justify='space-between'>
        <Group gap='lg'>
          <Link to='/' style={{ display: 'flex' }} aria-label='Go to home'>
            <Image src={logo} alt='Australian virtual seedbank logo' />
          </Link>
          <Group gap={2}>
            <Button
              visibleFrom='md'
              component={Link}
              to='/dashboard'
              leftSection={<IconChartLine size='0.8rem' />}
              size='xs'
              variant='subtle'
              color='light-dark(var(--mantine-color-dark-4), var(--mantine-color-blue-2))'
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
                  color='light-dark(var(--mantine-color-dark-4), var(--mantine-color-blue-2))'
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
                  color='light-dark(var(--mantine-color-dark-4), var(--mantine-color-blue-2))'
                  aria-label='Go back'
                >
                  Seed Bank
                </Button>
              )}
            </Transition>
          </Group>
        </Group>
        <Group>
          {pathname !== '/' && (
            <Box visibleFrom='md'>
              <TaxonSearchInput
                radius='lg'
                style={{ width: 280 }}
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
              aria-label='Help / FAQ'

            >
              <ActionIcon
                color='gray'
                component={Link}
                to='/help'
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
      </Group>
    </Paper>
  );
}

export default Header;
