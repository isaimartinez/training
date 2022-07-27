import React from 'react'
import {
  ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, 
  Category, ColumnSeries, Legend, DataLabel,
  Tooltip,  
} from '@syncfusion/ej2-react-charts';

const BarChart = ({data, max, type}) => {
  const isOdd = (num) => { return num % 2;}

  const labelRender = (args) => {
    if(type == "area"){
      if (isOdd(args.point.index)) {
          args.fill = "rgb(37 99 235)"
      } else {
        args.fill = "rgb(56 189 248)"
      }
    }else if(type == "prioridad"){
      switch (args.point.x) {
        case "No Urgente":
          args.fill = "rgb(74 222 128)" //green-400
          break;
        case "Urgencia Menor":
          args.fill = "rgb(163 230 53)" //lime-400
          break;
        case "Urgencia":
          args.fill = "rgb(250 204 21)" //yellow-400
          break;
        case "Emergencia":
          args.fill = "rgb(251 146 60)" //orange-400
          break;
        case "Atencion Inmediata":
          args.fill = "rgb(248 113 113)" //red-400
          break;
        default:
          break;
      }
    }
  }
  return (
    <div className='w-full justify-center items-center '>
    <ChartComponent id={type} style={{ textAlign: "center" }}
      primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, tickPosition: 'Inside',
      labelPosition:'Inside', labelStyle: { color: '#ffffff' } }}
      primaryYAxis={{ minimum: 0, maximum: max, interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }}
      chartArea={{ border: { width: 0 } }}
      legendSettings={{ visible: false }}
      tooltip={{ enable: true }}
      pointRender={labelRender}
    >
      <Inject services={[ColumnSeries, DataLabel, Category, Tooltip]} />
      <SeriesCollectionDirective>
          <SeriesDirective dataSource={data} type='Column' xName='x' width={2} yName='y' name=''
              cornerRadius={{ bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }}
              marker={{ dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', fontSize: 20, color: '#ffffff' } } }}>
          </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
    </div>
  )
}

export default BarChart