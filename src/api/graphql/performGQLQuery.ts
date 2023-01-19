// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Variables = { [key: string]: any };

async function performGQLQuery(query: string, variables?: Variables) {
  const response = await fetch(import.meta.env.VITE_API_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'list',
      query,
      variables: variables || {},
    }),
  });

  const data = await response.json();
  if (response.ok) return data;

  // If errorData is populated, we've recieved an error from the GraphQL server
  const [error] = data?.errors || [];
  const errorObj = new Error(error.message);
  errorObj.stack = error.extensions?.exception?.stacktrace?.join('\n');

  throw errorObj;
}

export type { Variables };
export { performGQLQuery };
