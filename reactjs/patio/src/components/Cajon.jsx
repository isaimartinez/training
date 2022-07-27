import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { turnModalOn } from '../redux/reducers/viewSlice'
import { setCajonActivo, setAcumulado } from '../redux/reducers/dataSlice'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

const Cajon = ({cajon,i}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [statusCajon, setStatusCajon] = useState(0)  

  useEffect(() => {
    let countInProcess = 0
    let acumulado = 0
    cajon.cargas.map((carga, i) => {
      if(carga.statusCarga == 1){countInProcess++}
      if(carga.statusCarga == 2){
        let pesoNIndex = carga.inputs.findIndex(obj => obj.id == "pesoN")
        let peso = parseInt(carga.inputs[pesoNIndex].value)
        acumulado += peso
      }
    })
    if(countInProcess > 0) {
      setStatusCajon(1)
    }else if(countInProcess == 0 && getPer() <= 90 && getPer() > 0){
      //blue
      setStatusCajon(2)
    } else if(countInProcess == 0 && getPer() >= 90 ) {
      setStatusCajon(3)
    }
    // setStatusCajon(2)
    dispatch(setAcumulado({i,acumulado}))
  }, [cajon])
  

  const handleClick = () => {
    dispatch(setCajonActivo(i))
    if(statusCajon == 0) {
      openModalCajon()
    } else if (statusCajon == 1) {
      openModalSalida()
    } else {
      openModalInfo()
    }
  }

  const openModalSalida = () => {
    dispatch(turnModalOn("isActiveModalSalida"))
  }

  const openModalInfo = () => {
    dispatch(turnModalOn("isActiveModalSalida"))
  }

  const openModalCajon = () => {
    dispatch(turnModalOn("isActiveModalCajon"))
  }

  const getPer = () => {
    let p =((cajon.acumulado/cajon.capacidad)*100).toFixed(0)
    if (p > 100){p=100}
    return p
  }

  const[isPointerHover, setIsPointerHover] = useState(false)

  return (
      <div className={`${statusCajon == 1 && "animate-pulse bg-orange-400"} ${statusCajon == 0 && "bg-slate-200	"} ${statusCajon == 3 && " bg-green-400"} ${statusCajon == 2 && " bg-blue-400 "} flex flex-auto w-40 h-40 rounded-lg shadow-sm 
        dark:shadow-orange-50 dark:shadow-sm	hover:drop-shadow-2xl justify-center items-center content-center cursor-pointer
        hover:visible
        `}
        onClick={handleClick}
        onMouseEnter={() => setIsPointerHover(true)}
        onMouseLeave={() => setIsPointerHover(false)}
      >
        <div>
          {/* Add Graph on Hover */}
          <p className='text-center font-bold	text-lg'>{cajon.id}</p>
          <p className={`text-center ${isPointerHover ? "visible" : "invisible"}  font-light	text-xl	text-slate-600`}>{getPer()}%</p>
        </div>
      </div>
  )
}

export default Cajon