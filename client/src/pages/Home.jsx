import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { Lightbulb } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    const navigation = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            navigation('/dashboard');
        }
    }, [])
    return (
        <div className='h-screen w-full flex items-center justify-center flex-col gap-4'>
            <Button className="tracking-wider" asChild>
                <Link to={'/auth/login'}>
                    Login
                </Link>
            </Button>
            <div className='flex items-center gap-1'>
                <Lightbulb className='h-[15px] w-[15px]' />
                <p className='text-sm font-medium'>Please Login with your account to continue</p>
            </div>
        </div>
    )
}

export default Home