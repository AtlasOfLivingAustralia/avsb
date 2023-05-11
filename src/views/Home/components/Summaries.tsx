import {
  Text,
  useMantineTheme,
  Grid,
  Skeleton,
  Box,
  Group,
  ThemeIcon,
  createStyles,
  getStylesRef,
  UnstyledButton,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { gqlQueries, useGQLQuery } from '#/api';
import { EventSearchResult } from '#/api/graphql/types';
import { getShortInt } from '#/helpers';
import queries from '#/api/queries';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : 'white',
    transition: 'opacity 200ms cubic-bezier(0, 0, 0, 1)',
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    boxShadow: theme.shadows.md,
    ':hover': {
      opacity: 0.5,
    },
    [`&:hover .${getStylesRef('arrow')}`]: {
      transform: 'translate(6px, -6px)',
    },
    [`&:hover .${getStylesRef('arrowIcon')}`]: {
      opacity: 1,
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  arrow: {
    ref: getStylesRef('arrow'),
    transition: 'transform 200ms cubic-bezier(0, 0, 0, 1)',
  },
  arrowIcon: {
    ref: getStylesRef('arrowIcon'),
    transition: 'opacity 200ms cubic-bezier(0, 0, 0, 1)',
    opacity: 0.2,
  },
}));

interface SummaryCardProps {
  accessions?: EventSearchResult;
  trials?: EventSearchResult;
}

function SummaryCard({ accessions, trials }: SummaryCardProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const navigate = useNavigate();

  // Hoist the data from the response
  const { total: totalAccessions, results } = accessions?.documents || {};
  const { total: totalTrials } = trials?.documents || {};

  const event = results?.[0];
  const loading = !results;

  const onCardClick = () => {
    if (event) navigate(`seedbank/${event.datasetKey}`);
  };

  return (
    <UnstyledButton onClick={onCardClick} className={classes.root}>
      <Box h='100%' className={classes.wrapper}>
        <Skeleton visible={loading}>
          <Box style={{ display: 'flex' }}>
            <Text
              lineClamp={2}
              mah={48}
              sx={{
                fontFamily: theme.headings.fontFamily,
                color: theme.colorScheme === 'dark' ? theme.colors.gray[3] : theme.colors.dark[3],
              }}
            >
              {event?.datasetTitle || 'Seed Bank Name Placeholder Value Here'}
            </Text>
            <Box w={24} h={24} ml='auto' className={classes.arrow}>
              <IconArrowUpRight className={classes.arrowIcon} size={24} />
            </Box>
          </Box>
        </Skeleton>
        <Grid mt='md'>
          <Grid.Col span={6}>
            <Group spacing='xs'>
              <Skeleton width={34} height={34} circle visible={loading}>
                <ThemeIcon variant='light' size='sm' p='md' radius='xl'>
                  <Text color={theme.primaryColor[0]} weight='bold' size='xs'>
                    {getShortInt(totalAccessions || 10)}
                  </Text>
                </ThemeIcon>
              </Skeleton>
              <Skeleton visible={loading} maw={50}>
                <Text size='sm'>Accessions</Text>
              </Skeleton>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group spacing='xs'>
              <Skeleton width={34} height={34} circle visible={loading}>
                <ThemeIcon variant='light' size='sm' p='md' radius='xl'>
                  <Text color={theme.primaryColor[0]} weight='bold' size='xs'>
                    {getShortInt(totalTrials || 10)}
                  </Text>
                </ThemeIcon>
              </Skeleton>
              <Skeleton visible={loading} maw={50}>
                <Text size='sm'>Trials</Text>
              </Skeleton>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    </UnstyledButton>
  );
}

// Construct a query that fetches a summary all data resources
const QUERY_SEEDBANK_SUMMARY_ALL = `
query list {
  ${queries.DATA_RESOURCES.map((dataResource: string) =>
    queries.QUERY_SEEDBANK_SUMMARY_TEMPLATE.replaceAll('{{datasetKey}}', dataResource),
  ).join('')}
}
`;

function Summaries() {
  const { data } = useGQLQuery<{ data: { [key: string]: EventSearchResult } }>(
    QUERY_SEEDBANK_SUMMARY_ALL,
  );

  return (
    <Grid gutter='xl'>
      {gqlQueries.PRED_DATA_RESOURCE.values.map((dataResource) => (
        <Grid.Col key={dataResource} xs={12} sm={6} md={4} lg={4}>
          <SummaryCard
            accessions={data?.data[`${dataResource}Accessions`]}
            trials={data?.data[`${dataResource}Trials`]}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}

export default Summaries;
