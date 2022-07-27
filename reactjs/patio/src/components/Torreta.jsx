import React,{useEffect, useState} from 'react'


const Torreta = ({cajon,i}) => {
  const [statusTorreta, setStatusTorreta] = useState(0)  

  useEffect(() => {
    let count = 0
    cajon.cargas.map((carga, i) => {
      if(carga.statusCarga == 1){count++}
    })
    if(count > 0) {
      setStatusTorreta(1)
    } else {
      setStatusTorreta(0)

    }
  }, [cajon])

  return (
    <div
      className='flex-auto'
    >
      <div className={`${statusTorreta == 1 && 'animate-ping'} bg-violet-500 h-20 w-20 rounded-full m-auto`}/>
      <p className='text-center'>{cajon.id}</p>    
    </div>
  )
}

export default Torreta