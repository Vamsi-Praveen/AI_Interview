import Loading from '@/components/Loader';
import QuestionBar from '@/components/QuestionBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { Lightbulb, Mic, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from 'react-webcam';

const Interview = () => {
    const { id } = useParams();
    const API = useAxios()
    const [interviewData, setInterviewData] = useState({})
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false)
    const { toast } = useToast()
    const navigation = useNavigate();
    useEffect(() => {
        const fetchInterviewData = async () => {
            await API.get(`get-questions/${id}`)
                .then((data) => {
                    setInterviewData(data?.data)
                })
                .catch((err) => {
                    toast({
                        description: err?.response?.data?.error
                    })
                    return navigation('/dashboard');
                })
        }
        fetchInterviewData();
    }, [])

    if (!interviewData?.questions) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <div>
                <Loading />
            </div>
            <div></div>
        </div>
    }
    return (
        <div className='h-screen w-full flex items-center justify-center p-10 gap-10'>
            <div className='w-[60%]'>
                <div className='w-full'>
                    <QuestionBar activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} interviewQuestions={interviewData?.questions} />
                </div>

            </div>
            <div className='w-[40%]'>
                {
                    <div>
                        <Webcam
                            className='h-[300px] w-full'
                            mirrored={true}
                            onUserMedia={() => { setIsWebcamEnabled(true) }}
                            onUserMediaError={() => { setIsWebcamEnabled(false) }}
                            onError={() => { setIsWebcamEnabled(false) }}
                        />
                        <div className='my-3'>
                            {
                                <Button><Mic className='w-5 h-5 mr-2'/> Record Answer</Button>
                            }
                        </div>
                        <div>
                            
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default Interview