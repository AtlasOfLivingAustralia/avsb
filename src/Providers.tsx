import { PropsWithChildren, useCallback } from 'react';

// Provider components
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';

// Theming helpers
import { baseTheme } from './theme';

function Providers({ children }: PropsWithChildren) {
  const [colourScheme, setColourScheme] = useLocalStorage<ColorScheme>({
    key: 'app-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColourScheme = (value?: ColorScheme) =>
    setColourScheme(value || (colourScheme === 'dark' ? 'light' : 'dark'));

  const onSignIn = useCallback(() => {
    const { search, origin, pathname } = location;
    const params = new URLSearchParams(search);

    params.delete('code');
    params.delete('state');

    const paramString = `?${params.toString()}`;
    history.replaceState(
      null,
      '',
      `${origin}${pathname}${paramString.length > 1 ? paramString : ''}`,
    );
  }, []);

  return (
    <AuthProvider
      authority={import.meta.env.VITE_OIDC_AUTHORITY}
      client_id={import.meta.env.VITE_OIDC_CLIENT_ID}
      redirect_uri={import.meta.env.VITE_OIDC_REDIRECT_URI}
      userStore={new WebStorageStateStore({ store: localStorage })}
      onSigninCallback={onSignIn}
    >
      <ColorSchemeProvider colorScheme={colourScheme} toggleColorScheme={toggleColourScheme}>
        <MantineProvider
          theme={{ ...baseTheme, colorScheme: colourScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </AuthProvider>
  );
}

export default Providers;