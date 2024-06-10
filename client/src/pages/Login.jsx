import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/context/AuthContext'
import axios from 'axios'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const { toast } = useToast();
    const { setUser, setToken, user } = useAuth()
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigation = useNavigate()
    useEffect(() => {
        if (user) {
            navigation('/dashboard')
        }
    }, [])
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleLogin = async () => {
        try {
            setLoading(true);
            if (loginDetails.email == '' || loginDetails.password == '') {
                return toast({
                    description: 'Please enter all feilds'
                });
            }
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
            if (!emailRegex.test(loginDetails.email)) {
                return toast({
                    description: 'Please enter valid email'
                });
            }
            await axios.post(`${baseUrl}auth/login`, loginDetails)
                .then((data) => {
                    setToken(data?.headers?.authorization);
                    setUser({ userId: data?.data?.userId, userName: data?.data?.userName });
                    navigation('/dashboard')
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
            setLoginDetails({
                email: '',
                password: ''
            })
        }
    }
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-3'>
            <h1 className='text-2xl font-semibold tracking-wide'>Welcome back 🤟,</h1>
            <div className='my-2 w-[300px] space-y-5'>
                <div className='space-y-3'>
                    <Input placeholder="Email Addresss" type="email" className="focus-visible:ring-0" name="email" onChange={handleChange} autoComplete={'off'} />
                    <Input placeholder="Password" type="password" className="focus-visible:ring-0" name="password" onChange={handleChange} />
                    <div className='flex items-center justify-between'>
                        <Button className="w-1/3" onClick={handleLogin} disabled={loading}>
                            {
                                loading ? <Loader className='animate-spin h-4 w-4' /> : "Login"
                            }
                        </Button>
                        <Link to={'/auth/forgot-password'}>
                            <p className='text-sm font-medium'>Forgot Password ?</p>
                        </Link>
                    </div>
                </div>
                <div className='m-1'>
                    <p className='text-sm tracking-wide'>Don't have an account,&nbsp;<Link className='font-medium' to={'/auth/register'}>Create One</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login