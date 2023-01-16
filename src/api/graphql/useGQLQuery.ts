import { useEffect, useRef, useState } from 'react';
import { performGQLQuery, Variables } from './performGQLQuery';

interface QueryHookOptions {
  lazy?: boolean;
}

function useGQLQuery<T>(query: string, initialVariables = {}, options: QueryHookOptions = {}) {
  const [variables, setVariables] = useState<Variables>(initialVariables);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // We have to make mount a number & compensate for the extra re-renders
  // in development mode of React 18
  // See https://reactjs.org/docs/strict-mode.html#ensuring-reusable-state
  const mount = useRef<number>(import.meta.env.DEV ? -1 : 0);

  useEffect(() => {
    async function runQuery() {
      if (data) setData(null);
      try {
        const queryData = await performGQLQuery(query, variables);
        setData(queryData);
        setError(null);
      } catch (queryError) {
        setError(queryError as Error);
      }
    }

    if (!(options.lazy && mount.current < 1)) runQuery();
    if (mount.current < 1) mount.current += 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables, options.lazy]);

  const update = (newVariables: Variables) => setVariables(newVariables);

  return { data, error, update };
}

export default useGQLQuery;
