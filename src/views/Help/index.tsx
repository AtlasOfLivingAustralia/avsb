import { ReactNode, useState } from 'react';

import {
  Accordion,
  Anchor,
  Box,
  Center,
  Container,
  Grid,
  Group,
  Modal,
  Space,
  Text,
  Title,
  UnstyledButton,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';

import {
  IconAdjustmentsHorizontal,
  IconAffiliate,
  IconBuildingBank,
  IconDna2,
  IconFileDownload,
  IconFlask,
  IconMoon,
  IconPackage,
  IconPhoto,
  TablerIcon,
} from '@tabler/icons';

import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Wave } from '#/components/Wave';

import {
  downloadRecordsItems,
  filterAccessionsTrialsItems,
  switchThemeItems,
  viewSeedbankItems,
  viewTaxonAccessionItems,
  viewTaxonMediaItems,
  viewTaxonSequencesItems,
  viewTaxonSummaryItems,
  viewTaxonTrialItems,
} from './topics';
import Topic from './Topic';

// Custom styles for Accordion component
const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    borderRadius: theme.radius.sm,
  },
  label: {
    fontWeight: 600,
  },
  item: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    border: `${rem(1)} solid transparent`,
    position: 'relative',
    zIndex: 0,
    transition: 'transform 150ms ease',

    '&[data-active]': {
      transform: 'scale(1.03)',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    '&[data-rotate]': {
      transform: 'rotate(-90deg)',
    },
  },
}));

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
    description: 'Filter accesisons / trials for a plant taxon',
    icon: IconAdjustmentsHorizontal,
    instructions: filterAccessionsTrialsItems,
  },
  downloadRecords: {
    topic: 'Download records',
    description: 'Download accesison / trial records for a plant taxon',
    icon: IconFileDownload,
    instructions: downloadRecordsItems,
  },
  viewTaxonMedia: {
    topic: 'Taxon Media',
    description: 'View media for a plant taxon',
    icon: IconPhoto,
    instructions: viewTaxonMediaItems,
  },
  viewTaxonSequences: {
    topic: 'Taxon Sequences',
    description: 'View sequences for a plant taxon',
    icon: IconDna2,
    instructions: viewTaxonSequencesItems,
  },
  switchTheme: {
    topic: 'Switch Theme',
    description: 'Switch between light / dark themes',
    icon: IconMoon,
    instructions: switchThemeItems,
  },
};

function Help() {
  const [topic, setTopic] = useState<string>('viewSeedBank');
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

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
        size='xl'
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
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
      <Container size='lg' px='xl' mt={-80}>
        <Center mb='xl' pb='xl'>
          <Group>
            <Title>FAQs / Help</Title>
          </Group>
        </Center>
        <Accordion
          variant='filled'
          defaultValue='dataset-load'
          classNames={classes}
          className={classes.root}
        >
          <Accordion.Item value='dataset-load'>
            <Accordion.Control>How can I provide my data to the portal?</Accordion.Control>
            <Accordion.Panel>
              <Text size='sm'>
                If you&apos;re a seed ecologist or seed bank representative and wish to provide us
                with your data, please contact us{' '}
                <Anchor
                  href='https://www.seedpartnership.org.au/about-us/contact-us/'
                  target='_blank'
                >
                  here
                </Anchor>
                .
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <Space h={80} />
      </Container>
    </>
  );
}

export default Help;
