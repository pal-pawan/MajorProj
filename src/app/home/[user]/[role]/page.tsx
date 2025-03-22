'use client'
import React, { useEffect, useState } from 'react';
import { useUserRole } from "@/context/UserRoleContext";
import QuestionCardCarousel from '@/components/QuestionCardCarousel';
import axios from 'axios';
import OverviewCardComponent from '@/components/OverviewCardComponent';


function rolePage() {

  const [overview, setOverview] = useState('');
  

  const { userSelectedRole } = useUserRole();
  const role = {
    userSelectedRole
  };

  const generateOverview = async () => {
          
          try {
              const response = await axios.post('http://localhost:3000/api/role-overview', role);
              const data = response.data.generatedOverview;
              const overview = data.replace(/\n/g, "\n\n");
              setOverview(overview);
  
          } catch (error) {
              console.log("error fetching role overview", error);
          }
      }

  useEffect(() => {
    generateOverview()
  }, [])
  


  return (
    <>
      <div className='w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#2a1617] to-[#252d3f]'>
        <OverviewCardComponent/>
        <QuestionCardCarousel/>
      </div>
    </>
  )
}

export default rolePage