import { useEffect } from 'react'

declare global {
  interface Window {
    jQuery: any
    $: any
  }
}

export const useJQuery = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('jquery').then((jquery) => {
        window.jQuery = jquery.default
        window.$ = jquery.default

        // Initialize Bootstrap components
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
          console.log('Bootstrap initialized')
        })

        // Initialize other jQuery plugins as needed
        import('slick-carousel/slick/slick.min.js').then(() => {
          console.log('Slick carousel initialized')
        })
      })
    }
  }, [])
}