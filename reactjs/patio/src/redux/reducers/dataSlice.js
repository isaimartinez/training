import { createSlice } from '@reduxjs/toolkit'

import { initialCajones, initialData } from '../../data/data'

const initialState = {
  cajones: [],
  cajonActivo: -1,
  cargaActiva: -1,
  scanned: false,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: { 
      setStatusCarga: (state,action) => {
        let cajon = state.cajonActivo
        let carga = state.cargaActiva
        state.cajones[cajon].cargas[carga].statusCarga = action.payload
      },
      setCajonActivo: (state, action) => {
        state.cajonActivo = action.payload
      },
      setCargaActiva: (state, action) => {
        state.cargaActiva = action.payload
      },
      setScanned: (state, action) => {
        state.scanned = action.payload
      },
      setCajones: (state,action) => {
        state.cajones = action.payload
      },
      addCarga: (state, action) => {
        let i = state.cajonActivo
        state.cajones[i].cargas.push(action.payload)
      },
      deleteCarga: (state, action) => {
        let cajon = state.cajonActivo
        let cargaToDelete = action.payload
        state.cajones[cajon].cargas.splice(cargaToDelete, 1);
      },
      setAcumulado: (state, action) => {
        let cajon = action.payload.i
        state.cajones[cajon].acumulado = action.payload.acumulado
      },
      modifyData: (state,action) => {

        let cajon = state.cajonActivo
        let carga = state.cargaActiva
        let inputs = state.cajones[cajon].cargas[carga].inputs
        // state.cajones[i].data[action.payload.i] = action.payload.data
        inputs[action.payload.i] = action.payload.data


        let statusCarga = state.cajones[cajon].cargas[carga].statusCarga
        if(statusCarga == 1){

          let pesoEIndex = inputs.findIndex(obj => obj.id == "pesoE")
          let pesoSIndex = inputs.findIndex(obj => obj.id == "pesoS")
          let pesoNIndex = inputs.findIndex(obj => obj.id == "pesoN")
          let pesoE = inputs[pesoEIndex].value
          let pesoS = inputs[pesoSIndex].value
          let resta = parseInt(pesoE) - parseInt(pesoS)
          inputs[pesoNIndex].value = resta
        }
      }
      
    },
})
  
export const { setCajonActivo, setStatusCarga, setAcumulado, deleteCarga,
  setScanned, addCarga, modifyData, setCajones, setCargaActiva
} = dataSlice.actions

export default dataSlice.reducer