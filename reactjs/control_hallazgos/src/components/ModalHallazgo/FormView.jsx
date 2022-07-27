import React,{useState, useEffect, useReducer} from 'react'
import HeaderModal from '../HeaderModal'
import {FiSave} from 'react-icons/fi'
import {Button, Input, Select} from '..'
import {FaWeightHanging} from 'react-icons/fa'
import {AiOutlinePicture} from 'react-icons/ai'
import { toast } from 'react-toastify';

import antes from '../../img/antes.jpg'
import despues from '../../img/despues.jpg'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, } from '../../redux/reducers/viewSlice'
import {  modifyData, setStatusHallazgo, setHallazgoActivo} from '../../redux/reducers/dataSlice'

const options = [
  { value: 'Granzon', label: 'Granzon' },
  { value: 'Fino', label: 'Fino' },
  { value: 'Concentrado', label: 'Concentrado' }
]

const FormView = ({statusHallazgo}) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {currentColor} = state.view
  const {hallazgoActivo, hallazgos} = state.data
  const [hallazgo, setHallazgo] = useState({})
  const [names, setNames] = useState([])
  const [values, setValues] = useState([])
  const [status, setStatus] = useState(undefined)
  const [imgH, setImgH] = useState(-1)
  const [imgS, setImgS] = useState(-1)
  const [notas, setNotas] = useState(-1)
  const [imgHallazgo, setImgHallazgo] = useState(null)
  const [imgSolucion, setImgSolucion] = useState(null)

  useEffect(() => {
    setHallazgo(hallazgos[hallazgoActivo])
    console.log("render", hallazgos[hallazgoActivo])
    let x = []
    let val = []
    let i =0
    for(var k in hallazgos[hallazgoActivo]){
      x.push(k)
      console.log(i,k)
      if(k== "imgHallazgo") {console.log(i); setImgH(i); setImgHallazgo(hallazgos[hallazgoActivo][k])}
      if(k=="imgSolucion") {console.log(i); setImgS(i); setImgSolucion(hallazgos[hallazgoActivo][k])}
      if(k=="notas") {console.log(i); setNotas(i);}
      val.push(hallazgos[hallazgoActivo][k]);
      i++
    }
    setNames(x)
    setValues(val)
    setStatus(hallazgos[hallazgoActivo].status)
  }, [hallazgoActivo, hallazgos])

  const modifyLocalData = (i, e, direct) => {
    let v = [...values]
    if(direct){
      v[i] = e
    }else {
      v[i] = e.target.value
    }
    setValues(v)
  }

  const onSave = () => {
    let data = {}
    for (let i = 0; i < names.length; i++) {
      let name = names[i]
      let val = values[i]
      data[name] = val      
    }
    data.status = data.status+1
    if(data.status == 1){
      toast.info("Hallazgo notificado por correo!", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    if(data.status == 2){
      toast.success("Hallazgo concluido exitosamente!", {
        position: toast.POSITION.TOP_RIGHT
      });
      data.isActive = "0"
    }
    dispatch(modifyData(data))
    dispatch(turnModalsOff())
    dispatch(setHallazgoActivo(-1))
  }

  const handleSelect = (selectedOption, i) => {
    modifyLocalData(i,selectedOption.value, true)
  }

  const returnImg = (val) => {
    console.log("returnImg", val)
    if(val == "antes"){return antes}
    else if(val == "despues"){return despues}
    else {
      return val
    }
  }


  const getInput = (item,i) => {
    if(item == "isActive" || item == "status" || item == "imgHallazgo" || item == "imgSolucion" || item == "notas"){
      return null
    }
    else if(item == "area" || item == "prioridad") {
      return (<Select title={item} value={values[i]} key={i} onChange={(selectedOption) => handleSelect(selectedOption,i)} />)
    } else {
      return <Input key={i} title={item} value={values[i]} onChange={(e) => modifyLocalData(i,e,false)} textArea={item == "descripcion"}/>
    }
  }

  const renderPics = () => {
    return(
      <div className='flex flex-row w-full items-center justify-center gap-x-2'>

        <div className='flex flex-1 flex-col justify-center h-56 border rounded border-slate-200	'>
          <p className='flex-none text-center' style={{textTransform: "capitalize"}}>Evidencia Inicial</p>
          {
            imgHallazgo == null ? (
              <div className='flex flex-1 items-center justify-center'>
                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    let url = URL.createObjectURL(event.target.files[0])
                    modifyLocalData(imgH,url,true)
                    setImgHallazgo(url)
                  }}
                />
              </div>
            ) : (
              <div className='flex flex-1 justify-center'>
                <img alt="not fount" width={"208px"} src={returnImg(values[imgH])}/>
              </div>
            )
          }
        </div>
        <div className='flex flex-1 flex-col justify-center h-56 border rounded border-slate-200	'>
          { status > 0 &&  <p className='flex-none text-center' style={{textTransform: "capitalize"}}>Evidencia Final</p>}
          {
            imgSolucion == null ? ( <>
                {
                  status > 0 && ( 
                    <div className='flex flex-1 items-center justify-center'>
                      <input
                        type="file"
                        name="myImage2"
                        onChange={(event) => {
                          let url = URL.createObjectURL(event.target.files[0])
                          modifyLocalData(imgS,url,true)
                          setImgSolucion(url)
                        }}
                      />
                    </div>
                )
                }
                </>
            ) : (
              <div className='flex flex-1 justify-center'>
                <img alt="not fount" width={"208px"} src={returnImg(values[imgS])} />
              </div>
            )
          }
        </div>
      </div>
    )
  }

  const renderDescSolution = () => {
    if(status > 0) {
      return <Input key={30} title={"Notas"} value={values[notas]} onChange={(e) => modifyLocalData(notas,e,false)} textArea={true}/>
    }
  }

  const isDisabled = () => {
    let haveEmpty = false
    if(values[0] == "" || values[1] == "" || values[3] == "" || values[4] == ""){
      haveEmpty = true
    }
    console.log("haveEmpty", haveEmpty, values[0], values[1], values[3], values[4])
    return haveEmpty
  }

  return (
    <div className='flex flex-col p-3 w-full h-full  gap-2'>
      <HeaderModal title={hallazgo.hallazgo == "" ? "Nuevo Hallazgo" : "Detalles Hallazgo"} statusHallazgo={statusHallazgo} hallazgoActivo={hallazgoActivo} />
      <div className='flex flex-col gap-y-4 bg-white p-3 rounded-md  basis-10/12'>
        {
          names.map((item,i) => {
            return getInput(item,i)
          })
        }
        {
          renderPics()
        }
        {
          renderDescSolution()
        }
      </div>
        {
          status < 2 && (
        <div className='flex justify-between bg-white p-3 rounded-md  basis-1/12'>
          <Button color="white" bgColor={currentColor} text="Guardar" 
            borderRadius="3px" size="xl" icon={<FiSave/>}
            func={() =>onSave()} disabled={isDisabled()}
          />  
        </div>

          )
        }
        
    </div>
  )
}

export default FormView