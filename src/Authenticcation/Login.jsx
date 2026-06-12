import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import { Shield, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react'

const LoginPage = ({ onLogin }) => {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    onLogin(data.session)
  }

  return (
    <div className='min-h-screen bg-[#f4f7f5] flex items-center justify-center p-4'>
      <div className='w-full max-w-sm'>

        <div className='flex flex-col items-center mb-8'>
          <div className='w-14 h-14 rounded-2xl bg-[#1a4731] flex items-center justify-center shadow-lg mb-4'>
            <Shield size={26} className='text-[#3dba6f]' />
          </div>
          <h1 className='text-[#1a4731] text-[22px] font-bold tracking-tight'>COR'N Admin</h1>
          <p className='text-gray-400 text-[13px] mt-1'>Sign in to manage loan applications</p>
        </div>

        {/* Card */}
        <div className='bg-white rounded-3xl shadow-sm border border-gray-100 p-8'>
          <form onSubmit={handleSubmit} className='space-y-5'>

            {/* Email */}
            <div className='space-y-1.5'>
              <label className='block text-[12px] font-semibold text-gray-500 uppercase tracking-wide'>
                Email address
              </label>
              <input
                type='email'
                required
                autoComplete='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='admin@example.com'
                className='w-full px-4 py-3 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 transition-all placeholder-gray-300'
              />
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <label className='block text-[12px] font-semibold text-gray-500 uppercase tracking-wide'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete='current-password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='w-full px-4 py-3 pr-11 text-[14px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 transition-all placeholder-gray-300'
                />
                <button
                  type='button'
                  onClick={() => setShowPw(v => !v)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className='flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-[13px] px-4 py-3 rounded-xl'>
                <AlertCircle size={14} className='flex-shrink-0' />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='w-full flex items-center justify-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[14px] py-3.5 rounded-xl transition-all mt-2'
            >
              {loading
                ? <><Loader2 size={16} className='animate-spin' /> Signing in…</>
                : 'Sign in'}
            </button>
          </form>
        </div>

        <p className='text-center text-gray-300 text-[12px] mt-6'>
          Restricted access — authorised personnel only
        </p>
      </div>
    </div>
  )
}

export default LoginPage