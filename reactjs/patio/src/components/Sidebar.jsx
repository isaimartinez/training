import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { GiMineTruck } from 'react-icons/gi'
import {MdOutlineCancel} from 'react-icons/md'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'

import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn, setScreenSize } from '../redux/reducers/viewSlice'


import { links } from '../data/data'

const Sidebar = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const {activeMenu, screenSize, currentColor} = state.view
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2'
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2'

  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900){
      dispatch(setActiveMenu(false))
    }
  }

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {
        activeMenu && ( <>
          <div className='flex justify-between items-center'>
            <Link to='/' 
              onClick={handleCloseSideBar} 
              className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold -tracking-tight dark:text-white text-slate-900'
            >
              <GiMineTruck/> Admin Dash
            </Link>
            <TooltipComponent content='Menu' position='BottomCenter'>
              <button type='button' onClick={() => {
                 dispatch(setActiveMenu(false))
              }}
                className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
              >
                <MdOutlineCancel/> 
              </button>
            </TooltipComponent>
          </div>
          <div className='mt-10'>
            {links.map((item) => (
              <div key={item.title}>
              <p className='text-gray-400 m-3 mt-4 uppercase'>
                {item.title}
              </p>
              { item.links.map((l) => (
                <NavLink to={`/${l.name}`} key={l.name}
                  onClick={handleCloseSideBar} 
                  style={({isActive}) =>  ({
                    backgroundColor: isActive ? currentColor : ''
                  })}
                  className={({isActive}) => isActive ? activeLink : normalLink}
                >
                  {l.icon}
                  <span className='capitalize'>{l.name}</span>
                </NavLink>
              ))
              }
              </div>
            ))}
          </div>
        </>)
      }
    </div>
  )
}

export default Sidebar