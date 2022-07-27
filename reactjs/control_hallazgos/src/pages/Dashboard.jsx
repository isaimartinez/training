import React from 'react'
import { Header} from '../components'
import {PieChart, BarChart} from '../components'

const Dashboard = ({dataPie, prioridadData, prioridadMax, areaData, areaMax}) => {
  return (
    <>
    {/* Grafico de Barras por Area */}
    <div className='m-4 md:m-10 mt-24 p-5  bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Barra - Area"/>
      <BarChart data={areaData} max={areaMax} type="area"/>
    </div>

    {/* Grafico de Barras por Nivel con los mismos colores que el status */}
    <div className='m-4 md:m-10 mt-24 p-5  bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Barra - Prioridad"/>
      <BarChart data={prioridadData} max={prioridadMax} type="prioridad"/>
    </div>

    {/* Pastel de Abiertas/Cerradas */}
    <div className='m-4 md:m-10 mt-24 p-5  bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header title="Pastel - Activos/Cerrados"/>
      <PieChart data={dataPie}/>
    </div>

    </>
      
  )
}

export default Dashboard