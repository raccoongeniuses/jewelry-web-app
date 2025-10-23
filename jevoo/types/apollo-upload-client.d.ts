declare module 'apollo-upload-client/UploadHttpLink.mjs' {
  import { ApolloLink } from '@apollo/client'
  import { HttpOptions } from '@apollo/client/link/http'

  export interface UploadHttpLinkOptions extends HttpOptions {
    uri?: string
    includeExtensions?: boolean
    useGETForQueries?: boolean
    headers?: Record<string, string>
  }

  export default class UploadHttpLink extends ApolloLink {
    constructor(options?: UploadHttpLinkOptions)
  }
}
