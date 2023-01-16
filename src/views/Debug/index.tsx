import { Text, Button } from '@mantine/core';
import { useQuery } from '#/api';

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
  const { data, error, update } = useQuery(query, { limit: 10 });
  return (
    <>
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
      {error && <Text>{JSON.stringify(error, null, 2)}</Text>}
      <Text>Debug menu!</Text>
      <Button onClick={() => update({ limit: 20 })}>Update</Button>
    </>
  );
}

export default Debug;
