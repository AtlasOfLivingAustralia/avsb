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

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_TOKEN;
LogRocket.init('u41ige/avsb-zoujx');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
);
