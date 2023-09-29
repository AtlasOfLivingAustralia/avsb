import { Suspense, lazy } from 'react';
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
  Skeleton,
  Chip,
  Card,
  Center,
  ActionIcon,
} from '@mantine/core';
import {
  IconArrowBackUp,
  IconArrowUpRight,
  IconChevronDown,
  IconChevronUp,
  IconHandStop,
  IconInfoCircle,
  IconLeaf,
  IconLocation,
  IconMap2,
  IconMapPin,
  IconMapPinOff,
  IconPackage,
  IconTimelineEvent,
} from '@tabler/icons';
import {
  Await,
  Link,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from 'react-router-dom';

// Project imports
import {
  SDSResult,
  Event,
  SeedBankAccession,
  AusTraitsSummary,
  NumericTrait,
  CategoricalTrait,
} from '#/api';
import { getIsDefined, accessionFields, SeedbankFieldTrait } from '#/helpers';

// Local imports
import Contact from '../Contact';
import HerbariumLink from './components/HerbariumLink';
import IconText from '../IconText';
import MeasurementCard from '../MeasurementCard';
import TrialSummary from './components/TrialSummary';

import { fields, longFields } from './fields';
import FieldTooltip from '../FieldTooltip';
import SDS from '../SDS';

const Map = lazy(() => import('../Map'));

const missingData = 'Not Available';
const missingDataField = (
  <Text size='sm' weight='bold' color='dimmed'>
    {missingData}
  </Text>
);

interface AusTraitsFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promise: any;
  trait?: SeedbankFieldTrait;
}

function AusTraitsFieldInner({ trait }: { trait: SeedbankFieldTrait }) {
  const { numeric_traits: numericTraits, categorical_traits: categoricalTraits } =
    useAsyncValue() as AusTraitsSummary;

  let data: NumericTrait | CategoricalTrait | undefined;
  let value;

  // If the trait is numeric, search the numeric_traits array
  if (trait.type === 'numeric') {
    data = numericTraits.find(({ trait_name: traitName }) => traitName === trait.name) as
      | NumericTrait
      | undefined;
    value = data ? `${data.mean}${data.unit} (${data.min}-${data.max})` : null;

    // Otherwise search the categorical_traits array
  } else if (trait.type === 'categorical') {
    data = categoricalTraits.find(({ trait_name: traitName }) => traitName === trait.name) as
      | CategoricalTrait
      | undefined;
    value = data ? data.trait_values : null;
  }

  return value ? (
    <Group spacing='xs'>
      <ActionIcon
        onClick={() => {
          window.open(data?.definition, '_blank');
        }}
        radius='sm'
        size='sm'
        color='gray'
        variant='filled'
      >
        <IconLeaf size='0.7rem' />
      </ActionIcon>
      <Text size='sm' weight='bold'>
        {value}
      </Text>
    </Group>
  ) : (
    missingDataField
  );
}

function AusTraitsField({ promise, trait }: AusTraitsFieldProps) {
  if (trait) {
    return (
      <Suspense fallback={<Skeleton width='50%'>{missingDataField}</Skeleton>}>
        <Await resolve={promise}>
          <AusTraitsFieldInner trait={trait} />
        </Await>
      </Suspense>
    );
  }

  return missingDataField;
}

interface AccessionPanelLoader {
  accessionEvent: Event;
  trialEvents: Event[];
}

interface RouteLoaderProps {
  sds: SDSResult;
  traits: AusTraitsSummary;
}

