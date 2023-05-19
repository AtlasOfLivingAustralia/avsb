import React from 'react';
import ReactDOM from 'react-dom/client';

// LogRocket
import LogRocket from 'logrocket';

import Providers from './Providers';
import Routes from './Routes';
import './index.css';

const { VITE_APP_LOGROCKET_ENABLED, VITE_APP_LOGROCKET_ID } = import.meta.env;

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
