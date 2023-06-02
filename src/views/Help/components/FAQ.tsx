import { ReactNode } from 'react';

import {
  Accordion,
  Anchor,
  Center,
  Container,
  Group,
  List,
  Space,
  Stack,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

import { TablerIcon } from '@tabler/icons';
import { trialFields } from '#/helpers';

// Custom styles for Accordion component
const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    borderRadius: theme.radius.sm,
  },
  label: {
    fontWeight: 600,
  },
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}));

export interface HelpTopicItem {
  icon: TablerIcon;
  content: ReactNode;
  image: string;
}

function FAQ() {
  const { classes } = useStyles();

  return (
    <Container size='lg' px='xl' mt={-80}>
      <Center mb='xl' pb='xl'>
        <Group>
          <Title>FAQs / Help</Title>
        </Group>
      </Center>
      <Accordion
        variant='filled'
        defaultValue='access-seeds'
        classNames={classes}
        className={classes.root}
      >
        <Accordion.Item value='access-seeds'>
          <Accordion.Control>How do I access seeds?</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing='sm'>
              <Text size='sm'>
                Seeds held by the Australian Seed Bank Partnership are obtained under strict
                collection permits and can only be provided for conservation and scientific research
                purposes. If you are seeking seeds for personal use, we encourage you to contact
                your local native plant nurseries and botanic gardens, who may be able to advise you
                better about the types of plants that are available and appropriate to grow in your
                area.
              </Text>
              <Text size='sm'>
                If you require seeds for research or conservation,{' '}
                <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                  please send us a request
                </Anchor>
                , providing the following information. On receipt of this information, we will put
                you in touch with relevant seedbank(s) who may be able to assist with your request.
              </Text>
              <List size='sm'>
                <List.Item>The species/accessions you require, and the quantity needed;</List.Item>
                <List.Item>
                  The State, Territory, or country where you intend to carry out your
                  research/conservation;
                </List.Item>
                <List.Item>
                  If relevant, the institution under which your research will be conducted;
                </List.Item>
                <List.Item>Advise when you need the material;</List.Item>
                <List.Item>Your contact details.</List.Item>
              </List>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='germination-data-display'>
          <Accordion.Control>What germination data is displayed?</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing='sm'>
              <Text size='sm'>
                A core set of germination data to be included in the Australian Virtual Seed Bank
                was agreed by the Australian Seed Bank Partnership. Data includes:
              </Text>
              <List size='sm'>
                {Object.values(trialFields).map((field) => (
                  <List.Item key={field.label}>
                    {field.label}
                    {field.unit ? ` (${field.unit})` : ''}
                  </List.Item>
                ))}
              </List>
              <Text size='sm'>
                Note, however, that collecting germination data is time consuming and not all
                seedbanks within the Partnership have the opportunity to collect data for every
                collection. The Partnership will work towards providing additional germination data
                in the future.
              </Text>
              <Text size='sm'>
                Other information collected for accessions and trials can be found under the
                “Additional Data” heading in the Accession or Trials view.
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='sort-download-display-germ-data'>
          <Accordion.Control>
            How can I sort, display and download accession or germination data?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              Currently the Australian Virtual Seed Bank can only display up to 40 accession trial
              records per page. The total number of accession / trial records are shown above the
              results tables. You can use filters to query within the records for your selected
              taxon. If you wish to view or query all accession or trial records for a specific
              taxon, you can download the entire record set as a .csv file using the download button
              on either the Trials or Accessions tabs.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='how-desensitised-locations'>
          <Accordion.Control>How are accession locations desensitised?</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing='sm'>
              <Text size='sm'>
                Each state and territory (and some major data providers) provide lists of species
                which they use restrict access to precise locations of these taxa. Restricted access
                (often referred to as sensitive) species data includes point locality data on
                species whose records are normally generalised when made available publicly as well
                as data that is withheld or modified for a variety of reasons. Note that listed
                threatened species may or may not be considered sensitive, and not all sensitive
                species are listed as threatened.
              </Text>
              <Text size='sm'>
                The rules for desensitising sensitive species are provided by each state and
                territory. Some species may have their records withheld from public view. Others
                will have their latitude and longitudes truncated to 1 or 2 decimal places. For more
                information about principles for handling sensitive species data, see the{' '}
                <Anchor target='_blank' href='https://rasd.org.au'>
                  National Framework for the Sharing of Restricted Access Species Data in Australia
                </Anchor>{' '}
                or contact the{' '}
                <Anchor target='_blank' href='mailto:support@ala.org.au'>
                  Atlas of Living Australia
                </Anchor>
                .
              </Text>
              <Text size='sm'>
                The lists of species which are used in the Australian Virtual Seed Bank are those
                used in the Atlas of Living Australia&apos;s Sensitive Data Service. You can view
                these lists{' '}
                <Anchor
                  target='_blank'
                  href='https://lists.ala.org.au/public/speciesLists?&max=25&sort=listName&order=asc&isSDS=eq:true&isSDS=eq:true'
                >
                  here
                </Anchor>
                . The state and territory lists only apply to records located within that state /
                territory (so records for a sensitised species may be visible in other states and
                territories). The lists of sensitive species provided by other non-government data
                providers will apply only to records provided by them.
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='desensitised-locations'>
          <Accordion.Control>
            How do I know that an accession location has been desensitised?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              When you view the detailed information regarding an accession for a sensitive species
              in the Australian Virtual Seed Bank, a message appears below the map which reads
              “Precise location data has been obfuscated for species protection”. In addition, these
              accession records will either have only one or two decimal places displayed in their
              latitude and longitude.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='no-accessions-trials'>
          <Accordion.Control>
            What do I do if I can&apos;t find accessions or trials for a particular species?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              If there is no accession or trials data showing for the species you are interested in,
              try searching by genus or family instead. Often related species have similar
              germination requirements.{' '}
              <Anchor target='_blank' href='https://www.anpc.asn.au/plant-germplasm'>
                The publication &lsquo;Plant Germplasm Conservation in Australia&rsquo; includes
                up-to-date general information on germination and dormancy in Australian species
              </Anchor>
              . If you cannot find information you are after, and would like more information,
              please contact the{' '}
              <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                Australian Seed Bank Partnership
              </Anchor>
              .
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='how-often-data-uploaded'>
          <Accordion.Control>
            How often will data be uploaded to the Australian Virtual Seed Bank (AVSB)?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              An annual refresh of data will be undertaken around August. If you wish to access more
              recent data than what is shown in the AVSB, please contact the{' '}
              <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                Australian Seed Bank Partnership
              </Anchor>
              .
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='provide-feedback'>
          <Accordion.Control>
            How do I provide feedback / report issues with data or the portal?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              You can provide feedback on the Australian Virtual Seedbank Portal either to the{' '}
              <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                Australian Seed Bank Partnership
              </Anchor>{' '}
              or to support at the{' '}
              <Anchor target='_blank' href='mailto:support@ala.org.au'>
                Atlas of Living Australia
              </Anchor>{' '}
              who host the portal.
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='select-accession-area'>
          <Accordion.Control>
            Is it possible to select accession for an area using the map?
          </Accordion.Control>
          <Accordion.Panel>
            <Stack spacing='sm'>
              <Text size='sm'>
                The current version of the Australian Virtual Seed Bank does not contain this
                functionality. The ability to search for and select accessions in your area of
                interest will be a priority for inclusion in future versions.
              </Text>
              <Text size='sm'>
                In the current version, you can zoom in and out on the summary map of accessions for
                a particular taxon. You can also select individual accessions on the summary map to
                view details of the accession and associated trials. For more information, please
                contact the{' '}
                <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                  Australian Seed Bank Partnership
                </Anchor>
                .
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Space h={80} />
    </Container>
  );
}

export default FAQ;
