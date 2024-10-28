// pages/_app.tsx
import '../app/globals.css';
import { AppProps } from 'next/app';
import '../app/styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
  <div className=' bg-gray-200'>
    
      <Component {...pageProps} />
    
  </div>
  );
}

export default MyApp;