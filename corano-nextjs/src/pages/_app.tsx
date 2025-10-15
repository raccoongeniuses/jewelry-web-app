import '@/styles/globals.css'
import Head from 'next/head'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Import jQuery and plugins
    if (typeof window !== 'undefined') {
      import('jquery').then(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js')
        import('slick-carousel/slick/slick.min.js')
        // Add other jQuery-dependent scripts as needed
      })
    }
  }, [])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Jevoo Jewellery - Jewelry Shop eCommerce</title>
        <meta name="robots" content="noindex, follow" />
        <meta name="description" content="Jevoo Jewellery - Premium Jewelry Shop" />

        {/* Favicon */}
        <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico" />

        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400i,700,900" rel="stylesheet" />

        {/* Bootstrap CSS */}
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />

        {/* Font Icons */}
        <link rel="stylesheet" href="/assets/css/vendor/pe-icon-7-stroke.css" />
        <link rel="stylesheet" href="/assets/css/vendor/font-awesome.min.css" />

        {/* Plugins CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/slick.min.css" />
        <link rel="stylesheet" href="/assets/css/plugins/animate.css" />
        <link rel="stylesheet" href="/assets/css/plugins/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/plugins/jqueryui.min.css" />

        {/* Main Styles */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/draggable-grid.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}