/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GRAPHQL: string;
  readonly VITE_API_BIE: string;
  readonly VITE_API_SPATIAL: string;
  readonly VITE_API_ALA: string;
  readonly VITE_ALA_IMAGES: string;
  readonly VITE_ALA_BIE: string;
  readonly VITE_ALA_COLLECTORY: string;
  readonly VITE_ALA_BIOCACHE: string;
  readonly VITE_APP_DATA_RESOURCES: string;
  readonly VITE_APP_MAPBOX_TOKEN: string;
  readonly VITE_APP_FATHOM_ID: string;
  readonly VITE_APP_MAINTENANCE_MODE: string;
}

// biome-ignore lint/correctness/noUnusedVariables: global interface augmentation
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
