import { useEffect, useRef } from 'react';

export default function useMounted() {
  const mount = useRef<number>(import.meta.env.DEV ? -1 : 0);

  // We have to make mount a number & compensate for the extra re-renders
  // in development mode of React 18
  // See https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
  useEffect(() => {
    if (mount.current < 1) mount.current += 1;
  }, []);

  return mount.current === 1;
}
