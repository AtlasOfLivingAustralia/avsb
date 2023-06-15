import { PropsWithChildren, useMemo } from 'react';
import APIContext from './APIContext';

// API sources
import taxon from './sources/taxon';

function APIProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => ({ taxon }), []);
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export default APIProvider;
