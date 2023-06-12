import { SDSInstance } from '#/api';
import { Anchor, Center, Divider, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconAlertTriangle, IconExternalLink } from '@tabler/icons';
import { Link } from 'react-router-dom';

// Project imports
import { getInitials } from '#/helpers';
import ConservationStatus from './ConservationStatus';

interface SDSProps {
  instances: SDSInstance[];
}

function SDS({ instances }: SDSProps) {
  return (
    <Center>
      <Stack w='100%' align='center' spacing='xl'>
        <ThemeIcon size={100} color='yellow' variant='light' radius={50}>
          <IconAlertTriangle size='2.5rem' />
        </ThemeIcon>
        <Stack spacing='xs' align='center'>
          <Title order={3} mb='xs'>
            Sensitive Species
          </Title>
          <Text size='0.9rem' color='dimmed' align='center' maw={525}>
            We&apos;ve withheld location data for this taxon due to its sensitive nature. If you
            wish to request this data, please&nbsp;
            <Anchor href='mailto:info@seedpartnership.org.au'>enquire here</Anchor>, or{' '}
            <Anchor component={Link} to='/help'>
              see our FAQs <IconExternalLink size='0.8rem' />
            </Anchor>{' '}
            for more information.
          </Text>
        </Stack>
        <Divider w='100%' mt='sm' />
        {instances.length > 0 && (
          <Stack spacing='xs'>
            {instances.map(({ authority, zone, category }) => (
              <ConservationStatus
                key={authority}
                place={zone.name}
                initials={getInitials(zone.name)}
                status={category.value}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Center>
  );
}

export default SDS;
