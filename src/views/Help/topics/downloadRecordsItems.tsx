import { Code } from '@mantine/core';
import { IconClick, IconDownload } from '@tabler/icons';

// Accession images
import imageAccessions from '../images/taxon-accessions-min.png';

// Downloads images
import imageDownload from '../images/taxon-download-min.png';

import gotoTaxonItems from './gotoTaxonItems';

export default [
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
