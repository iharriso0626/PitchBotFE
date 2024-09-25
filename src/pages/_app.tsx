// pages/_app.tsx
import '../app/globals.css';
import { AppProps } from 'next/app';
import '../app/styles/tailwind.css';
import Layout from '../app/components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
  <div className=''>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </div>
  );
}

export default MyApp;