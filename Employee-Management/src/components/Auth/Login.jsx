import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const submitHandler = (e) => {
    e.preventDefault()
    setError('')
    const user = login(email, password)
    if (!user) {
      setError('Invalid email or password. Please try again.')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='dot-grid min-h-screen flex items-center justify-center px-4 relative overflow-hidden'>
      {/* ambient blobs */}
      <div className='pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl' />
      <div className='pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl' />

      <div className='relative w-full max-w-md'>
        {/* glow ring behind card */}
        <div className='absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 blur-xl' />

        <div className='relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl'>
          {/* logo mark */}
          <div className='flex justify-center mb-7'>
            <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/40'>
              <span className='text-white font-extrabold text-xl tracking-tight'>EM</span>
            </div>
          </div>

          <h1 className='text-2xl font-bold text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-1'>
            Employee Management
          </h1>
          <p className='text-slate-500 text-sm text-center mb-8'>Sign in to your workspace</p>

          <form onSubmit={submitHandler} className='flex flex-col gap-4'>
            {error && (
              <div className='flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl'>
                <svg className='w-4 h-4 flex-shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' />
                </svg>
                {error}
              </div>
            )}

            {/* email */}
            <div className='relative'>
              <svg className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' />
              </svg>
              <input
                required
                type='email'
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-white/5 border border-white/10 focus:border-emerald-500/60 focus:bg-white/8 outline-none rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 transition-all duration-200'
              />
            </div>

            {/* password */}
            <div className='relative'>
              <svg className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z' />
              </svg>
              <input
                required
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-white/5 border border-white/10 focus:border-emerald-500/60 focus:bg-white/8 outline-none rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 transition-all duration-200'
              />
            </div>

            <button
              type='submit'
              className='w-full mt-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200'
            >
              Sign In
            </button>
          </form>

          {/* demo credentials */}
          <div className='mt-7 p-4 bg-white/3 border border-white/8 rounded-2xl'>
            <p className='text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2'>Demo Credentials</p>
            <div className='space-y-1 text-xs text-slate-500'>
              <p><span className='text-slate-400 font-medium'>Admin</span> — admin@company.com / admin123</p>
              <p><span className='text-slate-400 font-medium'>Alice</span> — alice@company.com / 123</p>
              <p><span className='text-slate-400 font-medium'>Bob</span> — bob@company.com / 123</p>
              <p><span className='text-slate-400 font-medium'>Carol</span> — carol@company.com / 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