function AccessionPanel() {
  const { accessionEvent, trialEvents } = useLoaderData() as AccessionPanelLoader;
  const { sds, traits } = useRouteLoaderData('taxon') as RouteLoaderProps;
  const accession = accessionEvent?.extensions?.seedbank as SeedBankAccession;
  const navigate = useNavigate();

  const taxonInfo = accessionEvent.distinctTaxa?.[0];
  const hasCoordinates = accessionEvent.decimalLatitude && accessionEvent.decimalLongitude;

  return (
    <Grid gutter='xl' pb='xl'>
      {accessionEvent && (
        <Grid.Col span={12}>
          <Paper p='sm' mb='lg' withBorder>
            <Group position='apart'>
              <Group spacing='md'>
                <Breadcrumbs>
                  <Anchor weight='bold' size='sm' component={Link} to='..'>
                    Accessions
                  </Anchor>
                  <Text weight='bold' size='sm'>
                    {accession?.accessionNumber || accessionEvent.eventID}
                  </Text>
                </Breadcrumbs>
                <Chip
                  size='xs'
                  mb={2}
                  checked={false}
                  onClick={() =>
                    navigate(`/taxon/${encodeURIComponent(taxonInfo?.key || '')}/accessions`)
                  }
                >
                  {taxonInfo?.scientificName || taxonInfo?.species}
                  <IconArrowUpRight style={{ marginLeft: 4 }} size='1rem' />
                </Chip>
              </Group>
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
            .map(({ key, label, description, examples, unit, icon: Icon }) => (
              <Grid.Col key={key} xs={6} sm={4} md={3} lg={3} xl={2}>
                <FieldTooltip {...{ label, description, examples, Icon }}>
                  <Group>
                    <ThemeIcon variant='light' size='xl' radius='xl'>
                      <Icon />
                    </ThemeIcon>
                    <Box>
                      <Text color='dimmed' size='xs'>
                        {label}
                      </Text>
                      {getIsDefined(accession?.[key]) ? (
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
                </FieldTooltip>
              </Grid.Col>
            ))}
        </Grid>
        <Grid gutter='xs' p='sm' mt='md'>
          {longFields
            .map((key) => ({ key, ...accessionFields[key] }))
            .map(({ key, label, description, examples, trait, icon: Icon }) => (
              <Grid.Col key={key} xs={12} sm={6} md={4} lg={4} xl={3}>
                <FieldTooltip {...{ label, description, examples, trait, Icon }}>
                  <Box>
                    <Text color='dimmed' size='xs'>
                      {label}
                    </Text>
                    {getIsDefined(accession?.[key]) ? (
                      <Text size='sm' weight='bold'>
                        {accession?.[key]}
                      </Text>
                    ) : (
                      <AusTraitsField trait={trait} promise={traits} />
                    )}
                  </Box>
                </FieldTooltip>
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
        <Card h='100%' p={0} shadow='lg' withBorder>
          {accessionEvent.decimalLatitude && accessionEvent.decimalLongitude && (
            <Suspense fallback={<Skeleton w='100%' h={350} />}>
              <Map
                width='100%'
                height={350}
                center={[accessionEvent.decimalLongitude, accessionEvent.decimalLatitude]}
              />
            </Suspense>
          )}
          {!hasCoordinates && (
            <Box
              p='lg'
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
              })}
            >
              {sds.instances.length > 0 ? (
                <SDS instances={sds.instances} />
              ) : (
                <Center w='100%'>
                  <Stack w='100%' align='center' spacing='xl'>
                    <ThemeIcon size={100} variant='light' radius={50}>
                      <IconMapPinOff size='2.5rem' />
                    </ThemeIcon>
                    <Stack spacing='xs' align='center'>
                      <Title order={3} mb='xs'>
                        Missing Coordinates
                      </Title>
                      <Text size='0.9rem' color='dimmed' align='center' maw={525}>
                        No coordinate data has been supplied for this record
                      </Text>
                    </Stack>
                  </Stack>
                </Center>
              )}
            </Box>
          )}
          <Stack spacing='xs' p='md'>
            {hasCoordinates && (
              <Alert mb='xs' icon={<IconInfoCircle />}>
                This map shows the seed <b>collection</b> location
              </Alert>
            )}
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
        </Card>
      </Grid.Col>
      <Grid.Col sm={4} md={4} lg={4}>
        <Card shadow='lg' style={{ display: 'flex', flexDirection: 'column' }} h='100%' withBorder>
          <Group spacing='md' mb='xl'>
            <IconTimelineEvent size='1.5rem' />
            <Text size='xl' sx={(theme) => ({ fontFamily: theme.headings.fontFamily })}>
              Collection Timeline
            </Text>
          </Group>
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
            {accession?.herbariumVoucher && <HerbariumLink voucher={accession.herbariumVoucher} />}
          </Stack>
        </Card>
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
