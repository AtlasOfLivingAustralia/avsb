import { Box, Image, Skeleton, ThemeIcon, Transition } from '@mantine/core';
import { IconCheck } from '@tabler/icons';

interface MediaImageProps {
  onClick?: () => void;
  selected?: boolean;
  width: string | number;
  height: string | number;
  src: string | null;
}

function MediaImage({ onClick, selected, width, height, src }: MediaImageProps) {
  return (
    <Box
      onClick={() => {
        if (onClick) onClick();
      }}
      pos='relative'
      sx={(theme) => ({
        transform: selected ? 'scale(1)' : 'scale(0.9)',
        borderRadius: 22,
        opacity: selected ? 1 : 0.7,
        transition: 'all cubic-bezier(0, 0, 0, 1) 0.2s',
        border: `6px solid ${selected ? theme.colors[theme.primaryColor][6] : 'transparent'}`,
        '&:hover': {
          opacity: 1,
          cursor: 'pointer',
          transform: 'scale(1)',
        },
      })}
    >
      <Skeleton pos='absolute' radius='lg' width={width} height={height} />
      <Image radius='lg' withPlaceholder width={width} height={height} src={src} />
      <Transition mounted={Boolean(selected)} transition='scale' duration={200}>
        {(styles) => (
          <Box style={styles} pos='absolute' bottom={10} right={10}>
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
