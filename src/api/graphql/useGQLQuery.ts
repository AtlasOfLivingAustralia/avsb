import useMounted from '#/helpers/useMounted';
import { useEffect, useState } from 'react';

import performGQLQuery, { Variables } from './performGQLQuery';

interface QueryHookOptions {
  lazy?: boolean;
}

function useGQLQuery<T>(query: string, initialVariables = {}, options: QueryHookOptions = {}) {
  const [variables, setVariables] = useState<Variables>(initialVariables);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    async function runQuery() {
      if (data) setData(null);
      try {
        const queryData = await performGQLQuery<T>(query, variables);
        setData(queryData);
        setError(null);
      } catch (queryError) {
        setError(queryError as Error);
      }
    }

    if (!(options.lazy && !mounted)) runQuery();
  }, [variables, options.lazy]);

  const update = (newVariables: Variables) => setVariables(newVariables);

  return { data, error, update };
}

export default useGQLQuery;
