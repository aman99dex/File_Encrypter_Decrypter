import React from 'react'

const AcceptTask = ({ task, onComplete }) => {
  return (
    <div className='group flex-shrink-0 w-72 bg-white/5 hover:bg-white/8 border-l-4 border-l-yellow-500 border border-white/8 hover:border-white/15 p-5 rounded-2xl flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/10'>
      <div className='flex items-center justify-between'>
        <span className='bg-yellow-500/15 text-yellow-300 border border-yellow-500/25 text-xs font-medium px-2.5 py-1 rounded-lg'>
          {task.category}
        </span>
        <div className='flex items-center gap-1.5 text-slate-500 text-xs'>
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' />
          </svg>
          {task.date}
        </div>
      </div>

      <div>
        <span className='inline-flex items-center gap-1.5 text-xs text-yellow-400 font-medium mb-2'>
          <span className='w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse' />
          In Progress
        </span>
        <h3 className='font-semibold text-white text-sm leading-snug'>{task.title}</h3>
      </div>

      <p className='text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1'>{task.description}</p>

      <button
        onClick={() => onComplete(task.id)}
        className='flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-2 rounded-xl text-xs font-semibold shadow-sm shadow-emerald-500/20 transition-all duration-200 pt-1'
      >
        <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
        </svg>
        Mark Complete
      </button>
    </div>
  )
}

export default AcceptTask
