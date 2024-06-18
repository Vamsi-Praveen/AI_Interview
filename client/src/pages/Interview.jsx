import Loading from '@/components/Loader';
import QuestionBar from '@/components/QuestionBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useAxios from '@/hooks/useAxios';
import { CircleStop, Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
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
    const [userAnswer, setUserAnswer] = useState('')
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    if (error) return <div className='h-screen w-full flex items-center justify-center'>
        <p>Web Speech API is not available in this browser 🤷‍</p>
    </div>;

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
    //adding the speech as text to userAnswer State
    useEffect(() => {
        results?.map((ans) => {
            setUserAnswer((prevAns) => prevAns + ans?.transcript)
        })
    }, [results])

    if (!interviewData?.questions) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <div>
                <Loading />
            </div>
            <div></div>
        </div>
    }

    const saveAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
            if (userAnswer.length <= 0) {
                toast({
                    description: 'Please Verify Your Microphone Properly'
                })
                return;
            }
        }
        else {
            startSpeechToText();
        }
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
                            className='h-[400px] w-full'
                            mirrored={true}
                            onUserMedia={() => { setIsWebcamEnabled(true) }}
                            onUserMediaError={() => { setIsWebcamEnabled(false) }}
                            onError={() => { setIsWebcamEnabled(false) }}
                        />
                        <h1>{isRecording.toString()}</h1>
                        <div className='my-2 flex items-center gap-5    '>
                            <Button onClick={saveAnswer} variant={isRecording ? "ghost" : 'default'}>{isRecording ? <CircleStop className='w-5 h-5 mr-2' /> : <Mic className='w-5 h-5 mr-2' />} Record Answer</Button>
                            <div className='flex gap-5'>
                                {activeQuestion > 0 && <Button variant="secondary" onClick={() => { setActiveQuestion(activeQuestion - 1) }} disabled={isRecording}>Previous</Button>}
                                {activeQuestion != JSON.parse(interviewData?.questions).length - 1 && <Button variant="secondary" disabled={isRecording} onClick={() => { setActiveQuestion(activeQuestion + 1) }}>Next</Button>}
                                {activeQuestion == JSON.parse(interviewData?.questions).length - 1 && <Button variant="destructive" disabled={isRecording} onClick={() => { STT() }}>End Interview</Button>}
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