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
                Seeds held by the partnership are obtained under strict collection permits and can
                only be provided for conservation and scientific research purposes. If you are
                seeking seeds for personal use, we encourage you to contact your local native plant
                nurseries and botanic gardens, who may be able to advise you better about the types
                of plants that are available and appropriate to grow in your area.
              </Text>
              <Text size='sm'>
                If you require seeds for research or conservation,{' '}
                <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                  please send us a request
                </Anchor>
                , providing the following information. On receipt of this information we will put
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
                A core set of germination data to be included in the Australian Virtual Seedbank was
                agreed by the Australian Seedbank Partnership. Fields include:
              </Text>
              <List size='sm'>
                {Object.values(trialFields).map((field) => (
                  <List.Item>
                    {field.label}
                    {field.unit ? ` (${field.unit})` : ''}
                  </List.Item>
                ))}
              </List>
              <Text size='sm'>
                Note, however, that not all seedbanks within the partnership collect data for all
                the above fields but will work towards doing so in the future.
              </Text>
              <Text size='sm'>
                Other information collected for accessions and trials can be found under the
                “Additional Data” heading in the accession or trial details view.
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='desensitised-locations'>
          <Accordion.Control>How are accession locations desensitised?</Accordion.Control>
          <Accordion.Panel>
            <Stack spacing='sm'>
              <Text size='sm'>
                Each state and territory (and some major data providers) provide lists of species
                which they use to sensitise / obfuscate locations of these taxa. The lists of
                species which are used in the Australian Virtual Seedbank are those used in the
                Atlas of Living Australia&apos;s Sensitive Data Service. You can view these lists{' '}
                <Anchor
                  target='_blank'
                  href='https://lists.ala.org.au/public/speciesLists?&max=25&sort=listName&order=asc&isSDS=eq:true&isSDS=eq:true'
                >
                  here
                </Anchor>
                . The state and territory lists only apply to records located within that state /
                territory. The lists provided by data providers will apply only to records in data
                provided by them.
              </Text>
              <Text size='sm'>
                The rules for desensitising sensitive species are provided by each state and
                territory. Some species may have their records withheld from public view. Others
                will have their latitude and longitudes truncated to 1 or 2 decimal places. For more
                information about principles for handling sensitive species data, see the{' '}
                <Anchor target='_blank' href='https://rasd.org.au/'>
                  National Framework for the Sharing of Restricted Access Species Data in Australia
                </Anchor>{' '}
                or contact the{' '}
                <Anchor target='_blank' href='mailto:support@ala.org.au'>
                  Atlas of Living Australia
                </Anchor>
                .
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='desensitised-locations-message'>
          <Accordion.Control>
            How do I know that an accession location has been desensitised?
          </Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              When you view the detailed information regarding an accession for a sensitive species
              in the Australian Virtual Seedbank, a message appears below the map which reads
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
              germination requirements. If you cannot find information you are after, and would like
              more information, please contact the National Seedbank Partnership.
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
                Australian Seedbank Partnership
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
                The current version of the Australian Virtual Seedbank does not contain this
                functionality. The ability to search for and / select accessions in your area of
                interest will be a priority for inclusion in future versions.
              </Text>
              <Text size='sm'>
                The current version of the Australian Virtual Seedbank does not contain this
                functionality. The ability to search for and / select accessions in your area of
                interest will be a priority for inclusion in future versions. In the current version
                you can zoom in and out on the summary map of accessions for a particular taxon. You
                can also select individual accessions on the summary map to view details of the
                accession and associated trials. For more information, please contact the{' '}
                <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
                  Australian Seedbank Partnership
                </Anchor>
                .
              </Text>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='dataset-load'>
          <Accordion.Control>How can I provide my data to the portal?</Accordion.Control>
          <Accordion.Panel>
            <Text size='sm'>
              If you&apos;re a seed ecologist or seed bank representative and wish to provide us
              with your data, please contact us{' '}
              <Anchor
                target='_blank'
                href='https://www.seedpartnership.org.au/about-us/contact-us/'
              >
                here
              </Anchor>
              .
            </Text>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Space h={80} />
    </Container>
  );
}

export default FAQ;
