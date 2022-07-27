import React from 'react'
import { Header, Torreta, Cajon } from '../components'



import { useSelector, useDispatch } from 'react-redux'

const Patio = () => {
  const state = useSelector((state) => state)
  const {cajones} = state.data

  const dispatch = useDispatch()

  return ( <>
    <div className='m-4 md:m-10 mt-24 p-5 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Torretas"/>
      <div className='w-full'>
        <div className='flex flex-row gap-2 '>
          {
            cajones.map((cajon, i) => (
              <Torreta i={i} cajon={cajon} key={i}/>
            ))
          }
        </div>
      </div>
    </div>
    <div className='m-4 md:m-10 mt-24 p-5 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Patio"/>
      <div className='grid grid-cols-3 gap-2 w-fit h-fit m-auto'>
          {
            cajones.map((cajon, i) => (
              <Cajon i={i} cajon={cajon} key={i}/>
            ))
          }
      </div>
    </div>

    </>
  )
}

export default Patio