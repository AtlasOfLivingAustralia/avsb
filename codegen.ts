import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['http://localhost:4000/graphql', './src/api/graphql/client.graphql'],
  generates: {
    './src/api/graphql/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsTypes: true,
        scalars: {
          Long: 'number',
        },
      },
    },
  },
};

export default config;
