import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/NavComponents/Layout';
import './globals.css';
import 'overlayscrollbars/overlayscrollbars.css';
import AuthLayout from '@/components/NavComponents/AuthLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);
  const router = useRouter();

  return getLayout(
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {router.pathname !== '/auth' ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      )}
    </>
  );
}
