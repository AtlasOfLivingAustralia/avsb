import { Code } from '@mantine/core';
import { IconArrowUpRight, IconClick, IconDownload, IconEye, IconMouse } from '@tabler/icons';

import imageHome from '#/assets/help/home-min.png';
import imageHomeDatasets from '#/assets/help/home-datasets-min.png';
import imageHomeDatasetsHover from '#/assets/help/home-datasets-hover-min.png';
import imageSeedbank from '#/assets/help/seedbank-min.png';
import imageSeedbankMapContact from '#/assets/help/seedbank-map-contact-min.png';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  {
    icon: IconArrowUpRight,
    content: 'Navigate to the home page',
    image: imageHome,
  },
  {
    icon: IconMouse,
    content: (
      <>
        Scroll down to <Code>Our Datasets</Code>
      </>
    ),
    image: imageHomeDatasets,
  },
  {
    icon: IconClick,
    content: <>Click on the seed bank you wish to see summary information for</>,
    image: imageHomeDatasetsHover,
  },
  {
    icon: IconEye,
    content:
      'See key summary information such as a seed bank description, logo and number of accessions at the top of the page',
    image: imageSeedbank,
  },
  {
    icon: IconEye,
    content: (
      <>
        An accession map is located below, showing seed <b>collection</b> locations for all
        accessions in the dataset (where available)
      </>
    ),
    image: imageSeedbankMapContact,
  },
  {
    icon: IconEye,
    content: (
      <>
        A searchable list containing all of the species within the dataset can be found to the right
        of the accession map. This list can be downloading by click the{' '}
        <IconDownload size='0.8rem' /> button in the top right-hand corner of the list
      </>
    ),
    image: imageSeedbankMapContact,
  },
  {
    icon: IconEye,
    content:
      'At the bottom of the page, contact details for that particular seed bank can be found.',
    image: imageSeedbankMapContact,
  },
];

export default items;
