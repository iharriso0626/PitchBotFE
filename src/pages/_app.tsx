// pages/_app.tsx
import '../app/globals.css';
import { AppProps } from 'next/app';
import '../app/styles/tailwind.css';
import '../app/styles/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return ( 
  <div className=' bg-[#e1e1e1]'>
    
      <Component {...pageProps} />
    
  </div>
  );
}

export default MyApp;