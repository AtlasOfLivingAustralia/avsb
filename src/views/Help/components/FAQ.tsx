import { trialFields } from '#/helpers';
import {
  Accordion,
  Alert,
  Anchor,
  Center,
  Code,
  Container,
  Highlight,
  List,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { IconAlertTriangle, IconMessageQuestion, IconQuestionMark, IconUserQuestion, TablerIcon } from '@tabler/icons-react';
import { ReactNode, useState } from 'react';

import classes from './FAQ.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { breakpoints } from '#/theme';

export interface HelpTopicItem {
  icon: TablerIcon;
  content: ReactNode;
  image: string;
}

interface FAQItem {
  title: string;
  value: string;
  component: ReactNode;
}

function FAQ() {
  const [search, setSearch] = useState<string>('');
  const [value, setValue] = useState<string | null>('access-seeds');
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);

  const faqItems: FAQItem[] = [
    {
      title: 'How do I access seeds?',
      value: 'access-seeds',
      component: (
        <Stack gap='sm'>
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
          <Alert color='yellow' icon={<IconAlertTriangle size='1rem' />}>
            Requests for species that are listed under State or Commonwealth environmental
            legislation (threatened species) will be considered on a case-by-case basis.
            Additional information may be required and seed cannot be guaranteed.
          </Alert>
        </Stack>
      ),
    },
    {
      title: 'What germination data is displayed?',
      value: 'germination-data-display',
      component: (
        <Stack gap='sm'>
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
      ),
    },
    {
      title: 'How can I sort, display and download accession or germination data?',
      value: 'sort-download-display-germ-data',
      component: (
        <Text size='sm'>
          Currently the Australian Virtual Seed Bank can only display up to 40 accession trial
          records per page. The total number of accession / trial records are shown above the
          results tables. You can use filters to query within the records for your selected
          taxon. If you wish to view or query all accession or trial records for a specific
          taxon, you can download the entire record set as a .csv file using the download button
          on either the Trials or Accessions tabs.
        </Text>
      ),
    },
    {
      title: 'How do I add threatened species status to my downloaded data?',
      value: 'download-threatend-species',
      component: (
        <Text size='sm'>
          Although Threatened Species Status for taxa listed under state, territory and
          commonwealth threatened species legislation is shown on the AVSB summary pages, this
          is currently not included in the data downloads. You can download threatened species
          lists for all jurisdictions in Australia from the ALA{' '}
          <Anchor
            target='_blank'
            href='https://lists.ala.org.au/public/speciesLists?&max=25&sort=listName&order=asc&isThreatened=eq:true&isAuthoritative=eq:true&listType=eq:CONSERVATION_LIST'
          >
            here
          </Anchor>{' '}
          and attribute taxa in your downloads with their conservation status. If you need
          further assistance, please contact{' '}
          <Anchor target='_blank' href='mailto:support@ala.org.au'>
            support@ala.org.au
          </Anchor>
        </Text>
      ),
    },
    {
      title: 'How does the AVSB resolve taxonomic name matching issues?',
      value: 'resolve-taxonomic-name-matching',
      component: (
        <Text size='sm'>
          When a seedbank provides data to be included in the AVSB, the ALA&apos;s name matching
          service aligns the scientific names in the dataset with those in the{' '}
          <Anchor
            target='_blank'
            href='https://biodiversity.org.au/nsl/services/search/taxonomy'
          >
            Australian Plant Census
          </Anchor>{' '}
          (where they have been included) or the{' '}
          <Anchor target='_blank' href='https://biodiversity.org.au/nsl/services/search/names'>
            Australian Plant Names Index
          </Anchor>
          .
        </Text>
      ),
    },
    {
      title: 'How can I find what raw scientific name was supplied with a record?',
      value: 'raw-scientific-name',
      component: (
        <Text size='sm'>
          The AVSB doesn&apos;t display the scientific name as provided by the seedbanks (i.e.,
          the verbatim / supplied scientific name). You can, however, find the supplied
          scientific name provided by the seedbank by searching species observations in the
          Atlas of Living Australia and filtering records for the taxon by Data Resource (i.e.,
          your seedbank name e.g. National Seedbank). You can then look at the details of
          records and will be able to see the supplied and matched names for the taxon record.
          For more information about how to filter data in the ALA please contact{' '}
          <Anchor target='_blank' href='mailto:support@ala.org.au'>
            support@ala.org.au
          </Anchor>{' '}
          or see{' '}
          <Anchor
            target='_blank'
            href='https://support.ala.org.au/support/solutions/articles/6000249564-how-to-use-facets-to-filter-ala-data'
          >
            this
          </Anchor>{' '}
          help desk article.
        </Text>
      ),
    },
    {
      title: 'How are accession locations desensitised?',
      value: 'how-desensitised-locations',
      component: (
        <Stack gap='sm'>
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
            . The state and territory lists generally only apply to records located within that
            state / territory. Observation records of these species in the ALA are generalised,
            however, in the AVSB, all locality information for these taxa is withheld. Accession
            and trial data, where it exists, will still be accessible.
          </Text>
        </Stack>
      ),
    },
    {
      title: 'How do I know that an accession location has been desensitised?',
      value: 'desensitised-locations',
      component: (
        <Text size='sm'>
          When you search for data in the AVSB for a taxon which is considered sensitive, the
          summary map will be replaced with a sensitive data redaction message. Where seed bank
          data exists, when you click on either the trials or accessions tab you can still
          access the data for trials and accessions for these taxa. When viewing the details of
          an accession record, the same sensitive data redacation message appears (where the
          locality map usually shows).
        </Text>
      ),
    },
    {
      title: 'What do I do if I can\'t find accessions or trials for a particular species?',
      value: 'no-accessions-trials',
      component: (
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
      ),
    },
    {
      title: 'How often will data be uploaded to the Australian Virtual Seed Bank (AVSB)?',
      value: 'how-often-data-uploaded',
      component: (
        <Text size='sm'>
          An annual refresh of data will be undertaken around August. If you wish to access more
          recent data than what is shown in the AVSB, please contact the{' '}
          <Anchor target='_blank' href='mailto:info@seedpartnership.org.au'>
            Australian Seed Bank Partnership
          </Anchor>
          .
        </Text>
      ),
    },
    {
      title: 'How do I provide feedback / report issues with data or the portal?',
      value: 'provide-feedback',
      component: (
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
      ),
    },
    {
      title: 'How can I search for accessions within a specific area using the map?',
      value: 'select-accession-area',
      component: (
        <Stack gap='sm'>
          <Text size='sm'>
            The portal includes this functionality.
          </Text>
          <List size='sm'>
            <List.Item>
              <b>Creating a search area:</b>{' '}
              When viewing a map, select the polygon tool in the top-right hand corner of map, and begin clicking to draw points.{' '}
              When finished, double click to confirm the last point of the polygon, and the accessions search area will be constrained to that polygon.{' '}
              You can draw multiple polygons on any given map.
            </List.Item>
            <List.Item>
              <b>Editing a search area:</b>{' '}
              Polygons themselves can be moved by clicking and dragging on them. The points on existing polygons can also be moved by clicking and dragging on them.
            </List.Item>
            <List.Item>
              <b>Deleting a search area:</b>{' '}
              To delete existing polygons, click on the polygon, and then click the 'delete' icon in the top-right hand corner of the map.
            </List.Item>
          </List>
        </Stack>
      ),
    },
    {
      title: 'Why don\'t all seedbank accessions appear on the summary maps / seedbank maps?',
      value: 'missing-accessions-summary-map',
      component: (
        <Stack gap='sm'>
          <Text size='sm'>
            The presence of seedbank locations on maps depends on a number of factors, i.e.:
          </Text>
          <List size='sm'>
            <List.Item>Not all seed banks collect location data for all accessions</List.Item>
            <List.Item>
              Some seed banks may withhold point locations for some accessions
            </List.Item>
            <List.Item>
              Coordinates for sensitive species in each of the states and territories are
              withheld in the AVSB. See FAQs:
              <List size='sm'>
                <List.Item>
                  <Anchor size='sm' onClick={() => setValue('how-desensitised-locations')}>
                    How are accession locations desensitised?
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor size='sm' onClick={() => setValue('desensitised-locations')}>
                    How do I know that an accession location has been desensitised?
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor size='sm' onClick={() => setValue('no-accessions-trials')}>
                    What do I do if I can&apos;t find accessions or trials for a particular
                    species?
                  </Anchor>
                </List.Item>
              </List>
            </List.Item>
          </List>
        </Stack>
      ),
    },
    {
      title: 'How do I find data for a taxon with a phrase name (not formally described)?',
      value: 'taxon-phrase-names',
      component: (
        <Text size='sm'>
          Phrase names are temporary names for taxa that haven&apos;t yet been formally
          described in a taxonomic publication. These names aren&apos;t currently displayed
          within the species list on seed bank summary pages. The best way to find out if there
          is any accession or trial data for one of these taxa and who has seed for it in their
          collection is to do a general search for that taxon.
        </Text>
      ),
    },
    {
      title: 'How do I properly attribute the data in the AVSB?',
      value: 'attribute-data',
      component: (
        <Stack gap='sm'>
          <Text size='sm'>
            When using data from the Australian Virtual Seed Bank in research, publications, or
            presentations, please acknowledge both the seed bank that contributed the data and
            the AVSB as the platform through which the data were accessed.
          </Text>
          <Text size='sm'>A suggested citation is:</Text>
          <Code style={{ borderRadius: 'var(--mantine-radius-lg)' }} p='sm'>
            Seed bank name (year of data). Seed collection and/or germination data accessed via the Australian Virtual Seed Bank (https://seedbank.ala.org.au) on [date accessed].
          </Code>
        </Stack>
      ),
    },
  ];

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? faqItems.filter((item) => item.title.toLowerCase().includes(normalizedSearch))
    : faqItems;

  return (
    <Container size='xl' px='xl' mt={mdOrLarger ? -80 : 0}>
      <Stack ta='center' align='center' mb='xl' pb='xl' gap='xl'>
        <Title>FAQs / Help</Title>
        <TextInput
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          placeholder='Search for frequently asked questions'
          w={400}
        />
      </Stack>
      {filteredItems.length > 0 ? (
        <Accordion
          variant='filled'
          value={value}
          onChange={setValue}
          classNames={classes}
          className={classes.root}
        >
          {filteredItems.map((item) => (
            <Accordion.Item key={item.value} value={item.value}>
              <Accordion.Control>
                {search.length > 0 ? <Highlight fw={600} highlight={search}>{item.title}</Highlight> : item.title}
              </Accordion.Control>
              <Accordion.Panel>{item.component}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Stack align='center'>
          <IconMessageQuestion size="2.5rem" />
          <Text ff='heading' fw={600} ta='center' size='lg' c='dimmed'>
            No FAQs match your search
          </Text>
        </Stack>
      )}
      <Space h={80} />
    </Container>
  );
}

export default FAQ;
