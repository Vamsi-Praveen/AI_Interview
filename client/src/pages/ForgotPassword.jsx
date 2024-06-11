import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const handleForgotPassword = async () => {
        try {
            setLoading(true)
            if (email == '') {
                return toast({
                    description: 'Email Required'
                });
            }
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
            if (!emailRegex.test(email)) {
                return toast({
                    description: 'Please enter valid email'
                });
            }
            await axios.post(`${baseUrl}auth/forgot-password`, { email })
                .then((data) => {
                    if (data?.data) {
                        return toast({
                            description: data?.data
                        })
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
            setEmail('')
        }
    }

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
            <div className='md:w-[400px] w-[300px] flex flex-col'>
                <div>
                    <h1 className='text-2xl font-medium'>Uh-Oh, Forgot Password 😕</h1>
                    <p className='text-sm my-2'>Don't worry we will sent an email of instructions to reset the password</p>
                </div>
                <div className='mb-3'>
                    <Input placeholder="Email Addresss" type="email" className="focus-visible:ring-0" name="email" onChange={handleChange} autoComplete={'off'} value={email} />
                </div>
                <Button onClick={handleForgotPassword} disabled={loading}>
                    {
                        loading ? <Loader className='animate-spin h-4 w-4' /> : "Send Email"
                    }
                </Button>
                <p className='text-sm my-2'>Back to <Link to="/auth/login"><span className='font-medium underline'>Login</span></Link></p>
            </div>
        </div >
    )
}

export default ForgotPassword