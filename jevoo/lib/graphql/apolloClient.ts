import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { SetContextLink } from '@apollo/client/link/context'
import UploadHttpLink from 'apollo-upload-client/UploadHttpLink.mjs'

// Create HTTP link with file upload support
const httpLink = new UploadHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'http://127.0.0.1:4000/api/graphql',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
}) as unknown as ApolloLink

// Create auth link for Keystone sessions
const authLink = new SetContextLink(() => {
  // Get the Keystone session token from storage
  // Check both localStorage (remember-me) and sessionStorage (current session only)
  let sessionToken: string | null = null
  if (typeof window !== 'undefined') {
    sessionToken = localStorage.getItem('keystone-session') || 
                   sessionStorage.getItem('keystone-session')
  }

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      authorization: sessionToken ? `Bearer ${sessionToken}` : '',
    },
  }
})

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      // Add type policies for better caching if needed
      Query: {
        fields: {
          // Example: users pagination
          users: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

export default apolloClient
