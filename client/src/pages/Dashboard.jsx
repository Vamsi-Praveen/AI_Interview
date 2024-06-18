import AddInterview from '@/components/AddInterview';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='p-5'>
        <h1 className='text-[18px] font-medium'>Dashboard</h1>
        <div className="mt-3 flex items-center justify-between">
          <div className='p-3 bg-yellow-100 rounded-md w-fit'>
            <p className='text-yellow-600 text-sm'>Click on <em>+</em>&nbsp;icon to create a new interview with AI.</p>
          </div>
          <div>
            <AddInterview />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard