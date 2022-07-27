import React, {useEffect} from 'react'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import {AiOutlineMenu} from 'react-icons/ai'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn, setScreenSize } from '../redux/reducers/viewSlice'

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{color}}
      className='relative text-xl rounded-full p-3 hover:bg-light-gray '
    >
      <span style={{background: dotColor}}
        className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
      />
      {icon}
    </button>
  </TooltipComponent>
)

const NavBar = () => {
  const dispatch = useDispatch()

  const state = useSelector((state) => state)
  const {  screenSize, currentColor, activeMenu} = state.view
  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth))

    window.addEventListener('resize', handleResize)

    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if(screenSize <= 900){
      dispatch(setActiveMenu(false))
    } else {
      dispatch(setActiveMenu(true))
    }
    
    return () => {
      
    }
  }, [screenSize])

  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" color={currentColor} icon={<AiOutlineMenu/>}
        customFunc={() => dispatch(setActiveMenu(!activeMenu))}
      />
    </div>
  )
}

export default NavBar