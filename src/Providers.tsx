// Provider components
import { MantineProvider, v8CssVariablesResolver } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { APIProvider } from './api';
// Theming helpers
import { base } from './theme';

function Providers({ children }: PropsWithChildren) {
  return (
    <APIProvider>
      <MantineProvider theme={base} defaultColorScheme='dark' cssVariablesResolver={v8CssVariablesResolver}>
        {children}
      </MantineProvider>
    </APIProvider>
  );
}

export default Providers;
