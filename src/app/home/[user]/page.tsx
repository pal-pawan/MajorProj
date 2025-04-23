'use client';
// import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import RoleCard from '@/components/RoleCard';
import WelcomeWindow from '@/components/WelcomeWindow';

function Page() {

  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div></div>;
  }
  // const { username } = session.user as User;

  return (
    <>
      <div className='w-[100vw] h-screen flex justify-center bg-gradient-to-br from-[#2a1617] to-[#252d3f]'>
        <div className='w-full flex flex-col items-center'>
          <WelcomeWindow/>
          <RoleCard />
        </div>
      </div>

    </>
  );
}

export default Page;