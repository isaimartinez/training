import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeMenu: true,
  currentColor: "black",
  isActiveModalCajon: false,
  screenSize: undefined
}

export const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
      setActiveMenu: (state, action) => {
        state.activeMenu = action.payload
      },
      turnModalsOff: (state, action) => {
        state.isActiveModalCajon = false
      },
      turnModalOn: (state, action) => {
        // state[action.payload] = true
        state.isActiveModalCajon = true
      },
      setScreenSize: (state, action) => {
        state.screenSize = action.payload
      }
      
    },
})
  
export const { setActiveMenu, turnModalsOff, turnModalOn, setScreenSize} = viewSlice.actions

export default viewSlice.reducer