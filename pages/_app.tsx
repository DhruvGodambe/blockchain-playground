import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';

import { cookieToInitialState } from 'wagmi'

import { config } from '@/src/config';
import { ContextProvider } from '@/src/context';
import { GlobalProvider } from '@/src/context/GlobalContext';

export default function App({Component, pageProps }: AppProps) {
  const initialState = cookieToInitialState(config)

  return (
    <ChakraProvider>
        <ContextProvider initialState={initialState}>
          <GlobalProvider>
            <Component {...pageProps} />
          </GlobalProvider>
        </ContextProvider>
    </ChakraProvider>
  );
}
