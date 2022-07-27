import React from 'react'
import Select from 'react-select'
const options = [
  { value: 'Granzon', label: 'Granzon' },
  { value: 'Fino', label: 'Fino' },
  { value: 'Concentrado', label: 'Concentrado' }
]

const SelectView = ({title,value, onChange, disabled, icon }) => {
    const returnVal = () => {
      if(value.length > 0) {
        let v = {value: value, label: value}
        return v
      }
  }
  return (
    <div className='flex flex-col gap-y-1'>
      <p className='ml-2'>{title}</p>
      <div className='flex items-center w-full '>
        <Select options={options} value={returnVal()} onChange={onChange} isDisabled={disabled}
          className='mt-1 block w-full rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
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

export default SelectView