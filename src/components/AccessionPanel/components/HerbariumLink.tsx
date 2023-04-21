import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons';
import { useParams } from 'react-router-dom';

interface ContactProps {
  accession: string;
  taxon?: string;
}

function HerbariumLink({ accession, taxon }: ContactProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const { guid } = useParams();

  useEffect(() => {
    async function getAccession(taxonID: string) {
      // Split the accession number into parts
      const catalogCode = accession.substring(0, accession.indexOf(' ')).toUpperCase();
      const catalogNumber = accession.substring(
        accession.indexOf(' ') + 1,
        accession.lastIndexOf('.') > 0 ? accession.lastIndexOf('.') : undefined,
      );

      // Construct API request params
      const params = new URLSearchParams({
        q: `catalogue_number:${catalogCode} "${catalogNumber}"`,
        qc: 'data_hub_uid:dh9',
        fq: `lsid:${taxonID}`,
        disableAllQualityFilters: 'true',
      });

      const data = await fetch(
        `${import.meta.env.VITE_API_BIOCACHE}/occurrences/search?${params.toString()}`,
      );

      if (data.ok) {
        const { totalRecords, occurrences } = await data.json();
        if (totalRecords > 0) setUuid(occurrences[0].uuid);
      } else {
        setError(true);
      }

      setLoading(false);
    }

    const taxonID = taxon || guid;
    if (taxonID) getAccession(taxonID);
  }, [accession, taxon, guid]);

  // Don't render anything if no taxon ID is supplied
  if (!(taxon || guid)) return null;

  return (
    <Button
      component='a'
      target='_blank'
      fullWidth
      href={`https://avh.ala.org.au/occurrences/${uuid}`}
      leftIcon={<IconExternalLink size='1.1rem' />}
      loading={loading}
      disabled={error || !uuid}
      variant='outline'
    >
      {(() => {
        if (error) return 'An error occurred';
        if (!loading && !uuid) return 'AVH specimen not found';
        return 'View AVH Specimen';
      })()}
    </Button>
  );
}

export default HerbariumLink;
