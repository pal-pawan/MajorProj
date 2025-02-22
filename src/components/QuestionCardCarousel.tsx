'use client'
import React, { useEffect, useState } from 'react';
import { useUserRole } from "@/context/UserRoleContext";
import axios from 'axios';
import { Question } from '@/types/QuestionApiResponse';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";


function QuestionCardCarousel() {
    const [questionList, setQuestionList] = useState<Question[]>([])
    const { userSelectedRole } = useUserRole();
    const role = {
        userSelectedRole
    };

    const generateQuestions = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/list-questions", role);
            let rawData = response.data.generatedQuestionList;
            rawData = rawData.replace(/```json|```/g, '');
            const data: Question[] = JSON.parse(rawData);

            setQuestionList(data);

        } catch (error) {
            console.log("An error occured while generating questions", error);
        }
    };

    useEffect(() => {
        generateQuestions();
    }, [])

    return (
        <div className='w-[100vw] h-[80vh] flex justify-center align-middle'>
            <Carousel className='w-[80vw] h-[100%] flex align-middle'>
                <CarouselContent>
                    {
                        questionList.length > 0 ? (
                            questionList.map((question, index) => (
                                <CarouselItem key={index}>
                                    <Card className='w-full mx-3 my-2 align-middle text-wrap overflow-y-scroll'>
                                        <CardHeader><CardTitle>{`${userSelectedRole} Question`}</CardTitle></CardHeader>
                                        <CardContent>
                                            <div className='flex justify-between align-middle my-5'>
                                                <h1>{question.title}</h1> <h3>{question.levelOfDifficulty}</h3>
                                            </div>
                                            <div className='align-middle my-5'>
                                                <h1>Answer </h1> <br />
                                                <h3>{question.expectedAnswer}</h3>
                                            </div>
                                            <div className='align-middle my-5'>
                                                <h1>How to approach this question </h1> <br />
                                                <h3>{question.advice}</h3>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem>
                                <Card className='w-full mx-3 my-2'>
                                    <CardHeader><CardTitle className='text-gray-700 animate-pulse'>{"Loading Question"}</CardTitle></CardHeader>
                                    <CardContent>
                                        <div className='flex justify-between align-middle my-5'>
                                            <h1 className='text-gray-500 animate-pulse'>{"Loading"}</h1> <h3>{"level"}</h3>
                                        </div>
                                        <div className='align-middle my-5'>
                                            <h1 className='text-gray-700 animate-pulse'>Answer </h1> <br />
                                            <h3 className='text-gray-500 animate-pulse'>{"Loading"}</h3>
                                        </div>
                                        <div className='align-middle my-5'>
                                            <h1 className='text-gray-700 animate-pulse'>How to approach this question </h1> <br />
                                            <h3 className='text-gray-500 animate-pulse'>{"Loading"}</h3>
                                        </div>
                                    </CardContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Card>
                            </CarouselItem>
                        )
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default QuestionCardCarousel