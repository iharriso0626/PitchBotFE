import Link from 'next/link';
import Sidebar from '../app/components/sidebar';
import Image from 'next/image';

const Home = () => {
  return (
    <div className='flex w-screen h-screen flex-row items-center justify-center'>
      <div className='w-[80%] h-screen bg-blue-900'>
        {/*Logo Image using Next.js Image component */}
        <Image
        src='/samford-logo.png'
        alt='Samford LOGO'
        width={200}
        height={200}
        className='mx-auto mt-10'
/>
      <div className="flex justify-end items-end h screen">
        <Image
        src='/Samford-banner.png'
        alt='Samford LOGO'
        width={200}
        height={1000}
        className="absolute bottom-5 right-40 object-contain"
       // className="absolute top-1/2 right-15"
        //className='mr-5 mb-4
        //style={{ marginLeft: '200px' }}
        
/>

</div>
        <div className='flex justify-end w-full mb-20'>
        <Image
        src='/Eason-photo.png'
        alt='Customer Picture'
        width={200}
        height={1000}
        className="object-contain"
       // className="absolute top-20"
        //className='mb-4'
        className="absolute bottom-10 left-40 object-contain"
       
        
/>

</div>
    
        <h1 className='justify-center flex mt-5 text-white text-4xl'>Welcome to Pitch Bot!</h1>
        <h1 className='flex justify-center text-white text-4xl'>This is the home page.</h1>
        <h1 className='flex flex-col h-screen justify-center text-white text-4xl mb-20'>Customer: Dr. Eason</h1>
      </div>
    </div>
  );
};

export default Home;