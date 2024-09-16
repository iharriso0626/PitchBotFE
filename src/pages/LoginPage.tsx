import Link from 'next/link';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
        <div className='h-full w-full items-center flex justify-center'>
          {/* Outer Login box */}
          <div className="flex large:w-[583.5px] large:px-[91px] large:pb-[71px] xlarge:w-[780px] flex-col large:h-[549.5px] xlarge:h-[733.33px] justify-center items-center bg-gray-300 p-5 rounded-lg">
            <div className=''>
              {/* Header Box */}
              <div className='large:w-[401px] xlarge:w-[534.66px] large:h-[46px] flex xlarge:h-[62px] items-center justify-center large:mt-[71px] xlarge:mt-[95.33px]'>
                <h1 className='large:text-[32px] xlarge:text-[42.66px]'> Login </h1>
              </div>

              <div className='large:mt-[32.5px] large:mb-[14.67px] large:text-[15px] xlarge:text-[20px] large:w-[400px] large:h-[22px] xlarge:w-[533.33px] xlarge:h-[30px]'>Email Address</div>

              {/* Email Box */}
              <div className='large:w-[400px] bg-white rounded-2xl large:h-[46px] xlarge:w-[533.33px] xlarge:h-[62px]'>
                <input
                  type="text"
                  onChange={(e) => console.log("Email: ", e.target.value)}
                  placeholder="email@email.com"
                  className="flex bg-transparent large:text-[18px] large:w-[368px] outline-none large:ml-[16px] xlarge:text-[24px] large:pt-[12px] large:mb-[32.5px] text-black font-jost"
                />
              </div>

              <div className='large:mt-[32.5px] large:mb-[14.67px] xlarge:text-[20px] large:text-[15px] large:w-[400px] large:h-[22px] xlarge:w-[533.33px] xlarge:h-[30px]'>Password</div>

              {/* Password Box */}
              <div className='large:w-[400px] bg-white rounded-2xl large:h-[46px] xlarge:w-[533.33px] xlarge:h-[62px]'>
                <input
                  type="text"
                  onChange={(f) => console.log("Password: ", f.target.value)}
                  placeholder="Password"
                  className="flex bg-transparent outline-none large:text-[18px] large:w-[368px] large:ml-[16px] xlarge:text-[24px] large:pt-[12px] large:mb-[35.5px] text-black font-jost"
                />
              </div>

              {/* Login Box */}
              <Link href={``}>
                <button className='large:w-[401px] large:mt-[35.5px] font-jost rounded-2xl large:text-[22px] xlarge:text-[29.33px] bg-white xlarge:w-[534.66px] large:h-[48px] xlarge:h-[64px] text-black'
                  onClick={() => (console.log("Logged in"))}
                >
                  Login
                </button>
              </Link>

              {/* Forgot and Sign Up Boxes */}
              <div className='large:w-[400px] large:h-[22px] flex font-jost xlarge:w-[534.66px] xlarge:h-[30px] large:mt-[30px] xlarge:mt-[40px]'>
                <div className='font-jost large:w-[157px] large:h-[22px] text-[#A8A29E] xlarge:w-[170px] large:text-[15px] xlarge:text-[20px] xlarge:h-[30px]'>
                  <Link href={``}><button className='' onClick={() => (console.log("Password Forgotten"))}>Forgot Password?</button></Link>
                </div>
                <div className='large:w-[273px] large:h-[30px] xlarge:w-[364px] text-[#A8A29E] large:text-[15px] xlarge:text-[22px] xlarge:h-[40px] large:ml-[82px] xlarge:ml-[110px]'>Don't have an account?
                  <Link href={`/SignUp`}><button className='large:text-[15px] xlarge:text-[22px] text-white' onClick={() => { console.log("Sign Up Pressed") }}>Sign Up</button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;