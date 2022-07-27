import React,{} from 'react'
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme,
  AccumulationDataLabel
} from '@syncfusion/ej2-react-charts';

const PieChart = ({data}) => {

  const onPointRender = (args) => {
    if(args.point.x == "Espacio Disponible"){
      args.fill = "rgb(226 232 240)"
    } else if(args.point.x == "Granzon"){
      args.fill = "rgb(16 185 129)" //emerald-600
    } else if(args.point.x == "Fino") {
      args.fill = "rgb(2 132 199)" //sky-400
    } else if(args.point.x == "Concentrado"){
      args.fill = "rgb(244 63 94)" //rose-500
    }
  }

  return (
    <div className='w-full justify-center items-center '>
      <AccumulationChartComponent id='pie-chart'
        // title={"Data"}
        // pointRender={onPointRender}
        // width='208px'
        enableSmartLabels={true}
        enableAnimation={true}
        tooltip={{ enable: true, format: '<b>${point.y}%</b> ${point.x}' }}
      >
        <Inject services={[ PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective dataSource={data}
            name= "" xName='x' yName='y'
            dataLabel={{
              visible: true,
              position: 'Outside', name: 'text',
              font: {
                fontWeight: '600'
              }
            }}
            innerRadius='40%'
            radius='90%'
          >

          </AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  )
}

export default PieChart