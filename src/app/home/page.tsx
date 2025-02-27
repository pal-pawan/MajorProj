'use client'
import React from 'react'
import { User } from 'next-auth';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

function page() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user) {
    return <div></div>;
  }
  const { username } = session.user as User;
  router.replace(`/home/${username}`)
  return (
    <div>Home Page</div>
  )
}

export default page