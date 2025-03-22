
import React from 'react';
import PreparationWindow from '@/components/PreparationWindow';
import "regenerator-runtime/runtime";
import WelcomeWindow from '@/components/WelcomeWindow';


const page = () => {
  return (
    <>
      <main className='bg-[#181818] h-screen w-full flex justify-center items-center text-white'>
        {/* <div>Landing Page</div> */}
        {/* <PreparationWindow/> */}
        <WelcomeWindow/>
      </main>
    </>
  )
}

export default page