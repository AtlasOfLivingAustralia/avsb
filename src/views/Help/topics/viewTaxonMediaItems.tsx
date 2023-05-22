import { Code } from '@mantine/core';
import { IconClick } from '@tabler/icons';

import imageMedia from '../images/taxon-media-min.png';
import imageMediaSelect from '../images/taxon-media-select-min.png';

import gotoTaxonItems from './gotoTaxonItems';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on the <Code>Media</Code> tab, where you will see a collection of images related to
        the chosen taxon
      </>
    ),
    image: imageMedia,
  },
  {
    icon: IconClick,
    content:
      'Click an image to view more details about in the panel on the right-hand side of the page',
    image: imageMediaSelect,
  },
];

export default items;
