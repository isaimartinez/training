import React from 'react'
import { Header, PieChart} from '../../components'

const Pie = () => {
  return (
    <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Pie" category="Chart"/>
      <div className='w-full'>
        <PieChart/>
      </div>
    </div>
  )
}

export default Pie