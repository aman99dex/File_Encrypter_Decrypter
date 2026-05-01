import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
]

const Avatar = ({ name, size = 'md', index = 0 }) => {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '??'
  const gradient = avatarColors[index % avatarColors.length]
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sizeClass} rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white flex-shrink-0 shadow-sm`}>
      {initials}
    </div>
  )
}

const StatCard = ({ icon, label, value, gradient, glow }) => (
  <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} p-5 rounded-2xl border border-white/10 shadow-lg`}>
    <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full ${glow} blur-2xl`} />
    <div className='relative'>
      <div className='text-white/60 mb-3'>{icon}</div>
      <p className='text-3xl font-extrabold text-white tracking-tight'>{value}</p>
      <p className='text-white/60 text-xs font-medium mt-1'>{label}</p>
    </div>
  </div>
)

const inputClass = 'w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:bg-white/8 outline-none rounded-xl py-2.5 px-4 text-white text-sm placeholder:text-slate-600 transition-all duration-200'

const AdminDashboard = () => {
  const { loggedUser, logout, userData, setUserData } = useAuth()
  const [form, setForm] = useState({ assignTo: '', title: '', category: '', date: '', description: '' })
  const [successMsg, setSuccessMsg] = useState('')

  const totalActive    = userData?.reduce((s, e) => s + e.tasks.filter(t => t.active).length, 0) ?? 0
  const totalCompleted = userData?.reduce((s, e) => s + e.tasks.filter(t => t.completed).length, 0) ?? 0
  const totalFailed    = userData?.reduce((s, e) => s + e.tasks.filter(t => t.failed).length, 0) ?? 0

  const handleAssign = (e) => {
    e.preventDefault()
    const newTask = {
      id: Date.now(),
      title: form.title, description: form.description,
      date: form.date, category: form.category,
      active: false, newTask: true, failed: false, completed: false,
    }
    const updated = userData.map(emp =>
      emp.email === form.assignTo ? { ...emp, tasks: [...emp.tasks, newTask] } : emp
    )
    setUserData(updated)
    setSuccessMsg(`Task assigned to ${userData.find(e => e.email === form.assignTo)?.firstName}!`)
    setForm({ assignTo: '', title: '', category: '', date: '', description: '' })
    setTimeout(() => setSuccessMsg(''), 3500)
  }

  return (
    <div className='dot-grid min-h-screen'>
      {/* Navbar */}
      <nav className='sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/8 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center'>
              <span className='text-white font-extrabold text-xs'>EM</span>
            </div>
            <div>
              <span className='text-white font-semibold text-sm'>Employee Management</span>
              <span className='ml-2 text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full'>Admin</span>
            </div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-2.5'>
              <Avatar name={loggedUser.firstName} size='sm' index={4} />
              <div>
                <p className='text-white text-sm font-medium leading-none'>{loggedUser.firstName}</p>
                <p className='text-slate-500 text-xs mt-0.5'>{loggedUser.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className='flex items-center gap-2 bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/30 text-slate-400 hover:text-red-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200'
            >
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9' />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* greeting */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-white'>
            Good day, <span className='bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>{loggedUser.firstName}</span> 👋
          </h1>
          <p className='text-slate-500 text-sm mt-1'>Here's what's happening across your team today.</p>
        </div>

        {/* stat cards */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard
            gradient='from-blue-600/30 to-blue-800/20'
            glow='bg-blue-500/30'
            value={userData?.length ?? 0}
            label='Total Employees'
            icon={<svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}><path strokeLinecap='round' strokeLinejoin='round' d='M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' /></svg>}
          />
          <StatCard
            gradient='from-yellow-600/30 to-orange-800/20'
            glow='bg-yellow-500/30'
            value={totalActive}
            label='Active Tasks'
            icon={<svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}><path strokeLinecap='round' strokeLinejoin='round' d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' /></svg>}
          />
          <StatCard
            gradient='from-emerald-600/30 to-teal-800/20'
            glow='bg-emerald-500/30'
            value={totalCompleted}
            label='Completed'
            icon={<svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}><path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>}
          />
          <StatCard
            gradient='from-red-600/30 to-rose-800/20'
            glow='bg-red-500/30'
            value={totalFailed}
            label='Failed Tasks'
            icon={<svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}><path strokeLinecap='round' strokeLinejoin='round' d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z' /></svg>}
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
          {/* Employee list — 3 cols */}
          <div className='lg:col-span-3'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-white font-semibold text-base'>Team Overview</h2>
              <span className='text-xs text-slate-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full'>{userData?.length} members</span>
            </div>
            <div className='flex flex-col gap-3'>
              {userData?.map((emp, i) => {
                const counts = {
                  new: emp.tasks.filter(t => t.newTask).length,
                  active: emp.tasks.filter(t => t.active).length,
                  done: emp.tasks.filter(t => t.completed).length,
                  failed: emp.tasks.filter(t => t.failed).length,
                }
                const total = emp.tasks.length || 1
                const donePercent = Math.round((counts.done / total) * 100)

                return (
                  <div key={emp.id} className='group bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 p-4 rounded-2xl transition-all duration-200'>
                    <div className='flex items-center gap-3 mb-3'>
                      <Avatar name={`${emp.firstName} ${emp.lastName}`} index={i} />
                      <div className='flex-1 min-w-0'>
                        <p className='text-white font-semibold text-sm truncate'>{emp.firstName} {emp.lastName}</p>
                        <p className='text-slate-500 text-xs truncate'>{emp.email}</p>
                      </div>
                      <span className='text-xs text-slate-500 flex-shrink-0'>{emp.tasks.length} tasks</span>
                    </div>

                    {/* progress bar */}
                    <div className='mb-3'>
                      <div className='flex justify-between text-xs text-slate-600 mb-1'>
                        <span>Completion</span>
                        <span className='text-emerald-500'>{donePercent}%</span>
                      </div>
                      <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
                        <div
                          className='h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500'
                          style={{ width: `${donePercent}%` }}
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-4 gap-2'>
                      {[
                        { label: 'New',    value: counts.new,    bg: 'bg-blue-500/10',    text: 'text-blue-300',    border: 'border-blue-500/20' },
                        { label: 'Active', value: counts.active, bg: 'bg-yellow-500/10',  text: 'text-yellow-300',  border: 'border-yellow-500/20' },
                        { label: 'Done',   value: counts.done,   bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20' },
                        { label: 'Failed', value: counts.failed, bg: 'bg-red-500/10',     text: 'text-red-300',     border: 'border-red-500/20' },
                      ].map(s => (
                        <div key={s.label} className={`${s.bg} border ${s.border} p-2 rounded-xl text-center`}>
                          <p className={`font-bold text-sm ${s.text}`}>{s.value}</p>
                          <p className='text-xs text-slate-600'>{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Assign task — 2 cols */}
          <div className='lg:col-span-2'>
            <h2 className='text-white font-semibold text-base mb-4'>Assign New Task</h2>
            <form
              onSubmit={handleAssign}
              className='bg-white/5 border border-white/8 rounded-2xl p-5 flex flex-col gap-3 sticky top-24'
            >
              {successMsg && (
                <div className='flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs px-3 py-2.5 rounded-xl'>
                  <svg className='w-4 h-4 flex-shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}><path strokeLinecap='round' strokeLinejoin='round' d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
                  {successMsg}
                </div>
              )}

              <div>
                <label className='text-xs text-slate-500 font-medium mb-1.5 block'>Assign To</label>
                <select
                  required
                  className={inputClass + ' bg-slate-900/50'}
                  value={form.assignTo}
                  onChange={e => setForm({ ...form, assignTo: e.target.value })}
                >
                  <option value=''>Select employee…</option>
                  {userData?.map(emp => (
                    <option key={emp.id} value={emp.email}>{emp.firstName} {emp.lastName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className='text-xs text-slate-500 font-medium mb-1.5 block'>Task Title</label>
                <input
                  required type='text' placeholder='e.g. Fix login bug'
                  className={inputClass}
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='text-xs text-slate-500 font-medium mb-1.5 block'>Category</label>
                  <input
                    required type='text' placeholder='e.g. Bug Fix'
                    className={inputClass}
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className='text-xs text-slate-500 font-medium mb-1.5 block'>Due Date</label>
                  <input
                    required type='date'
                    className={inputClass}
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className='text-xs text-slate-500 font-medium mb-1.5 block'>Description</label>
                <textarea
                  required rows={4} placeholder='Describe the task in detail…'
                  className={inputClass + ' resize-none'}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <button
                type='submit'
                className='w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-0.5 transition-all duration-200 text-sm'
              >
                Assign Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
