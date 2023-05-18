import { Code, Kbd } from '@mantine/core';
import {
  IconArrowUpRight,
  IconClick,
  IconDownload,
  IconEye,
  IconMoon,
  IconMouse,
  IconSun,
} from '@tabler/icons';
import { HelpTopicItem } from '..';

// Seed bank images
import imageHome from '../images/home-min.png';
import imageHomeDatasets from '../images/home-datasets-min.png';
import imageHomeDatasetsHover from '../images/home-datasets-hover-min.png';
import imageSeedbank from '../images/seedbank-min.png';
import imageSeedbankMapContact from '../images/seedbank-map-contact-min.png';

// Taxon search images
import imageHomeSearch from '../images/home-search-min.png';
import imageHomeSearchSelect from '../images/home-search-select-min.png';

// Taxon summary images
import imageTaxonSummary from '../images/taxon-summary-min.png';

// Accession images
import imageAccessions from '../images/taxon-accessions-min.png';
import imageAccessionsExpanded from '../images/taxon-accessions-expanded-min.png';
import imageAccessionsResults from '../images/taxon-accessions-results-min.png';
import imageAccessionsFullHover from '../images/taxon-accessions-full-hover-min.png';

// Accession details images
import imageAccessionsDetails from '../images/taxon-accessions-details-min.png';
import imageAccessionsDetailsMap from '../images/taxon-accessions-details-map-min.png';
import imageAccessionsDetailsBottom from '../images/taxon-accessions-details-bottom-min.png';

// Trial images
import imageTrials from '../images/taxon-trials-min.png';
import imageTrialsExpanded from '../images/taxon-trials-expanded-min.png';
import imageTrialsResults from '../images/taxon-trials-results-min.png';

// Filtering images
import imageFiltersHover from '../images/taxon-filters-hover-min.png';
import imageFilters from '../images/taxon-filters-min.png';
import imageFiltersAbc from '../images/taxon-filters-abc-min.png';
import imageFiltersActive from '../images/taxon-filters-active-min.png';

// Downloads images
import imageDownload from '../images/taxon-download-min.png';

// Theme switching images
import imageHomeLight from '../images/home-light-min.png';

// Taxon media images
import imageMedia from '../images/taxon-media-min.png';
import imageMediaSelect from '../images/taxon-media-select-min.png';

// Sequences images
import imageSequences from '../images/taxon-sequences-min.png';
import imageSequencesHover from '../images/taxon-sequences-hover-min.png';

const viewSeedbankItems: HelpTopicItem[] = [
  {
    icon: IconArrowUpRight,
    content: 'Navigate to the home page',
    image: imageHome,
  },
  {
    icon: IconMouse,
    content: (
      <>
        Scroll down to <Code>Our Datasets</Code>
      </>
    ),
    image: imageHomeDatasets,
  },
  {
    icon: IconClick,
    content: <>Click on the seed bank you wish to see summary information for</>,
    image: imageHomeDatasetsHover,
  },
  {
    icon: IconEye,
    content:
      'See key summary information such as a seed bank description, logo and number of accessions at the top of the page',
    image: imageSeedbank,
  },
  {
    icon: IconEye,
    content: (
      <>
        An accession map is located below, showing seed <b>collection</b> locations for all
        accessions in the dataset (where available)
      </>
    ),
    image: imageSeedbankMapContact,
  },
  {
    icon: IconEye,
    content: (
      <>
        A searchable list containing all of the species within the dataset can be found to the right
        of the accession map. This list can be downloading by click the{' '}
        <IconDownload size='0.8rem' /> button in the top right-hand corner of the list
      </>
    ),
    image: imageSeedbankMapContact,
  },
  {
    icon: IconEye,
    content:
      'At the bottom of the page, contact details for that particular seed bank can be found.',
    image: imageSeedbankMapContact,
  },
];

const gotoTaxonItems: HelpTopicItem[] = [
  {
    icon: IconMouse,
    content: (
      <>
        Enter the name of your desired taxon (speices, genus, etc) in the{' '}
        <Code>Search for a taxon</Code> input, either on the top of the navigation bar, or on the
        home page.
      </>
    ),
    image: imageHomeSearch,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click on your desired taxon, or press <Kbd>Enter</Kbd> to select the first result
      </>
    ),
    image: imageHomeSearchSelect,
  },
];

const viewTaxonSummaryItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconEye,
    content: (
      <>
        An accession map is available on the summary, showing seed <b>collection</b> locations for
        all accessions in the dataset (where available).
      </>
    ),
    image: imageTaxonSummary,
  },
  {
    icon: IconEye,
    content: 'The classification breakdown of the taxon is also available to the right of the map.',
    image: imageTaxonSummary,
  },
];

const viewTaxonAccessionItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Accessions</Code> tab to navigate to the accessions tab
      </>
    ),
    image: imageAccessions,
  },
  {
    icon: IconEye,
    content: (
      <>
        The accessions tab shows a summary of all accessions related to your chosen taxon, providing
        key fields such as <Code>Collection Date</Code> and <Code>Storage Temperature</Code>
      </>
    ),
    image: imageAccessions,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click on a table row to expand it & see more details about that accession. You can also
        click the <Code>Expand</Code> button to expand all rows, and the <Code>Collapse</Code> to
        collapse all rows
      </>
    ),
    image: imageAccessionsExpanded,
  },
  {
    icon: IconEye,
    content: (
      <>
        The number of results shown per table page can be changed using the results dropdown in the
        top-left hand corner.
      </>
    ),
    image: imageAccessionsResults,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>All Details</Code> button on any row to view the full information about
        that accession
      </>
    ),
    image: imageAccessionsFullHover,
  },
  {
    icon: IconEye,
    content:
      "We're provided with an overview of all fields related to that accession, with the key fields highlighted at the top",
    image: imageAccessionsDetails,
  },
  {
    icon: IconEye,
    content:
      'A map outlining the seed collection location & associated locality details is situated below',
    image: imageAccessionsDetailsMap,
  },
  {
    icon: IconEye,
    content:
      'A panel containing the accession collection / storage dates is also available, as well as a link to the related herbarium specimen (if one is available)',
    image: imageAccessionsDetailsMap,
  },
  {
    icon: IconEye,
    content:
      'The bottom of the page provides contact details for the data provider (and a link to their seed bank summary page), alongside as a table containing trials which are related to the chosen accession',
    image: imageAccessionsDetailsBottom,
  },
];

const viewTaxonTrialItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Trials</Code> tab to navigate to the accessions tab
      </>
    ),
    image: imageTrials,
  },
  {
    icon: IconEye,
    content: (
      <>
        The accessions tab shows a summary of all trials related to your chosen taxon, providing key
        fields such as <Code>Adjusted Germination</Code> and <Code>Date Tested</Code>
      </>
    ),
    image: imageTrials,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click on a table row to expand it & see more details about that trial, including trial
        conditions. You can also click the <Code>Expand</Code> button to expand all rows, and the{' '}
        <Code>Collapse</Code> to collapse all rows
      </>
    ),
    image: imageTrialsExpanded,
  },
  {
    icon: IconEye,
    content: (
      <>
        The number of results shown per table page can be changed using the results dropdown in the
        top-left hand corner.
      </>
    ),
    image: imageTrialsResults,
  },
];

const filterAccessionsTrialsItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on either the <Code>Accessions</Code> or <Code>Trials</Code> tab
      </>
    ),
    image: imageAccessions,
  },
  {
    icon: IconClick,
    content: (
      <>
        Currently there are no filters selected (denoted by the <Code>No filters selected</Code>{' '}
        text).
        <br />
        Click the <Code>Filters</Code> button to open the filters drawer.
      </>
    ),
    image: imageFiltersHover,
  },
  {
    icon: IconEye,
    content: (
      <>
        We&apos;re provided with a list of filters, grouped by the type of data they&apos;re
        filtering.
      </>
    ),
    image: imageFilters,
  },
  {
    icon: IconClick,
    content: (
      <>
        To switch this view to show all filters alphabetically, click the <Code>ABC</Code> filter in
        the top right-hand corner of the drawer.
      </>
    ),
    image: imageFiltersAbc,
  },
  {
    icon: IconEye,
    content:
      'As you update the filters, the accession / trial table will be automatically updated with the filtered results.',
    image: imageFiltersActive,
  },
];

const downloadRecordsItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on either the <Code>Accessions</Code> or <Code>Trials</Code> tab
      </>
    ),
    image: imageAccessions,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click the <IconDownload size='0.8rem' /> button in the right hand corner above the table.
        Any filters you have applied will be reflected in the downloaded records.
      </>
    ),
    image: imageDownload,
  },
];

const switchThemeItems: HelpTopicItem[] = [
  {
    icon: IconClick,
    content: (
      <>
        Click the <IconMoon size='0.8rem' /> / <IconSun size='0.8rem' /> icon in the top-right hand
        corner of the portal to switch between light and dark themes.
      </>
    ),
    image: imageHomeLight,
  },
];

const viewTaxonMediaItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Media</Code> tab, where you will see a collection of images related to
        the chosen taxa
      </>
    ),
    image: imageMedia,
  },
  {
    icon: IconClick,
    content:
      'Click an image to view more details about in the panel on the right-hand side of the page',
    image: imageMediaSelect,
  },
];

const viewTaxonSequencesItems: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Sequences</Code> tab. Genomic data related to the chosen species can be
        seen listed on the page.
      </>
    ),
    image: imageSequences,
  },
  {
    icon: IconClick,
    content: 'Click a sequence card to view the full details on GenBank',
    image: imageSequencesHover,
  },
];

export {
  viewSeedbankItems,
  viewTaxonSummaryItems,
  viewTaxonAccessionItems,
  viewTaxonTrialItems,
  filterAccessionsTrialsItems,
  downloadRecordsItems,
  viewTaxonMediaItems,
  viewTaxonSequencesItems,
  switchThemeItems,
};
