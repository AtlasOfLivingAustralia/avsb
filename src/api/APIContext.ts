import { createContext } from 'react';

// API sources
import taxon from './sources/taxon';

interface APIState {
  taxon: typeof taxon;
}

export default createContext<APIState>({ taxon });
