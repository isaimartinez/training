import React from 'react'
import {GrClose} from 'react-icons/gr'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../context/ContextProvider';


import { useSelector, useDispatch } from 'react-redux'
import { turnModalsOff} from '../redux/reducers/viewSlice'
import { setScanned, setCargaActiva, setCajonActivo, deleteCarga } from '../redux/reducers/dataSlice'

const HeaderModal = ({title, statusCarga, cargaActiva}) => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(turnModalsOff())
    if(statusCarga == 0) {
      // delete carga
      dispatch(deleteCarga(cargaActiva))
    }

    dispatch(setCargaActiva(-1))
    dispatch(setCajonActivo(-1))
    dispatch(setScanned(false))
  }  
  return (
    <div className='flex justify-between bg-white p-3 rounded-md basis-1/12 items-center'>
      <p className='text-slate-900 text-2xl font-extrabold'>{title}</p>
      <TooltipComponent content='Close' position='TopCenter'>
        <button type='button'
          onClick={closeModal}
          className='text-2xl hover:drop-shadow-xl hover:bg-light-gray'
        >
          <GrClose />
        </button>
      </TooltipComponent>
    </div>
  )
}

export default HeaderModal