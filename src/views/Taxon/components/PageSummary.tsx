import { BoxProps, Flex, HoverCard, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconEyeQuestion } from '@tabler/icons-react';

const summaries: { [key: string]: string[] } = {
  summary: [
    'Below you can view information about this taxon, including its taxonomy and locations where seed was collected.',
  ],
  accessions: [
    'Below shows seed accession data for your chosen taxon. You can click on a table row to expand it, or click the details button to see all information about the accession.',
    'Filters are also available to aid in your search.',
  ],
  trials: [
    'Below shows seed trial data for your chosen taxon. You can click on a table row to expand it and see treatment information.',
    'Filters are also available to aid in your search.',
  ],
  media: [
    'Below shows related media for your chosen taxon. Click on an image to see a larger variant & its associated metadata.',
    'Filters are also available to aid in your search.',
  ],
  sequences: [
    'Below are sequences for your chosen taxon, retrieved from GenBank. Click on a card to be redirected to GenBank.',
    "'View all records' redirects to the full list of search results.",
  ],
  traits: ['Below is plant trait information that has been supplied by AusTraits'],
};

interface PageSummaryProps extends BoxProps {
  currentPage: string;
}

function PageSummary({ currentPage, ...rest }: PageSummaryProps) {
  return (
    <HoverCard width={350} position='left' withArrow offset={12}>
      <HoverCard.Target>
        <UnstyledButton style={{ display: 'flex', cursor: 'help' }} {...rest}>
          <Flex gap='xs' align='center'>
            <IconEyeQuestion color='light-dark(var(--mantine-color-blue-4), var(--mantine-color-blue-2))' />
            <Text
              style={{
                color: 'light-dark(var(--mantine-color-blue-4), var(--mantine-color-blue-2))',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
                textDecorationColor:
                  'light-dark(rgba(34, 139, 230, 0.25), rgba(165, 216, 255, 0.25))',
                textTransform: 'capitalize',
              }}
              size='xs'
              fw='bold'
            >
              {currentPage} Page
            </Text>
          </Flex>
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Stack gap='sm'>
          {summaries[currentPage]?.map((summary) => (
            <Text key={summary} size='sm'>
              {summary}
            </Text>
          ))}
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  );
}

export default PageSummary;
