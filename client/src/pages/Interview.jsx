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
    const [waiting, setWaiting] = useState(false)

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
            setWaiting(true)
            const questionSelected = JSON.parse(interviewData?.questions)[activeQuestion]?.question;
            await API.post('verify-answer', {
                question: questionSelected,
                answer: transcript,
                questionId: interviewData?._id
            })
                .then((data) => {
                    toast({
                        description: data?.data?.message
                    })
                    setWaiting(false)
                })
                .catch((err) => {
                    setWaiting(false)
                    if (err?.response?.data) {
                        return toast({
                            description: err?.response?.data
                        })
                    }

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
                            <Button onClick={saveAnswer} variant={isListening ? "secondary" : 'default'} className={isListening && 'border text-red-400'} disabled={waiting}>{isListening ? <CircleStop className='w-5 h-5 mr-2' /> : <Mic className='w-5 h-5 mr-2' />}
                                {
                                    isListening ? 'Stop Recording' : 'Record Answer'
                                }
                            </Button>
                            <Button onClick={() => { console.log(transcript) }}>Show Answer</Button>
                            <div className='flex gap-5'>
                                {activeQuestion > 0 && <Button variant="secondary" onClick={() => { setActiveQuestion(activeQuestion - 1); }} disabled={isListening || waiting}>Previous</Button>}
                                {activeQuestion != JSON.parse(interviewData?.questions).length - 1 && <Button variant="secondary" disabled={isListening || waiting} onClick={() => { setActiveQuestion(activeQuestion + 1); }}>Next</Button>}
                                {activeQuestion == JSON.parse(interviewData?.questions).length - 1 && <Button variant="destructive" disabled={isListening || waiting} onClick={() => { STT() }}>End Interview</Button>}
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