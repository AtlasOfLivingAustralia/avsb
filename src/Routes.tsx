import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { performGQLQuery, gqlQueries } from './api';
import { DashboardView, TaxonView, TrialsView, DebugView } from './views';

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
        children: [
          {
            path: 'trials',
            element: <TrialsView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_TRIALS, {
                predicate: {
                  type: 'and',
                  predicates: [
                    {
                      type: 'in',
                      key: 'datasetKey',
                      values: ['dr18527'],
                    },
                    {
                      type: 'in',
                      key: 'eventTypeHierarchy',
                      values: ['Trial'],
                    },
                    {
                      type: 'in',
                      key: 'taxonKey',
                      values: [params.guid],
                    },
                  ],
                },
                limit: 50,
                offset: 0,
              });

              return data.eventSearch.documents.results;
            },
          },
          {
            path: 'more',
            element: <div>More</div>,
          },
          {
            path: '*',
            loader: () => redirect('trials'),
          },
          {
            path: '/taxon/:guid/',
            loader: () => redirect('trials'),
          },
        ],
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
