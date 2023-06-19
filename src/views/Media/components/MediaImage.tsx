import { MediaItem } from '#/api/graphql/types';
import { Box, Group, Image, Overlay, Skeleton, Text, ThemeIcon, Transition } from '@mantine/core';
import { IconCalendar, IconCheck } from '@tabler/icons';

interface MediaImageProps {
  onClick?: () => void;
  selected?: boolean;
  width: string | number;
  height: string | number;
  item: MediaItem;
}

function MediaImage({ onClick, selected, width, height, item }: MediaImageProps) {
  return (
    <Box
      onClick={() => {
        if (onClick) onClick();
      }}
      pos='relative'
      sx={(theme) => ({
        borderRadius: 22,
        opacity: selected ? 1 : 0.65,
        transition: 'opacity ease-in-out 0.2s',
        border: `6px solid ${selected ? theme.colors[theme.primaryColor][6] : 'transparent'}`,
        '&:hover': {
          opacity: 1,
          cursor: 'pointer',
        },
      })}
    >
      <Skeleton pos='absolute' radius='lg' width={width} height={height} />
      <Image
        radius='lg'
        withPlaceholder
        width={width}
        height={height}
        src={item.accessURI}
        alt={item.title || 'Preview image from taxon'}
      />
      {item.createDate && (
        <Box pos='absolute' bottom={0} left={0} right={0} h={64}>
          <Overlay
            radius='lg'
            center
            gradient='linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)'
          >
            <Group spacing='xs' mt='lg'>
              <IconCalendar color='white' size='1rem' />
              <Text mr='sm' size='xs' weight='bold' color='white' opacity={0.85}>
                {new Date(item.createDate).toLocaleDateString()}
              </Text>
            </Group>
          </Overlay>
        </Box>
      )}
      <Transition mounted={Boolean(selected)} transition='scale' duration={200}>
        {(styles) => (
          <Box style={styles} pos='absolute' top={10} right={10}>
            <ThemeIcon size='lg' color='dark'>
              <IconCheck size={18} />
            </ThemeIcon>
          </Box>
        )}
      </Transition>
    </Box>
  );
}

export default MediaImage;
