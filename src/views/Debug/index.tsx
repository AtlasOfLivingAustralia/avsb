import { useState } from 'react';
import { Text, Accordion } from '@mantine/core';
import { TaxonSearchInput } from '#/components';

// Debug views
import DebugGQL from './components/DebugGQL';

function Debug() {
  const [taxonSearch, setTaxonSearch] = useState<string | null>(null);
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
    </Accordion>
  );
}

export default Debug;
