/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Skeleton } from '@mantine/core';

// Project components / helpers
import { Event } from '#/api/graphql/types';
import { gqlQueries, performGQLQuery } from '#/api';
import { mapTrialTreatments } from '#/helpers';
import TrialsTable from '#/views/Trials/components/TrialsTable';
import queries from '#/api/queries';

interface TrialSummaryProps {
  trials: Event[];
}

function TrialSummary({ trials }: TrialSummaryProps) {
  // State hooks
  const [query, setQuery] = useState<Event[]>([]);

  useEffect(() => {
    async function runQuery() {
      // Extract the event IDs from all of the return trials, then retrieve their associated
      // treatment events
      const eventIDs = trials.map(({ eventID }) => eventID);
      const { data } = await performGQLQuery(gqlQueries.QUERY_EVENT_TREATMENTS, {
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
      });

      setQuery(mapTrialTreatments(trials, data.eventSearch?.documents.results || []));
    }

    runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return query ? <TrialsTable height='auto' events={query} /> : <Skeleton w='100%' height={225} />;
}

export default TrialSummary;
