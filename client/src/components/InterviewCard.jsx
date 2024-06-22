import React from 'react'
import { useNavigate } from 'react-router-dom'

const InterviewCard = ({ data }) => {
    const navigate = useNavigate()
    return (
        <div className='p-4 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-50 transition-all delay-75' onClick={() => { navigate(`/dashboard/interview_feedback/${data?._id}`) }}>
            <h1 className='font-medium'>Job Position: <strong>{data?.jobPosition}</strong></h1>
            <h1 className='font-medium'>Skills: <strong>{data?.skills}</strong></h1>
            <h1 className='font-medium'>Level: <strong>{data?.experience}</strong></h1>
        </div>
    )
}

export default InterviewCard