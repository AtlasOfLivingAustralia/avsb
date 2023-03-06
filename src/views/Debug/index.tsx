import { useState } from 'react';
import { Text, Accordion, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Contact, TaxonSearchInput } from '#/components';
// import { useAPI } from '#/api';

// Debug views
import DebugGQL from './components/DebugGQL';

function Debug() {
  const [taxonSearch, setTaxonSearch] = useState<string | null>(null);
  const navigate = useNavigate();
  // const api = useAPI();
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
            onClick={() =>
              navigate(
                `/taxon/${encodeURIComponent(
                  'https://id.biodiversity.org.au/taxon/apni/51286863',
                )}`,
              )
            }
          >
            Goto taxon via ID
          </Button>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='api'>
        <Accordion.Control>Components</Accordion.Control>
        <Accordion.Panel>
          <Contact dataResource='dr18699' />
          <Contact dataResource='dr18697' />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default Debug;
