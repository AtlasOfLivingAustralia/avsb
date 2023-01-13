import React from 'react';
import ReactDOM from 'react-dom/client';

import Providers from './Providers';
import Routes from './Routes';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Routes />
    </Providers>
  </React.StrictMode>,
);
