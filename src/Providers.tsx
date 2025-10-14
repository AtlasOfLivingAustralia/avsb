// Provider components
import { MantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { APIProvider } from './api';
// Theming helpers
import { base } from './theme';

function Providers({ children }: PropsWithChildren) {
  return (
    <APIProvider>
      <MantineProvider theme={base} defaultColorScheme='dark'>
        {children}
      </MantineProvider>
    </APIProvider>
  );
}

export default Providers;
