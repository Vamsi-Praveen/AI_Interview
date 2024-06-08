import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import useAxios from '@/hooks/useAxios';
import React from 'react'

const Dashboard = () => {
  const { handleLogout } = useAuth();
  const API = useAxios()
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const sendRequest = async () => {
    const response = await API.get(`${baseUrl}test-auth`);
    console.log(response)
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={sendRequest}>Send Request</Button>
    </div>
  )
}

export default Dashboard