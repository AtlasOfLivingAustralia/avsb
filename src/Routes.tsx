import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardView, TaxonView, DebugView } from './views';

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
        path: 'taxon/:guid',
        element: <TaxonView />,
        loader: async ({ params }) =>
          (
            await fetch(
              `${import.meta.env.VITE_API_BIE}/species/${decodeURIComponent(params.guid || '')}`,
            )
          ).json(),
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
