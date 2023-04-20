import {
  Badge,
  Card,
  Group,
  Text,
  UnstyledButton,
  createStyles,
  getStylesRef,
} from '@mantine/core';

// Project components / helpers
import { IconExternalLink } from '@tabler/icons';

export interface SequenceRecord {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

const useStyles = createStyles((theme) => ({
  card: {
    ref: getStylesRef('card'),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    transition: 'opacity 200ms cubic-bezier(0, 0, 0, 1)',
  },
  chevron: {
    ref: getStylesRef('chevron'),
    marginRight: 8,
    transition: 'margin-right 200ms cubic-bezier(0, 0, 0, 1)',
  },
  root: {
    [`&:hover .${getStylesRef('chevron')}`]: {
      marginRight: 0,
    },
    [`&:hover .${getStylesRef('card')}`]: {
      opacity: 0.5,
    },
  },
}));

interface SequenceItemProps {
  sequence: SequenceRecord;
}

function SequenceItem({ sequence }: SequenceItemProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      component='a'
      href={sequence.link}
      target='_blank'
      className={classes.root}
      key={sequence.link}
    >
      <Card p='sm' className={classes.card}>
        <Group position='apart'>
          <Badge variant='dot' radius='sm'>
            {sequence.description}
          </Badge>
          <Group spacing='xs'>
            <Badge color='lime' pl='xs'>
              {sequence.furtherDescription}
            </Badge>
            <IconExternalLink className={classes.chevron} size='1rem' />
          </Group>
        </Group>
        <Text mt='md' weight='bold' size='xs'>
          {sequence.title}
        </Text>
      </Card>
    </UnstyledButton>
  );
}

export default SequenceItem;
