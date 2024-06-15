import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import useAxios from '@/hooks/useAxios'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Webcam from 'react-webcam'

const Interview_Onboard = () => {
    const [isWebcamEnabled, setIsWebcamEnabled] = useState(false)
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
        <div className='h-screen w-full flex items-center justify-center flex-col gap-10'>
            <h1 className='text-2xl font-bold'>Let's Start 🏁</h1>
            <div className='md:w-[1000px] flex p-2 gap-10 md:flex-row flex-col'>
                <div className='w-1/2 space-y-2 p-5 flex flex-col gap-4'>
                    <div>
                        <h1 className='font-semibold'><span className='font-medium'>Job Position:&nbsp;</span><span className='text-lg'>{interviewData?.jobPosition}</span></h1>
                        <h1 className='font-semibold'><span className='font-medium'>Skills:&nbsp;</span><span className='text-lg'>{interviewData?.skills?.join(',')}</span></h1>
                        <h1 className='font-semibold'><span className='font-medium'>Expereince:&nbsp;</span><span className='text-lg'>{interviewData?.experience} yrs</span></h1>
                    </div>
                    <div className='flex gap-1 justify-center p-3 bg-yellow-100 rounded-md text-yellow-600'>
                        <Lightbulb className='w-6 h-6' /><p className='text-sm'> Please Enable Camera and Microphone and check the details and start the interview. All the best 👍 </p>
                    </div>
                </div>
                <div className='w-1/2 flex items-center justify-center'>
                    {
                        isWebcamEnabled ? <div>
                            <Webcam
                                className='h-[400px] w-full'
                                mirrored={true}
                                onUserMedia={() => { setIsWebcamEnabled(true) }}
                                onUserMediaError={() => { setIsWebcamEnabled(false) }}
                                onError={() => { setIsWebcamEnabled(false) }}
                            />
                            <Button variant={"secondary"} onClick={()=>{
                                navigation(`/dashboard/interview-take/${id}`)
                            }}>Start Interview</Button>
                        </div> :
                            <div className='h-[400px] w-full flex items-center justify-center flex-col gap-4'>
                                <div className='h-full flex items-center justify-center bg-slate-100 rounded-md w-full'>
                                    <WebcamIcon className='h-20 w-20' />
                                </div>
                                <Button onClick={() => { setIsWebcamEnabled(true) }}>Enable Microphone and Camera</Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Interview_Onboard