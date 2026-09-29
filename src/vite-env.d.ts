/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GRAPHQL: string;
  readonly VITE_API_BIE: string;
  readonly VITE_API_SPATIAL: string;
  readonly VITE_API_SDS: string;
  readonly VITE_ALA_IMAGES: string;
  readonly VITE_ALA_BIE: string;
  readonly VITE_ALA_AUSTRAITS: string;
  readonly VITE_ALA_COLLECTORY: string;
  readonly VITE_ALA_BIOCACHE: string;
  readonly VITE_APP_DATA_RESOURCES: string;
  readonly VITE_APP_MAPBOX_TOKEN: string;
  readonly VITE_APP_FATHOM_ID: string;
  readonly VITE_APP_MAINTENANCE_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
