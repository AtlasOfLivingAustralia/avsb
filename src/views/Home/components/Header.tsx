import { Box, Image } from '@mantine/core';
import { Corner } from '#/components/Wave';

interface HeaderProps {
  width?: number;
  height?: number;
}

function Header({ width, height }: HeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box style={{ position: 'relative', width, height }}>
        <Image
          src='https://www.seedpartnership.org.au/wp-content/uploads/2020/02/ViolaC_fruit.jpg'
          height={height}
          withPlaceholder
        />
        <Corner
          style={{ position: 'absolute', bottom: 0 }}
          preserveAspectRatio='none'
          width={width}
          height={height}
        />
      </Box>
    </div>
  );
}

export default Header;
