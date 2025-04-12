import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav'    

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()    

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (success){
        navigate("/login")
    }
    if (error) {
      setError(error.message)
    } else {
      setMessage('Password reset email sent! Check your inbox.')
    }
  }

  return (
    <div>
    <Nav/>
    <div className='items-center text-center'>
    <form onSubmit={handleForgotPassword} className="space-y-4 items-center max-w-md mx-auto">
      <h2 className="text-2xl mt-[100px] md:mt-[150px] lg:mt-[220px] items-center text-center font-bold">Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-[300px] md:w-full p-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit" className="w-[300px] md:w-full bg-green-600 text-white hover:bg-green-900 cursor pointer py-2 rounded-md">
        Send Reset Link
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
    </div>
    </div>
  )
}

export default ForgotPassword
