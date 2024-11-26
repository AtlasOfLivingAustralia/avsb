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
  useMantineTheme,
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
} from '@tabler/icons';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Wave } from '#/components/Wave';

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

import Topic from './components/Topic';
import FAQ from './components/FAQ';

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
  const theme = useMantineTheme();
  const mdOrLarger = useMediaQuery(`(min-width: ${theme.breakpoints.md})`, true);

  return (
    <>
      <Modal
        padding={0}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size={1100}
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
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
        sx={{
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        }}
      >
        <Container size='lg' pt='xl'>
          <Center pt='lg' mb='xl' pb='xl'>
            <Group>
              <Title>How to</Title>
            </Group>
          </Center>
          <Grid>
            {Object.entries(helpTopics).map(([key, { description, icon: Icon }]) => (
              <Grid.Col xl={4} lg={4} md={4} sm={6} xs={12} key={key}>
                <UnstyledButton
                  onClick={() => {
                    setTopic(key);
                    open();
                  }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.md,
                    border: `1px solid ${
                      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
                    }`,
                    width: '100%',
                    height: '100%',
                    transition: 'opacity cubic-bezier(0, 0, 0, 1) 200ms',
                    ':hover': {
                      opacity: 0.4,
                    },
                  }}
                >
                  <Center w='100%'>
                    <Icon size='3rem' />
                  </Center>
                  <Text
                    sx={{
                      marginTop: theme.spacing.md,
                      fontFamily: theme.headings.fontFamily,
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
