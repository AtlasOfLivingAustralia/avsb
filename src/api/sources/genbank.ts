import taxonAPI from './taxon';

interface SequenceRecord {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

interface SequenceResult {
  total: string;
  resultsUrl: string;
  results: SequenceRecord[];
}

async function sequences(guid: string): Promise<SequenceResult> {
  const { classification } = await taxonAPI.info(guid);

  return (
    await fetch(
      `${import.meta.env.VITE_API_BIE}/externalSite/genbank?s=${classification.scientificName}`,
    )
  ).json();
}

export default {
  sequences,
};

export type { SequenceRecord, SequenceResult };
