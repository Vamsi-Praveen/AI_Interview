import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const { toast } = useToast();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const navigation = useNavigate()
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleRegister = async () => {
        try {
            setLoading(true);
            if (userDetails.email == '' || userDetails.password == '' || userDetails.fullName == '') {
                return toast({
                    description: 'Please enter all feilds'
                });
            }
            let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
            if (!emailRegex.test(userDetails.email)) {
                return toast({
                    description: 'Please enter valid email'
                });
            }
            await axios.post(`${baseUrl}auth/register`, userDetails)
                .then((data) => {
                    toast({
                        description: 'Register Successfull'
                    })
                    return navigation('/')
                })
                .catch((err) => {
                    console.log(err)
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
            setUserDetails({
                fullName: '',
                email: '',
                password: ''
            })
        }
    }
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-3'>
            <h1 className='text-2xl font-semibold tracking-wide'>Join with us now 😎</h1>
            <div className='my-2 w-[300px] space-y-5'>
                <div className='space-y-3'>
                    <Input placeholder="Full Name" type="text" className="focus-visible:ring-0" name="fullName" onChange={handleChange} value={userDetails.fullName} />
                    <Input placeholder="Email Addresss" type="email" className="focus-visible:ring-0" name="email" onChange={handleChange} value={userDetails.email} />
                    <Input placeholder="Password" type="password" className="focus-visible:ring-0" name="password" onChange={handleChange} value={userDetails.password} />
                    <div className='flex items-center justify-between'>
                        <Button className="w-1/3" onClick={handleRegister} disabled={loading}>
                            {
                                loading ? <Loader className='animate-spin h-4 w-4' /> : "Register"
                            }
                        </Button>
                    </div>
                </div>
                <div className='m-1'>
                    <p className='text-sm tracking-wide'>Already have an account,&nbsp;<Link className='font-medium' to={'/auth/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register