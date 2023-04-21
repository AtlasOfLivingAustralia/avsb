import {
  Badge,
  Card,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  createStyles,
  getStylesRef,
} from '@mantine/core';

// Project components / helpers
import { IconExternalLink } from '@tabler/icons';
import { SequenceRecord } from '..';

const useStyles = createStyles((theme) => ({
  card: {
    ref: getStylesRef('card'),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    transition: 'opacity 200ms cubic-bezier(0, 0, 0, 1)',
    height: '100%',
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

interface SequenceItemProps extends UnstyledButtonProps {
  sequence: SequenceRecord | null;
}

function SequenceItem({ sequence, ...rest }: SequenceItemProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton
      component='a'
      href={sequence?.link}
      target='_blank'
      className={classes.root}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Skeleton visible={!sequence} h='100%'>
        <Card p='sm' className={classes.card}>
          <Group position='apart'>
            <Badge variant='dot' radius='sm'>
              {sequence?.description || '243 bp linear DNA'}
            </Badge>
            <Group spacing='xs'>
              <Badge color='lime' pl='xs'>
                {sequence?.furtherDescription || 'Accession: KC955787.1 GI: 627754504'}
              </Badge>
              <IconExternalLink className={classes.chevron} size='1rem' />
            </Group>
          </Group>
          <Text mt='md' weight='bold' size='xs'>
            {sequence?.title ||
              'Acacia dealbata isolate JM2225 tRNA-Leu (trnL) gene and trnL-trnF intergenic spacer, partial sequence; chloroplast'}
          </Text>
        </Card>
      </Skeleton>
    </UnstyledButton>
  );
}

export default SequenceItem;
