import {
  Badge,
  Card,
  Group,
  Text,
  UnstyledButton,
  createStyles,
  getStylesRef,
} from '@mantine/core';
import { Link } from 'react-router-dom';

// Project components / helpers
import { getIsPresent } from '#/helpers';

import { Event, SeedBankTrial } from '#/api/graphql/types';
import { IconChevronRight, IconClock, IconPlant } from '@tabler/icons';

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

interface TrialItemProps {
  event: Event;
}

function ListItem({ event }: TrialItemProps) {
  const trial = event.extensions?.seedbank as SeedBankTrial;
  const { classes } = useStyles();

  return (
    <UnstyledButton component={Link} to='../../trials' className={classes.root} key={event.eventID}>
      <Card p='xs' className={classes.card}>
        <Group position='apart'>
          <Group spacing='sm'>
            <Badge variant='dot' radius='sm'>
              {trial.accessionNumber}
            </Badge>
            <Text weight='bold' size={13}>
              {event.datasetTitle
                ?.split(' ')
                .map((part) => part.charAt(0))
                .join('')
                .replace('SB', '')}
            </Text>
            <Text color='dimmed' size={13}>
              {[event.day, event.month, event.year].filter((part) => part !== null).join('/')}
            </Text>
          </Group>
          <Group spacing='xs'>
            {getIsPresent(trial?.adjustedGerminationPercentage) && (
              <Badge pl='xs' leftSection={<IconPlant size='0.7rem' />}>
                {trial?.adjustedGerminationPercentage}%
              </Badge>
            )}
            {getIsPresent(trial?.testLengthInDays) && (
              <Badge color='lime' pl='xs' leftSection={<IconClock size='0.7rem' />}>
                {trial?.testLengthInDays}
              </Badge>
            )}
            <IconChevronRight className={classes.chevron} size='1rem' />
          </Group>
        </Group>
      </Card>
    </UnstyledButton>
  );
}

export default ListItem;
