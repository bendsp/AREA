import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic"

import Authentication from "../components/wrappers/Authentication"

import Modal from 'react-modal';
import { UserProvider } from '@auth0/nextjs-auth0/client';

Modal.setAppElement('#__next');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Authentication isProtected={pageProps.isProtected}>
        <Component {...pageProps} />
      </Authentication>
    </UserProvider>
  )
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

