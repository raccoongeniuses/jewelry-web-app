import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Additional head elements that should be in every page */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}