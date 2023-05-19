import { IconClick, IconMoon, IconSun } from '@tabler/icons';

import imageHomeLight from '../images/home-light-min.png';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  {
    icon: IconClick,
    content: (
      <>
        Click the <IconMoon size='0.8rem' /> / <IconSun size='0.8rem' /> icon in the top-right hand
        corner of the portal to switch between light and dark themes.
      </>
    ),
    image: imageHomeLight,
  },
];

export default items;
