import { gqlQueries, performGQLQuery } from '#/api';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';
// Project components / helpers
import { Event, EventSearchResult } from '#/api/graphql/types';
import queries from '#/api/queries';
import { mapTrialTreatments } from '#/helpers';
import TrialsTable from '#/views/Trials/components/TrialsTable';

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

  return query ? <TrialsTable height='auto' events={query} /> : <Skeleton w='100%' height={225} />;
}

export default TrialSummary;
