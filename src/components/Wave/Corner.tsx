import { useMantineTheme } from '@mantine/core';
import { SVGProps } from 'react';

// Longer corner (574)
const longer =
  'm 0 0 c 34 11 68 21 103 64 c 33.9 43 68 117 102 160 c 34.7 43 69 53 103 48 c 34.6 -5 69 -27 103 -26.7 c 34.4 -0.3 101 6.7 163 37.7 l 0 37 l -60 0 l -17.1 0 c -17.2 0 -51.9 0 -85.9 0 c -34.1 0 -68 0 -103 0 c -34 0 -68 0 -103 0 c -33.9 0 -68 0 -102 0 c -34.7 0 -69 0 -103 0 z';

export default function Corner(props: SVGProps<SVGSVGElement>) {
  const theme = useMantineTheme();
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 514 320' {...props}>
      <path
        fill={theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#ffffff'}
        fillOpacity='1'
        d={longer}
      />
    </svg>
  );
}
