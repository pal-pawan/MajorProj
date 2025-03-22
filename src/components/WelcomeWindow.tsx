'use client';

import { User } from 'next-auth';
import { useSession } from "next-auth/react";
import Image from 'next/image';

function WelcomeWindow() {

    const { data: session } = useSession();

    if (!session || !session.user) {
        return <div></div>;
    }
    const { username } = session.user as User;
  return (
    <div className='w-[80vw] h-[30vh] bg-[#ffffff22] backdrop-blur-md mx-8 my-6 flex items-center justify-around rounded-lg'>
          <div>
            <div>
              <h1 className='text-2xl text-gray-300'> Welcome Back 👏, <span className=' capitalize font-bold text-3xl bg-gradient-to-r from-[#FFD700] to-[#d8ac45] bg-clip-text text-transparent'>{username}</span></h1>
              <h1 className='text-lg text-[#D1D5DB]'>Crack Your Next Interview with Confidence!</h1>
            </div>

            <div>
              <ul className='flex gap-3 text-2xl my-5'>
                <li><h1 className="text-gray-200 font-semibold">Prepare <span className='text-xl font-bold'> | </span></h1></li>
                <li><h1 className="text-gray-200 font-semibold">Practice <span className='text-xl font-bold'> | </span></h1></li>
                <li><h1 className="bg-gradient-to-r from-[#C8A961] to-[#FFD700] bg-clip-text text-transparent font-bold">CrackIt 🔥</h1></li>
                </ul>
            </div>

          </div>
          <div className="w-1/4 h-60 relative">
            <Image src={'/student-illustration.png'} alt='failed to load image' fill className=' drop-shadow-lg w-3/4 h-60 relative bg-cover'/>
          </div>
        </div>
  )
}

export default WelcomeWindow