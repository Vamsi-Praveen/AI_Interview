import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { handleLogout } = useAuth();
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>

    </div>
  )
}

export default Dashboard