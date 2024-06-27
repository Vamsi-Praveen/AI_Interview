import Loading from '@/components/Loader';
import QuestionBar from '@/components/QuestionBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { CircleStop, Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
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

    const { isListening, transcript, startListening, stopListening } = useSpeechToText()

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

    const saveAnswer = async () => {
        if (isListening) {
            stopListening()
            if (transcript?.length <= 10) {
                return toast({
                    description: 'Answer very short. Please record it again.'
                })
            }
            const feedbackQuery = `Mock Interview Question is ${interviewData?.questions[activeQuestion].question} and the user answer is ${transcript}. Based on question and answer please verify it and provide feedback and score for answer in json format containg feilds score and improvements.`;

            await API.post('verify-answer', {
                question: interviewData?.questions[activeQuestion]?.question,
                answer: transcript,
                questionId: interviewData?._id
            })
                .then((data) => {

                })
                .catch((err) => {

                })

        }
        else {
            startListening()
        }
    }
    return (
        <div className='h-screen w-full flex items-center justify-center p-10 gap-10'>
            <div className='w-[60%]'>
                <div className='w-full'>
                    <QuestionBar activeQuestion={activeQuestion} setActiveQuestion={setActiveQuestion} interviewQuestions={interviewData?.questions} isRecording={isListening} />
                </div>

            </div>
            <div className='w-[40%]'>
                {
                    <div>
                        <Webcam
                            className='h-[400px] w-full'
                            mirrored={true}
                            onUserMedia={() => { setIsWebcamEnabled(true) }}
                            onUserMediaError={() => { setIsWebcamEnabled(false) }}
                            onError={() => { setIsWebcamEnabled(false) }}
                        />
                        {/* <h1>{isListening.toString()}</h1> */}
                        <div className='my-2 flex items-center gap-5    '>
                            <Button onClick={saveAnswer} variant={isListening ? "secondary" : 'default'} className={isListening && 'border text-red-400'}>{isListening ? <CircleStop className='w-5 h-5 mr-2' /> : <Mic className='w-5 h-5 mr-2' />}
                                {
                                    isListening ? 'Stop Recording' : 'Record Answer'
                                }
                            </Button>
                            <Button onClick={() => { console.log(transcript) }}>Show Answer</Button>
                            <div className='flex gap-5'>
                                {activeQuestion > 0 && <Button variant="secondary" onClick={() => { setActiveQuestion(activeQuestion - 1); setUserAnswer('') }} disabled={isListening}>Previous</Button>}
                                {activeQuestion != JSON.parse(interviewData?.questions).length - 1 && <Button variant="secondary" disabled={isListening} onClick={() => { setActiveQuestion(activeQuestion + 1); setUserAnswer('') }}>Next</Button>}
                                {activeQuestion == JSON.parse(interviewData?.questions).length - 1 && <Button variant="destructive" disabled={isListening} onClick={() => { STT() }}>End Interview</Button>}
                            </div>
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