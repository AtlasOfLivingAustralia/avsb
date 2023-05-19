import { Code } from '@mantine/core';
import { IconClick, IconEye } from '@tabler/icons';

// Trial images
import imageTrials from '../images/taxon-trials-min.png';
import imageTrialsExpanded from '../images/taxon-trials-expanded-min.png';
import imageTrialsResults from '../images/taxon-trials-results-min.png';

import gotoTaxonItems from './gotoTaxonItems';

export default [
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
