import React from 'react'

const Button = ({color, bgColor, text, borderRadius, size, icon, func, disabled, borderDashed}) => {
  return (
    <button type='button' style={{backgroundColor: bgColor, color, borderRadius}}
      className={`flex text-${size} ${borderDashed && "border-dashed border border-slate-400"} p-3 hover:drop-shadow-xl w-full items-center justify-center gap-2`}
      onClick={func}
      disabled={disabled}
    >
      {icon} {text}
    </button>
  )
}

export default Button