import { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Paper,
  Text,
  ThemeIcon,
  UnstyledButton,
  UnstyledButtonProps,
} from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import { useParams } from 'react-router-dom';

// AVH logo
import avhLogo from '#/assets/avh-logo-white.png';

interface HerbariumLinkProps extends UnstyledButtonProps {
  voucher: string;
}

function HerbariumLink({ voucher, ...rest }: HerbariumLinkProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const { guid } = useParams();

  useEffect(() => {
    async function getAccession() {
      // Split the voucher into parts
      const catalogCode = voucher.substring(0, voucher.indexOf(' ')).toUpperCase();
      const catalogNumber = voucher.substring(
        voucher.indexOf(' ') + 1,
        voucher.lastIndexOf('.') > 0 ? voucher.lastIndexOf('.') : undefined,
      );

      // Construct API request params
      const params = new URLSearchParams({
        q: `catalogue_number:${catalogCode} "${catalogNumber}"`,
        qc: 'data_hub_uid:dh9',
        fq: `lsid:${guid}`,
        disableAllQualityFilters: 'true',
      });

      const data = await fetch(
        `${import.meta.env.VITE_API_ALA}/occurrences/occurrences/search?${params.toString()}`,
      );

      if (data.ok) {
        const { totalRecords, occurrences } = await data.json();
        if (totalRecords > 0) setUuid(occurrences[0].uuid);
      } else {
        setError(true);
      }

      setLoading(false);
    }

    if (guid) getAccession();
  }, [voucher, guid]);

  // Don't render anything if no taxon ID is supplied
  if (!guid) return null;

  return (
    <UnstyledButton
      {...rest}
      component='a'
      href={uuid ? `https://avh.ala.org.au/occurrences/${uuid}` : undefined}
      target='_blank'
      style={{
        opacity: loading || !uuid ? 0.4 : 1,
        cursor: loading || !uuid ? 'default' : 'pointer',
      }}
    >
      <Paper display='flex' withBorder>
        <ThemeIcon variant='gradient' size={66} gradient={{ from: '#A6CE39', to: '#487759' }}>
          <Image width={25} src={avhLogo} alt='Australian Virtual Herbarium logo' />
        </ThemeIcon>
        <Box w='100%' p='xs' ml='xs'>
          <Box display='flex'>
            <Text size='sm' mr='auto' lineClamp={1}>
              Australasian Virtual Herbarium
            </Text>
            <IconExternalLink style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }} />
          </Box>
          <Text color='dimmed' size='xs' mt={4} lineClamp={1}>
            {(() => {
              if (loading) return 'Finding specimen';
              if (error) return 'An error occurred';
              return !uuid ? 'No specimen found' : 'View related herbarium specimen';
            })()}
          </Text>
        </Box>
      </Paper>
    </UnstyledButton>
  );
}

export default HerbariumLink;
