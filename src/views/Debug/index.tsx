/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { Text, Accordion, Button, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { TaxonSearchInput, TreatmentCard } from '#/components';

// Debug views
import DebugGQL from './components/DebugGQL';
import DebugMap from './components/DebugMap';

function Debug() {
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
        <Accordion.Panel>
          {/* <HerbariumLink
            accession='CANB 801450.6'
            taxon='https://id.biodiversity.org.au/node/apni/2920720'
          /> */}
          <Card withBorder>
            <TreatmentCard
              treatment={{
                id: 'ev12345',
                pretreatment: 'notes about the pretreatment, long text here',
                mediaSubstrate: 'AGAR 1%',
                nightTemperatureInCelsius: 10,
                dayTemperatureInCelsius: 10,
                lightHours: 10,
                darkHours: 14,
              }}
            />
          </Card>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='map'>
        <Accordion.Control>Map</Accordion.Control>
        <Accordion.Panel>
          <DebugMap />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default Debug;
