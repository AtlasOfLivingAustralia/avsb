import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardView, DebugView } from './views';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardView />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: 'debug',
        element: <DebugView />,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={routes} />;
}

export default Routes;
