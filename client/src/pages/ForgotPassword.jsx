import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleForgotPassword = async () => {
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
    }

    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-2">
            <div className='w-[400px]  flex flex-col'>
                <div>
                    <h1 className='text-2xl font-medium'>Uh-Oh, Forgot Password 😕</h1>
                    <p className='text-sm my-2'>Don't worry we will sent an email of instructions to reset the password</p>
                </div>
                <div className='mb-3'>
                    <Input placeholder="Email Addresss" type="email" className="focus-visible:ring-0" name="email" onChange={handleChange} autoComplete={'off'} />
                </div>
                <Button onClick={handleForgotPassword}>Send Email</Button>
            </div>
        </div >
    )
}

export default ForgotPassword