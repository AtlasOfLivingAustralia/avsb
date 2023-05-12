import {
  Box,
  Paper,
  Grid,
  Group,
  Text,
  ThemeIcon,
  Timeline,
  Stack,
  Breadcrumbs,
  Anchor,
  Button,
  Title,
  Spoiler,
  Divider,
  Alert,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconChevronDown,
  IconChevronUp,
  IconHandStop,
  IconInfoCircle,
  IconLocation,
  IconMap2,
  IconMapPin,
  IconPackage,
} from '@tabler/icons';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

// Project imports
import { Event, SeedBankAccession } from '#/api/graphql/types';
import { accessionFields } from '#/helpers/fields';
import { getIsPresent } from '#/helpers';

// Local imports
import Contact from '../Contact';
import HerbariumLink from './components/HerbariumLink';
import Map from '../Map';
import IconText from '../IconText';
import MeasurementCard from '../MeasurementCard';
import TrialSummary from './components/TrialSummary';

import { fields, longFields } from './fields';

interface AccessionPanelProps {
  taxon?: string;
}

const missingData = 'Not Supplied';

interface AccessionPanelLoader {
  accessionEvent: Event;
  trialEvents: Event[];
}

function AccessionPanel({ taxon }: AccessionPanelProps) {
  const { accessionEvent, trialEvents } = useLoaderData() as AccessionPanelLoader;
  const accession = accessionEvent?.extensions?.seedbank as SeedBankAccession;
  const navigate = useNavigate();

  // if (!accession && !event)
  //   throw new Error('Tried to render an AccessionPanel without accession data');

  return (
    <Grid gutter='xl' pb='xl'>
      {accessionEvent && (
        <Grid.Col span={12}>
          <Paper p='sm' mb='lg' withBorder>
            <Group position='apart'>
              <Breadcrumbs>
                <Anchor weight='bold' size='sm' component={Link} to='..'>
                  Accessions
                </Anchor>
                <Text weight='bold' size='sm'>
                  {accession?.accessionNumber || 'Unknown'}
                </Text>
              </Breadcrumbs>
              <Button
                variant='subtle'
                size='xs'
                onClick={() => navigate(-1)}
                leftIcon={<IconArrowBackUp size={16} />}
              >
                Go Back
              </Button>
            </Group>
          </Paper>
        </Grid.Col>
      )}
      <Grid.Col span={12}>
        <Grid gutter='xl'>
          {fields
            .map((key) => ({ key, ...accessionFields[key] }))
            .map(({ key, label, unit, icon: Icon }) => (
              <Grid.Col key={key} xs={6} sm={4} md={3} lg={3} xl={2}>
                <Group>
                  <ThemeIcon variant='light' size='xl' radius='xl'>
                    <Icon />
                  </ThemeIcon>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {label}
                    </Text>
                    {getIsPresent(accession?.[key]) ? (
                      <Text size='xl' weight='bold'>
                        {accession?.[key]}
                        {unit && unit}
                      </Text>
                    ) : (
                      <Text size='xl' weight='bold' color='dimmed'>
                        {missingData}
                      </Text>
                    )}
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
        <Grid gutter='xs' p='sm' mt='md'>
          {longFields
            .map((key) => ({ key, ...accessionFields[key] }))
            .map(({ key, label }) => (
              <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
                <Group>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {label}
                    </Text>
                    {getIsPresent(accession?.[key]) ? (
                      <Text size='sm' weight='bold'>
                        {accession?.[key]}
                      </Text>
                    ) : (
                      <Text size='sm' weight='bold' color='dimmed'>
                        {missingData}
                      </Text>
                    )}
                  </Box>
                </Group>
              </Grid.Col>
            ))}
        </Grid>
      </Grid.Col>
      {(accessionEvent.measurementOrFacts?.length || 0) > 0 && (
        <Grid.Col span={12}>
          <Title order={4}>Additional Data</Title>
          <Spoiler
            maxHeight={90}
            hideLabel={
              <Divider
                label={
                  <>
                    <IconChevronUp size={14} />
                    <Box ml={5}>Show Less</Box>
                  </>
                }
                labelPosition='center'
              />
            }
            showLabel={
              <Divider
                label={
                  <>
                    <IconChevronDown size={14} />
                    <Box ml={5}>Show More</Box>
                  </>
                }
                labelPosition='center'
              />
            }
            styles={{
              control: {
                width: '100%',
              },
            }}
          >
            <Group mt='md' pb='sm'>
              {accessionEvent?.measurementOrFacts?.map((mof) => (
                <MeasurementCard key={mof.measurementID} measurement={mof} />
              ))}
            </Group>
          </Spoiler>
        </Grid.Col>
      )}
      <Grid.Col sm={8} md={8} lg={8}>
        <Paper h='100%' withBorder>
          {accessionEvent.decimalLatitude && accessionEvent.decimalLongitude && (
            <Map
              width='100%'
              height={350}
              center={[accessionEvent.decimalLongitude, accessionEvent.decimalLatitude]}
            />
          )}
          <Stack spacing='xs' p='md'>
            <Alert icon={<IconInfoCircle />} mb='sm'>
              {accessionEvent.decimalLatitude && accessionEvent.decimalLongitude ? (
                <>
                  This map shows the seed <b>collection</b> location
                </>
              ) : (
                'No locality data supplied'
              )}
            </Alert>
            <IconText labelWidth={120} title='Locality' icon={IconLocation}>
              {accessionEvent.locality || missingData}
            </IconText>
            <IconText labelWidth={120} title='Decimal Lat' icon={IconMapPin}>
              {accessionEvent.decimalLatitude || missingData}
            </IconText>
            <IconText labelWidth={120} title='Decimal Lng' icon={IconMapPin}>
              {accessionEvent.decimalLongitude || missingData}
            </IconText>
            <IconText labelWidth={120} title='State Province' icon={IconMap2}>
              {accessionEvent.stateProvince || missingData}
            </IconText>
          </Stack>
        </Paper>
      </Grid.Col>
      <Grid.Col sm={4} md={4} lg={4}>
        <Paper p='md' h='100%' withBorder>
          <Stack justify='space-between' h='100%'>
            <Timeline bulletSize={28}>
              <Timeline.Item bullet={<IconHandStop size={18} />}>
                <Text>Seed Collected</Text>
                <Text color='dimmed' size='xs'>
                  {accession?.dateCollected
                    ? new Date(accession.dateCollected).toLocaleDateString()
                    : missingData}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPackage size={18} />}>
                <Text>Seed In Storage</Text>
                <Text color='dimmed' size='xs'>
                  {accession?.dateInStorage
                    ? new Date(accession.dateInStorage).toLocaleDateString()
                    : missingData}
                </Text>
              </Timeline.Item>
            </Timeline>
            {accession?.accessionNumber && (
              <HerbariumLink accession={accession.accessionNumber} taxon={taxon} />
            )}
          </Stack>
        </Paper>
      </Grid.Col>
      {accessionEvent.datasetKey && (
        <Grid.Col span={12}>
          <Contact dataResource={accessionEvent.datasetKey} />
        </Grid.Col>
      )}
      {accessionEvent.eventID && (
        <Grid.Col span={12}>
          <Text size='lg' mb='md' sx={(theme) => ({ fontFamily: theme.headings.fontFamily })}>
            Related Trials
          </Text>
          <TrialSummary trials={trialEvents} />
        </Grid.Col>
      )}
    </Grid>
  );
}

export default AccessionPanel;
