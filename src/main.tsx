// LogRocket
import LogRocket from 'logrocket';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageMessage } from './components';
import './index.css';
import Providers from './Providers';
import Routes from './Routes';

const {
  VITE_APP_LOGROCKET_ENABLED,
  VITE_APP_LOGROCKET_ID,
  VITE_APP_MAINTENANCE_MODE,
} = import.meta.env;

// Initialize LogRocket
if (VITE_APP_LOGROCKET_ENABLED === 'true' && VITE_APP_LOGROCKET_ID)
  LogRocket.init(VITE_APP_LOGROCKET_ID);

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
  </React.StrictMode>
);
