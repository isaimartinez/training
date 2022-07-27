import React from 'react'
import {GrClose} from 'react-icons/gr'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


import { useSelector, useDispatch } from 'react-redux'
import { turnModalsOff} from '../redux/reducers/viewSlice'
import {  setHallazgoActivo, deleteHallazgo } from '../redux/reducers/dataSlice'

const HeaderModal = ({title, statusHallazgo, hallazgoActivo}) => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(turnModalsOff())
    if(statusHallazgo == 0) {
      // delete carga
      dispatch(deleteHallazgo(hallazgoActivo))
      dispatch(setHallazgoActivo(-1))
    }
    dispatch(setHallazgoActivo(-1))
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