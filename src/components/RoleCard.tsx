'use client';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from '@/components/ui/button';
// import { Loader2 } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { roleOverviewSchema } from '@/schema/roleOverviewSchema';
import { useUserRole } from "@/context/UserRoleContext";


function Page() {
    const [roles, setRoles] = useState([]);
    const loadingRoles = ['Loading Role...', 'Loading Role...', 'Loading Role...', 'Loading Role...', 'Loading Role...'];
    const { userSelectedRole, setUserSelectedRole } = useUserRole();

    const [overview, setOverview] = useState('');
    const router = useRouter();
    const { data: session } = useSession();

    if (!session || !session.user) {
        return <div></div>;
    }
    const { username } = session.user as User;

    const form = useForm<z.infer<typeof roleOverviewSchema>>({
        resolver: zodResolver(roleOverviewSchema),
        defaultValues: {
            role: "",
        },
    });

    async function onSubmit(value: z.infer<typeof roleOverviewSchema>) {
        console.log(value);
        setUserSelectedRole(value.role);

        try {
            const response = await axios.post('http://localhost:3000/api/role-overview', value);
            const data = response.data.generatedOverview;
            const overview = data.replace(/\n/g, "\n\n");
            setOverview(overview);

        } catch (error) {
            console.log("error fetching role overview", error);
        }
    }

    const getRoleList = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/list-role');
            const data = response.data.generatedText;
            const roleList = JSON.parse(data);
            setRoles(roleList);
        } catch (error) {
            console.log("Error fetching role list", error);
        }
    };

    const handleCardClick = async (role: string) => {
        setUserSelectedRole(role);
        const roleObject = {
            role
        };
        try {
            const response = await axios.post('http://localhost:3000/api/role-overview', roleObject);
            const data = response.data.generatedOverview;
            const overview = data.replace(/\n/g, "\n\n");
            setOverview(overview);

        } catch (error) {
            console.log("error fetching role overview", error);
        }
    }

    const handleContinueButtonClick = async () => {
        const preparingForRole = {
            userSelectedRole
        }

        const response = await axios.post('http://localhost:3000/api/add-role', preparingForRole)
        router.push(`${username}/${userSelectedRole}`);
    }

    useEffect(() => {
        getRoleList();
    }, []);

    return (
        <div>

            <Dialog>
                <Form {...form}>
                    <form className='flex justify-center my-5 ' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem className='w-[50%] accent-[#aa9052]'>
                                    <FormControl>
                                        <Input className='w-4/5 bg-[#ffffff22] backdrop-blur-md text-gray-200' placeholder="What do you want to prepare for? eg.(UI Designer, Product Manager)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogTrigger asChild>
                            <Button type='submit' className='bg-[#d9ad4a] hover:bg-[#ffeb64] shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#232323] text-[#1e1e1e] font-semibold backdrop-blur-md '>Explore</Button>
                        </DialogTrigger>

                        {overview.length > 0 ? (
                            <DialogContent className='min-h-[60vh] text-center bg-[#1e1e1e]'>
                                <DialogHeader><DialogTitle className='text-gray-300 text-2xl'> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                <p className='h-[60vh] overflow-y-scroll text-gray-400 text-left mx-2 my-2'> {overview} </p>
                                <Button className=' bottom-4 bg-[#aa9052] hover:bg-[#e6c270] shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#232323] text-[#1e1e1e] font-semibold backdrop-blur-md' onClick={() => handleContinueButtonClick()}>Continue</Button>
                            </DialogContent>
                        ) : (
                            <DialogContent className='min-h-[60vh] text-center bg-[#1e1e1e]'>
                                <DialogHeader><DialogTitle className=' text-gray-300 text-2xl'> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                <h3 className=' text-gray-400 animate-pulse text-center '> Loading...</h3>
                                <Button className=' bottom-4 bg-[#aa9052] hover:bg-[#e6c270] shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#232323] text-[#1e1e1e] font-semibold backdrop-blur-md' disabled >Continue</Button>

                            </DialogContent>
                        )}

                    </form>
                </Form>
            </Dialog>

            <h2 className='text-gray-300 font-semibold text-2xl mx-5'>Choose from top roles </h2>

            <div className="mt-4 mx-5 flex flex-wrap sm:mx-1">
                {roles.length > 0 ? (
                    roles.map((role, index) => (
                        <Dialog key={index}>
                            <Card className=' bg-[#ffffff22] backdrop-blur-md flex flex-col justify-between text-wrap mx-5 my-3 w-80 cursor-pointer hover:border-[#e6c270] sm:w-52'>
                                <CardHeader>
                                    <CardTitle className='text-gray-400'>Role</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h2 className='font-bold items-center capitalize bg-gradient-to-r from-[#aa9052] to-[#e6c270] bg-clip-text text-transparent text-xl my-5'>{role}</h2>
                                    <DialogTrigger asChild>
                                        <Button
                                            className='bg-[#aa9052] hover:bg-[#e6c270] shadow-[5px_5px_20px_#1a1a1a44,-5px_-5px_20px_#23232344] text-[#1e1e1e] font-semibold backdrop-blur-md '
                                            onClick={() => handleCardClick(role)}>
                                            Explore
                                        </Button>
                                    </DialogTrigger>
                                </CardContent>
                            </Card>
                            {overview.length > 0 ? (
                                <DialogContent className='min-h-[60vh] text-center bg-[#1e1e1e]'>
                                    <DialogHeader><DialogTitle className='text-gray-300 text-2xl'> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                    <p className='h-[60vh] overflow-y-scroll text-gray-400 text-left mx-2 my-2'> {overview} </p>
                                    <Button className=' bottom-4 bg-[#aa9052] hover:bg-[#e6c270] shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#232323] text-[#1e1e1e] font-semibold backdrop-blur-md' onClick={() => handleContinueButtonClick()}>Continue</Button>
                                </DialogContent>
                            ) : (
                                <DialogContent className='min-h-[60vh] text-center bg-[#1e1e1e]'>
                                    <DialogHeader><DialogTitle className='text-gray-300 text-2xl'> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                    <h3 className=' text-gray-400 animate-pulse text-center '> Loading...</h3>
                                    <Button className=' bottom-4 bg-[#aa9052] hover:bg-[#e6c270] shadow-[20px_20px_60px_#1a1a1a,-20px_-20px_60px_#232323] text-[#1e1e1e] font-semibold backdrop-blur-md' disabled >Continue</Button>

                                </DialogContent>
                            )}
                        </Dialog>
                    ))
                ) : (
                    loadingRoles.map((role, index) => (
                        <Card key={index} className=' bg-[#ffffff22] backdrop-blur-md flex flex-col justify-between text-wrap mx-5 my-3 w-80 cursor-pointer sm:w-52'>
                            <CardHeader>
                                <CardTitle className='text-gray-400 animate-pulse '>Role</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h2 className='text-gray-400 text-xl my-5 animate-pulse '>{role}</h2>
                                <Button disabled>Loading</Button>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Page;