import { PropsWithChildren, ReactElement } from 'react';
import { Anchor, Avatar, Badge, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons';
import { useGQLQuery } from '#/api';
import queries from '#/api/queries';

const getOrgInitials = (org: string) =>
  org
    .split(' ')
    .map((part) => part.charAt(0))
    .filter((part) => part === part.toUpperCase())
    .slice(0, 3)
    .join('');

interface ContactItemProps {
  icon: ReactElement;
}

function ContactItem({ icon, children }: PropsWithChildren<ContactItemProps>) {
  return (
    <Group spacing='xs'>
      {icon}
      {children}
    </Group>
  );
}

interface ContactProps {
  dataResource: string;
}

function Contact({ dataResource }: ContactProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: dataRaw } = useGQLQuery<any>(queries.QUERY_DATASET, { key: dataResource });
  const contact = dataRaw?.data?.eventSearch?.documents?.results?.[0]?.dataset?.value?.contact?.[0];

  return (
    <Paper withBorder p='md'>
      <Group align='flex-start'>
        <Skeleton height={55} circle visible={!contact}>
          <Avatar size={55} radius='xl'>
            {contact?.individualName
              ? `${contact?.individualName?.[0].givenName[0].charAt(
                  0,
                )}${contact?.individualName?.[0].surName[0].charAt(0)}`
              : getOrgInitials(contact?.organizationName?.[0] || '')}
          </Avatar>
        </Skeleton>
        <Stack spacing={6}>
          <Skeleton visible={!contact}>
            <Group spacing='xs'>
              <Text weight='bold' size='lg'>
                {(contact?.individualName
                  ? `${contact?.individualName?.[0].givenName[0]} ${contact?.individualName?.[0].surName[0]}`
                  : contact?.organizationName[0]) || 'Name Here'}
              </Text>
              {contact?.positionName && <Badge radius='sm'>{contact.positionName[0]}</Badge>}
            </Group>
          </Skeleton>
          <Skeleton visible={!contact}>
            <Stack spacing={6}>
              {contact?.phone && (
                <ContactItem icon={<IconPhone />}>
                  <Anchor size='sm' href={`tel:${contact?.phone[0].replace(' ', '')}`}>
                    {contact?.phone[0]}
                  </Anchor>
                </ContactItem>
              )}
              {contact?.electronicMailAddress && (
                <ContactItem icon={<IconMail />}>
                  <Anchor
                    size='sm'
                    href={`mailto:${contact?.electronicMailAddress[0].replace(' ', '')}`}
                  >
                    {contact?.electronicMailAddress[0]}
                  </Anchor>
                </ContactItem>
              )}
              {contact?.address && (
                <ContactItem icon={<IconMapPin />}>
                  <Text size='sm'>
                    {[
                      contact?.address[0].deliveryPoint[0],
                      contact?.address[0].city[0],
                      contact?.address[0].administrativeArea[0],
                      contact?.address[0].postalCode[0],
                    ]
                      .filter((part) => part !== null)
                      .join(', ')}
                  </Text>
                </ContactItem>
              )}
            </Stack>
          </Skeleton>
        </Stack>
      </Group>
    </Paper>
  );
}

export default Contact;
