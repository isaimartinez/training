import React from 'react'
import { Header} from '../components'
import {PieChart, BarChart} from '../components'

const ChartPrioridad = ({prioridadData, prioridadMax}) => {
  return (
    <div className='m-4 md:m-10 mt-32 p-5  bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Hallazgos - Prioridad"/>
      <BarChart data={prioridadData} max={prioridadMax} type="prioridad"/>
    </div>
  )
}

export default ChartPrioridad