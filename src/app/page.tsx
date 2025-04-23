
import React from 'react';
// import PreparationWindow from '@/components/PreparationWindow';
import "regenerator-runtime/runtime";
import WelcomeWindow from '@/components/WelcomeWindow';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const page = () => {
  return (
    <>
      <main className='bg-[#181818] h-screen w-full flex flex-col justify-center items-center text-white'>
        {/* <div>Landing Page</div> */}
        {/* <PreparationWindow/> */}
        <WelcomeWindow/>
        <div className='flex gap-5 '>
        <Button className='bg-white text-black font-bold text-lg' variant={'outline'}><Link href={'../sign-in'}>Sign In</Link></Button>
        <Button className='bg-white text-black font-bold text-lg' variant={'outline'}><Link href={'../sign-up'}>Sign Up</Link></Button>
        </div>
      </main>
    </>
  )
}

export default page