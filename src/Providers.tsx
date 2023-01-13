import { PropsWithChildren } from 'react';
import { AuthProvider } from 'react-oidc-context';

function Providers({ children }: PropsWithChildren) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
