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

        const response = await axios.post('http://localhost:3000/api/add-role',preparingForRole )
        router.push(`${username}/${userSelectedRole}`);
    }

    useEffect(() => {
        getRoleList();
    }, []);

    return (
        <div>

            <Dialog>
                <Form {...form}>
                    <form className='flex justify-center' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem className='w-[50%]'>
                                    <FormControl>
                                        <Input className='w-4/5' placeholder="What do you want to prepare for? " {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogTrigger asChild>
                            <Button type='submit'>Explore</Button>
                        </DialogTrigger>

                        {overview.length > 0 ? (
                            <DialogContent className='min-h-[60vh] overflow-y-scroll text-center'>
                                <DialogHeader><DialogTitle> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                <p className='h-[60vh]'> {overview} </p>
                            </DialogContent>
                        ) : (
                            <DialogContent className='min-h-[60vh] overflow-y-scroll'>
                                <DialogHeader><DialogTitle> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                <h3 className=' text-gray-700 animate-pulse text-center '> Loading...</h3>
                            </DialogContent>
                        )}

                    </form>
                </Form>
            </Dialog>

            <h2 className='text-gray-700 font-semibold text-2xl mx-5'>What others are preparing for: </h2>

            <div className="mt-4 mx-5 flex flex-wrap sm:mx-1">
                {roles.length > 0 ? (
                    roles.map((role, index) => (
                        <Dialog key={index}>
                            <Card className='text-wrap mx-5 my-3 w-80 cursor-pointer sm:w-52'>
                                <CardHeader>
                                    <CardTitle>Role</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h2 className='font-bold text-xl my-5'>{role}</h2>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => handleCardClick(role)}>
                                            Explore
                                        </Button>
                                    </DialogTrigger>
                                </CardContent>
                            </Card>
                            {overview.length > 0 ? (
                                <DialogContent className='min-h-[60vh] text-center'>
                                    <DialogHeader><DialogTitle> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                    <p className='h-[60vh] overflow-y-scroll'> {overview} </p>
                                    <Button className=' bottom-4' onClick={() => handleContinueButtonClick()}>Continue</Button>
                                </DialogContent>
                            ) : (
                                <DialogContent className='min-h-[60vh] overflow-y-scroll'>
                                    <DialogHeader><DialogTitle> {userSelectedRole} Role Overview </DialogTitle></DialogHeader>

                                    <h3 className=' text-gray-700 animate-pulse text-center '> Loading...</h3>
                                </DialogContent>
                            )}
                        </Dialog>
                    ))
                ) : (
                    loadingRoles.map((role, index) => (
                        <Card key={index} className='text-wrap mx-5 my-3 w-80 sm:w-52'>
                            <CardHeader>
                                <CardTitle className='text-gray-700 animate-pulse '>Role</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h2 className='text-gray-500 text-xl my-5 animate-pulse '>{role}</h2>
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
