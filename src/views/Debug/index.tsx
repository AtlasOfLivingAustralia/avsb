import { useState } from 'react';
import { Text, Accordion, Button } from '@mantine/core';
import { TaxonSearchInput } from '#/components';
import { useAPI } from '#/api';

// Debug views
import DebugGQL from './components/DebugGQL';

function Debug() {
  const [taxonSearch, setTaxonSearch] = useState<string | null>(null);
  const api = useAPI();
  return (
    <Accordion defaultValue='gql'>
      <Accordion.Item value='gql'>
        <Accordion.Control>GraphQL Querying</Accordion.Control>
        <Accordion.Panel>
          <DebugGQL />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='taxonSearchInput'>
        <Accordion.Control>Taxon Search</Accordion.Control>
        <Accordion.Panel>
          <TaxonSearchInput
            onChange={(guid) => setTaxonSearch(guid)}
            customTypes={['Catalogue Number']}
          />
          {taxonSearch && <Text>{taxonSearch}</Text>}
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='api'>
        <Accordion.Control>API</Accordion.Control>
        <Accordion.Panel>
          <Button
            onClick={async () =>
              console.log(
                await api.taxon.taxonInfo('https://id.biodiversity.org.au/taxon/apni/51286863'),
              )
            }
          >
            Taxon via ID
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default Debug;
