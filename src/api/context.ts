import { createContext } from 'react';

// API sources
import apiTaxon from './sources/taxon';

interface APIState {
  taxon: ReturnType<typeof apiTaxon>;
}

export default createContext<APIState>({ taxon: apiTaxon() });
