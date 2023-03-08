/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { useGQLQuery } from '#/api';
import { EventMap } from '#/components';
import queries from '#/api/queries';

function DebugGQL() {
  const { data } = useGQLQuery(queries.QUERY_EVENT_MAP);
  const token = (data as any)?.data.eventSearch._tileServerToken;

  return <EventMap width='100%' height={500} token={token} />;
}

export default DebugGQL;
