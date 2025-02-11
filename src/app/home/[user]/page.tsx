'use client'

import React from 'react'
import { User } from 'next-auth';
import { useSession } from 'next-auth/react'
import RoleCard from '@/components/RoleCard'


function page() {

  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div></div>;
  }
  const { username } = session.user as User;

  return (
    <>
      <div className='text-center text-3xl my-3 font-bold'>Welcome back {username}</div>
      <div className='w-full border-y-gray-800 my-5'>
        <RoleCard/>
      </div>

    </>
  )
}

export default page