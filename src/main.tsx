import React from 'react';
import ReactDOM from 'react-dom/client';

// Mapbox
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// LogRocket
import LogRocket from 'logrocket';

import Providers from './Providers';
import Routes from './Routes';
import './index.css';

const { VITE_APP_MAPBOX_TOKEN, VITE_APP_LOGROCKET_ENABLED, VITE_APP_LOGROCKET_ID } = import.meta
  .env;

// Initialize MapBox
mapboxgl.accessToken = VITE_APP_MAPBOX_TOKEN;

// Initialize LogRocket
if (VITE_APP_LOGROCKET_ENABLED === 'true' && VITE_APP_LOGROCKET_ID)
  LogRocket.init(VITE_APP_LOGROCKET_ID);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
);
