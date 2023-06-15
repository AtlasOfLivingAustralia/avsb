import { CSSProperties } from 'react';
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Group,
  PaperProps,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

import { useGQLQuery } from '#/api';
import { Contact as ContactType } from '#/api/graphql/types';
import { getInitials } from '#/helpers';
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

const contactItemStyle: CSSProperties = {
  marginRight: 12,
  minWidth: 24,
  minHeight: 24,
};

interface ContactProps extends PaperProps {
  dataResource: string;
}

function Contact({ dataResource, ...rest }: ContactProps) {
  const location = useLocation();
  const { data: response } = useGQLQuery<DatasetQuery>(queries.QUERY_DATASET, {
    key: dataResource,
  });
  const dataset = response?.data?.eventSearch?.documents?.results[0]?.dataset;
  const contact = dataset?.value?.contact?.[0];

  return (
    <Card {...rest} shadow='lg' withBorder>
      <Group position='apart'>
        <Group>
          <Skeleton height={50} circle visible={!contact}>
            <Avatar size={50} radius='xl'>
              {contact?.individualName
                ? `${contact.individualName[0].givenName?.[0].charAt(
                    0,
                  )}${contact.individualName[0].surName?.[0].charAt(0)}`
                : getInitials(contact?.organizationName?.[0] || '', 3)}
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
            View Seed Bank
          </Button>
        )}
      </Group>
    </Card>
  );
}

export default Contact;
