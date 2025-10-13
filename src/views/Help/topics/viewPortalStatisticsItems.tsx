import { IconClick, IconEye, IconMouse } from '@tabler/icons-react';

import imageHomeStatsHover from '#/assets/help/home-stats-hover-min.png';
import imageStats from '#/assets/help/stats-min.png';
import imageStatsEpbc from '#/assets/help/stats-epbc-min.png';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  {
    icon: IconClick,
    content: (
      <>
        Click on the <b>portal statistics</b> button on the top-left corner of the portal
      </>
    ),
    image: imageHomeStatsHover,
  },
  {
    icon: IconEye,
    content:
      'You can then see statistics such as total accessions, trials, species with accessions, and more.',
    image: imageStats,
  },
  {
    icon: IconMouse,
    content:
      'When scrolling down, you can also see statistics relating to species listed under the EPBC Act.',
    image: imageStatsEpbc,
  },
];

export default items;
