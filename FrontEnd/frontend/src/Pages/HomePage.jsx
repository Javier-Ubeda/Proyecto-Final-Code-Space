import React, { useEffect } from 'react'
import PlatformList from '../Components/PlataformList'
import DashBoardComponent from '../Components/DashBoardComponent'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../Core/Services/UserServices'

const HomePage = () => {

    const navigate = useNavigate()

    useEffect(() => {
      if(!isAuthenticated()){
        navigate('/login')
      }
    }, [])

    
  return (
    <>
    <DashBoardComponent />
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <PlatformList />
    </div>
  </>
  )
}

export default HomePage