import { IconClick, IconEye, IconFilter, IconMouse, IconSearch } from '@tabler/icons-react';

import imageHomeStatsHover from '#/assets/help/home-stats-hover-min.png';
import imageStatsEpbc from '#/assets/help/stats-epbc-min.png';
import imageStatsExplorer from '#/assets/help/stats-explorer.png';
import imageStatsExplorerFilter from '#/assets/help/stats-explorer-filter.png';
import imageStats from '#/assets/help/stats-min.png';
import imageStatsState from '#/assets/help/stats-state-min.png';

import { type HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  {
    icon: IconClick,
    content: (
      <>
        Click on the <b>seed bank snapshot</b> button on the top-left corner of the portal
      </>
    ),
    image: imageHomeStatsHover,
  },
  {
    icon: IconEye,
    content:
      'You can then see statistics such as total accessions, trials, species with accessions, and more',
    image: imageStats,
  },
  {
    icon: IconMouse,
    content: (
      <>
        When scrolling down, you can also see statistics relating to species listed under the{' '}
        <b>EPBC Act</b>
      </>
    ),
    image: imageStatsEpbc,
  },
  {
    icon: IconMouse,
    content:
      'Below this, you can see statistics relating to species listed under relevant state and territory legislation',
    image: imageStatsState,
  },
  {
    icon: IconSearch,
    content:
      'The final section of the page displays the accession data we hold for protected species',
    image: imageStatsExplorer,
  },
  {
    icon: IconFilter,
    content:
      'You can filter and refine these results by selecting the various states and territories you wish to see data for',
    image: imageStatsExplorerFilter,
  },
];

export default items;
