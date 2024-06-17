import QuestionBar from '@/components/QuestionBar';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Interview = () => {
    const { id } = useParams();
    const API = useAxios()
    const [interviewData, setInterviewData] = useState({})
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
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <div>
                <QuestionBar interviewQuestions={interviewData?.questions} />
            </div>
            <div></div>
        </div>
    )
}

export default Interview