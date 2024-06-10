import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {

    const { token } = useParams()

    const { toast } = useToast();

    const navigation = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const handleVerify = async () => {
        try {
            setLoading(true)
            if (password == '' || confirmPassword == '') {
                return toast({
                    description: 'Please Enter All Feilds'
                })
            }
            if (password != confirmPassword) {
                return toast({
                    description: "Password's did'nt match"
                })
            }
            await axios.post(`${baseUrl}auth/verify`, { token: token, password: password })
                .then((data) => {
                    if (data?.data) {
                        toast({
                            description: data?.data
                        })
                        return navigation('/');
                    }
                })
                .catch((err) => {
                    if (err?.response?.data?.error) {
                        return toast({
                            description: err?.response?.data?.error
                        })
                    }
                })

        } catch (error) {
            console.log(error)
            return toast({
                description: error
            });
        }
        finally {
            setLoading(false)
            setPassword('')
            setConfirmPassword('')
        }
    }
    const [loading, setLoading] = useState(false)
    return (
        <div className='h-screen w-full flex items-center justify-center flex-col gap-2'>
            <div className='mb-2'>
                <h1 className="text-xl font-medium">Set New Password 🙈</h1>
                <p className='text-sm'>Please Enter New Password to Reset Password</p>
            </div>
            <div className='w-[300px] space-y-2'>
                <Input placeholder="New Password" type="password" className="focus-visible:ring-0" onChange={handlePasswordChange} autoComplete={'off'} />
                <Input placeholder="Confirm Password" type="password" className="focus-visible:ring-0" onChange={handleConfirmPasswordChange} autoComplete={'off'} />
                <Button className="mt-2 w-1/2" disabled={loading} onClick={handleVerify}>
                    {
                        loading ? <Loader className='animate-spin h-4 w-4' /> : "Reset Password"
                    }
                </Button>
            </div>
        </div>
    )
}

export default Verify