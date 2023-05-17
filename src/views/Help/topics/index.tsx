import { Code } from '@mantine/core';
import { IconArrowUpRight, IconClick, IconEye, IconHome, IconMouse } from '@tabler/icons';
import { HelpTopicItem } from '..';

const viewSeedbankItems: HelpTopicItem[] = [
  {
    icon: IconArrowUpRight,
    content: 'Navigate to the home page',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconMouse,
    content: (
      <>
        Scroll down to <Code>Our Datasets</Code>
      </>
    ),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconClick,
    content: <>Click on the seed bank you wish to see summary information for</>,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconEye,
    content:
      'See key summary information such as a seed bank description, logo and number of accessions at the top of the page',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconEye,
    content: (
      <>
        An accession map is located below, showing seed <b>collection</b> locations for all
        accessions in the dataset (where available)
      </>
    ),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconEye,
    content:
      'A searchable list containing all of the species within the dataset can be found to the right of the accession map.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconEye,
    content:
      'At the bottom of the page, contact details for that particular seed bank can be found.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
];

const viewTaxonSummaryItems: HelpTopicItem[] = [
  {
    icon: IconHome,
    content: 'Navigate to the home page',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
  {
    icon: IconMouse,
    content: (
      <>
        Scroll down to <Code>Our Datasets</Code>
      </>
    ),
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png',
  },
];

export { viewSeedbankItems, viewTaxonSummaryItems };
