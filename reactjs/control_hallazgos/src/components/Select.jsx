import React from 'react'
import Select,{StylesConfig} from 'react-select'

const optionsPrio= [
  { value: '1', label: '1 - No Urgente' },
  { value: '2', label: '2 - Urgencia Menor' },
  { value: '3', label: '3 - Urgencia' },
  { value: '4', label: '4 - Emergencia' },
  { value: '5', label: '5 - Atencion Inmediata' },
]

const optionsArea = [
  { value: 'Steinert', label: 'Steinert' },
  { value: 'Presas', label: 'Presas' },
  { value: 'Trituracion', label: 'Trituracion' },
  { value: 'Tiro 6', label: 'Tiro 6' },
  { value: 'Mantenimiento', label: 'Mantenimiento' },

]

const SelectView = ({title,value, onChange, disabled, icon }) => {
    const returnVal = () => {
      if(value.length > 0) {
        let v = {value: value, label: value}
        return v
      }
    }

    const returnOptions = () => {
      if(title == "area"){
        return optionsArea
      } else {
        return optionsPrio
      }
    }

    const getBg = (val) => {
      switch (parseInt(val)) {
        case 1:
          return "rgb(74 222 128)"
          break;
        case 2:
          return "rgb(163 230 53)"
          break;
        case 3:
          return "rgb(250 204 21)"
          break;
        case 4:
          return "rgb(251 146 60)"
          break;
        case 5:
          return "rgb(248 113 113)"
          break;
        default:
          return "default"
          break;
      }
    }

    const getBgFocused = (val) => {
      switch (parseInt(val)) {
        case 1:
          return "rgb(220 252 231)"
          break;
        case 2:
          return "rgb(236 252 203)"
          break;
        case 3:
          return "rgb(254 249 195)"
          break;
        case 4:
          return "rgb(255 237 213)"
          break;
        case 5:
          return "rgb(254 226 226)"
          break;
        default:
          return "default"
          break;
      }
    }

    


    const customStyles = {
      option: (styles, {isFocused, isSelected,value}) => {
        let bg = getBg(value)
        let bgf = getBgFocused(value)
        return {
          ...styles,
          backgroundColor: isSelected ? bg
          : isFocused ? bgf : "default",

          color: isSelected ? "rgb(244 244 245)"
          : isFocused ? "black" : "default",
          cursor: "pointer"
    
          // ':active': {
          //   ...styles[':active'],
          //   backgroundColor: !isDisabled
          //     ? isSelected
          //       ? data.color
          //       : color.alpha(0.3).css()
          //     : undefined,
          // },
        };
      },
      menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0
      })
    }

  return (
    <div className='flex flex-col gap-y-1'>
      <p className='ml-2' style={{textTransform: "capitalize"}}>{title}</p>
      <div className='flex items-center w-full '>
        <Select options={returnOptions()} value={returnVal()} onChange={onChange} isDisabled={disabled}
          className='mt-1 block w-full rounded-md text-sm  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
          styles={title == "prioridad" && customStyles}
        />
        {icon && (
          <div className='mx-4'>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectView