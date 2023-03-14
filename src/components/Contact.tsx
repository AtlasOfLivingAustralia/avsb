import { CSSProperties } from 'react';
import {
  Anchor,
  Avatar,
  Badge,
  Group,
  Paper,
  PaperProps,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { IconMail, IconPhone, IconMapPin, IconBuilding } from '@tabler/icons';
import { useGQLQuery } from '#/api';
import { Contact as ContactType } from '#/api/graphql/types';
import queries from '#/api/queries';

interface DatasetQuery {
  data?: {
    eventSearch: {
      documents: {
        results: [
          {
            dataset: {
              value: {
                title: string;
                contact: [ContactType];
              };
            };
          },
        ];
      };
    };
  };
}

// Helper function to get the initials of an organisation string
const getOrgInitials = (org: string) =>
  org
    .split(' ')
    .map((part) => part.charAt(0))
    .filter((part) => part === part.toUpperCase())
    .slice(0, 3)
    .join('');

const contactItemStyle: CSSProperties = {
  marginRight: 12,
  minWidth: 24,
  minHeight: 24,
};

interface ContactProps extends PaperProps {
  dataResource: string;
}

function Contact({ dataResource, ...rest }: ContactProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: response } = useGQLQuery<DatasetQuery>(queries.QUERY_DATASET, {
    key: dataResource,
  });
  const dataset = response?.data?.eventSearch?.documents?.results[0]?.dataset;
  const contact = dataset?.value?.contact?.[0];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Paper {...rest} withBorder p='md'>
      <Group align='flex-start'>
        <Skeleton height={55} circle visible={!contact}>
          <Avatar size={55} radius='xl'>
            {contact?.individualName
              ? `${contact.individualName[0].givenName?.[0].charAt(
                  0,
                )}${contact.individualName[0].surName?.[0].charAt(0)}`
              : getOrgInitials(contact?.organizationName?.[0] || '')}
          </Avatar>
        </Skeleton>
        <Stack spacing={6}>
          <Skeleton visible={!contact}>
            <Group spacing='xs'>
              <Text weight='bold' size='lg'>
                {(contact?.individualName
                  ? `${contact?.individualName?.[0]?.givenName?.[0]} ${contact.individualName[0].surName?.[0]}`
                  : contact?.organizationName?.[0]) || 'Name Here'}
              </Text>
              {/* {contact?.positionName && <Badge radius='sm'>{contact.positionName[0]}</Badge>} */}
            </Group>
          </Skeleton>
          <Stack spacing={8}>
            {contact?.electronicMailAddress && (
              <Anchor
                style={{ display: 'flex', alignItems: 'center' }}
                size='sm'
                href={`mailto:${contact.electronicMailAddress[0].replace(' ', '')}`}
              >
                <IconMail style={contactItemStyle} />
                {contact?.electronicMailAddress[0]}
              </Anchor>
            )}
            {contact?.phone && (
              <Anchor
                style={{ display: 'flex', alignItems: 'center' }}
                size='sm'
                href={`tel:${contact.phone[0].replace(' ', '')}`}
              >
                <IconPhone style={contactItemStyle} />
                {contact?.phone[0]}
              </Anchor>
            )}
            {contact?.address && (
              <Text style={{ display: 'flex', alignItems: 'center' }} size='sm'>
                <IconMapPin style={contactItemStyle} />
                {[
                  contact.address[0].deliveryPoint?.[0],
                  contact.address[0].city?.[0],
                  contact.address[0].administrativeArea?.[0],
                  contact.address[0].postalCode?.[0],
                ]
                  .filter((part) => part !== null)
                  .join(', ')}
              </Text>
            )}
            {/* <Skeleton visible={!dataset}>
              <Text style={{ display: 'flex', alignItems: 'center' }} size='sm'>
                <IconBuilding style={contactItemStyle} />
                {dataset?.value?.title}
              </Text>
            </Skeleton> */}
            {!contact && (
              <Skeleton>
                <Text style={{ display: 'flex', alignItems: 'center' }} size='sm'>
                  <IconMapPin style={contactItemStyle} />
                  Contact information here
                </Text>
              </Skeleton>
            )}
          </Stack>
        </Stack>
      </Group>
    </Paper>
  );
}

export default Contact;
