import { SVGProps } from 'react';

interface BlobProps extends SVGProps<SVGSVGElement> {
  inverse?: boolean;
}

export default function Blob({ inverse, ...props }: BlobProps) {
  return (
    <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fill={`light-dark(${inverse ? 'white' : 'var(--mantine-color-gray-2)'}, var(--mantine-color-dark-${inverse ? 7 : 6}))`}
        d='M35.7,-62.9C47.9,-54.8,60.6,-48.5,71.4,-38.4C82.1,-28.2,90.9,-14.1,89.1,-1C87.4,12.1,75,24.1,64.3,34.3C53.6,44.6,44.5,53,34.1,63C23.6,73,11.8,84.6,-2,88C-15.7,91.4,-31.5,86.5,-44.6,78.1C-57.7,69.6,-68.2,57.5,-73.5,43.9C-78.8,30.3,-78.9,15.1,-74.9,2.3C-71,-10.6,-63.1,-21.2,-58.1,-35.4C-53.1,-49.5,-51,-67.1,-41.8,-77C-32.6,-86.8,-16.3,-88.9,-2.3,-84.9C11.7,-80.9,23.5,-71,35.7,-62.9Z'
        transform='translate(100 100)'
      />
    </svg>
  );
}
