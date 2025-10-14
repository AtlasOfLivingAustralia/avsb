import { Code } from '@mantine/core';
import { IconClick, IconEye } from '@tabler/icons-react';

import imageAccessions from '#/assets/help/taxon-accessions-min.png';
import imageAccessionsExpanded from '#/assets/help/taxon-accessions-expanded-min.png';
import imageAccessionsResults from '#/assets/help/taxon-accessions-results-min.png';
import imageAccessionsFullHover from '#/assets/help/taxon-accessions-full-hover-min.png';
import imageAccessionsDetails from '#/assets/help/taxon-accessions-details-min.png';
import imageAccessionsDetailsMap from '#/assets/help/taxon-accessions-details-map-min.png';
import imageAccessionsDetailsBottom from '#/assets/help/taxon-accessions-details-bottom-min.png';

import gotoTaxonItems from './gotoTaxonItems';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Accessions</Code> tab to see a list of accessions for that taxon
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
      'The bottom of the page provides contact details for the data provider (and a link to their seed bank summary page), along with a table containing trials related to the selected accession',
    image: imageAccessionsDetailsBottom,
  },
];

export default items;
