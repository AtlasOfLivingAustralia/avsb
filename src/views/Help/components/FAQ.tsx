import { ReactNode } from 'react';

import {
  Accordion,
  Anchor,
  Center,
  Container,
  Group,
  Space,
  Text,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

import { TablerIcon } from '@tabler/icons';

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

function FAQ() {
  const { classes } = useStyles();

  return (
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
  );
}

export default FAQ;
