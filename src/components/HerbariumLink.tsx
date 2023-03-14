import { useEffect } from 'react';
import { Text } from '@mantine/core';

interface ContactProps {
  accession: string;
  taxon: string;
}

function HerbariumLink({ accession, taxon }: ContactProps) {
  useEffect(() => {
    async function getAccession() {
      // Split the accession number into parts
      const catalogCode = accession.substring(0, accession.indexOf(' ')).toUpperCase();
      const catalogNumber = accession.substring(
        accession.indexOf(' ') + 1,
        accession.lastIndexOf('.'),
      );

      // Construct API request params
      const params = new URLSearchParams({
        q: `catalogue_number:${catalogCode} "${catalogNumber}"`,
        qc: 'data_hub_uid:dh9',
        fq: `lsid:${taxon}`,
        disableAllQualityFilters: 'true',
      });

      // Make the request
      const data = await fetch(
        `${import.meta.env.VITE_API_BIOCACHE}/occurrences/search?${params.toString()}`,
      );
      const { totalRecords, occurrences } = await data.json();
      console.log(totalRecords, occurrences);
    }

    getAccession();
  }, [accession, taxon]);

  return <Text>Herbarium</Text>;
}

export default HerbariumLink;
