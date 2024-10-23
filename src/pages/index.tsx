import Link from 'next/link';
import Sidebar from '../app/components/sidebar';

const Home = () => {
  return (
    <div className='flex w-screen h-screen flex-row items-center justify-center'>
      <div className='w-[80%] h-screen bg-white'>
        <h1 className='justify-center flex mt-5 text-black'>Welcome to Pitch Bot!</h1>
        <h1 className='flex justify-center text-black'>This is the home page.</h1>
      </div>
    </div>
  );
};

export default Home;