import React from 'react'
import {TooltipComponent} from '@syncfusion/ej2-react-popups'
import {AiOutlineFilePdf,AiOutlineFileExcel} from 'react-icons/ai'

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { CSVLink, CSVDownload } from "react-csv";


const Header = ({title, download, data, headers}) => {
  const downloadPdf = () => {
    let downloadFileName = "Tabla Hallazgos"
    const input = document.getElementById("tabla");
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                const imgProps= pdf.getImageProperties(imgData);
                var width = pdf.internal.pageSize.getWidth();
                var height = (imgProps.height * width) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0,width, height);
                pdf.save(`${downloadFileName}.pdf`);
            })
  }



  return (
    <div className='flex flex-row justify-between mb-5'>
      <p className='text-3xl font-extrabold tracking-tight text-slate-900'>{title}</p>

      {download && (
        <div className='flex flex-row'>
        <TooltipComponent content='Descargar Pdf' position='TopCenter'>
          <button onClick={() => downloadPdf()} 
            className='text-2xl rounded-full p-2 hover:bg-light-gray '
          >
            <AiOutlineFilePdf/>
          </button>
        </TooltipComponent>

        <TooltipComponent content='Descargar Csv' position='TopCenter'>
          <button 
            className='text-2xl rounded-full p-2 hover:bg-light-gray '
          >
            <CSVLink data={data} headers={headers} 
              filename={"Tabla Hallazgos.csv"}
            >
              <AiOutlineFileExcel/>
            </CSVLink>
          </button>
        </TooltipComponent>

        </div>

      )}
    </div>
  )
}

export default Header