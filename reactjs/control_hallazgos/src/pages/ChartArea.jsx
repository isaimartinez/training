import React from 'react'
import { Header} from '../components'
import {PieChart, BarChart} from '../components'

const ChartArea = ({areaData, areaMax}) => {
  return (
    <div className='m-4 md:m-10 mt-32 p-5  bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Hallazgos - Area"/>
      <BarChart data={areaData} max={areaMax} type="area"/>
    </div>
  )
}

export default ChartArea