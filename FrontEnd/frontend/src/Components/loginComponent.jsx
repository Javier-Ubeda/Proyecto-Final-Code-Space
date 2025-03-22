import React, { useState } from 'react'
import { registerUser, loginUser } from '../Core/Services/UserServices'
import { useNavigate } from 'react-router-dom'

const LoginComponent = () => {

    const [mode, setMode] = useState('login')
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
        setForm({username:'', email: '', password: ''})
    }

    const handleChange = (name, value) => {
        setForm({...form,
            [name] : value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if(mode === 'register'){
                await registerUser(form)
                console.log('Te has registrado con exito')
                alert('Te has registrado con exito')
                setMode('login')
            } else {
                const user = await loginUser(form)
                alert(`Bienvenido ${user.username}`)
                console.log('Bienbenido')
                navigate('/home')
            }
        } catch (error) {
            console.error(error.response?.data?.message || error.message)
        }
    }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
  <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-md p-6">
    <h2 className="text-2xl font-bold text-center text-white mb-6">
      {mode === "login" ? "Iniciar sesión" : "Registrarse"}
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "register" && (
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={form.username}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded text-white font-semibold"
      >
        {mode === "login" ? "Entrar" : "Registrarse"}
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-gray-400">
      {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
      <button onClick={toggleMode} className="text-blue-400 hover:underline">
        {mode === "login" ? "Regístrate aquí" : "Inicia sesión aquí"}
      </button>
    </p>
  </div>
</div>
  )
}

export default LoginComponent