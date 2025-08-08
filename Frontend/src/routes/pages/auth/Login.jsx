import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mock login
    const userData = {
      email,
      role: email === 'admin@example.com' ? 'admin' :
            email === 'owner@example.com' ? 'owner' : 'cashier'
    }

    login(userData)

    if (userData.role === 'admin') navigate('/admin')
    if (userData.role === 'owner') navigate('/owner')
    if (userData.role === 'cashier') navigate('/cashier')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login
