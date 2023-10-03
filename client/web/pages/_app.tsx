import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic"

import Authentication from "../components/Authentication"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authentication isProtected={pageProps.isProtected}>
      <Component {...pageProps} />
    </Authentication>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

