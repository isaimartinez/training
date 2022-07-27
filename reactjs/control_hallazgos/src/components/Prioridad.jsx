import React from 'react'



const Prioridad = ({item}) => {

  const getBg = () => {
    switch (parseInt(item.prioridad)) {
      case 1:
        return "bg-green-400"
        break;
      case 2:
        return "bg-lime-400"
        break;
      case 3:
        return "bg-yellow-400"
        break;
      case 4:
        return "bg-orange-400"
        break;
      case 5:
        return "bg-red-400"
        break;
      default:
        break;
    }
  }
  const getPulse = () => {
    if(parseInt(item.prioridad) == 5 && item.isActive == "1"){
      return "animate-pulse"
    }
  }

  return (
    <div className={`flex w-20 rounded justify-center ${getBg()} ${getPulse()} m-auto`}>
      <p className='text-zinc-100	p-1	'>{item.prioridad}</p>
    </div>
  )
}

export default Prioridad