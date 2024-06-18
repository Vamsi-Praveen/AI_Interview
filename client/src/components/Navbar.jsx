import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { Button } from './ui/button';

const Navbar = () => {
    const { handleLogout } = useAuth();
    return (
        <nav className='px-[5%] py-4 flex items-center justify-between border-b border-gray-100'>
            <h1 className="text-xl font-semibold tracking-wide">AI Interview.</h1>
            <Button onClick={handleLogout}>Logout</Button>

        </nav>
    )
}

export default Navbar