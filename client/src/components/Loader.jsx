import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <Loader className="animate-spin h-4 w-4" />
        </div>
    )
}

export default Loading