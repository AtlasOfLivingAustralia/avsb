import { useState } from 'react';
import { Text, Accordion, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { TaxonSearchInput } from '#/components';

// Debug views
import DebugGQL from './components/DebugGQL';

// eslint-disable-next-line import/prefer-default-export
export function Component() {
  const [taxonSearch, setTaxonSearch] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <Accordion defaultValue='filtering'>
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
      <Accordion.Item value='components'>
        <Accordion.Control>Components</Accordion.Control>
        <Accordion.Panel />
      </Accordion.Item>
    </Accordion>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Component as any).displayName = 'Debug';
