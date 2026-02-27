import { Code } from '@mantine/core';
import { IconClick, IconDownload } from '@tabler/icons-react';

import imageAccessions from '#/assets/help/taxon-accessions-min.png';
import imageDownloadFilled from '#/assets/help/taxon-download-filled-min.png';
import imageDownload from '#/assets/help/taxon-download-min.png';
import { type HelpTopicItem } from '..';
import gotoTaxonItems from './gotoTaxonItems';

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
        Click the <IconDownload size='0.8rem' /> button in the right hand corner above the table.
        You will be prompted to enter your organisation name and reason for download, and can
        optionally remember these details for future download requests.
      </>
    ),
    image: imageDownload,
  },
  {
    icon: IconClick,
    content: (
      <>
        Click the <Code>Download</Code> button on the modal. Any filters you have applied will be
        reflected in the downloaded records.
      </>
    ),
    image: imageDownloadFilled,
  },
];

export default items;
