import React, {useEffect, useState} from 'react'
import HeaderModal from '../HeaderModal'
import {GiMineTruck} from 'react-icons/gi'
import {Button, PieChart} from '../'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from '../../redux/reducers/viewSlice'
import { addCarga, setCargaActiva } from '../../redux/reducers/dataSlice'

import Server from '../../APIs/FakeServer'

const CargaSelector = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {currentColor} = state.view
  const {cajonActivo, cajones} = state.data
  const cajon = cajones[cajonActivo]
  const {cargas, id} = cajon 
  const [showChart, setShowChart] = useState(false)

  useEffect(() => {
    let countListo = 0
    cajon.cargas.map((carga, i) => {
      if(carga.statusCarga == 2){countListo++}
    })
    if(countListo > 0){
      setShowChart(true)
    } 
  }, [cajon])
  

  const onAddCarga = () => {
    Server.getCargaStructure().then((struct) => {
      let i = cargas.length
      dispatch(addCarga(struct))
      dispatch(setCargaActiva(i))
    })
  }


  const getPer = () => {
    let p =(cajon.acumulado/cajon.capacidad)*100
    if (p > 100){p=100}
    return p
  }

  const openDetailsCarga = (i) => {
    dispatch(setCargaActiva(i))
    // setIsCargaSelected(true)
  }

  const getMaterial = (carga) => {
  let materialIndex = carga.inputs.findIndex(obj => obj.id == "material")
    return carga.inputs[materialIndex].value
  }

  const getPeso = (carga) => {
    let pesoNIndex = carga.inputs.findIndex(obj => obj.id == "pesoN")
    return carga.inputs[pesoNIndex].value
  }

  const returnBg = (carga) => {
    if(carga.statusCarga == 1) {
      return " bg-orange-400 animate-pulse "
    } else {
      let materialIndex = carga.inputs.findIndex(obj => obj.id == "material")
      let material = carga.inputs[materialIndex].value
      let gradient = " bg-gradient-to-r from-slate-200 via-slate-200 "
      switch (material) {
        case "Granzon":
          gradient += " to-emerald-500 "
          break;
        case "Fino":
          gradient += " to-sky-400 "
          break;
        case "Concentrado":
          gradient += " to-rose-500 "
          break;
        default:
          break;
      }
      console.log("gradient", gradient)
      return gradient
    }
  }

  return (
    <div className='flex flex-col p-3 w-full h-full  gap-2'>
      <HeaderModal title={"Lote " + id} />
      <div className='flex flex-col gap-y-4 bg-white p-3 rounded-md  basis-10/12'>
        {
          cargas.map((carga, i) => (
            <div key={i} onClick={()=>openDetailsCarga(i)}
              className={`flex flex-row gap-y-1 ${returnBg(carga)}  p-3 hover:drop-shadow-xl w-full justify-start gap-2 rounded cursor-pointer`}
            >
              <p>{getMaterial(carga)}</p>
              {carga.statusCarga == 2 && (<p> | <span>{getPeso(carga)}</span> Toneladas </p>)}
            </div>
          ))
        }    

        {
          getPer() < 100 && (
            <Button bgColor="transparent" text="Añadir Carga" color={"rgb(148 163 184)"} 
              borderDashed borderRadius="3px" 
              icon={<GiMineTruck />}
              disabled={getPer() == 100 ? true: false }
              func={() => onAddCarga()}
            />
          )
        }
        {
          showChart && <PieChart cajon={cajon} />
        }
      </div>
    </div>
  )
}

export default CargaSelector