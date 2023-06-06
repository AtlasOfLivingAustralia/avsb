import { Code } from '@mantine/core';
import { IconClick, IconEye } from '@tabler/icons';

import imageTrials from '#/assets/help/taxon-trials-min.png';
import imageTrialsExpanded from '#/assets/help/taxon-trials-expanded-min.png';
import imageTrialsResults from '#/assets/help/taxon-trials-results-min.png';

import gotoTaxonItems from './gotoTaxonItems';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Trials</Code> tab to see a list of trials for that taxon
      </>
    ),
    image: imageTrials,
  },
  {
    icon: IconEye,
    content: (
      <>
        The trials tab shows a summary of all trials related to your chosen taxon, providing key
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

export default items;
