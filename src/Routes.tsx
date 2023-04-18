import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import { AccessionPanel, ErrorBoundary } from '#/components';
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
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_MAP, {
                predicate: {
                  type: 'and',
                  predicates: [
                    queries.PRED_DATA_RESOURCE,
                    {
                      type: 'in',
                      key: 'taxonKey',
                      values: [params.guid],
                    },
                    {
                      type: 'equals',
                      key: 'eventType',
                      value: 'Accession',
                    },
                  ],
                },
                size: 50,
              });
              return data;
            },
          },
          {
            id: 'accessions',
            path: 'accessions',
            element: <AccessionsView />,
            loader: async ({ params }) => {
              const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSIONS, {
                predicate: {
                  type: 'and',
                  predicates: [
                    queries.PRED_DATA_RESOURCE,
                    {
                      type: 'in',
                      key: 'taxonKey',
                      values: [params.guid],
                    },
                    {
                      type: 'equals',
                      key: 'eventType',
                      value: 'Accession',
                    },
                  ],
                },
                size: 10,
              });
              return data.eventSearch.documents;
            },
            children: [
              {
                path: ':accession',
                element: <AccessionPanel />,
                loader: async ({ params }) => {
                  const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSIONS, {
                    predicate: {
                      type: 'equals',
                      key: 'eventID',
                      value: params.accession,
                    },
                    size: 1,
                  });
                  return data.eventSearch.documents.results[0];
                },
              },
            ],
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
                      type: 'equals',
                      key: 'eventType',
                      value: 'Trial',
                    },
                    {
                      type: 'equals',
                      key: 'taxonKey',
                      value: params.guid,
                    },
                  ],
                },
                size: 10,
              });

              return data.eventSearch.documents;
            },
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
