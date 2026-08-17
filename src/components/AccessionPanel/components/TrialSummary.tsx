import { Skeleton, Stack } from '@mantine/core';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';

import { gqlQueries, performGQLQuery } from '#/api';
// Project components / helpers
import type { Event, EventSearchResult } from '#/api/graphql/types';
import queries from '#/api/queries';
import { mapTrialTreatments } from '#/helpers';
import TrialsTable from '#/views/Trials/components/TrialsTable';

const TrialGraph = lazy(() => import('./TrialGraph'));

interface TrialSummaryProps {
  trials: Event[];
}

const GRAPHABLE_FIELDS = [
  'adjustedGerminationPercentage',
  'viabilityPercentage',
  'numberGerminated',
  'numberFull',
  'numberEmpty',
  'numberNotViable',
  'numberTested',
] as const;

/**
 * A trial graph is only meaningful when there are at least two trials with
 * distinct test start dates, and there is a single graphable measurement field
 * that every trial has a value for, so that field can be plotted over time.
 */
export function canGraphTrials(trials: Event[]): boolean {
  if (trials.length < 2) return false;

  const dates = new Set<number>();
  for (const trial of trials) {
    const testDateStarted = trial.extensions?.seedbank?.testDateStarted;
    if (testDateStarted !== null && testDateStarted !== undefined) {
      dates.add(testDateStarted);
    }
  }
  if (dates.size < 2) return false;

  return GRAPHABLE_FIELDS.some((field) =>
    trials.every((trial) => {
      const value = trial.extensions?.seedbank?.[field];
      return value !== null && value !== undefined;
    }),
  );
}

function TrialSummary({ trials }: TrialSummaryProps) {
  // State hooks
  const [query, setQuery] = useState<Event[]>([]);
  const showGraph = useMemo(() => false, []);

  useEffect(() => {
    async function runQuery() {
      // Extract the event IDs from all of the return trials, then retrieve their associated
      // treatment events
      const eventIDs = trials.map(({ eventID }) => eventID);
      const { data } = await performGQLQuery<{ data: { eventSearch: EventSearchResult } }>(
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

      setQuery(mapTrialTreatments(trials, data.eventSearch?.documents?.results || []));
    }

    runQuery();
  }, []);

  return query ? (
    <Stack>
      {showGraph && (
        <Suspense fallback={<Skeleton h={300} />}>
          <TrialGraph events={query} />
        </Suspense>
      )}
      <TrialsTable height='auto' events={query} />
    </Stack>
  ) : <Skeleton w='100%' height={225} />;
}

export default TrialSummary;
