import React from 'react';
import ReactDOM from 'react-dom/client';

// LogRocket
import LogRocket from 'logrocket';

// Axe-core accessibility
import axe from '@axe-core/react';

import Providers from './Providers';
import Routes from './Routes';
import './index.css';
import { PageMessage } from './components';

const { VITE_APP_LOGROCKET_ENABLED, VITE_APP_LOGROCKET_ID, VITE_APP_MAINTENANCE_MODE } = import.meta
  .env;

// Initialize LogRocket
if (VITE_APP_LOGROCKET_ENABLED === 'true' && VITE_APP_LOGROCKET_ID)
  LogRocket.init(VITE_APP_LOGROCKET_ID);

// Initialize axe-core for development
if (import.meta.env.DEV) setTimeout(() => axe(React, ReactDOM, 1000), 2000);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      {VITE_APP_MAINTENANCE_MODE === 'true' ? (
        <PageMessage
          title='Maintenance'
          subtitle='Please stand by!'
          message='The AVSB is currently undergoing maintenance'
        />
      ) : (
        <Routes />
      )}
    </Providers>
  </React.StrictMode>,
);
