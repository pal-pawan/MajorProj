'use client'
import React, { useEffect, useState } from 'react';
import { useUserRole } from "@/context/UserRoleContext";
import axios from 'axios';
import { Settings } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge"


import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Overview {
    general_responsibilities: string;
    interview_rounds: [string];
    top_skills_and_technologies: [string];
    expected_salary: string;
}

function OverviewCardComponent() {
    const [overview, setOverview] = useState<Overview>();
    const { userSelectedRole } = useUserRole();
    const role = userSelectedRole;
    const roleObject = {
        role
    };

    const generateOverview = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/generate-overview', roleObject);
            let rawData = response.data.generatedOverview;
            rawData = rawData.replace(/```json|```/g, '');
            const data: Overview = JSON.parse(rawData);

            setOverview(data);

        } catch (error) {
            console.log("error fetching role overview", error);
            return Response.json({ "message": "Failed to generate overview", error });

        }
    }

    useEffect(() => {
        generateOverview()
    }, [])
    return (
        <div className='w-4/5 h-[100%] my-5 px-3 py-2 align-middle text-wrap bg-[#ffffff22]  backdrop-blur-md flex flex-col text-left text-lg rounded-lg '>
            {overview ? (
                <Card className='w-full my-2 align-middle text-wrap bg-[#ffffff22] backdrop-blur-md'>
                    <CardHeader><CardTitle className='text-gray-400'>{`${userSelectedRole} Overview`}</CardTitle></CardHeader>
                    <CardContent>
                        <div className='flex flex-col justify-between align-middle my-3 text-gray-200 text-lg font-semibold'>
                            <Card className='bg-transparent border-none'>{overview.top_skills_and_technologies.map((skill, index) => (<Badge variant={'outline'} key={index} className='bg-[#ffffff44] text-gray-100 m-1 p-2'>{skill}</Badge>))}</Card>
                            <h1>{overview.general_responsibilities}</h1>
                            <Accordion type="single" collapsible className='w-full'>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>What salary can I expect for this role?</AccordionTrigger>
                                    <AccordionContent>
                                        <h1>{overview.expected_salary}</h1>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className='w-4/5 h-[100%] my-5 px-3 py-2 align-middle text-wrap bg-[#ffffff22] backdrop-blur-md flex flex-col text-left text-lg rounded-lg '>
                    <p className='text-center text-lg font-medium flex items-center'>Loading <span><Settings className=' ml-2 h-4 w-4 animate-spin' /></span> </p>
                </div>
            )}
        </div>
    )
}

export default OverviewCardComponent