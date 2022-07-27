import { createSlice } from '@reduxjs/toolkit'

import { initialCajones, initialData } from '../../data/data'

const initialState = {
  hallazgos: [],
  grid: [],
  cargaActiva: -1,
  hallazgoActivo: -1
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setStatusHallazgo : (state, action) => {
        let h = state.hallazgoActivo
        state.hallazgos[h].status = action.payload
      },
      setHallazgos: (state,action) => {
        state.hallazgos = action.payload
      },
      setGrid: (state,action) => {
        state.grid = action.payload
      },
      setHallazgoActivo : (state,action) => {
        state.hallazgoActivo = action.payload
      },
      addHallazgo: (state, action) => {
        state.hallazgos.unshift(action.payload)
      },
      deleteHallazgo: (state, action) => {
        let htd = action.payload
        state.hallazgos.splice(htd, 1);
      },
      modifyData: (state, action) => {
        let i = state.hallazgoActivo
        state.hallazgos[i] = action.payload
      }
      
    },
})
  
export const { setStatusHallazgo, deleteHallazgo, modifyData,
   addHallazgo, setHallazgos, setGrid, setHallazgoActivo
} = dataSlice.actions

export default dataSlice.reducer