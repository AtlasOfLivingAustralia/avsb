import { PropsWithChildren, useCallback } from 'react';

// Provider components
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { WebStorageStateStore } from 'oidc-client-ts';
import { AuthProvider } from 'react-oidc-context';

// Theming helpers
import { base, dark, light } from './theme';
import { APIProvider } from './api';

function Providers({ children }: PropsWithChildren) {
  const [colourScheme, setColourScheme] = useLocalStorage<ColorScheme>({
    key: 'app-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  // Helper function to switch the application theme
  const toggleColourScheme = (value?: ColorScheme) =>
    setColourScheme(value || (colourScheme === 'dark' ? 'light' : 'dark'));

  // Sign in callback handler
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
      <APIProvider>
        <ColorSchemeProvider colorScheme={colourScheme} toggleColorScheme={toggleColourScheme}>
          <MantineProvider
            theme={{
              ...base,
              ...(colourScheme === 'dark' ? dark : light),
              colorScheme: colourScheme,
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            {children}
          </MantineProvider>
        </ColorSchemeProvider>
      </APIProvider>
    </AuthProvider>
  );
}

export default Providers;
