import { createBrowserRouter, RouterProvider, redirect, defer } from 'react-router-dom';
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
  SequencesView,
  SeedbankView,
} from './views';
import queries from './api/queries';
import { Event } from './api/graphql/types';
import { mapTrialTreatments } from './helpers';
import { Taxon } from './api/sources/taxon';

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
        path: 'seedbank/:id',
        element: <SeedbankView />,
        loader: async ({ params }) => {
          const [collectory, gql] = await Promise.all([
            fetch(`${import.meta.env.VITE_API_COLLECTORY}/dataResource/${params.id}`),
            performGQLQuery(gqlQueries.QUERY_SEEDBANK_SUMMARY_FULL, {
              datasetKey: params.id,
              size: 50,
            }),
          ]);

          return { gql: gql.data, collectory: await collectory.json() };
        },
      },
      {
        id: 'taxon',
        path: 'taxon/:guid',
        element: <TaxonView />,
        loader: async ({ params }) =>
          (
            await fetch(
              `${import.meta.env.VITE_API_BIE}/ws/species/${decodeURIComponent(params.guid || '')}`,
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

              return data.eventSearch._tileServerToken;
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
                  const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_ACCESSION_FULL, {
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
                    accessionEvent: data.accession.documents.results[0],
                    trialEvents: data.trials.documents.results,
                  };
                },
              },
            ],
          },
          {
            path: 'trials',
            element: <TrialsView />,
            loader: async ({ params }) => {
              // Perform the first query to retireve the trial data
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

              // Extract the event IDs from all of the return trials, then retrieve their associated
              // treatment events
              const eventIDs = (data.eventSearch.documents.results as Event[]).map(
                ({ eventID }) => eventID,
              );
              const { data: treatments } = await performGQLQuery(
                gqlQueries.QUERY_EVENT_TREATMENTS,
                {
                  predicate: {
                    type: 'and',
                    predicates: [
                      queries.PRED_DATA_RESOURCE,
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
                },
              );

              // Return both trial & treatment data
              return {
                ...(data.eventSearch?.documents || {}),
                results: mapTrialTreatments(
                  data.eventSearch?.documents.results || [],
                  treatments.eventSearch?.documents.results || [],
                ),
              };
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
            path: 'sequences',
            element: <SequencesView />,
            loader: async ({ params }) => {
              async function fetchSequences() {
                const taxon = (await (
                  await fetch(
                    `${import.meta.env.VITE_API_BIE}/ws/species/${decodeURIComponent(
                      params.guid || '',
                    )}`,
                  )
                ).json()) as Taxon;

                return (
                  await fetch(
                    `${import.meta.env.VITE_API_BIE}/externalSite/genbank?s=${
                      taxon.classification.scientificName
                    }`,
                  )
                ).json();
              }

              return defer({
                sequences: fetchSequences(),
              });
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
