import { Code } from '@mantine/core';
import { IconClick } from '@tabler/icons';

// Sequences images
import imageSequences from '../images/taxon-sequences-min.png';
import imageSequencesHover from '../images/taxon-sequences-hover-min.png';

import gotoTaxonItems from './gotoTaxonItems';

export default [
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
