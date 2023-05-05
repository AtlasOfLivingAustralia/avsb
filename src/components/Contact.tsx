import { CSSProperties } from 'react';
import {
  Anchor,
  Avatar,
  Button,
  Group,
  Paper,
  PaperProps,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

import { useGQLQuery } from '#/api';
import { Contact as ContactType } from '#/api/graphql/types';
import queries from '#/api/queries';

import IconText from './IconText';

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
  const location = useLocation();
  const { data: response } = useGQLQuery<DatasetQuery>(queries.QUERY_DATASET, {
    key: dataResource,
  });
  const dataset = response?.data?.eventSearch?.documents?.results[0]?.dataset;
  const contact = dataset?.value?.contact?.[0];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Paper {...rest} withBorder p='md'>
      <Group position='apart'>
        <Group>
          <Skeleton height={50} circle visible={!contact}>
            <Avatar size={50} radius='xl'>
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
                <Text weight='bold' size='md'>
                  {(contact?.individualName
                    ? `${contact?.individualName?.[0]?.givenName?.[0]} ${contact.individualName[0].surName?.[0]}`
                    : contact?.organizationName?.[0]) || 'Name Here'}
                </Text>
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
                <IconText icon={IconMapPin}>
                  {[
                    contact.address[0].deliveryPoint?.[0],
                    contact.address[0].city?.[0],
                    contact.address[0].administrativeArea?.[0],
                    contact.address[0].postalCode?.[0],
                  ]
                    .filter((part) => part !== null)
                    .join(', ')}
                </IconText>
              )}
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
        {!location.pathname.includes('seedbank') && (
          <Button
            disabled={!contact}
            size='sm'
            component={Link}
            to={`/seedbank/${dataResource}`}
            variant='outline'
          >
            View Dataset
          </Button>
        )}
      </Group>
    </Paper>
  );
}

export default Contact;
