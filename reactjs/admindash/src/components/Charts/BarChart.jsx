import React from 'react'
import { ChartComponent, Inject, ColumnSeries, Tooltip, Legend, SeriesCollectionDirective, SeriesDirective,
  Category, DataLabel
} from '@syncfusion/ej2-react-charts'

import { barPrimaryYAxis, barPrimaryXAxis, barChartData, barCustomSeries } from '../../data/dummy'
import { useStateContext } from '../../context/ContextProvider'

const BarChart = () => {
  const {currentMode} = useStateContext()

  return (
    <ChartComponent
      id="bar-chart"
      height='420px'
      primaryXAxis={barPrimaryXAxis}
      primaryYAxis={barPrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >

      <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
      <SeriesCollectionDirective>
        {
          barCustomSeries.map((item,i) => (
            <SeriesDirective key={i} {...item}/>
          ))
        }
      </SeriesCollectionDirective>
    </ChartComponent>
  )
}

export default BarChart