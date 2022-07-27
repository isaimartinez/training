import React from 'react'

export const Pagination = ({onLeftClick, onRightClick, page, totalPages}) => {
  const r = ">"
  const l = "<"

  return (
    <div className='pagination'>
        <button onClick={onLeftClick} className='pagination-btn'>
            <div><p>{l}</p></div>
        </button>
        <div>{page+1} de {totalPages}</div>
        <button onClick={onRightClick} className='pagination-btn'>
            <div><p>{r}</p></div>
        </button>
    </div>
  )
}
