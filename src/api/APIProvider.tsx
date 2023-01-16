import { PropsWithChildren, useMemo } from 'react';
// import { useAuth } from 'react-oidc-context';
import APIContext from './APIContext';

// API sources
import apiTaxon from './sources/taxon';

function APIProvider({ children }: PropsWithChildren) {
  // const auth = useAuth();
  const value = useMemo(() => ({ taxon: apiTaxon() }), []);
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export default APIProvider;
