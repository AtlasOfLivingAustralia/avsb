import Logo from '../Logo';
import './index.css';

interface LogoLoaderProps {
  width?: number;
  height?: number;
}

function LogoLoader({ width, height }: LogoLoaderProps) {
  return (
    <div className='logo-loader'>
      <Logo width={width || 100} height={height || 100} />
    </div>
  );
}

export default LogoLoader;
