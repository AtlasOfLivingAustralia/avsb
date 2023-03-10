import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { ErrorBoundary } from '#/components';
import { performGQLQuery, gqlQueries } from './api';
import {
  DashboardView,
  HomeView,
  TaxonView,
  TrialsView,
  MediaView,
  DebugView,
  AccessionsView,
  SummaryView,
} from './views';
import queries from './api/queries';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardView />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <HomeView />,
      },
      {
        id: 'taxon',
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
            path: 'summary',
            element: <SummaryView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_MAP_WITH_DATA, {
                predicate: {
                  type: 'and',
                  predicates: [
                    queries.PRED_DATA_RESOURCE,
                    {
                      type: 'in',
                      key: 'taxonKey',
                      values: [params.guid],
                    },
                  ],
                },
                size: 50,
              });
              return data;
            },
          },
          {
            path: 'accessions',
            element: <AccessionsView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_MAP_WITH_DATA, {
                predicate: {
                  type: 'and',
                  predicates: [
                    queries.PRED_DATA_RESOURCE,
                    {
                      type: 'in',
                      key: 'taxonKey',
                      values: [params.guid],
                    },
                  ],
                },
                size: 50,
              });
              return data;
            },
          },
          {
            path: 'media',
            element: <MediaView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_TAXON_MEDIA, {
                key: params.guid,
                size: 20,
                from: 0,
              });

              return data.taxonMedia;
            },
          },
          {
            path: 'trials',
            element: <TrialsView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_TRIALS, {
                predicate: {
                  type: 'and',
                  predicates: [
                    queries.PRED_DATA_RESOURCE,
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
            loader: () => redirect('summary'),
          },
          {
            path: '/taxon/:guid/',
            loader: () => redirect('summary'),
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
