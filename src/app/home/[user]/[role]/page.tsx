'use client'
import React, { useEffect } from 'react';
import { useUserRole } from "@/context/UserRoleContext";
import QuestionCardCarousel from '@/components/QuestionCardCarousel';


function rolePage() {
  const { userSelectedRole } = useUserRole();
  const role = {
    userSelectedRole
  };

  return (
    <>
      <div className='w-full h-screen flex align-middle'>
        <QuestionCardCarousel/>
      </div>
    </>
  )
}

export default rolePage