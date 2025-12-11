import { Code, Kbd } from '@mantine/core';
import { IconClick, IconMouse } from '@tabler/icons-react';

import imageHomeSearch from '#/assets/help/home-search-min.png';
import imageHomeSearchSelect from '#/assets/help/home-search-select-min.png';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  {
    icon: IconMouse,
    content: (
      <>
        Enter the name of your desired taxon (species, genus, etc.) in the{' '}
        <Code>Search for a taxon</Code> input, either on the top of the navigation bar, or on the
        home page.
      </>
    ),
    image: imageHomeSearch,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click on your desired taxon, or press <Kbd>Enter</Kbd> to select the first result
      </>
    ),
    image: imageHomeSearchSelect,
  },
];

export default items;
