import './App.css';
import React, {useEffect} from 'react'
import {FiSettings} from 'react-icons/fi'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Sidebar, NavBar, ThemeSettings, ModalCajon} from './components'
import {Patio} from './pages'

import {TooltipComponent} from '@syncfusion/ej2-react-popups'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from './redux/reducers/viewSlice'
import { setCajones } from './redux/reducers/dataSlice'

import Server from './APIs/FakeServer'


function App() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const {activeMenu, themeSettings, currentMode, isActiveModalCajon, isActiveModalSalida} = state.view

  useEffect(() => {
    Server.getCajones().then((cajones) => {
      dispatch(setCajones(cajones))
    })
  }, [])
  
  
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
            
            {themeSettings && <ThemeSettings />}

            {/* Modal */}
            {
              isActiveModalCajon && <ModalCajon/>
            }

            <Routes>
              <Route path='/' element={<Patio/>}/>
              <Route path='/Patio' element={<Patio/>}/>
            </Routes>


            </div>
            
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App;
