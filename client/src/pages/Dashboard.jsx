import AddInterview from '@/components/AddInterview';
import InterviewCard from '@/components/InterviewCard';
import Loading from '@/components/Loader';
import Navbar from '@/components/Navbar';
import useAxios from '@/hooks/useAxios';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [prevInterviews, setPrevInterviews] = useState([])
  const [loading, setLoading] = useState(false)
  const API = useAxios()
  useEffect(() => {
    const fetchInterviews = async () => {
      setLoading(true)
      await API.get(`get-prevInterviews`)
        .then((data) => {
          setPrevInterviews(data?.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          toast({
            description: err?.response?.data?.error
          })
        })
    }
    fetchInterviews();
  }, [])
  return (
    <div>
      <Navbar />
      <div className='p-5'>
        <h1 className='text-[18px] font-medium'>Dashboard</h1>
        <div className="my-3 flex items-center justify-between pb-4">
          <div className='p-3 bg-yellow-100 rounded-md w-fit'>
            <p className='text-yellow-600 text-sm'>Click on <em>+</em>&nbsp;icon to create a new interview with AI.</p>
          </div>
          <div>
            <AddInterview />
          </div>
        </div>
        <div>
          <h1 className='text-[18px] font-medium mb-3'>Previous Interviews</h1>
          {
            loading ? <div className='w-full h-[50vh] flex items-center justify-center'>
              <Loader className='w-4 h-4 animate-spin' />
            </div> :
              prevInterviews.length == 0 ? <div className='w-full p-1 flex items-center justify-center h-[50vh]'>
                <h1 className='font-medium text-lg'>😥 No Previous <span className='underline underline-offset-4'>Interviews</span> Found, Create one Now</h1>
              </div> : <div className='flex flex-wrap gap-5 mt-4'>{
                prevInterviews?.map((intr) => {
                  return <InterviewCard data={intr} key={intr?._id} />
                })

              }</div>
          }
        </div>
      </div>

    </div>
  )
}

export default Dashboard