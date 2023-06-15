import React from 'react';
import ReactDOM from 'react-dom/client';

// LogRocket
import LogRocket from 'logrocket';

// Axe-core accessibility
import axe from '@axe-core/react';

import Providers from './Providers';
import Routes from './Routes';
import './index.css';

const { VITE_APP_LOGROCKET_ENABLED, VITE_APP_LOGROCKET_ID } = import.meta.env;

// Initialize LogRocket
if (VITE_APP_LOGROCKET_ENABLED === 'true' && VITE_APP_LOGROCKET_ID)
  LogRocket.init(VITE_APP_LOGROCKET_ID);

// Initialize axe-core for development
if (import.meta.env.DEV) axe(React, ReactDOM, 3000);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
);
