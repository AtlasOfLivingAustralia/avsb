import { Text, Button, Title, Code } from '@mantine/core';
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

function DebugGQL() {
  const { data, error, update } = useGQLQuery(query, { limit: 4 }, { lazy: true });

  return (
    <>
      <Title order={4}>Data</Title>
      {data ? <Code block>{JSON.stringify(data, null, 2)}</Code> : <Text>No data</Text>}
      <Title order={4}>Error</Title>
      <Text>{error?.message || 'no error'}</Text>
      <Button onClick={() => update({ limit: 4 })}>Update</Button>
    </>
  );
}

export default DebugGQL;
