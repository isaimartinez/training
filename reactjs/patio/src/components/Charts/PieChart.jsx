import React,{useEffect, useState} from 'react'
import {
  AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective,
  Inject, AccumulationLegend, PieSeries, AccumulationTooltip, IAccLoadedEventArgs, AccumulationTheme,
  AccumulationDataLabel
} from '@syncfusion/ej2-react-charts';

const PieChart = ({cajon}) => {
  const [granzon, setGranzon] = useState(0)
  const [fino, setFino] = useState(0)
  const [concentrado, setConcentrado] = useState(0)
  const [capacidad, setCapacidad] = useState(cajon.capacidad)
  const [parsedData, setParsedData] = useState([])
  const [canChart, setCanChart] = useState(false)


  // iterateData()
  // prepareData()

  const iterateData = () => {
    let capa = cajon.capacidad
    let g=0,f=0,c=0;
    cajon.cargas.map((carga, i) => {
      let materialIndex = carga.inputs.findIndex(obj => obj.id == "material")
      let pesoNIndex = carga.inputs.findIndex(obj => obj.id == "pesoN")
      let material = carga.inputs[materialIndex].value
      let pesoN = carga.inputs[pesoNIndex].value

      let statusCarga = carga.statusCarga
      if(statusCarga == 2) {
        switch (material) {
          case "Granzon":
            g =+ parseInt(pesoN)
            break;
          case "Fino":
            f =+ parseInt(pesoN)
            break;
          case "Concentrado":
            c =+ parseInt(pesoN)
          default:
            break;
        }
      }
    })
    setGranzon(g)
    setFino(f)
    setConcentrado(c)
    
    console.log("granzon id", granzon)
    console.log("fino id", fino)
    console.log("concentrado id", concentrado)
    let total = f + g + c
    if( total > capa){
      setCapacidad(total)
      prepareData(g,f,c, total)
  } else {
      setCapacidad(capa)
      prepareData(g,f,c, capa)
    }

  }

  // useEffect(() => {
  //   console.log("useEffect")
  //   iterateData()
  //   prepareData()

  // }, [])
  

  useEffect(() => {
    console.log("useEffect Cajon")
    iterateData()
    // prepareData()
  }, [cajon])
  
  const getPer = (prop, capa) => {
      console.log("getPer", prop, capa)
    if(prop==0) {return 0} else {
      return ((prop/capa)*100).toFixed(0)

    }
  }



  const prepareData = (g,f,c, capa) => {
    console.log("granzon ", g)
    console.log("fino", f)
    console.log("concentrado ", c)
    let data = []
    let gP = getPer(g, capa)
    let fP = getPer(f, capa)
    let cP = getPer(c, capa)

    if(gP > 0) {
      data.push({'x': 'Granzon', y: gP, text: gP+'%' })
    }
    if(fP > 0) {
      data.push({ 'x': 'Fino', y: fP, text: fP+'%' })
    }
    if(cP > 0) {
      data.push({ 'x': 'Concentrado', y: cP, text: cP+'%' })
    }

    let rP = 100 - gP - fP - cP
    if(rP > 0) {
      data.push({ 'x': 'Espacio Disponible', y: rP, text: rP+'%' })
    }

    console.log("gP, fP, cP, rP  ", gP, fP, cP, rP)
    setParsedData(data)
    setCanChart(true)
  }

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
        pointRender={onPointRender}
        enableSmartLabels={true}
        enableAnimation={true}
        tooltip={{ enable: true, format: '<b>${point.y}%</b> ${point.x}' }}
      >
        <Inject services={[ PieSeries, AccumulationTooltip, AccumulationDataLabel]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective dataSource={parsedData}
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