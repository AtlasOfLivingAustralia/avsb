import {
  completeNavigationProgress,
  NavigationProgress as NavigationProgressComponent,
  resetNavigationProgress,
  startNavigationProgress,
} from '@mantine/nprogress';
import { useEffect } from 'react';
import { useNavigation } from 'react-router';

export function NavigationProgress() {
  const { state } = useNavigation();

  useEffect(() => {
    if (state === 'loading') {
      resetNavigationProgress();
      startNavigationProgress();
    } else {
      completeNavigationProgress();
    }
  }, [state]);

  return (
    <NavigationProgressComponent
      stepInterval={20}
      portalProps={{ 'aria-hidden': true }}
      aria-label='Page navigation progress bar'
    />
  );
}

export default NavigationProgress;
