'use client';
import React from 'react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div></div>;
  }
  const { username } = session.user as User;
  router.replace(`/home/${username}`)
  return (
    <div className='w-full h-screen flex justify-center bg-gradient-to-br from-[#2a1617] to-[#252d3f]'></div>
  );
}

export default Page;