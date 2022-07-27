import React,{useState,useEffect} from 'react'
import {GrClose} from 'react-icons/gr'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Modal from 'react-modal';


import { useSelector, useDispatch } from 'react-redux'
import { setActiveMenu, turnModalsOff, turnModalOn } from '../../redux/reducers/viewSlice'
import { setCajonActivo, setScanned } from '../../redux/reducers/dataSlice'

import HeaderModal from '../HeaderModal'
import ScanView from '../ScanView'
import FormView from './FormView'
import CargaSelector from './CargaSelector'
 
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '90%',
    padding: 0,
    backgroundColor: "#fafbfb",
  },
  overlay: {
    backgroundColor: 'rgba(250, 250, 249, 0.8)'
  }
};

const ModalCajon = ({}) => {
  const state = useSelector((state) => state)
  const {cajones, cajonActivo, cargaActiva, scanned, } = state.data
  const {isActiveModalCajon, currentColor} = state.view
  const dispatch = useDispatch()

  const [statusCarga, setLocalStatusCarga] = useState(-1)

  useEffect(() => {
    dispatch(setScanned(false))
  }, [])
  

  useEffect(() => {
    if(cargaActiva > -1) {
      let s = cajones[cajonActivo].cargas[cargaActiva].statusCarga
      setLocalStatusCarga(s)
    }

  }, [cajonActivo, cargaActiva])

  return (
    <Modal
      isOpen={isActiveModalCajon}
      ariaHideApp={false}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => dispatch(turnModalsOff())}
      style={customStyles}
    >
      {cargaActiva == -1 && <CargaSelector />}
      {
        statusCarga == 2 && <FormView statusCarga={statusCarga}/>
      }

      {
        !scanned && statusCarga < 2 && statusCarga > -1 && <ScanView statusCarga={statusCarga}/> 
      }
      {
        scanned && statusCarga < 2 && statusCarga > -1 && 
          <FormView 
            statusCarga={statusCarga}
            />
      }


    </Modal>
  )
}

export default ModalCajon