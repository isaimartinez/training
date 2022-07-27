import React,{useState,useEffect} from 'react'
import {GrClose} from 'react-icons/gr'
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Modal from 'react-modal';


import { useSelector, useDispatch } from 'react-redux'
import { turnModalsOff, } from '../../redux/reducers/viewSlice'
import { setHallazgoActivo, deleteHallazgo} from '../../redux/reducers/dataSlice'

import HeaderModal from '../HeaderModal'
import FormView from './FormView'
 
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
    backgroundColor: 'rgba(250, 250, 249, 0.8)',
    zIndex: '5'
  }
};

const ModalCajon = () => {
  const state = useSelector((state) => state)
  const {hallazgos, hallazgoActivo } = state.data
  const {isActiveModalCajon, currentColor} = state.view
  const dispatch = useDispatch()

  const [statusHallazgo, setLocalStatusHallazgo] = useState(-1)

  useEffect(() => {
    let s = hallazgos[hallazgoActivo].status
    setLocalStatusHallazgo(s)
  }, [hallazgos,hallazgoActivo])
  

  const closeModal = () => {
    dispatch(turnModalsOff())
    if(statusHallazgo == 0) {
      // delete carga
      dispatch(deleteHallazgo(hallazgoActivo))
      dispatch(setHallazgoActivo(-1))
    }
    dispatch(setHallazgoActivo(-1))
  }  

  return (
    <Modal
      isOpen={isActiveModalCajon}
      ariaHideApp={false}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => closeModal()}
      style={customStyles}
    >
      <FormView statusHallazgo={statusHallazgo}/>
    </Modal>
  )
}

export default ModalCajon