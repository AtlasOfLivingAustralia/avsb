import { IconClick, IconMoon, IconSun } from '@tabler/icons';

// Theme switching images
import imageHomeLight from '../images/home-light-min.png';

export default [
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
