import { Stack } from '@mantine/core';

// Project components / helpers
import { useLoaderData } from 'react-router-dom';

import SequenceItem from './components/SequenceItem';

export interface SequenceRecord {
  title: string;
  description: string;
  furtherDescription: string;
  link: string;
}

function Sequences() {
  const sequences = useLoaderData() as SequenceRecord[];

  return (
    <Stack>
      {sequences.map((sequence) => (
        <SequenceItem key={sequence.link} sequence={sequence} />
      ))}
    </Stack>
  );
}

export default Sequences;
