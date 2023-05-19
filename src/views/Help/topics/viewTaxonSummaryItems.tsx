import { IconEye } from '@tabler/icons';

// Taxon summary images
import imageTaxonSummary from '../images/taxon-summary-min.png';

import gotoTaxonItems from './gotoTaxonItems';

export default [
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
