import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Top from '../components/Top';
import 'antd/dist/antd.css';
import '../style/style.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Top/>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
