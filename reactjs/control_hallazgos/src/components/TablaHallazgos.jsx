import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setHallazgoActivo, setHallazgos } from '../redux/reducers/dataSlice'
import { turnModalOn } from '../redux/reducers/viewSlice'

import {AiOutlineCheck, AiOutlineClose} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import {CgCloseR} from 'react-icons/cg'

import {Prioridad} from './'

const TablaHallazgos = ({hallazgos, grid}) => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [lastSorted, setLastSorded] = useState("")
  const [reverse, setReverse] = useState(true)

  const handleSelectedRow = (i) => {
    dispatch(setHallazgoActivo(i))
    dispatch(turnModalOn("isActiveModalSalida"))
  }
  
  const isOdd = (num) => { return num % 2;}

  const onSort = (param) => {
    console.log("onSort", param, lastSorted, reverse)
    let x = [...hallazgos]
    if(param == "status"){param = "isActive"}
    if(lastSorted == param && reverse){
      console.log("a")
      x.sort((a,b) => b[param].localeCompare(a[param]));
      setReverse(!reverse)
    }else {
      console.log("b")
      x.sort((a,b) => a[param].localeCompare(b[param]));
      if(lastSorted == param && !reverse){setReverse(!reverse)}
      else {setReverse(true)}
    }
    // .sort((a, b) => a.last_nom.localeCompare(b.last_nom))
    setLastSorded(param)
    dispatch(setHallazgos(x))
  }
  

  return (
    <>
      <table className='table-auto w-full border-collapse border border-slate-300' >
        <thead className=''>
          <tr>
            {grid.map((item,i) => (
              <th className='border border-slate-200 p-5 cursor-pointer' key={i} style={{textTransform: "capitalize"}}
                onClick={() =>onSort(item.title)} 
              >
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hallazgos.map((item,i) => (
            <tr className='m-5 cursor-pointer hover:drop-shadow-xl hover:bg-slate-50' onClick={()=>handleSelectedRow(i)} key={i}>
              <td className='border border-slate-300 p-4'>{item.hallazgo}</td>
              <td className='border border-slate-300 p-4'>{item.descripcion.length > 25 ? item.descripcion.substring(0,25) + "..." : item.descripcion}</td>
              <td className='border border-slate-300 p-4 text-center' >{item.area}</td>
              <td className='border border-slate-300 p-4 text-center' style={{borderWidth: 0.1}}>{<Prioridad item={item}/>}</td>
              <td className='border border-slate-300 p-4 text-center text-2xl' style={{verticalAlign: "middle"}}>
                <button>
                  {item.isActive == "1" ? <AiOutlineClose color="" className='m-auto'/> : <AiOutlineCheck color='rgb(34 197 94)' className='m-auto'/>}
                </button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default TablaHallazgos