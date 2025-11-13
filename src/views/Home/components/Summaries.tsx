import { gqlQueries, useGQLQuery } from '#/api';
import { EventSearchResult } from '#/api/graphql/types';
import queries from '#/api/queries';
import { getAbbreviatedNumber } from '#/helpers';
import {
  Box,
  Grid,
  GridProps,
  Group,
  Skeleton,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Link } from 'react-router';
import classes from './Summaries.module.css';

interface SummaryCardProps {
  accessions?: EventSearchResult;
  trials?: EventSearchResult;
}

function SummaryCard({ accessions, trials }: SummaryCardProps) {
  // Hoist the data from the response
  const { total: totalAccessions, results } = accessions?.documents || {};
  const { total: totalTrials } = trials?.documents || {};

  const event = results?.[0];
  const loading = !results;

  return (
    <Link to={`seedbank/${event?.datasetKey}`}>
      <UnstyledButton className={classes.root}>
        <Box h='100%' className={classes.wrapper}>
          <Skeleton visible={loading}>
            <Box style={{ display: 'flex' }}>
              <Text
                lineClamp={2}
                mah={48}
                fw={600}
                style={{
                  fontFamily: 'var(--mantine-font-family-headings)',
                  color: 'light-dark(var(--mantine-color-dark-4), var(--mantine-color-gray-3))',
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
              <Group gap='xs'>
                <Skeleton width={34} height={34} circle visible={loading}>
                  <ThemeIcon variant='light' size='sm' p='md' radius='xl'>
                    <Text fw='bold' size='xs'>
                      {getAbbreviatedNumber(totalAccessions || 0)}
                    </Text>
                  </ThemeIcon>
                </Skeleton>
                <Skeleton visible={loading} maw={50}>
                  <Text
                    size='sm'
                    c='light-dark(var(--mantine-color-dark-3), var(--mantine-color-gray-4))'
                  >
                    Accessions
                  </Text>
                </Skeleton>
              </Group>
            </Grid.Col>
            <Grid.Col span={6}>
              <Group gap='xs'>
                <Skeleton width={34} height={34} circle visible={loading}>
                  <ThemeIcon variant='light' size='sm' p='md' radius='xl'>
                    <Text fw='bold' size='xs'>
                      {getAbbreviatedNumber(totalTrials || 0)}
                    </Text>
                  </ThemeIcon>
                </Skeleton>
                <Skeleton visible={loading} maw={50}>
                  <Text
                    size='sm'
                    c='light-dark(var(--mantine-color-dark-3), var(--mantine-color-gray-4))'
                  >
                    Trials
                  </Text>
                </Skeleton>
              </Group>
            </Grid.Col>
          </Grid>
        </Box>
      </UnstyledButton>
    </Link>
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

function Summaries({ ...props }: GridProps) {
  const { data } = useGQLQuery<{ data: { [key: string]: EventSearchResult } }>(
    QUERY_SEEDBANK_SUMMARY_ALL,
  );

  return (
    <Grid gutter='xl' {...props}>
      {gqlQueries.PRED_DATA_RESOURCE.values?.map((dataResource) => (
        <Grid.Col key={dataResource as string} span={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
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
