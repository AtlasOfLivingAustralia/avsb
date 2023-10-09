import {
  Box,
  Button,
  Divider,
  Group,
  Popover,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  useMantineTheme,
} from '@mantine/core';
import { IconExternalLink, IconHandStop, IconMapPin, IconPackage } from '@tabler/icons';
import { Event, SeedBankAccession } from '#/api';
import { Link } from 'react-router-dom';

import { allFields } from '#/helpers';

const fields: (keyof SeedBankAccession)[] = [
  'seedPerGram',
  'quantityCount',
  'quantityInGrams',
  'storageRelativeHumidityPercentage',
];

const slide = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(10%)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

interface AccessionPopoverProps {
  parentEvent?: Event | null;
}

function AccessionPopover({ parentEvent }: AccessionPopoverProps) {
  const theme = useMantineTheme();
  const accession = parentEvent?.extensions?.seedbank;

  return (
    <Popover
      width={325}
      position='left'
      withArrow
      transitionProps={{ transition: slide, duration: 200 }}
      shadow='lg'
    >
      <Popover.Target>
        <Button
          styles={{
            label: {
              textDecoration: 'underline',
              textUnderlineOffset: 2,
              textDecorationColor:
                theme.colorScheme === 'dark'
                  ? 'rgba(165, 216, 255, 0.25)'
                  : 'rgba(34, 139, 230, 0.25)',
            },
          }}
          disabled={!parentEvent}
          variant='subtle'
          size='xs'
          px='xs'
        >
          View Accession
        </Button>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Stack spacing={6} pt='sm'>
          {fields
            .map((key) => ({ key, ...allFields[key] }))
            .map(({ key, label, unit, icon: Icon }) => (
              <Box
                key={key}
                px='sm'
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'left',
                  flexGrow: 1,
                }}
              >
                <ThemeIcon size='sm' variant='light' mr='sm'>
                  <Icon size='0.8rem' />
                </ThemeIcon>
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexGrow: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  <Text size='xs' weight='bold' mr='xs'>
                    {label}
                  </Text>
                  <Text size='xs' color={accession?.[key] ? undefined : 'dimmed'}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {accession?.[key] ? `${accession[key]}${unit || ''}` : 'Not Supplied'}
                  </Text>
                </Box>
              </Box>
            ))}
          <Divider my={6} />
          <Stack px='sm' style={{ textAlign: 'left' }} spacing={6}>
            <Group spacing='xs'>
              <IconMapPin size='0.8rem' />
              <Text size='xs' weight='bold'>
                Locality
              </Text>
            </Group>
            <Text size='xs' color='dimmed'>
              {parentEvent?.locality || 'No locality data'}
            </Text>
          </Stack>
          <Divider my={6} />
          <Box px='sm' pb='sm'>
            <Timeline bulletSize={28}>
              <Timeline.Item bullet={<IconHandStop size={18} />}>
                <Text size='xs' weight='bold'>
                  Seed Collected
                </Text>
                <Text color='dimmed' size='xs'>
                  {accession?.dateCollected
                    ? new Date(accession.dateCollected).toLocaleDateString()
                    : 'No collection date'}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPackage size={18} />}>
                <Text size='xs' weight='bold'>
                  Seed In Storage
                </Text>
                <Text color='dimmed' size='xs'>
                  {accession?.dateInStorage
                    ? new Date(accession.dateInStorage).toLocaleDateString()
                    : 'No storage date'}
                </Text>
              </Timeline.Item>
            </Timeline>
          </Box>
        </Stack>
        <Button
          variant='filled'
          fullWidth
          size='xs'
          component={Link}
          to={`../accessions/${parentEvent?.eventID}`}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          rightIcon={<IconExternalLink size='1rem' />}
        >
          Go to {accession?.accessionNumber || parentEvent?.eventID || 'accession'}
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

export default AccessionPopover;
