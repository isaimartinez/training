import React,{useState} from 'react'
import HeaderModal from './HeaderModal'
import {BiQrScan} from 'react-icons/bi'
import {Button} from '.'


import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from '../redux/reducers/viewSlice'
import { setCajonActivo, setScanned, setStatus } from '../redux/reducers/dataSlice'

const ScanView = ({statusCarga}) => {
  const state = useSelector((state) => state)
  const {cajones, cajonActivo, cargaActiva, scanned, } = state.data
  const {currentColor} = state.view
  const dispatch = useDispatch()
  const [scanning, setScanning] = useState(false)

  const onScan = () => {
      setScanning(true)
      setTimeout(() => {
        dispatch(setScanned(true))
      }, 1500);
  }
  
  const returnClass = () => {
    if(statusCarga == 0)
      return 'flex bg-white p-3 rounded-md  basis-11/12'
    else {
      return 'flex bg-white p-3 rounded-md  basis-10/12'
    }
   }

  return (
    <div className='flex flex-col p-3 w-full h-full  gap-2'>
      <HeaderModal title={`Scan ID ${statusCarga == 0 ? "Entrada":"Salida"}`} 
        statusCarga={statusCarga}
        cargaActiva={cargaActiva}
      />
      <div className={returnClass()}>

        <div className='basis-1/4 m-auto w-full'>
          {
            !scanning ? (
            <Button color="white" bgColor={currentColor} text="Scan" borderRadius="3px" size="xl" icon={<BiQrScan/>} func={()=>onScan()}/>
            ) : (
              <p className='text-slate-900 text-xl font-extrabold text-center'>Scanning...</p>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ScanView