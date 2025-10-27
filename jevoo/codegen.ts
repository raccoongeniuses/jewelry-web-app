import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config()

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.GRAPHQL_ENDPOINT, // GraphQL endpoint
  documents: '**/*.ts?(x)',
  generates: {
    './lib/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        withRefetchFn: false,
        withSuspenseQuery: false,
        withResultType: true,
        withMutationFn: false,
        apolloReactCommonImportFrom: '@apollo/client/react',
        apolloReactHooksImportFrom: '@apollo/client/react',
        reactApolloVersion: 3,
        excludeFromGenerateUseSuspenseQuery: true,
        scalars: {
          DateTime: 'string',
          JSON: 'Record<string, unknown>',
          Decimal: 'string',
          Upload: 'File',
        },
      },
    },
  },
}

export default config
