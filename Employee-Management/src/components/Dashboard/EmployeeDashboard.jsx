import React from 'react'
import { useAuth } from '../../context/AuthContext'
import NewTask from '../TaskList/NewTask'
import AcceptTask from '../TaskList/AcceptTask'
import CompleteTask from '../TaskList/CompleteTask'
import FailedTask from '../TaskList/FailedTask'

const avatarColors = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-amber-600',
  'from-pink-500 to-rose-600',
]

const SectionHeader = ({ dot, label, count, color }) => (
  <div className='flex items-center gap-3 mb-4'>
    <span className={`w-2.5 h-2.5 rounded-full ${dot} flex-shrink-0`} />
    <h2 className={`font-semibold text-sm ${color}`}>{label}</h2>
    <span className='text-xs text-slate-600 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full'>{count}</span>
  </div>
)

const EmployeeDashboard = () => {
  const { loggedUser, userData, setUserData, logout } = useAuth()

  const employee = userData?.find(e => e.id === loggedUser.id) ?? loggedUser
  const tasks = employee.tasks ?? []

  const newTasks       = tasks.filter(t => t.newTask)
  const activeTasks    = tasks.filter(t => t.active)
  const completedTasks = tasks.filter(t => t.completed)
  const failedTasks    = tasks.filter(t => t.failed)

  const colorIndex = (employee.id ?? 0) % avatarColors.length
  const initials = `${employee.firstName?.[0] ?? ''}${employee.lastName?.[0] ?? ''}`.toUpperCase()

  const updateTask = (taskId, updates) => {
    setUserData(userData.map(emp =>
      emp.id === employee.id
        ? { ...emp, tasks: emp.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t) }
        : emp
    ))
  }

  const handleAccept   = (id) => updateTask(id, { newTask: false, active: true })
  const handleFail     = (id) => updateTask(id, { newTask: false, failed: true })
  const handleComplete = (id) => updateTask(id, { active: false, completed: true })

  const total = tasks.length || 1
  const donePercent = Math.round((completedTasks.length / total) * 100)

  return (
    <div className='dot-grid min-h-screen'>
      {/* Navbar */}
      <nav className='sticky top-0 z-10 bg-slate-950/80 backdrop-blur-xl border-b border-white/8 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center'>
              <span className='text-white font-extrabold text-xs'>EM</span>
            </div>
            <span className='text-white font-semibold text-sm hidden sm:block'>Employee Management</span>
          </div>
          <div className='flex items-center gap-4'>
            <div className='hidden sm:flex items-center gap-2.5'>
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${avatarColors[colorIndex]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {initials}
              </div>
              <div>
                <p className='text-white text-sm font-medium leading-none'>{employee.firstName} {employee.lastName}</p>
                <p className='text-slate-500 text-xs mt-0.5'>{employee.email}</p>
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
        {/* Hero greeting */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-white'>
              Welcome back, <span className='bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>{employee.firstName}</span> 👋
            </h1>
            <p className='text-slate-500 text-sm mt-1'>Here are all your tasks. Keep it up!</p>
          </div>
          {/* mini progress */}
          <div className='bg-white/5 border border-white/8 rounded-2xl px-5 py-3 min-w-44'>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-slate-500 text-xs'>Overall Progress</span>
              <span className='text-emerald-400 text-xs font-semibold'>{donePercent}%</span>
            </div>
            <div className='h-1.5 bg-white/5 rounded-full overflow-hidden'>
              <div
                className='h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700'
                style={{ width: `${donePercent}%` }}
              />
            </div>
            <p className='text-slate-600 text-xs mt-2'>{completedTasks.length} of {tasks.length} tasks done</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10'>
          {[
            { label: 'New Tasks',   value: newTasks.length,       from: 'from-blue-600/25',    to: 'to-blue-900/10',   glow: 'bg-blue-500/20',    text: 'text-blue-300' },
            { label: 'In Progress', value: activeTasks.length,    from: 'from-yellow-600/25',  to: 'to-yellow-900/10', glow: 'bg-yellow-500/20',  text: 'text-yellow-300' },
            { label: 'Completed',   value: completedTasks.length, from: 'from-emerald-600/25', to: 'to-emerald-900/10',glow: 'bg-emerald-500/20', text: 'text-emerald-300' },
            { label: 'Failed',      value: failedTasks.length,    from: 'from-red-600/25',     to: 'to-red-900/10',    glow: 'bg-red-500/20',     text: 'text-red-300' },
          ].map(s => (
            <div key={s.label} className={`relative overflow-hidden bg-gradient-to-br ${s.from} ${s.to} border border-white/8 p-5 rounded-2xl`}>
              <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full ${s.glow} blur-2xl`} />
              <p className={`text-3xl font-extrabold ${s.text} tracking-tight`}>{s.value}</p>
              <p className='text-slate-500 text-xs mt-1'>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Task lanes */}
        <div className='space-y-8'>
          {newTasks.length > 0 && (
            <section>
              <SectionHeader dot='bg-blue-400' label='New Tasks' count={newTasks.length} color='text-blue-300' />
              <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2'>
                {newTasks.map(task => (
                  <NewTask key={task.id} task={task} onAccept={handleAccept} onFail={handleFail} />
                ))}
              </div>
            </section>
          )}

          {activeTasks.length > 0 && (
            <section>
              <SectionHeader dot='bg-yellow-400 animate-pulse' label='In Progress' count={activeTasks.length} color='text-yellow-300' />
              <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2'>
                {activeTasks.map(task => (
                  <AcceptTask key={task.id} task={task} onComplete={handleComplete} />
                ))}
              </div>
            </section>
          )}

          {completedTasks.length > 0 && (
            <section>
              <SectionHeader dot='bg-emerald-400' label='Completed' count={completedTasks.length} color='text-emerald-300' />
              <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2'>
                {completedTasks.map(task => (
                  <CompleteTask key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {failedTasks.length > 0 && (
            <section>
              <SectionHeader dot='bg-red-400' label='Failed / Declined' count={failedTasks.length} color='text-red-300' />
              <div className='flex gap-4 overflow-x-auto scrollbar-hide pb-2'>
                {failedTasks.map(task => (
                  <FailedTask key={task.id} task={task} />
                ))}
              </div>
            </section>
          )}

          {tasks.length === 0 && (
            <div className='flex flex-col items-center justify-center py-32 text-center'>
              <div className='w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4'>
                <svg className='w-8 h-8 text-slate-600' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.5}>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
              </div>
              <p className='text-white font-semibold text-lg'>No tasks yet</p>
              <p className='text-slate-600 text-sm mt-1'>Your admin hasn't assigned any tasks. Check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard
