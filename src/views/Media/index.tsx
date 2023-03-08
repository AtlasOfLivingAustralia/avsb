import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Group, Image } from '@mantine/core';
import { MediaItem } from '#/api/graphql/types';
import MediaImage from './components/MediaImage';

function Media() {
  const [media, setMedia] = useState<MediaItem[] | null>(useLoaderData() as MediaItem[]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(media?.[0] || null);
  const params = useParams();
  return (
    <Group spacing='xs'>
      {media?.map((item) => (
        <MediaImage
          onClick={() => setSelectedMedia(item)}
          selected={selectedMedia?.identifier === item.identifier}
          width={150}
          height={150}
          key={item.identifier}
          src={item.accessURI}
        />
      ))}
    </Group>
  );
}

export default Media;
