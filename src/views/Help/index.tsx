import { ReactNode, useState } from 'react';

import {
  ActionIcon,
  Box,
  Center,
  Container,
  Grid,
  Group,
  Modal,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';

import {
  IconAdjustmentsHorizontal,
  IconAffiliate,
  IconBuildingBank,
  IconChartLine,
  IconFileDownload,
  IconFlask,
  IconMoon,
  IconPackage,
  IconPhoto,
  IconX,
  TablerIcon,
} from '@tabler/icons-react';

import { Wave } from '#/components/Wave';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { breakpoints } from '#/theme/constants';

import classes from './index.module.css';

import {
  downloadRecordsItems,
  filterAccessionsTrialsItems,
  switchThemeItems,
  viewPortalStatisticsItem,
  viewSeedbankItems,
  viewTaxonAccessionItems,
  viewTaxonMediaItems,
  viewTaxonSummaryItems,
  viewTaxonTrialItems,
} from './topics';

import FAQ from './components/FAQ';
import Topic from './components/Topic';

export interface HelpTopicItem {
  icon: TablerIcon;
  content: ReactNode;
  image: string;
}

interface HelpTopic {
  topic: string;
  description: string;
  icon: TablerIcon;
  instructions: HelpTopicItem[];
}

const helpTopics: { [key: string]: HelpTopic } = {
  viewSeedBank: {
    topic: 'Seed Bank Summaries',
    description: 'View summary information about a seed bank',
    icon: IconBuildingBank,
    instructions: viewSeedbankItems,
  },
  viewTaxonSummary: {
    topic: 'Taxon Summaries',
    description: 'View summary information about a plant taxon',
    icon: IconAffiliate,
    instructions: viewTaxonSummaryItems,
  },
  viewTaxonAccession: {
    topic: 'Taxon Accessions',
    description: 'View accessions for a plant taxon',
    icon: IconPackage,
    instructions: viewTaxonAccessionItems,
  },
  viewTaxonTrial: {
    topic: 'Taxon Trials',
    description: 'View trials for a plant taxon',
    icon: IconFlask,
    instructions: viewTaxonTrialItems,
  },
  filterAccessionsTrials: {
    topic: 'Query Filtering',
    description: 'Filter accessions / trials for a plant taxon',
    icon: IconAdjustmentsHorizontal,
    instructions: filterAccessionsTrialsItems,
  },
  downloadRecords: {
    topic: 'Download records',
    description: 'Download accession / trial records for a plant taxon',
    icon: IconFileDownload,
    instructions: downloadRecordsItems,
  },
  viewTaxonMedia: {
    topic: 'Taxon Media',
    description: 'View media for a plant taxon',
    icon: IconPhoto,
    instructions: viewTaxonMediaItems,
  },
  viewPortalStats: {
    topic: 'View Statistics',
    description: 'View portal data statistics',
    icon: IconChartLine,
    instructions: viewPortalStatisticsItem,
  },
  switchTheme: {
    topic: 'Switch Theme',
    description: 'Switch between light / dark themes',
    icon: IconMoon,
    instructions: switchThemeItems,
  },
};

export function Component() {
  const [topic, setTopic] = useState<string>('viewSeedBank');
  const [opened, { open, close }] = useDisclosure(false);

  // Theme hooks
  const mdOrLarger = useMediaQuery(`(min-width: ${breakpoints.md})`, true);

  return (
    <>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={1100}
        overlayProps={{
          color: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
          opacity: 0.55,
          blur: 3,
        }}
      >
        <ActionIcon
          style={{ zIndex: 100 }}
          onClick={close}
          pos='absolute'
          variant='light'
          color='dark'
          size='lg'
          radius='lg'
          right={10}
          top={10}
          aria-label='Close help modal'
        >
          <IconX />
        </ActionIcon>
        <Topic instructions={helpTopics[topic].instructions} />
      </Modal>
      <Box
        style={{
          backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-6))',
        }}
        pt={60}
        mt={-90}
      >
        <Container size='lg' pt='xl'>
          <Center pt='lg' mb='xl' pb='xl'>
            <Group>
              <Title>How to</Title>
            </Group>
          </Center>
          <Grid>
            {Object.entries(helpTopics).map(([key, { description, icon: Icon }]) => (
              <Grid.Col span={{ xl: 4, lg: 4, md: 4, sm: 6, xs: 12 }} key={key}>
                <UnstyledButton
                  className={classes.topic}
                  onClick={() => {
                    setTopic(key);
                    open();
                  }}
                >
                  <Center w='100%'>
                    <Icon size='3rem' />
                  </Center>
                  <Text
                    style={{
                      marginTop: 'var(--mantine-spacing-md)',
                      fontFamily: 'var(--mantine-font-family-headings)',
                      fontWeight: 'normal',
                    }}
                  >
                    {description}
                  </Text>
                </UnstyledButton>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
      <Wave
        width='100%'
        height={mdOrLarger ? 250 : 125}
        preserveAspectRatio='none'
        waveType='bodyBottom'
      />
      <FAQ />
    </>
  );
}

Object.assign(Component, { displayName: 'Help' });
