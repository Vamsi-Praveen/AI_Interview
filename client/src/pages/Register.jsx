import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center flex-col gap-3'>
            <h1 className='text-2xl font-semibold tracking-wide'>Join with us now 😎</h1>
            <div className='my-2 w-[300px] space-y-5'>
                <div className='space-y-3'>
                    <Input placeholder="Full Name" type="text" className="focus-visible:ring-0" />
                    <Input placeholder="Email Addresss" type="email" className="focus-visible:ring-0" />
                    <Input placeholder="Password" type="password" className="focus-visible:ring-0" />
                    <div className='flex items-center justify-between'>
                        <Button className="w-1/3">Register</Button>
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