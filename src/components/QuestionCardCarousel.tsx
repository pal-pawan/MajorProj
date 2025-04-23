'use client'
import React, { useEffect, useState } from 'react';
import { useUserRole } from "@/context/UserRoleContext";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import axios from 'axios';
import { Question } from '@/types/QuestionApiResponse';
import { Toggle } from "@/components/ui/toggle"

import { Mic, MicOff, Settings } from 'lucide-react';

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
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useToast } from "@/hooks/use-toast";


function QuestionCardCarousel() {
    const { toast } = useToast()
    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [activeSlide, setActiveSlide] = useState(0); 
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [evaluation, setEvaluation] = useState<string>("");
    const { userSelectedRole } = useUserRole();
    const role = {
        userSelectedRole
    };
    console.log(activeSlide);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    console.log(listening);

    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser does not support speech recognition.</span>;
    }

    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const stopListening = () => SpeechRecognition.stopListening();

    const generateQuestions = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/list-questions", role);
            let rawData = response.data.generatedQuestionList;
            rawData = rawData.replace(/```json|```/g, '');
            const data: Question[] = JSON.parse(rawData);

            setQuestionList(data);

        } catch (error) {
            console.log(error);
            toast({
                title: "error loading questions, please try again",
                variant: "destructive"
            });
            return Response.json({ "message": "Failed to generate Questions", error });
        }
    };

    const evaluateResponse = async (question: string) => {
        try {
            const evaluationObject = {
                role: userSelectedRole,
                question:currentQuestion,
                transcript: transcript
            }
            console.log(question)
            const response = await axios.post("http://localhost:3000/api/evaluate-answer", evaluationObject);
            let rawData = response.data.generatedEvaluation;
            rawData = rawData.replace(/```json|```/g, '');
            const generatedEvaluation = JSON.parse(rawData);
            setEvaluation(generatedEvaluation);

        } catch (error) {
            console.log(error);
            toast({
                title: "error evaluating the response, please try again",
                variant: "destructive"
            })
            return Response.json({ "message": "an error occured evaluating the answer", error });
        }
    };


    useEffect(() => {
        generateQuestions();
    });

    return (
        <div className='w-[100vw] h-[80vh] flex justify-center item-middle'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} modal={false}>
                <Carousel className='w-3/5 h-[100%] flex items-center'>
                    <CarouselContent>
                        {
                            questionList.length > 0 ? (
                                questionList.map((question, index) => (
                                    <CarouselItem key={index}>
                                        <Card className='w-full my-2 align-middle text-wrap bg-[#ffffff22] backdrop-blur-md'>
                                            <CardHeader><CardTitle className='text-gray-400'>{`${userSelectedRole} Question`}</CardTitle></CardHeader>
                                            <CardContent>
                                                <div className='flex justify-between align-middle my-3 text-gray-300 text-xl font-semibold'>
                                                    <h1>{question.title}</h1> <h3>{question.levelOfDifficulty}</h3>
                                                </div>
                                                <div className='align-middle bg-[#ffffff33] rounded-lg px-3 py-2 my-5 text-gray-200 text-lg'>
                                                    <h3>{question.expectedAnswer}</h3>
                                                </div>
                                                <div className='align-middle text-gray-400 text-lg'>
                                                    <h3><span className='text-gray-300'>Tip☘️:</span> {question.advice}</h3>
                                                    <DialogTrigger asChild >
                                                        <Button className='bg-[#5caa52] hover:bg-[#8ce670] shadow-[5px_5px_20px_#1a1a1a44,-5px_-5px_20px_#23232344] text-[#1e1e1e] font-semibold backdrop-blur-md'
                                                            onClick={() => {
                                                                setCurrentQuestion(question.title);
                                                                setIsDialogOpen(true);
                                                                setActiveSlide(index);  
                                                             }}
                                                        >Practice</Button>
                                                    </DialogTrigger>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))
                            ) : (
                                <CarouselItem>
                                    <Card className='w-[60vw] h-[60vh] my-2 flex justify-center items-center text-wrap bg-[#ffffff22] backdrop-blur-md'>
                                        <CardContent>
                                            <div className=' w-full h-[100%] flex justify-between items-center my-5 text-gray-300 text-xl font-semibold'>
                                                <p className='text-center text-lg font-medium flex items-center'>Getting your questions ready <span><Settings className=' ml-2 h-4 w-4 animate-spin' /></span> </p>
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

                <DialogContent className='min-h-[60vh] text-center bg-[#1e1e1e]'>
                    <DialogHeader><DialogTitle>Question Practice</DialogTitle></DialogHeader>
                    <div>
                        <div className='flex justify-between align-middle my-3 text-gray-300 text-xl font-semibold'>
                            <h1>{currentQuestion}</h1>
                        </div>
                        <div>
                            <p className=' text-gray-400 text-left m-2'>{transcript}</p>
                        </div>
                        <div>
                            {evaluation}
                        </div>
                        <div>
                            <Toggle asChild={true} aria-label='mic' variant="outline" pressed={isRecording}
                                className='bg-white rounded-full'
                                onPressedChange={() => { isRecording ? startListening() : stopListening()
                                    setIsRecording(!isRecording)
                                }
                                }>
                                {isRecording ? <MicOff /> : <Mic />}
                            </Toggle>
                            <Button onClick={() => { resetTranscript() }}>Reset</Button>
                            <Button onClick={() => { evaluateResponse(currentQuestion) }}>Submit</Button>

                        </div>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default QuestionCardCarousel