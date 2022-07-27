import React,{useState} from 'react'
import { Header, TablaHallazgos} from '../components'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {FiPlus} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux'
import { turnModalOn } from '../redux/reducers/viewSlice'
import { addHallazgo, setHallazgoActivo } from '../redux/reducers/dataSlice'
// import {FakeServer as Server} from '../APIs/FakeServer'
import Server from '../APIs/FakeServer'



const Patio = () => {
  const state = useSelector((state) => state)
  const {hallazgos, grid} = state.data
  const {currentColor} = state.view
  const dispatch = useDispatch()

  const handleNewHallazgo = () => {
    Server.getHallazgoStructure().then((structure) => {
      let i = 0
      dispatch(addHallazgo(structure))
      dispatch(setHallazgoActivo(i))
      dispatch(turnModalOn("isActiveModalSalida"))
    })
  }

  return ( <>

    <div className='m-4 md:m-10 mt-24 p-5 bg-white dark:bg-secondary-dark-bg rounded-3xl' id="tabla">
      <div className='fixed right-4 bottom-4' style={{zIndex: '2 '}}>
        <TooltipComponent content='Añadir Hallazgo' position='Top'>
          <button type='button' 
              className='text-3xl p-3 hover:shadow-xl hover:bg-light-gray text-white'
              style={{background: currentColor, borderRadius: '50%'}}
              onClick={() => { handleNewHallazgo()}}
          >
              <FiPlus/>
          </button>
        </TooltipComponent>
      </div>
      <Header title="Hallazgos" download={true} data={hallazgos} headers={grid}/>
      <div className='w-full' >
        <TablaHallazgos hallazgos={hallazgos} grid={grid}/>
      </div>
    </div>
    </>
  )
}

export default Patio