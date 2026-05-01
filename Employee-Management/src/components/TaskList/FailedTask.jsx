import React from 'react'

const FailedTask = ({ task }) => {
  return (
    <div className='flex-shrink-0 w-72 bg-white/5 border-l-4 border-l-red-500 border border-white/8 p-5 rounded-2xl flex flex-col gap-3 opacity-80'>
      <div className='flex items-center justify-between'>
        <span className='bg-red-500/15 text-red-300 border border-red-500/25 text-xs font-medium px-2.5 py-1 rounded-lg'>
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
        <h3 className='font-semibold text-white text-sm leading-snug'>{task.title}</h3>
      </div>

      <p className='text-slate-500 text-xs leading-relaxed line-clamp-3 flex-1'>{task.description}</p>

      <div className='flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 py-2 rounded-xl text-red-400 text-xs font-semibold'>
        <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
        </svg>
        Failed / Declined
      </div>
    </div>
  )
}

export default FailedTask
