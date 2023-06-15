import { PropsWithChildren } from 'react';

// Provider components
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

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

  return (
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
  );
}

export default Providers;
