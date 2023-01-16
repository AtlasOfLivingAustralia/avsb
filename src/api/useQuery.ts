import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Variables = { [key: string]: any };

function useQuery<T>(query: string, initialVariables = {}) {
  const [variables, setVariables] = useState<Variables>(initialVariables);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function runQuery() {
      if (data) setData(null);
      try {
        const response = await fetch(import.meta.env.VITE_API_GRAPHQL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operationName: 'list',
            query,
            variables,
          }),
        });
        setData(await response.json());
        setError(null);
      } catch (queryError) {
        setError(queryError as Error);
      }
    }

    // Only execute the query if there isn't already one being executed
    runQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variables]);

  const update = (newVariables: Variables) => setVariables(newVariables);

  return { data, error, update };
}

export default useQuery;
