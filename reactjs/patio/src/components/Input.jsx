import React from 'react'

const Input = ({title,value, onChange, disabled, icon }) => {
  return (
    <div className='flex flex-col gap-y-1'>
      <p className='ml-2'>{title}</p>
      <div className='flex items-center w-full '>
       <input type="text" 
          className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
          value={value}
          // onChange={onChange}
          disabled={disabled}
        />
        {icon && (
          <div className='mx-4'>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input