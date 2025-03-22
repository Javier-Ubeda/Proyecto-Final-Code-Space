import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser, isAuthenticated } from '../Core/Services/UserServices'

const DashBoardComponent = () => {

    const navigate = useNavigate();

    const handleLogOut = () => {
        logoutUser()
        navigate('/login')
    }

    if(!isAuthenticated()) return null

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold"> Biblioteca Gamer</h1>
      <div className="space-x-4">
        <Link to="/home" className="hover:text-blue-400">Inicio</Link>
        <Link to="/collection" className="hover:text-blue-400">Mi colección</Link>
        <Link to="/games" className="text-white underline">Ver juegos</Link>
        <button
          onClick={handleLogOut}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}

export default DashBoardComponent