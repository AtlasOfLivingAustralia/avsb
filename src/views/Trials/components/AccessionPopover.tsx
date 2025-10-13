import { Event, SeedBankAccession } from '#/api';
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
} from '@mantine/core';
import { IconExternalLink, IconHandStop, IconMapPin, IconPackage } from '@tabler/icons';
import { Link } from 'react-router';

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
                'light-dark(rgba(34, 139, 230, 0.25), rgba(165, 216, 255, 0.25))',
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
        <Stack gap={6} pt='sm'>
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
                  <Text size='xs' fw='bold' mr='xs'>
                    {label}
                  </Text>
                  <Text size='xs' c={accession?.[key] ? undefined : 'dimmed'}>
                    {accession?.[key] ? `${accession[key]}${unit || ''}` : 'Not Supplied'}
                  </Text>
                </Box>
              </Box>
            ))}
          <Divider my={6} />
          <Stack px='sm' style={{ textAlign: 'left' }} gap={6}>
            <Group gap='xs'>
              <IconMapPin size='0.8rem' />
              <Text size='xs' fw='bold'>
                Locality
              </Text>
            </Group>
            <Text size='xs' c='dimmed'>
              {parentEvent?.locality || 'No locality data'}
            </Text>
          </Stack>
          <Divider my={6} />
          <Box px='sm' pb='sm'>
            <Timeline bulletSize={28}>
              <Timeline.Item bullet={<IconHandStop size={18} />}>
                <Text size='xs' fw='bold'>
                  Seed Collected
                </Text>
                <Text c='dimmed' size='xs'>
                  {accession?.dateCollected
                    ? new Date(accession.dateCollected).toLocaleDateString()
                    : 'No collection date'}
                </Text>
              </Timeline.Item>
              <Timeline.Item bullet={<IconPackage size={18} />}>
                <Text size='xs' fw='bold'>
                  Seed In Storage
                </Text>
                <Text c='dimmed' size='xs'>
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
          rightSection={<IconExternalLink size='1rem' />}
        >
          Go to {accession?.accessionNumber || parentEvent?.eventID || 'accession'}
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
}

export default AccessionPopover;
