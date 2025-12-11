import { IconEye } from '@tabler/icons-react';

import imageTaxonSummary from '#/assets/help/taxon-summary-min.png';

import gotoTaxonItems from './gotoTaxonItems';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
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

export default items;
