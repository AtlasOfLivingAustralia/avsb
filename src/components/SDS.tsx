import { SDSInstance } from '#/api';
import { Anchor, Center, Chip, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconAlertTriangle, IconExternalLink } from '@tabler/icons';
import { Link } from 'react-router-dom';

// Project imports
import { getInitials, speciesListLastUpdated } from '#/helpers';
import ConservationStatus from './ConservationStatus';

interface SDSProps {
  instances: SDSInstance[];
}

function SDS({ instances }: SDSProps) {
  return (
    <Center pt='xl'>
      <Stack pt='xl' align='center' spacing='xl'>
        <ThemeIcon size={120} color='yellow' variant='light' radius={60}>
          <IconAlertTriangle size='3rem' />
        </ThemeIcon>
        <Stack spacing='xs' align='center'>
          <Title order={2} mb='sm'>
            Sensitive Species
          </Title>
          <Text color='dimmed' align='center' maw={525}>
            We&apos;ve withheld records for this taxon due to their sensitive nature. If you wish to
            request these records, please&nbsp;
            <Anchor href='mailto:info@seedpartnership.org.au'>enquire here</Anchor>, or{' '}
            <Anchor component={Link} to='/help'>
              see our FAQs <IconExternalLink size='0.8rem' />
            </Anchor>{' '}
            for more information.
          </Text>
        </Stack>
        <Chip size='xs' checked={false} disabled>
          Dataset species list updated {speciesListLastUpdated}
        </Chip>
        {instances.length > 0 && (
          <Paper mt='sm' withBorder px='sm' py='xs'>
            <Stack spacing='xs' align='center'>
              {instances.map(({ authority, zone, category }) => (
                <ConservationStatus
                  key={authority}
                  place={zone.name}
                  initials={getInitials(zone.name)}
                  status={category.value}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Center>
  );
}

export default SDS;
