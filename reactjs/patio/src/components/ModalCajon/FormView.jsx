import React,{useState, useEffect, useReducer} from 'react'
import HeaderModal from '../HeaderModal'
import {FiSave} from 'react-icons/fi'
import {Button, Input, Select} from '..'
import {FaWeightHanging} from 'react-icons/fa'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from '../../redux/reducers/viewSlice'
import { setStatus, modifyData, setStatusCarga, setCargaActiva, setCajonActivo } from '../../redux/reducers/dataSlice'

const options = [
  { value: 'Granzon', label: 'Granzon' },
  { value: 'Fino', label: 'Fino' },
  { value: 'Concentrado', label: 'Concentrado' }
]

const FormView = ({statusCarga}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {currentColor} = state.view
  const {cajonActivo,cargaActiva, cajones} = state.data
  const carga = cajones[cajonActivo].cargas[cargaActiva]
  const [inputs, setInputs] = useState(carga.inputs)

  useEffect(() => {
    setInputs(cajones[cajonActivo].cargas[cargaActiva].inputs)
  }, [cajones])

  const onSave = () => {
    if(statusCarga == 0) {
      dispatch(setStatusCarga(1))

    } else if(statusCarga == 1) {
      dispatch(setStatusCarga(2))
    }
    if(statusCarga < 2) {
      //setStatusCarga++
      //torretas = 1
      //cajon = 1
    }
    dispatch(turnModalsOff())
    dispatch(setCargaActiva(-1))
    dispatch(setCajonActivo(-1))
  }
  
  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const onWeight = (i) => {
    // data[i].value = Math.floor(Math.random() * 100000) + 1
    let nC = {...inputs[i]} 

    let pesoEIndex = inputs.findIndex(obj => obj.id == "pesoE")
    let pesoSIndex = inputs.findIndex(obj => obj.id == "pesoS")
    let pesoE = parseInt(inputs[pesoEIndex].value)
    let pesoS = parseInt(inputs[pesoSIndex].value)
    let maxCap = cajones[cajonActivo].capacidad
    if(i == pesoEIndex) {
      nC.value = getRandomArbitrary(maxCap-maxCap*0.8,maxCap)
    } else {
      nC.value = getRandomArbitrary(0,maxCap-maxCap*0.8)
    }
    dispatch(modifyData({i:i, data: nC}))
  }

  const isDisabled = () => {
    let material, pesoE, pesoS
    material = inputs.findIndex(obj => obj.id == "material")
    pesoE = inputs.findIndex(obj => obj.id == "pesoE")
    pesoS = inputs.findIndex(obj => obj.id == "pesoS")

    if(inputs[material].value == "" && statusCarga == 0){
      return true
    } else if(inputs[pesoE].value == "0" && statusCarga == 0){
      return true
    } else if(inputs[pesoS].value == "0" && statusCarga == 1){
      return true
    }else {
      return false
    }
  }

  const handleSelect = (selectedOption) => {
    let material = inputs.findIndex(obj => obj.id == "material")
    prepareDataForModification(selectedOption.value, material)
  }

  const prepareDataForModification = (value, i) => {
    let newData = {...inputs[i], value}
    dispatch(modifyData({i,data:newData}))
  }

  return (
    <div className='flex flex-col p-3 w-full h-full  gap-2'>
      <HeaderModal title="Datos Carga" statusCarga={statusCarga} cargaActiva={cargaActiva} />
      <div className='flex flex-col gap-y-4 bg-white p-3 rounded-md  basis-10/12'>
        {
          inputs.map((item, i) => ( 
            <div key={i} className="flex flex-col gap-y-3">
            {
              item.status > statusCarga ? (null) : (
              <>
                {item.type == 2 ? <Select {...item} options={options} onChange={(selectedOption) => handleSelect(selectedOption)} disabled={statusCarga == 0 ? false : true}/> : <Input {...item} disabled />}
                {item.id.startsWith("peso")&& item.type == 1 && statusCarga == item.status && 
                  <div className='px-5'>
                    <Button color="white" bgColor={currentColor} text="Pesar" 
                      borderRadius="3px" size="xl" icon={<FaWeightHanging/>}
                      func={()=>onWeight(i)}
                    />
                  </div>
                }
              </>

            ) }
            </div>
          ))
        }
      </div>
      
      {statusCarga < 2 &&
        <div className='flex justify-between bg-white p-3 rounded-md  basis-1/12'>
          <Button color="white" bgColor={currentColor} text="Guardar" 
            borderRadius="3px" size="xl" icon={<FiSave/>}
            func={() =>onSave()} disabled={isDisabled()}
          />  
        </div>
      }
        
    </div>
  )
}

export default FormView