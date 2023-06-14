import { Code } from '@mantine/core';
import { IconClick, IconEye } from '@tabler/icons';

import imageAccessions from '#/assets/help/taxon-accessions-min.png';
import imageFiltersHover from '#/assets/help/taxon-filters-hover-min.png';
import imageFilters from '#/assets/help/taxon-filters-min.png';
import imageFiltersAbc from '#/assets/help/taxon-filters-abc-min.png';
import imageFiltersActive from '#/assets/help/taxon-filters-active-min.png';

import gotoTaxonItems from './gotoTaxonItems';

import { HelpTopicItem } from '..';

const items: HelpTopicItem[] = [
  ...gotoTaxonItems,
  {
    icon: IconClick,
    content: (
      <>
        Click on either the <Code>Accessions</Code> or <Code>Trials</Code> tab
      </>
    ),
    image: imageAccessions,
  },
  {
    icon: IconClick,
    content: (
      <>
        Currently there are no filters selected (denoted by the <Code>No filters selected</Code>{' '}
        text).
        <br />
        Click the <Code>Filters</Code> button to open the filters drawer.
      </>
    ),
    image: imageFiltersHover,
  },
  {
    icon: IconEye,
    content: (
      <>
        We&apos;re provided with a list of filters, grouped by the type of data they&apos;re
        filtering.
      </>
    ),
    image: imageFilters,
  },
  {
    icon: IconClick,
    content: (
      <>
        To switch this view to show all filters alphabetically, click the <Code>ABC</Code> filter in
        the top right-hand corner of the drawer.
      </>
    ),
    image: imageFiltersAbc,
  },
  {
    icon: IconEye,
    content:
      'As you update the filters, the accession / trial table will be automatically updated with the filtered results.',
    image: imageFiltersActive,
  },
];

export default items;
