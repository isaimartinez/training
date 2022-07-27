import React from 'react'

const Button = ({color, bgColor, text, borderRadius, size, icon, func}) => {
  return (
    <button type='button' style={{backgroundColor: bgColor, color, borderRadius}}
      className={`text-${size} p-3 hover:drop-shadow-xl`}
      onClick={func}
    >
      {icon} {text}
    </button>
  )
}

export default Button