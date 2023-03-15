import { useState } from 'react';
import { Text, Accordion, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AccessionPanel, HerbariumLink, TaxonSearchInput, TreatmentCard } from '#/components';
// import { useAPI } from '#/api';

// Debug views
import DebugGQL from './components/DebugGQL';
import DebugMap from './components/DebugMap';

function Debug() {
  const [taxonSearch, setTaxonSearch] = useState<string | null>(null);
  const navigate = useNavigate();
  // const api = useAPI();
  return (
    <Accordion defaultValue='components'>
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
          <HerbariumLink
            accession='CANB 801450.6'
            taxon='https://id.biodiversity.org.au/node/apni/2920720'
          />
          <TreatmentCard
            event={{
              extensions: {
                seedbank: {
                  eventID: 'ev12345',
                  pretreatment: 'notes about the pretreatment, long text here',
                  mediaSubstrate: 'AGAR 1%',
                  nightTemp: 10,
                  dayTemp: 10,
                  lightHours: 10,
                  darkHours: 14,
                },
              },
            }}
          />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value='accession'>
        <Accordion.Control>Accession</Accordion.Control>
        <Accordion.Panel>
          <AccessionPanel
            taxon='https://id.biodiversity.org.au/node/apni/2920720'
            event={{
              eventID: 'ev123',
              datasetKey: 'dr18699',
              country: 'Australia',
              countryCode: 'AU',
              decimalLatitude: 137.591797,
              decimalLongitude: -26.000092,
              stateProvince: 'Queensland',
              eventType: {
                concept: 'Accession',
                lineage: ['Accession'],
              },
              locality:
                'This is a testing string showing the locality of the event, and it is going to be really long so I can see how it overflows',
              extensions: {
                seedbank: {
                  eventID: 'ev123',
                  accessionNumber: 'CANB 801450.6',
                  seedPerGram: 100,
                  formInStorage: 'seed',
                  sampleWeight: 1.123,
                  sampleSize: 30,
                  purity: 90,
                  purityDebris: 91,
                  dateCollected: '2018-02-01',
                  dateInStorage: '2018-02-05',
                  storageTemp: 18,
                  relativeHumidity: 13,
                  publicationDOI: 'https://doi.org/1234567890',
                  preStorageTreatmentNotesHistory: 'Moved from dry room to cryo',
                  primaryStorageSeedBank: 'Australian National Botanical Gardens',
                  degreeOfEstablishment: 'native',
                  primaryCollector: 'John Appleseed',
                  plantForm: 'tree',
                  duplicatesReplicates: '1.5gm sent to MSB on 1/1/2019',
                  collectionPermitNumber: 'PERM123',
                  thousandSeedWeight: 1.23,
                  numberPlantsSampled: '10-20',
                  storageBehaviour: 'orthodox',
                  embryoType: 'Unknown',
                  dormancyClass: 'Not dormant',
                },
              },
            }}
          />
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
