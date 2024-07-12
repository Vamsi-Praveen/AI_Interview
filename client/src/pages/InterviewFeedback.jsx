import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios'
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const InterviewFeedback = () => {
    const [feedback, setFeedback] = useState([])
    const API = useAxios();
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    const { toast } = useToast();
    const [score, setScore] = useState(0)
    const [confetti, setConfetti] = useState(false)
    const navigation = useNavigate()
    useEffect(() => {
        const fetchFeedback = async () => {
            setLoading(true)
            await API.get(`get-feedback/${id}`)
                .then((data) => {
                    setFeedback(data?.data?.feedback)
                    setScore(() => {
                        let score = 0;
                        data?.data?.feedback?.feedback?.map((ques, index) => {
                            const eachQues = JSON.parse(ques);
                            score += eachQues?.score
                        })
                        return score;
                    })
                    setLoading(false)
                    if (!localStorage.getItem('hasVisitedFeedbackPage')) {
                        setConfetti(true);
                        localStorage.setItem('hasVisitedFeedbackPage', 'true');
                    }
                })
                .catch((err) => {
                    setLoading(false)
                    if (err?.response?.data) {
                        return toast({
                            description: err?.response?.data
                        })
                    }

                })
        }
        fetchFeedback();
    }, [])
    return (
        loading ? <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='w-4 h-4 animate-spin' />
        </div> : <div className='h-screen w-full flex flex-col p-10'>
            {confetti && <ConfettiExplosion duration={3000} particleCount={500} width={3000} force={0.8} />}
            <div className='flex justify-between items-center'>
                <h1 className='font-medium text-xl'>Overall Score: <strong>{score}/50</strong></h1>
                <Button onClick={() => navigation('/dashboard')}>Home</Button>
            </div>
            <div className='mt-4'>
                <div className='my-3 space-y-3'>
                    {
                        feedback?.feedback?.map((ques, index) => {
                            const parsedQues = JSON.parse(ques);
                            return <div key={index} className='p-3 rounded-md space-y-1 cursor-pointer hover:bg-slate-50/45'>
                                <Accordion type="single" collapsible>
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                            <p className='font-medium'>{parsedQues?.question}</p>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p className='text-md'><strong>Score:</strong>&nbsp;<span className='text-green-500 font-medium'>{parsedQues?.score}</span>/5</p>
                                        </AccordionContent>
                                        <AccordionContent>
                                            <p className='text-md capitalize'><strong>Answer:</strong>&nbsp;{parsedQues?.answer}</p>
                                        </AccordionContent>
                                        <AccordionContent>
                                            <p className='text-md capitalize'><strong>Review:</strong>&nbsp;{parsedQues?.feedback}</p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>

                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default InterviewFeedback