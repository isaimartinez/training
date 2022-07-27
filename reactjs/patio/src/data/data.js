import {BsGrid3X3GapFill} from 'react-icons/bs'

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Patio',
        icon: <BsGrid3X3GapFill />,
      },
    ],
  }
];

export const initialCajones = {
  data: [
    {
      id: "A1",
      scanned: false,
      peso: 0,
      color: "green",
      blink: false,
      status: 0
    },{
      id: "B1",
      scanned: false,
      peso: 0,
      color: "green",
      blink: false,
      status: 0
    },{
      id: "A2",
      scanned: false,
      peso: 0,
      color: "green",
      blink: false,
      status: 0
    },{
      id: "B2",
      scanned: false,
      peso: 0,
      color: "green",
      blink: false,
      status: 0
    },
  ]
}

export let initialData = [
  {
    title: "Id",
    value: Math.floor(Math.random() * 1000000000) + 1,
    status: 0
  },{
    title: "Peso al Entrar",
    value: "0",
    status: 0
  },{
    title: "Peso al Salir",
    value: "0",
    status: 1
  },{
    title: "Peso Neto",
    value: "0",
    status: 1
  }
]

