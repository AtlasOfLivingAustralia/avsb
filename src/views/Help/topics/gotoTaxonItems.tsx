import { Code, Kbd } from '@mantine/core';
import { IconClick, IconMouse } from '@tabler/icons';

// Taxon search images
import imageHomeSearch from '../images/home-search-min.png';
import imageHomeSearchSelect from '../images/home-search-select-min.png';

export default [
  {
    icon: IconMouse,
    content: (
      <>
        Enter the name of your desired taxon (speices, genus, etc) in the{' '}
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
