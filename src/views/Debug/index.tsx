import { Text, Button } from '@mantine/core';
import { useAPI, useGQLQuery } from '#/api';
import { TaxonSearchInput } from '#/components';

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
  const api = useAPI();

  return (
    <>
      {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
      {error && <Text>{error.message}</Text>}
      <Text>Debug menu!</Text>
      <Button onClick={() => update({ limit: 20 })}>Update</Button>
      <Button
        onClick={async () => {
          // eslint-disable-next-line no-console
          console.log(await api.taxon.suggest('Aca'));
        }}
      >
        Test API
      </Button>
      <TaxonSearchInput onChange={(key) => console.log('key', key)} />
    </>
  );
}

export default Debug;
