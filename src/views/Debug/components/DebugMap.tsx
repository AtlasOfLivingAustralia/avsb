/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGQLQuery } from '#/api';
import { EventMap, Map } from '#/components';
import queries from '#/api/queries';

function DebugEventMap() {
  const { data } = useGQLQuery(queries.QUERY_EVENT_MAP);
  const token = (data as any)?.data.eventSearch._tileServerToken;

  return <EventMap width='100%' height={500} token={token} />;
}

function DebugMap() {
  return <Map width='100%' height={500} center={[137.591797, -26.000092]} />;
}

export default DebugMap;
