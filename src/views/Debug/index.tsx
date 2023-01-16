import { Text, Button } from '@mantine/core';
import { useGQLQuery } from '#/api';

const query = `
query list($limit: Int){
  eventSearch(
    size: $limit
    ) {
    documents {
      results {
        eventID
      }
    }
  }
}
`;

function Debug() {
  const { data, error, update } = useGQLQuery(query, { limit: 10 }, { lazy: true });

  return (
    <>
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
      {error && <Text>{error.message}</Text>}
      <Text>Debug menu!</Text>
      <Button onClick={() => update({ limit: 20 })}>Update</Button>
    </>
  );
}

export default Debug;
