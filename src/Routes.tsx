import { AccessionPanel, ErrorBoundary } from '#/components';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router';
import {
  austraitsAPI,
  collectoryAPI,
  Event,
  EventSearchResult,
  gqlQueries,
  performGQLQuery,
  sdsAPI,
  taxonAPI,
} from './api';
import queries from './api/queries';

import { mapTrialTreatments } from './helpers';
import { DashboardView, HomeView } from './views';

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
        path: 'seedbank/:resource',
        lazy: () => import('./views/Seedbank'),
        loader: async ({ params }) => {
          const [collectory, gql] = await Promise.all([
            collectoryAPI.dataResource(params.resource || ''),
            performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
              gqlQueries.QUERY_SEEDBANK_SUMMARY_FULL,
              {
                datasetKey: params.resource,
                size: 50,
              },
            ),
          ]);

          return { gql: gql.data, collectory };
        },
      },
      {
        path: 'dashboard',
        lazy: () => import('./views/Statistics'),
        loader: async () => {
          // Construct a query that fetches a summary all data resources
          const QUERY_SEEDBANK_SUMMARY_ALL = `
            query list {
              ${queries.DATA_RESOURCES.map((dataResource: string) =>
                queries.QUERY_DATASET_TEMPLATE.replaceAll('{{datasetKey}}', dataResource),
              ).join('')}
            }
          `;

          const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
            QUERY_SEEDBANK_SUMMARY_ALL,
          );
          return Object.entries(data).reduce(
            (prev, [key, value]) => ({
              ...prev,
              [key]: (value as { documents: { results: object[] } }).documents.results[0],
            }),
            {},
          );
        },
      },
      {
        id: 'taxon',
        path: 'taxon/:guid',
        lazy: () => import('./views/Taxon'),
        loader: async ({ params }) => {
          const taxon = await taxonAPI.info(params.guid || '');

          return {
            taxon,
            sds: await sdsAPI.get(params.guid),
            traits: austraitsAPI.summary(taxon.classification.scientificName, params.guid || ''),
          };
        },
        children: [
          {
            path: 'summary',
            lazy: () => import('./views/Summary'),
            loader: async ({ params }) => {
              const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
                gqlQueries.QUERY_EVENT_MAP,
                {
                  predicate: {
                    type: 'and',
                    predicates: [
                      gqlQueries.PRED_DATA_RESOURCE,
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
                },
              );

              return data.eventSearch._tileServerToken;
            },
          },
          {
            id: 'accessions',
            path: 'accessions',
            errorElement: <ErrorBoundary />,
            lazy: () => import('./views/Accessions'),
            loader: async ({ params }) => {
              const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
                gqlQueries.QUERY_EVENT_ACCESSIONS,
                {
                  predicate: {
                    type: 'and',
                    predicates: [
                      gqlQueries.PRED_DATA_RESOURCE,
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
                },
              );
              return data.eventSearch.documents;
            },
            children: [
              {
                path: ':accession',
                element: <AccessionPanel />,
                loader: async ({ params }) => {
                  const { data } = await performGQLQuery<{
                    data: { accession: EventSearchResult; trials: EventSearchResult };
                  }>(gqlQueries.QUERY_EVENT_ACCESSION_FULL, {
                    predicate: {
                      type: 'equals',
                      key: 'eventID',
                      value: params.accession,
                    },
                    trialPredicate: {
                      type: 'equals',
                      key: 'parentEventID',
                      value: params.accession,
                    },
                  });

                  return {
                    accessionEvent: data.accession?.documents?.results?.[0],
                    trialEvents: data.trials?.documents?.results,
                  };
                },
              },
            ],
          },
          {
            path: 'trials',
            errorElement: <ErrorBoundary />,
            lazy: () => import('./views/Trials'),
            loader: async ({ params }) => {
              // Perform the first query to retireve the trial data
              const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
                gqlQueries.QUERY_EVENT_TRIALS,
                {
                  predicate: {
                    type: 'and',
                    predicates: [
                      gqlQueries.PRED_DATA_RESOURCE,
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
                },
              );

              // Extract the event IDs from all of the return trials, then retrieve their associated
              // treatment events
              const eventIDs = (data.eventSearch.documents?.results as Event[]).map(
                ({ eventID }) => eventID,
              );
              const { data: treatments } = await performGQLQuery<{
                data: { eventSearch: EventSearchResult };
              }>(gqlQueries.QUERY_EVENT_TREATMENTS, {
                predicate: {
                  type: 'and',
                  predicates: [
                    gqlQueries.PRED_DATA_RESOURCE,
                    {
                      type: 'equals',
                      key: 'eventType',
                      value: 'Treatment',
                    },
                    {
                      type: 'in',
                      key: 'eventHierarchy',
                      values: eventIDs,
                    },
                  ],
                },
                size: 10,
              });

              // Return both trial & treatment data
              return {
                ...(data.eventSearch?.documents || {}),
                results: mapTrialTreatments(
                  data.eventSearch?.documents?.results || [],
                  treatments.eventSearch?.documents?.results || [],
                ),
              };
            },
          },
          {
            path: 'media',
            errorElement: <ErrorBoundary />,
            lazy: () => import('./views/Media'),
            loader: async ({ params }) => {
              const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
                gqlQueries.QUERY_TAXON_MEDIA,
                {
                  key: params.guid,
                  specimenParams: {
                    filter: {
                      basis_of_record: 'PreservedSpecimen',
                    },
                    size: 8,
                  },
                  otherParams: {
                    filter: {
                      '-basis_of_record': 'PreservedSpecimen',
                    },
                  },
                },
              );

              return data;
            },
          },
          {
            path: 'traits',
            errorElement: <ErrorBoundary />,
            lazy: () => import('./views/Traits'),
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
        path: 'help',
        lazy: () => import('./views/Help'),
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={routes} />;
}

export default Routes;
