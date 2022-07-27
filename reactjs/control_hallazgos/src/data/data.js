import {BsGrid3X3GapFill, BsClipboardData} from 'react-icons/bs'
import { DataManager, Query } from '@syncfusion/ej2-data';
export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Hallazgos',
        icon: <BsGrid3X3GapFill />,
      },{
        name: 'Dashboard',
        icon: <BsClipboardData/>
      }
    ],
  }
];

const areas =  [
  { areaName: 'Steinert', areaId: '1' },
  { areaName: 'Presas', areaId: '2' },
  { areaName: 'Trituracion', areaId: '3' },
  { areaName: 'Tiro 6', areaId: '4' },
  { areaName: 'Mantenimiento', areaId: '5' }
];

const areaParams = {
  params: {
    actionComplete: () => false,
    dataSource: new DataManager(areas),
    fields: { text: "areaName", value: "areaId" },
    query: new Query()
  }
}

export const hallazgosGrid = [
  { field: 'Hallazgo',
    title: 'Hallazgo',
  },{ 
    field: 'Descripcion',
    title: 'Descripcion',
  },{ 
    field: 'Area',
    title: 'Area',
  },{ 
    field: 'Prioridad',
    title: 'Prioridad',
  },{ 
    field: 'Status',
    title: 'Status',
  },
]

export const hallazgosData = [
  {
    Hallazgo: "Lorem",
    Descripcion: "Lorem ipsum 123892140342",
    Area: "Area Example",
    Prioridad: 1,
    Status: 0
  },{
    Hallazgo: "Lorem",
    Descripcion: "Lorem ipsum 123892140342",
    Area: "Area Example",
    Prioridad: 2,
    Status: 0
  },{
    Hallazgo: "Lorem",
    Descripcion: "Lorem ipsum 123892140342",
    Area: "Area Example",
    Prioridad: 4,
    Status: 0
  },{
    Hallazgo: "Lorem",
    Descripcion: "Lorem ipsum 123892140342",
    Area: "Area Example",
    Prioridad: 3,
    Status: 0
  },{
    Hallazgo: "Lorem",
    Descripcion: "Lorem ipsum 123892140342",
    Area: "Area Example",
    Prioridad: 5,
    Status: 0
  }
]



