import React from 'react'
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, SplineAreaSeries,Inject, DateTime, Legend, Tooltip} from '@syncfusion/ej2-react-charts'

import { areaCustomSeries, areaPrimaryXAxis, areaPrimaryYAxis } from '../../data/dummy'
import { useStateContext } from '../../context/ContextProvider'

const AreaChart = () => {
  const {currentMode} = useStateContext()

  return (
    <ChartComponent
      id="line-chart"
      height='420px'
      primaryXAxis={areaPrimaryXAxis}
      primaryYAxis={areaPrimaryYAxis}
      chartArea={{border: {width: 0}}}
      tooltip={{enable: true}}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject services={[SplineAreaSeries, DateTime, Legend, Tooltip]}/>
      <SeriesCollectionDirective>
        {areaCustomSeries.map((item,i) => (
          <SeriesDirective key={i} {...item}/>
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default AreaChart