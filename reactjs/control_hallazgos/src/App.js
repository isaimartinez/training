import './App.css';
import React, {useEffect, useState} from 'react'
import {FiSettings} from 'react-icons/fi'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Sidebar, NavBar,  ModalHallazgo} from './components'
import {Hallazgos, Dashboard, ChartArea, ChartPrioridad, ChartStatus} from './pages'

import {TooltipComponent} from '@syncfusion/ej2-react-popups'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from './redux/reducers/viewSlice'
import { setHallazgos, setGrid } from './redux/reducers/dataSlice'

// import {FakeServer as Server} from './APIs/FakeServer'
import Server from './APIs/FakeServer'


function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {activeMenu, currentMode, isActiveModalCajon, isActiveModalSalida} = state.view
  const {hallazgos} = state.data

  const [dataPie, setDataPie] = useState([])
  const [prioridadData, setPrioridadData] = useState([])
  const [prioridadMax, setPrioridadMax] = useState(1)
  const [areaData, setAreaData] = useState([])
  const [areaMax, setAreaMax] = useState(1)

  useEffect(() => {
    Server.getHallazgos().then((data) => {
      dispatch(setHallazgos(data))
    })
    Server.getHallazgosGrid().then((data) => {
      dispatch(setGrid(data))
    })
  }, [])

  const calcPieData = () => {
    let total = 0
    let a = 0
    hallazgos.map((h,i) => {
      total++
      if(h.isActive=="1"){
        a++
      }
    })
    let aP = ((a/total)*100).toFixed(2)
    let cP = 100-aP
    let data = [
      {'x': 'Abiertas', y: aP, text: aP+'%'},
      {'x': 'Cerradas', y: cP, text: cP+'%'}
    ]
    setDataPie(data)
  }

  const calcAreaData = () => {
    let total = 0
    let one=0, two=0,three=0,four=0,five=0
    hallazgos.map((h,i) => {
      total++
      switch (parseInt(h.prioridad)) {
        case 1:
          one++
          break;
        case 2:
          two++
          break;
        case 3:
          three++
          break;
        case 4:
          four++
          break;
        case 5:
          five++
          break;
        default:
          break;
      }
    })

    let data = [
      {x: 'No Urgente', y: one },
      {x: 'Urgencia Menor', y: two },
      {x: 'Urgencia', y: three },
      {x: 'Emergencia', y: four },
      {x: 'Atencion Inmediata', y: five },
    ]
    let m = Math.max(one,two,three,four,five)
    setPrioridadData(data)
    setPrioridadMax(m)
  }

  const calcPrioridadData = () => {
    let total = 0
    let st=0,pr=0,tr=0,ti=0,ma=0
    hallazgos.map((h,i) => {
      total++
      switch (h.area) {
        case "Steinert":
          st++
          break;
        case "Presas":
          pr++
          break;
        case "Trituracion":
          tr++
          break;
        case "Tiro 6":
          ti++
          break;
        case "Mantenimiento":
          ma++
          break;
        default:
          break;
      }
    })
    let data = [
      {x: 'Steinert', y: st },
      {x: 'Presas', y: pr },
      {x: 'Trituracion', y: tr },
      {x: 'Tiro 6', y: ti },
      {x: 'Mantenimiento', y: ma },
    ]
    let m = Math.max(st,pr,tr,ti,ma)
    setAreaData(data)
    setAreaMax(m)
  }

  useEffect(() => {
    calcPieData()
    calcAreaData()
    calcPrioridadData()
  }, [hallazgos])
  
  
  
  return (
    <div className={currentMode === "Dark" ? 'dark' : ''}>
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          {activeMenu ? (
            <div
              className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'
            >
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >

            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <NavBar/>
            </div>
            
            <div>
            {/* Modal */}
            {
              isActiveModalCajon && <ModalHallazgo/>
            }

            <Routes>
              <Route path='/' element={<Hallazgos/>}/>
              <Route path='/Hallazgos' element={<Hallazgos />}/>
              <Route path='/Dashboard' element={<Dashboard dataPie={dataPie} 
                prioridadData={prioridadData} prioridadMax={prioridadMax}
                areaData={areaData} areaMax={areaMax}  
                />}/>
              <Route path='/ChartStatus' element={<ChartStatus dataPie={dataPie}  />}/>
              <Route path='/ChartPrioridad' element={<ChartPrioridad prioridadData={prioridadData} prioridadMax={prioridadMax}  />}/>
              <Route path='/ChartArea' element={<ChartArea areaData={areaData} areaMax={areaMax}  />}/>
              
            </Routes>


            </div>
            
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App;
