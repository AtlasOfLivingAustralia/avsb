import {
  Text,
  Group,
  HoverCard,
  Stack,
  useMantineTheme,
  BoxProps,
  UnstyledButton,
} from '@mantine/core';
import { IconQuestionCircle } from '@tabler/icons';

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
};

interface PageSummaryProps extends BoxProps {
  currentPage: string;
}

function PageSummary({ currentPage, ...rest }: PageSummaryProps) {
  const theme = useMantineTheme();

  return (
    <HoverCard width={350} position='left' withArrow offset={12}>
      <HoverCard.Target>
        <UnstyledButton style={{ display: 'flex', justifyContent: 'flex-end' }} {...rest}>
          <Group spacing='xs' pr='md'>
            <IconQuestionCircle
              color={theme.colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[4]}
            />
            <Text
              sx={{
                color: theme.colorScheme === 'dark' ? theme.colors.blue[2] : theme.colors.blue[4],
                textDecoration: 'underline',
                textUnderlineOffset: 2,
                textDecorationColor:
                  theme.colorScheme === 'dark'
                    ? 'rgba(165, 216, 255, 0.25)'
                    : 'rgba(34, 139, 230, 0.25)',
                textTransform: 'capitalize',
              }}
              size='xs'
              weight='bold'
            >
              {currentPage} Page
            </Text>
          </Group>
        </UnstyledButton>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Stack spacing='sm'>
          {summaries[currentPage].map((summary) => (
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
